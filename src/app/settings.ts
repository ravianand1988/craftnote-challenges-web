import { LoginComponent, RegisterComponent } from './modules/auth/pages';

const APP_SETTINGS = {
  DEFAULT_AUTH_ROUTE: '/',
  DEFAULT_ROUTE: '/login',
  NO_AUTH_ROUTES: [LoginComponent, RegisterComponent],
}

export {
  APP_SETTINGS,
};
