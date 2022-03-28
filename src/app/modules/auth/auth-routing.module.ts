import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './auth-guard.service';
import {
  AuthenticatedBaseComponent,
  LoginComponent,
  RegisterComponent,
  UnauthenticatedBaseComponent,
} from './pages';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: '',
        component: UnauthenticatedBaseComponent,
        children: [
          {
            path: 'login',
            component: LoginComponent,
          },
          {
            path: 'register',
            component: RegisterComponent,
          }
        ],
      },
      {
        path: '',
        component: AuthenticatedBaseComponent,
        children: [
          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full',
          },
          {
            path: 'dashboard',
            loadChildren: () => import('../dashboard/dashboard.module')
              .then(module => module.DashboardModule),
          },
        ],
      },
      {
        path: '**',
        redirectTo: 'login',
      }
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
