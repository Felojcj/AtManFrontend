import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef } from 'ag-grid-community';
import { CoreService } from 'src/app/services/core.service';
import { AttendanceModalComponent } from '../attendance-modal/attendance-modal.component';

@Component({
  selector: 'app-tracking-table',
  templateUrl: './tracking-table.component.html',
  styleUrls: ['./tracking-table.component.scss'],
})
export class TrackingTableComponent {
  attendanceData: any[] = [];

  constructor(
    private attendanceService: CoreService,
    private datePipe: DatePipe,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.attendanceService
      .getFromApi('https://localhost:7248/api/Attendances')
      .then((values) => {
        this.attendanceData = this.formatAttendanceData(values);
        console.log(this.attendanceData);
      })
      .catch((error) => console.log(error));
  }

  columnDefs: ColDef[] = [
    { field: 'name', headerName: 'Assistant Name' },
    { field: 'startDate', headerName: 'Start Date' },
    { field: 'endDate', headerName: 'End Date' },
    { field: 'workedHours', headerName: 'Worked Hours' },
    { headerName: 'Actions' },
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
      const startDate = data.startDate
      const endDate = data.endDate
      return {
        ...data,
        workedHours: this.calculateWorkingHours(startDate, endDate),
        startDate: this.datePipe.transform(new Date(startDate), 'MMMM dd, yyyy, HH:mm'),
        endDate: this.datePipe.transform(new Date(endDate), 'MMMM dd, yyyy, HH:mm'),
      };
    });
  }

  openAttendanceModal() {
    const modalRef = this.modalService.open(AttendanceModalComponent, {
      centered: true,
      size: "lg",
      backdrop: "static",
      windowClass: "window-modal",
      backdropClass: "backdrop-modal"
    })
    modalRef.result.then(data => {
      if (data) {
        console.log(data)
      }
    })
  }

  sendAttendanceData() {

  }
}
