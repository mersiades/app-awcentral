import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Box } from 'grommet';

import LandingPageLayout from '../components/LandingPageLayout';
import { ButtonWS } from '../config/grommetConfig';

const LandingPage = () => {
  // ----------------------------- 3rd party hooks ------------------------------- //
  const { isAuthenticated, isLoading, loginWithRedirect  } = useAuth0();

  // ----------------------------- Render ---------------------------------------- //
  return (
    <LandingPageLayout isLoading={isLoading}>
      {isLoading ? (
        <div />
      ) : (
        <Box animation={{ type: 'slideUp', size: 'large', duration: 750 }}>
          <ButtonWS
            label="LOG IN"
            size="large"
            alignSelf="center"
            fill
            onClick={() => !isAuthenticated && loginWithRedirect()}
          />
        </Box>
      )}
    </LandingPageLayout>
  );
};

export default LandingPage;
