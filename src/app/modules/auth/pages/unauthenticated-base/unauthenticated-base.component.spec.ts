import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthenticatedBaseComponent } from './unauthenticated-base.component';

describe('UnauthenticatedBaseComponent', () => {
  let component: UnauthenticatedBaseComponent;
  let fixture: ComponentFixture<UnauthenticatedBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnauthenticatedBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthenticatedBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
