import React, { FC, useEffect } from 'react';
import { Box, BoxProps } from 'grommet';
import { useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

import ThreatMap from '../components/threatMap/ThreatMap';
import UnassignedThreats from '../components/threatMap/UnassignedThreats';
import { useGame } from '../contexts/gameContext';
import { useKeycloakUser } from '../contexts/keycloakUserContext';
import { useWindowSize } from '../hooks/useWindowSize';

const background = {
  color: 'black',
  dark: true,
  size: 'contain',
  image: 'url(/images/background-image-34.jpg)',
  position: 'center center',
};

const ThreatMapContainer = styled(
  Box as React.FC<BoxProps & JSX.IntrinsicElements['div']>
)(() => {
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

const UnassignedThreatsContainer = styled(
  Box as React.FC<BoxProps & JSX.IntrinsicElements['div']>
)(() => {
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

const ThreatMapPage: FC = () => {
  // ----------------------------- 3rd party hooks ------------------------------- //
  const { gameId } = useParams<{ gameId: string }>();

  // ----------------------------- Hooks ---------------------------------------- //
  const { setGameContext } = useGame();
  const { id: userId } = useKeycloakUser();
  const [width, height] = useWindowSize();

  // ----------------------------- Component functions ------------------------- //
  const isLandscape = width > height;

  // ----------------------------- Effects ---------------------------------------- //
  // Sets the GameContext
  useEffect(() => {
    if (!!gameId && !!userId && !!setGameContext) {
      setGameContext(gameId, userId);
    }
  }, [gameId, userId, setGameContext]);

  // ----------------------------- Render ---------------------------------------- //

  return (
    <Box
      fill
      background="black"
      direction={isLandscape ? 'row' : 'column'}
      justify="center"
    >
      <UnassignedThreatsContainer fill justify="center" align="center">
        <UnassignedThreats />
      </UnassignedThreatsContainer>
      <ThreatMapContainer background={background} flex="grow">
        <ThreatMap />
      </ThreatMapContainer>
    </Box>
  );
};

export default ThreatMapPage;
