import React from 'react';
import { Box, BoxProps } from 'grommet';
import styled, { css } from 'styled-components';

import { useWindowSize } from '../../hooks/useWindowSize';
import ThreatMapLabels from './ThreatMapLabels';
import ThreatMapDropSegments from './ThreatMapDropSegments';
import { FC } from 'react';
import { ThreatMapItem } from './ThreatMapData';
import ThreatMapItemPill from './ThreatMapItemPill';

export interface WindowWidths {
  readonly windowHeight: number;
  readonly windowWidth: number;
}

interface ThreatMapProps {
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
}

const CenterCircle = styled(
  Box as React.FC<WindowWidths & BoxProps & JSX.IntrinsicElements['div']>
)(({ windowWidth, windowHeight }) => {
  const isLandscape = windowWidth > windowHeight;
  const width = isLandscape ? windowHeight * 0.34 : windowWidth * 0.34;
  const height = isLandscape ? windowHeight * 0.34 : windowWidth * 0.34;
  const left = isLandscape
    ? windowHeight * 0.5 - width / 2
    : windowWidth * 0.5 - width / 2;
  const top = isLandscape
    ? windowHeight * 0.5 - width / 2
    : windowWidth * 0.5 - width / 2;
  return css`
    position: absolute;
    left: ${left}px;
    top: ${top}px;
    z-index: 2;
    width: ${width}px;
    height: ${height}px;
    border-radius: 50%;
    border: 2px solid white;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3), 0 0 10px 1px rgba(0, 0, 0, 0.2),
      0 0 5px 1px rgba(0, 0, 0, 0.3) inset,
      0 0 10px 1px rgba(0, 0, 0, 0.2) inset;
    &:hover {
      background-color: rgba(76, 104, 76, 0.33);
    }
  `;
});

const CenterPillContainer = styled(
  Box as React.FC<WindowWidths & BoxProps & JSX.IntrinsicElements['div']>
)(({ windowWidth, windowHeight }) => {
  const isLandscape = windowWidth > windowHeight;
  const width = windowWidth * 0.2;
  const height = windowHeight * 0.2;
  const left = isLandscape
    ? windowHeight * 0.5 - width / 2
    : windowWidth * 0.5 - width / 2;
  const top = isLandscape
    ? windowHeight * 0.53 - height / 2
    : windowWidth * 0.53 - height / 2;

  return css`
    position: absolute;
    left: ${left}px;
    top: ${top}px;
    width: ${width}px;
    background: transparent;
  `;
});

const ThreatMap: FC<ThreatMapProps> = ({ center }) => {
  // ----------------------------- Hooks ---------------------------------------- //
  const [width, height] = useWindowSize();

  console.log(`center`, center);

  // ----------------------------- Render ---------------------------------------- //
  return (
    <>
      <CenterCircle windowHeight={height} windowWidth={width} />
      <ThreatMapDropSegments />
      <ThreatMapLabels />
      <CenterPillContainer
        direction="row"
        justify="around"
        wrap
        windowHeight={height}
        windowWidth={width}
      >
        {center.map((item) => (
          <ThreatMapItemPill key={item.label} item={item} />
        ))}
      </CenterPillContainer>
    </>
  );
};

export default ThreatMap;
