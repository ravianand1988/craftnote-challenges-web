import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

const ANGULAR_SHARED_MODULES = [
  CommonModule,
  ReactiveFormsModule,
];

const MATERIAL_SHARED_MODULES = [
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatIconModule,
];


@NgModule({
  declarations: [],
  imports: [
    ...ANGULAR_SHARED_MODULES,
    ...MATERIAL_SHARED_MODULES,
  ],
  exports: [
    ...ANGULAR_SHARED_MODULES,
    ...MATERIAL_SHARED_MODULES,
  ],
})
export class SharedModule { }
