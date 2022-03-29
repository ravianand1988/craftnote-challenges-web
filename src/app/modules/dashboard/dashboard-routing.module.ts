import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeaturesComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'features',
    pathMatch: 'full',
  },
  {
    path: 'features',
    component: FeaturesComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
