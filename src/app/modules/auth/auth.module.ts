import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AuthGuardService } from './auth-guard.service';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthFormComponent } from './components';
import {
  AuthenticatedBaseComponent,
  LoginComponent,
  RegisterComponent,
  UnauthenticatedBaseComponent,
} from './pages';


@NgModule({
  declarations: [
    AuthenticatedBaseComponent,
    AuthFormComponent,
    LoginComponent,
    RegisterComponent,
    UnauthenticatedBaseComponent,
  ],
  imports: [
    AuthRoutingModule,
    SharedModule,
  ],
  providers: [
    AuthGuardService,
  ],
})
export class AuthModule { }
