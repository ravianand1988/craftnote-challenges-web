import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { cold } from 'jasmine-marbles';
import { Mock, mockProviders } from 'src/testing';

import { AuthGuardService } from './auth-guard.service';
import { user } from './auth.form-config';
import { AuthenticatedBaseComponent, LoginComponent } from './pages';


describe('AuthGuardService', () => {
  let spectator: SpectatorService<AuthGuardService>;
  let service: AuthGuardService;
  let mockFireAuth: Mock;
  let mockRouter: Mock;

  const mockUser: Partial<user> = {
    email: 'user@mail.com',
  };

  const factory = createServiceFactory({
    service: AuthGuardService,
    providers: [
      mockProviders.AngularFireAuth,
      mockProviders.Router,
    ],
  });

  beforeEach(() => {
    spectator = factory();
    service = spectator.service;
    mockFireAuth = spectator.inject(mockProviders.AngularFireAuth.provide);
    mockRouter = spectator.inject(mockProviders.Router.provide);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('canActivateChild()', () => {
    let snapshot: any;

    it('redirects to login from any auth route if user is not authenticated', () => {
      snapshot = { component: AuthenticatedBaseComponent };
      mockFireAuth.getSubject('user').next(null);

      expect(service.canActivateChild(snapshot)).toBeObservable(cold('(a|)', { a: true }));
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/login');
    });

    it('does not redirect to login from requested auth route if auth user exists', () => {
      snapshot = { component: AuthenticatedBaseComponent };
      mockFireAuth.getSubject('user').next(mockUser);

      expect(service.canActivateChild(snapshot)).toBeObservable(cold('(a|)', { a: true }));
      expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
    });

    it('redirects to auth base route if login requested and auth user exists', () => {
      snapshot = { component: LoginComponent };
      mockFireAuth.getSubject('user').next(mockUser);

      expect(service.canActivateChild(snapshot)).toBeObservable(cold('(a|)', { a: true }));
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/');
    });

    it('does not redirect if login requested and auth user does not exist', () => {
      snapshot = { component: LoginComponent };
      mockFireAuth.getSubject('user').next(null);

      expect(service.canActivateChild(snapshot)).toBeObservable(cold('(a|)', { a: true }));
      expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
    });
  });
});
