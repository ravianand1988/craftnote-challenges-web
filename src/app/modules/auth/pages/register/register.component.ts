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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private registerError = new Subject<string>();
  public registerError$: Observable<string> = this.registerError.asObservable();

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

    this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then(() => this.router.navigateByUrl('/dashboard'))
      .catch((error) => {
        this.registerError.next(error.message);
        console.warn('error on user create: ', error);
      });
  }
}
