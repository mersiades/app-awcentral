import { Box, BoxProps } from 'grommet';
import React from 'react';
import { FC } from 'react';
import styled, { css } from 'styled-components';
import { ThreatMapLocation } from '../@types/enums';
import ThreatMap from '../components/threatMap/ThreatMap';
import { ThreatMapItem } from '../components/threatMap/ThreatMapData';
import UnassignedThreats from '../components/threatMap/UnassignedThreats';
import { useWindowSize } from '../hooks/useWindowSize';

interface ThreatMapPageProps {
  center: ThreatMapItem[];
  closerNorth: ThreatMapItem[];
  fatherNorth: ThreatMapItem[];
  closerUp: ThreatMapItem[];
  fartherUp: ThreatMapItem[];
  closerEast: ThreatMapItem[];
  fartherEast: ThreatMapItem[];
  closerOut: ThreatMapItem[];
  fartherOut: ThreatMapItem[];
  closerSouth: ThreatMapItem[];
  fartherSouth: ThreatMapItem[];
  closerDown: ThreatMapItem[];
  fatherDown: ThreatMapItem[];
  closerWest: ThreatMapItem[];
  fartherWest: ThreatMapItem[];
  closerIn: ThreatMapItem[];
  fartherIn: ThreatMapItem[];
  notAssigned: ThreatMapItem[];
  handleCharacterPositionChange: (
    gameRoleId: string,
    characterId: string,
    newPosition: ThreatMapLocation
  ) => void;
}

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

const ThreatMapPage: FC<ThreatMapPageProps> = ({
  notAssigned,
  handleCharacterPositionChange,
  ...props
}) => {
  const [width, height] = useWindowSize();
  const isLandscape = width > height;
  return (
    <Box
      fill
      background="black"
      direction={isLandscape ? 'row' : 'column'}
      justify="center"
    >
      <UnassignedThreatsContainer fill justify="center" align="center">
        <UnassignedThreats
          notAssigned={notAssigned}
          handleCharacterPositionChange={handleCharacterPositionChange}
        />
      </UnassignedThreatsContainer>
      <ThreatMapContainer background={background} flex="grow">
        <ThreatMap
          {...props}
          handleCharacterPositionChange={handleCharacterPositionChange}
        />
      </ThreatMapContainer>
    </Box>
  );
};

export default ThreatMapPage;
