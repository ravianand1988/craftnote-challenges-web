import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface user {
  email: string;
  password: string;
}

enum FormErrorCode {
  Required = 'required',
  Email = 'email',
  Pattern = 'pattern',
}

const PASSWORD_PATTERN = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$';

function createAuthForm(): FormGroup {
  const form = new FormBuilder().group({
    // email: [null, [Validators.required, Validators.email]],
    // password: [null, [Validators.required, Validators.pattern(PASSWORD_PATTERN)]],
    email: ['foo@bar.com', [Validators.required, Validators.email]],
    password: ['Password1', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]],
  });

  return form;
}

export {
  createAuthForm,
  FormErrorCode,
  user,
};
