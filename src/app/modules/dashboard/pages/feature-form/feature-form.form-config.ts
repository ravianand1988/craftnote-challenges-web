import { FormBuilder, FormGroup, Validators } from '@angular/forms';

function createFeatureForm(): FormGroup {
  const form = new FormBuilder().group({
    featureName: [null, [Validators.required]],
    importance: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
    quantity: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
  });

  return form;
}

export {
  createFeatureForm,
}
