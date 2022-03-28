import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Feature } from '../features/features.component';
import { createFeatureForm } from './feature-form.form-config';

interface FeatureDialogData {
  feature: Partial<Feature>;
}

@Component({
  selector: 'app-feature-form',
  templateUrl: './feature-form.component.html',
  styleUrls: ['./feature-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureFormComponent {
  public form = createFeatureForm();

  constructor(
    public dialogRef: MatDialogRef<FeatureFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FeatureDialogData,
  ) { }

  public cancel(): void {
    this.dialogRef.close();
  }
}
