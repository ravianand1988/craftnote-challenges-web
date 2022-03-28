import { LoginComponent, RegisterComponent } from './modules/auth/pages';

const APP_SETTINGS = {
  DEFAULT_AUTH_ROUTE: '/',
  DEFAULT_ROUTE: '/register',
  NO_AUTH_ROUTES: [LoginComponent, RegisterComponent],
}

export {
  APP_SETTINGS,
};
