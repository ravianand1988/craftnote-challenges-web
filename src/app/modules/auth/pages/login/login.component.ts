import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';

import {
  createAuthForm,
  getEmailError,
  getPasswordError,
} from '../../auth.form-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  /** A Subject to publish login error message from Angular fire auth signIn */
  private loginError = new Subject<string>();
  public loginError$: Observable<string> = this.loginError.asObservable();

  public form = createAuthForm();
  public getEmailError = getEmailError;
  public getPasswordError = getPasswordError;

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
        this.loginError.next(error.message);
        console.warn('error on user login: ', error);
      });
  }
}
