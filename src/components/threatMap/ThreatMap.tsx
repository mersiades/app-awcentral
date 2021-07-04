import React from 'react';
import { Box, BoxProps } from 'grommet';
import styled, { css } from 'styled-components';

import { useWindowSize } from '../../hooks/useWindowSize';
import ThreatMapLabels from './ThreatMapLabels';
import ThreatMapDropSegments from './ThreatMapDropSegments';

export interface WindowWidths {
  readonly windowHeight: number;
  readonly windowWidth: number;
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

const ThreatMap = () => {
  // ----------------------------- Hooks ---------------------------------------- //
  const [width, height] = useWindowSize();

  // ----------------------------- Render ---------------------------------------- //
  return (
    <>
      <CenterCircle
        windowHeight={height}
        windowWidth={width}
        align="center"
        justify="center"
      />

      <ThreatMapDropSegments />
      <ThreatMapLabels />
    </>
  );
};

export default ThreatMap;
