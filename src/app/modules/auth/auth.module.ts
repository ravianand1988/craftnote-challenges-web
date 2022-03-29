import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

import { SharedModule } from '../shared/shared.module';
import { AuthGuardService } from './auth-guard.service';
import { AuthRoutingModule } from './auth-routing.module';
import {
  AuthenticatedBaseComponent,
  LoginComponent,
  RegisterComponent,
  UnauthenticatedBaseComponent,
} from './pages';


@NgModule({
  declarations: [
    AuthenticatedBaseComponent,
    LoginComponent,
    RegisterComponent,
    UnauthenticatedBaseComponent,
  ],
  imports: [
    AuthRoutingModule,
    MatToolbarModule,
    SharedModule,
  ],
  providers: [
    AuthGuardService,
  ],
})
export class AuthModule { }
