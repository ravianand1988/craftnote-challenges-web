import { FormGroup } from '@angular/forms';

import { createFeatureForm } from './feature-form.form-config';

describe('FeatureFormConfig', () => {
  describe('createFeatureForm()', () => {
    let form: FormGroup;

    beforeEach(() => {
      form = createFeatureForm();
    });

    it('should return a form group instance', () => {
      expect(form).toBeInstanceOf(FormGroup);
    });

    it('should have form controls with default values', () => {
      const { featureName, importance, quantity } = form.value;
      expect([featureName, importance, quantity]).toEqual([null, 0, 0]);
    });
  });
});
