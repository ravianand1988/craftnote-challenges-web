import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

interface User {
  email: string;
  password: string;
}

enum FormErrorCode {
  Required = 'required',
  Email = 'email',
  Pattern = 'pattern',
}

const PASSWORD_PATTERN = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$';

/**
 * Return a form group containing form controls to login & register.
 */
function createAuthForm(): FormGroup {
  // Demo user: foo@craftnote.de, Password1
  const form = new FormBuilder().group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(PASSWORD_PATTERN)]],
  });

  return form;
}

/**
 * Return custom error message for the email form control if any
 */
function getEmailError(control: FormControl | AbstractControl): string {
  let message = '';

  if (control.hasError(FormErrorCode.Required)) {
    message = 'required';
  } else if (control.hasError(FormErrorCode.Email)) {
    message = 'Must be a valid email';
  }

  return message;
}

/**
 * Return custom error message for the password form control if any
 */
function getPasswordError(control: FormControl | AbstractControl): string {
  let message = '';

  if (control.hasError(FormErrorCode.Required)) {
    message = 'required';
  } else if (control.hasError(FormErrorCode.Pattern)) {
    message = `password must has at least 8 characters and contains uppercase letters,
       lowercase letters and numbers`;
  }

  return message;
}

export {
  createAuthForm,
  FormErrorCode,
  getEmailError,
  getPasswordError,
  User,
};
