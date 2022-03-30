import { fakeAsync, tick } from '@angular/core/testing';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';

import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockDeclarations } from 'ng-mocks';
import { Mock, mockProviders } from 'src/testing';

import { AuthenticatedBaseComponent } from './authenticated-base.component';

describe('AuthenticatedBaseComponent', () => {
  let component: AuthenticatedBaseComponent;
  let spectator: Spectator<AuthenticatedBaseComponent>;
  let mockFireAuth: Mock;
  let mockRouter: Mock;

  const factory = createComponentFactory({
    component: AuthenticatedBaseComponent,
    declarations: [
      MockDeclarations(
        MatIcon,
        MatToolbar,
        RouterOutlet,
      ),
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displays toolbar details correctly', () => {
    expect('mat-toolbar').toExist();
    expect('mat-toolbar > span').toHaveText('CRAFTNOTE Challenges');
    expect('.button-logout').toExist();
  });

  it('displays logged in user email correctly if exists', () => {
    expect('.user-email').not.toExist();

    mockFireAuth.getSubject('user').next({ email: 'foo@bar.com' });
    spectator.detectComponentChanges();

    expect('.user-email').toExist();
  });

  it('displays content wrapper containing router outlet correctly', () => {
    expect('.content-wrapper').toExist();
    expect('.content-wrapper > router-outlet').toExist();
  });

  it('calls logout() when clicking on logout button', () => {
    const logoutSpy = spyOn(component, 'logout');
    spectator.click('.button-logout');

    expect(logoutSpy).toHaveBeenCalled();
  });

  describe('logout()', () => {
    it('redirects to login if fireAuth signOut() resolves', fakeAsync(() => {
      (mockFireAuth.signOut as jasmine.Spy).and.resolveTo({});
      component.logout();
      tick();

      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/login');
    }));
  });
});
