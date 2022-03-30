import { RouterTestingModule } from '@angular/router/testing';

import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { AppComponent } from './app.component';


describe('AppComponent', () => {
  let component: AppComponent;
  let spectator: Spectator<AppComponent>;

  const factory = createComponentFactory({
    component: AppComponent,
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

  it('should render a router outlet', () => {
    expect('router-outlet').toExist();
  });

  it(`should have as title 'CRAFTNOTE Challenges'`, () => {
    expect(component.title).toEqual('CRAFTNOTE Challenges');
  });
});
