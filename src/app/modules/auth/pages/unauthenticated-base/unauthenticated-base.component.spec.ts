import { RouterTestingModule } from '@angular/router/testing';

import { createComponentFactory, Spectator } from '@ngneat/spectator';

import {
  UnauthenticatedBaseComponent,
} from './unauthenticated-base.component';

describe('UnauthenticatedBaseComponent', () => {
  let component: UnauthenticatedBaseComponent;
  let spectator: Spectator<UnauthenticatedBaseComponent>;

  const factory = createComponentFactory({
    component: UnauthenticatedBaseComponent,
    imports: [
      RouterTestingModule,
    ]
  });

  beforeEach(() => {
    spectator = factory();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a router outlet', () => {
    expect('router-outlet').toExist();
  });
});
