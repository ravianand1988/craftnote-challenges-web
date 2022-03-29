import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import {
  createFeatureForm,
  getFeatureControlError,
} from './feature-form.form-config';


@Component({
  selector: 'app-feature-form',
  templateUrl: './feature-form.component.html',
  styleUrls: ['./feature-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureFormComponent {
  public form = createFeatureForm();
  public getFormError = getFeatureControlError;

  constructor(
    public dialogRef: MatDialogRef<FeatureFormComponent>,
  ) { }

  public submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.dialogRef.close(this.form.value);
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
