// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

const noop = () => {};
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });
Object.defineProperty(window, 'Cypress', { value: noop, writable: true });

jest.setTimeout(15000);

jest.mock('@auth0/auth0-react', () => ({
  Auth0Provider: ({ children }: { children: any[] }) => children,
  withAuthenticationRequired: (component: any, _: any) => component,
  useAuth0: () => {
    return {
      isLoading: false,
      user: { sub: 'foobar' },
      isAuthenticated: true,
      loginWithRedirect: jest.fn(),
    };
  },
}));
