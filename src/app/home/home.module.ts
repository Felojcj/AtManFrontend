import { AgGridModule } from 'ag-grid-angular';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TrackingTableComponent } from './components/tracking-table/tracking-table.component';
import { AttendanceModalComponent } from './components/attendance-modal/attendance-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { MatButtonModule } from '@angular/material/button';
import { ActionsButtonsComponent } from './components/tracking-table/actions-buttons/actions-buttons.component';

@NgModule({
  declarations: [
    HomeComponent,
    TrackingTableComponent,
    AttendanceModalComponent,
    ActionsButtonsComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AgGridModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [DatePipe],
})
export class HomeModule {}
