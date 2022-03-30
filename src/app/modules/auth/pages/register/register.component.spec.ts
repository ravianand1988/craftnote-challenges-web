import { fakeAsync, tick } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import {
  MatError,
  MatFormField,
  MatLabel,
} from '@angular/material/form-field';
import { RouterLink } from '@angular/router';

import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockDeclarations } from 'ng-mocks';
import { Mock, mockProviders } from 'src/testing';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let spectator: Spectator<RegisterComponent>;
  let component: RegisterComponent;
  let mockFireAuth: Mock;
  let mockRouter: Mock;

  const factory = createComponentFactory<RegisterComponent>({
    component: RegisterComponent,
    declarations: [
      MockDeclarations(
        MatCard,
        MatCardContent,
        MatCardTitle,
        MatError,
        MatFormField,
        MatLabel,
        RouterLink,
      ),
    ],
    imports: [
      ReactiveFormsModule,
    ],
    providers: [
      mockProviders.AngularFireAuth,
      mockProviders.Router,
    ],
  });

  beforeEach(() => {
    spectator = factory();
    component = spectator.component;
    mockFireAuth = spectator.inject(mockProviders.AngularFireAuth.provide);
    mockRouter = spectator.inject(mockProviders.Router.provide);
  });

  it('creates', () => {
    expect(spectator).toBeTruthy();
  });

  it('displays register form correctly', () => {
    expect('[formControlName="email"]').toExist();
    expect('[formControlName="password"]').toExist();
    expect('.button-link-login').toExist();
    expect('.button-register').toExist();
  });

  it('displays email control errors if exists', () => {
    expect('error-email').not.toExist();

    spectator.typeInElement('', '[formControlName="email"]');
    expect('.error-email').toHaveText('required');

    spectator.typeInElement('foo', '[formControlName="email"]');
    expect('.error-email').toHaveText('Must be a valid email');
  });

  it('displays password control errors if exists', () => {
    expect('error-password').not.toExist();

    spectator.typeInElement('', '[formControlName="password"]');
    expect('.error-password').toHaveText('required');

    spectator.typeInElement('foo', '[formControlName="password"]');
    expect('.error-password').toHaveText(
      `password must has at least 8 characters and contains uppercase letters,
       lowercase letters and numbers`
    );
  });

  it('calls submit() when clicking on register button', () => {
    const submitSpy = spyOn(component, 'submit');
    spectator.click('.button-register');

    expect(submitSpy).toHaveBeenCalled();
  });

  describe('submit()', () => {
    let form: FormGroup;

    beforeEach(() => {
      form = component.form;
    });

    it('marks all form controls as touched if register form is invalid', () => {
      expect(form.touched).toBeFalse();

      component.submit();
      expect(form.invalid).toBeTrue();
      expect(form.touched).toBeTrue();
      expect(mockFireAuth.createUserWithEmailAndPassword).not.toHaveBeenCalled();
    });

    it('calls create user from fire auth with form value if valid form', () => {
      form.patchValue({ email: 'user@mail.com', password: 'Password1' });
      expect(form.valid).toBeTrue();

      component.submit();
      expect(mockFireAuth.createUserWithEmailAndPassword).toHaveBeenCalledWith(
        'user@mail.com',
        'Password1',
      );
    });

    it('redirects user to dashboard if user is created', fakeAsync(() => {
      form.patchValue({ email: 'user@mail.com', password: 'Password1' });
      (mockFireAuth.createUserWithEmailAndPassword as jasmine.Spy).and.resolveTo({});
      component.submit();
      tick();

      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/dashboard');
    }));

    it('does not redirect user to dashboard if user is not created', fakeAsync(() => {
      form.patchValue({ email: 'user@mail.com', password: 'Password1' });
      (mockFireAuth.createUserWithEmailAndPassword as jasmine.Spy).and.rejectWith({
        message: 'Error creating user.',
      })
      component.submit();
      tick();

      expect(mockRouter.navigateByUrl).not.toHaveBeenCalledWith();

      // Detecting component changes shows register error on the form
      spectator.detectComponentChanges();
      expect('.register-error').toHaveText('Error creating user.');
    }));
  });
});
