import React, { FC } from 'react';
import { Box, Grid, Image, Spinner } from 'grommet';

import { background, HeadingWS } from '../config/grommetConfig';

interface LandingPageLayoutProps {
  children: JSX.Element | JSX.Element[];
  welcomeMessage?: string;
  isLoading?: boolean;
}

// Provides a common layout for LandingPage, MenuPage
const LandingPageLayout: FC<LandingPageLayoutProps> = ({ children, welcomeMessage, isLoading }) => {
  return (
    <Box data-testid="landing-page-layout" fill background={background}>
      {isLoading && (
        <div style={{ position: 'absolute', top: 'calc(50vh - 12px)', left: 'calc(50vw - 12px)' }}>
          <Spinner />
        </div>
      )}
      <Grid
        rows={['49%', '49%', '2%']}
        columns={['18%', 'auto', '18%']}
        gap={{ column: 'xsmall', row: 'none' }}
        fill
        responsive
        areas={[
          { name: 'leftMargin', start: [0, 0], end: [0, 2] },
          { name: 'centerTop', start: [1, 0], end: [1, 0] },
          { name: 'centerBottom', start: [1, 1], end: [1, 1] },
          { name: 'centerFooter', start: [1, 2], end: [1, 2] },
          { name: 'rightMargin', start: [2, 0], end: [2, 2] },
        ]}
      >
        <Box gridArea="leftMargin" />
        <Box gridArea="centerTop">{!!welcomeMessage && <HeadingWS level="4">{welcomeMessage}</HeadingWS>}</Box>
        <Box gridArea="centerBottom">
          <Grid
            rows={['full']}
            columns={[
              ['250px', '450px'],
              ['5%', 'auto'],
              ['250px', '450px'],
            ]}
            fill
            justifyContent="between"
            areas={[
              { name: 'buttonsContainer', start: [0, 0], end: [0, 0] },
              { name: 'spacer', start: [1, 0], end: [1, 0] },
              { name: 'titleContainer', start: [2, 0], end: [2, 0] },
            ]}
          >
            <Box gridArea="buttonsContainer" alignSelf="end">
              {children}
            </Box>
            <Box gridArea="spacer" alignSelf="end" />
            <Box gridArea="titleContainer" alignSelf="end">
              <Box>
                <Image
                  fit="contain"
                  fill={true}
                  src="images/cover-title.png"
                  alt="D. Vincent Baker & Meguey Baker Apocalypse World"
                />
              </Box>
            </Box>
          </Grid>
        </Box>
        <Box gridArea="rightMargin" />
      </Grid>
    </Box>
  );
};

export default LandingPageLayout;
