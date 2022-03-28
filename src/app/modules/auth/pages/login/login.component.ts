import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';

import { createAuthForm, FormErrorCode } from '../../auth.form-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private _loginError = new Subject<string>();
  public loginError$: Observable<string> = this._loginError.asObservable();

  public form = createAuthForm();

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
  ) { }

  public submit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.value;

    this.fireAuth.signInWithEmailAndPassword(email, password)
      .then(() => this.router.navigateByUrl('/dashboard'))
      .catch((error) => {
        this._loginError.next(error.message);
        console.warn('error on user login: ', error);
      });
  }

  public getEmailError(): string {
    let message = '';
    const { email } = this.form.controls;

    if (email.hasError(FormErrorCode.Required)) {
      message = 'required';
    } else if (email.hasError(FormErrorCode.Email)) {
      message = 'Must be a valid email';
    }

    return message;
  }

  public getPasswordError(): string {
    let message = '';
    const { password } = this.form.controls;

    if (password.hasError(FormErrorCode.Required)) {
      message = 'required';
    } else if (password.hasError(FormErrorCode.Pattern)) {
      message = `password must has at least 8 characters and contains uppercase letters,
       lowercase letters and numbers`;
    }

    return message;
  }
}
