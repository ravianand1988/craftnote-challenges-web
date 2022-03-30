import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

function createFeatureForm(): FormGroup {
  const form = new FormBuilder().group({
    featureName: [null, [Validators.required]],
    importance: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
    quantity: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
  });

  return form;
}

function getFeatureControlError(control: FormControl | AbstractControl): string {
  let error;

  if (control.hasError('required')) {
    error = 'required';
  } else if (control.hasError('min')) {
    error = `Min value must greater than or equal to ${control.errors.min.min}`;
  } else if (control.hasError('max')) {
    error = `Max value must be less than or equal to ${control.errors.max.max}`;
  }

  return error;
}

export {
  createFeatureForm,
  getFeatureControlError,
};
