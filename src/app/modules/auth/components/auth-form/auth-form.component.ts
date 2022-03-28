import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormErrorCode } from '../../auth.form-config';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormComponent {
  @Input() form: FormGroup;
  @Input() submitted: boolean;

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
