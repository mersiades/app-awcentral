import { Box, BoxProps } from 'grommet';
import React from 'react';
import styled, { css } from 'styled-components';
import ThreatMap from '../components/threatMap/ThreatMap';
import { useWindowSize } from '../hooks/useWindowSize';

const background = {
  color: 'black',
  dark: true,
  size: 'contain',
  image: 'url(/images/background-image-34.jpg)',
  position: 'center center',
};

const ThreatMapContainer = styled(Box as React.FC<BoxProps & JSX.IntrinsicElements['div']>)(() => {
  return css`
    position: relative;
    @media screen and (orientation: landscape) {
      height: 100vh;
      width: 100vh;
    }
    @media screen and (orientation: portrait) {
      height: 100vw;
      width: 100vw;
    }
  `;
});

const ThreatFormContainer = styled(Box as React.FC<BoxProps & JSX.IntrinsicElements['div']>)(() => {
  return css`
    @media screen and (orientation: landscape) {
      height: 100vh;
      min-width: 300px;
    }
    @media screen and (orientation: portrait) {
      width: 100vw;
      min-height: 200px;
    }
  `;
});

const ThreatMapPage = () => {
  const [width, height] = useWindowSize();
  const isLandscape = width > height;
  return (
    <Box fill background="black" direction={isLandscape ? 'row' : 'column'} justify="center">
      <ThreatFormContainer border fill justify="center" align="center">
        New threat form
      </ThreatFormContainer>
      <ThreatMapContainer border background={background} flex="grow">
        <ThreatMap />
      </ThreatMapContainer>
    </Box>
  );
};

export default ThreatMapPage;
