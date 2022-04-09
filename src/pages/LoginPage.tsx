import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import LandingPageLayout from '../components/LandingPageLayout';

const LoginPage = () => {
  // --------------------------------------- Hooking into contexts ---------------------------------------------- //
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  // ----------------------------------------- Render component  ------------------------------------------------ //
  if (!isLoading && !isAuthenticated) {
    loginWithRedirect();
  }

  return (
    <LandingPageLayout isLoading={isLoading}>
      <div />
    </LandingPageLayout>
  );
};

export default LoginPage;
