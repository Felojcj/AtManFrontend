import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-attendance-modal',
  templateUrl: './attendance-modal.component.html',
  styleUrls: ['./attendance-modal.component.scss'],
})
export class AttendanceModalComponent implements OnInit {
  attendanceForm!: FormGroup;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.attendanceForm = new FormGroup({
      name: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
    });
  }

  sendAttendanceData() {
    this.activeModal.close(this.attendanceForm.value)
  }
}
