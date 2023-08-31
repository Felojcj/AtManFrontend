import { AgGridModule } from 'ag-grid-angular';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TrackingTableComponent } from './components/tracking-table/tracking-table.component';


@NgModule({
  declarations: [
    HomeComponent,
    TrackingTableComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AgGridModule
  ],
  providers: [DatePipe]
})
export class HomeModule { }
