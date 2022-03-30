import { FormGroup } from '@angular/forms';

import { createAuthForm } from './auth.form-config';

describe('AuthFormConfig', () => {
  describe('createAuthForm()', () => {
    let form: FormGroup;

    beforeEach(() => {
      form = createAuthForm();
    });

    it('should return a form group instance', () => {
      expect(form).toBeInstanceOf(FormGroup);
    });

    it('should have form controls with default values', () => {
      const { email, password } = form.value;
      expect([email, password]).toEqual([null, null]);
    });
  });
});
