import { FC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Route, Redirect } from 'react-router-dom';

interface PrivateRootProps {
  component: any;
  path: string;
  exact?: boolean;
}

const PrivateRoute: FC<PrivateRootProps> = ({
  component: Component,
  ...rest
}) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  /**
   * If an unauthorised user navigates directly to a private page,
   *  such as when joining a new game via a link given in invitation email,
   * redirect them to the Auth0 Universal Login page. If they successfully login,
   * Auth0 will redirect them to the private page they originally wanted to access
   */
  if (!isAuthenticated) {
    loginWithRedirect();
  }

  /**
   * As a fallback option, redirect unauthorised users to LandingPage
   */
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
