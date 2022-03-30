import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

import { NgxEchartsModule } from 'ngx-echarts';

import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FeatureFormComponent, FeaturesComponent } from './pages';


@NgModule({
  declarations: [
    FeatureFormComponent,
    FeaturesComponent,
  ],
  imports: [
    DashboardRoutingModule,
    MatDialogModule,
    NgxEchartsModule,
    SharedModule,
  ]
})
export class DashboardModule { }
