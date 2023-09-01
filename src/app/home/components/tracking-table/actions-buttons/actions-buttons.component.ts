import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { CoreService } from 'src/app/services/core.service';
import { AttendanceModalComponent } from '../../attendance-modal/attendance-modal.component';

@Component({
  selector: 'app-actions-buttons',
  templateUrl: './actions-buttons.component.html',
  styleUrls: ['./actions-buttons.component.scss'],
})
export class ActionsButtonsComponent implements ICellRendererAngularComp {
  params: any;
  modalData: any;

  constructor(
    private attendanceService: CoreService,
    private modalService: NgbModal
  ) {}

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    this.params = params;
    return true;
  }

  deleteAttendance() {
    this.attendanceService
      .deleteFromApi(
        'https://localhost:7248/api/Attendances/',
        this.params.data.id
      )
      .then(() => this.attendanceService.refreshAttendanceData())
      .catch((error) => console.log(error));
  }

  editAttendance() {
    const modalRef = this.modalService.open(AttendanceModalComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
      windowClass: 'window-modal',
      backdropClass: 'backdrop-modal',
    });

    modalRef.componentInstance.attendanceId = this.params.data.id;
    modalRef.result
      .then((data) => {
        if (data) {
          this.modalData = data;
          this.attendanceService.refreshAttendanceData();
          this.updateData();
        }
      })
      .catch((error) => console.log(error));
  }

  updateData() {
    this.attendanceService
      .updateFromApi(
        'https://localhost:7248/api/Attendances/',
        this.modalData,
        this.modalData.id
      )
      .then(() => this.attendanceService.refreshAttendanceData())
      .catch((error) => console.log(error));
  }
}
