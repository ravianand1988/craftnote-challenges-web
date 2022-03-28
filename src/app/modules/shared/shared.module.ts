import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

const ANGULAR_SHARED_MODULES = [
  CommonModule,
];

const MATERIAL_SHARED_MODULES = [
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
