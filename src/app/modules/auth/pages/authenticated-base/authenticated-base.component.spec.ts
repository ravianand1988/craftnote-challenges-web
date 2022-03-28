import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatedBaseComponent } from './authenticated-base.component';

describe('AuthenticatedBaseComponent', () => {
  let component: AuthenticatedBaseComponent;
  let fixture: ComponentFixture<AuthenticatedBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticatedBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticatedBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
