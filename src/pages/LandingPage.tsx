import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';
import { Box } from 'grommet';

import LandingPageLayout from '../components/LandingPageLayout';
import { ButtonWS } from '../config/grommetConfig';

const LandingPage = () => {
  // ----------------------------- 3rd party hooks ------------------------------- //
  const { isLoading } = useAuth0();
  const history = useHistory();

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
            onClick={() => history.push('/login')}
          />
        </Box>
      )}
    </LandingPageLayout>
  );
};

export default LandingPage;
