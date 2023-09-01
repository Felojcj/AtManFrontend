import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { CoreService } from 'src/app/services/core.service';
import { AttendanceModalComponent } from '../attendance-modal/attendance-modal.component';
import { ActionsButtonsComponent } from './actions-buttons/actions-buttons.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-tracking-table',
  templateUrl: './tracking-table.component.html',
  styleUrls: ['./tracking-table.component.scss'],
})
export class TrackingTableComponent {
  attendanceData: any[] = [];
  modalData!: any;
  destroy: Subject<void> = new Subject<void>();

  constructor(
    private attendanceService: CoreService,
    private datePipe: DatePipe,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.attendanceService.refreshAttendanceObservable
      .pipe(takeUntil(this.destroy))
      .subscribe(() => {
        this.getAttendanceData();
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  columnDefs: ColDef[] = [
    { field: 'name', headerName: 'Assistant Name' },
    {
      field: 'startDate',
      headerName: 'Start Date',
      sortingOrder: ['asc', 'desc'],
      sortable: true,
      cellRenderer: (params: ICellRendererParams) => {
        return params.value
          ? `<span>${this.datePipe.transform(
              params.value,
              'MMMM dd, yyyy, HH:mm'
            )}</span>`
          : null;
      },
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      cellRenderer: (params: ICellRendererParams) => {
        return params.value
          ? `
      <span>
      ${this.datePipe.transform(params.value, 'MMMM dd, yyyy, HH:mm')}
      </span>
      `
          : null;
      },
    },
    { field: 'workedHours', headerName: 'Worked Hours' },
    {
      headerName: 'Actions',
      cellRenderer: ActionsButtonsComponent,
    },
  ];

  calculateWorkingHours(startDateString: string, endDateString: string) {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    const hoursInMs = endDate.getTime() - startDate.getTime();

    return this.formatMillisecondsToHoursMinutes(hoursInMs);
  }

  formatMillisecondsToHoursMinutes(milliseconds: number) {
    const totalMinutes = Math.floor(milliseconds / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}: ${
      minutes >= 0 && minutes <= 9 ? '0' + minutes : minutes
    }`;
  }

  formatAttendanceData(attendanceData: any[]) {
    return attendanceData.map((data) => {
      const startDate = data.startDate;
      const endDate = data.endDate;
      return {
        ...data,
        workedHours: this.calculateWorkingHours(startDate, endDate),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      };
    });
  }

  openAttendanceModal() {
    const modalRef = this.modalService.open(AttendanceModalComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
      windowClass: 'window-modal',
      backdropClass: 'backdrop-modal',
    });
    modalRef.result.then((data) => {
      if (data) {
        this.modalData = data;
        this.sendAttendanceData();
      }
    });
  }

  sendAttendanceData() {
    this.attendanceService
      .postToApi('https://localhost:7248/api/Attendances', this.modalData)
      .then(() => this.getAttendanceData())
      .catch((error) => console.log(error));
  }

  getAttendanceData() {
    this.attendanceService
      .getFromApi('https://localhost:7248/api/Attendances')
      .then((values) => {
        this.attendanceData = this.formatAttendanceData(values);
      })
      .catch((error) => console.log(error));
  }
}
