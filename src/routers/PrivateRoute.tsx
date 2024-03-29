import { FC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRootProps {
}

const PrivateRoute: FC<PrivateRootProps> = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  /**
   * If an unauthorised user navigates directly to a private page,
   *  such as when joining a new game via a link given in invitation email,
   * redirect them to the Auth0 Universal Login page. If they successfully log in,
   * Auth0 will redirect them to the private page they originally wanted to access
   */
  if (!isAuthenticated) {
    void loginWithRedirect();
  }

  /**
   * As a fallback option, redirect unauthorised users to LandingPage
   */
  return isAuthenticated ? <Outlet /> : <Navigate to='/' />;
};

export default PrivateRoute;
