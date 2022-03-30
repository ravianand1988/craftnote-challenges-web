import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  MatError,
  MatFormField,
  MatLabel,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';

import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockDeclarations } from 'ng-mocks';
import { Mock, mockProviders } from 'src/testing';
import { MOCK_FEATURE_1 } from 'src/testing/mock-data';

import { FeatureFormComponent } from './feature-form.component';

describe('FeatureFormComponent', () => {
  let spectator: Spectator<FeatureFormComponent>;
  let component: FeatureFormComponent;
  let mockDialogRef: Mock;

  const factory = createComponentFactory<FeatureFormComponent>({
    component: FeatureFormComponent,
    declarations: [
      MockDeclarations(
        MatIcon,
        MatError,
        MatFormField,
        MatLabel,
      ),
    ],
    imports: [
      ReactiveFormsModule,
    ],
    providers: [
      mockProviders.MatDialogRef,
    ],
  });

  beforeEach(() => {
    spectator = factory();
    component = spectator.component;
    mockDialogRef = spectator.inject(mockProviders.MatDialogRef.provide);
  });

  it('creates', () => {
    expect(spectator).toBeTruthy();
  });

  it('displays feature form correctly', () => {
    expect('[formControlName="featureName"]').toExist();
    expect('[formControlName="importance"]').toExist();
    expect('[formControlName="quantity"]').toExist();
    expect('.button-cancel').toExist();
    expect('.button-create-feature').toExist();
  });

  it('calls submit() when clicking on create feature button', () => {
    const submitSpy = spyOn(component, 'submit');
    spectator.click('.button-create-feature');

    expect(submitSpy).toHaveBeenCalled();
  });

  describe('submit()', () => {
    let form: FormGroup;

    beforeEach(() => {
      form = component.form;
    });

    it('marks all form controls as touched if form is invalid', () => {
      expect(form.touched).toBeFalse();

      component.submit();
      expect(form.invalid).toBeTrue();
      expect(form.touched).toBeTrue();
      expect(mockDialogRef.close).not.toHaveBeenCalled();
    });

    it('calls dialogRef close with form value if valid form', () => {
      form.patchValue(MOCK_FEATURE_1);
      expect(form.valid).toBeTrue();

      component.submit();
      expect(mockDialogRef.close).toHaveBeenCalledWith(MOCK_FEATURE_1);
    });
  });
});
