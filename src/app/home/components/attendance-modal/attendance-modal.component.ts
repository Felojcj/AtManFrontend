import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-attendance-modal',
  templateUrl: './attendance-modal.component.html',
  styleUrls: ['./attendance-modal.component.scss'],
})
export class AttendanceModalComponent implements OnInit {
  @Input() attendanceId: any;
  attendanceForm!: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private attendanceService: CoreService
  ) {}

  ngOnInit(): void {
    if (this.attendanceId) {
      this.attendanceService
        .getFromApi(
          'https://localhost:7248/api/Attendances/',
          this.attendanceId
        )
        .then((data) => {
          const editData = {
            ...data,
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate),
          };
          this.initializeForm(editData);
        })
        .catch((error) => console.log(error));
    } else {
      this.initializeForm();
    }
  }

  initializeForm(currentAttendance?: any) {
    this.attendanceForm = new FormGroup({
      id: new FormControl(currentAttendance?.id || ''),
      name: new FormControl(currentAttendance?.name || '', Validators.required),
      startDate: new FormControl(
        currentAttendance?.startDate || '',
        Validators.required
      ),
      endDate: new FormControl(
        currentAttendance?.endDate || '',
        Validators.required
      ),
    });
    this.attendanceForm.controls['endDate'].valueChanges.subscribe((endDate) => {
      const startDate = this.attendanceForm.controls['startDate'].value
      if(endDate.getTime() < startDate.getTime()) {
        this.attendanceForm.controls['endDate'].setErrors({
          dateValidation: true
        })
      }
    })
  }

  sendAttendanceData() {
    this.activeModal.close(this.attendanceForm.value);
  }
}
