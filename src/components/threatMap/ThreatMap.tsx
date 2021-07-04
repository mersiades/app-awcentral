import React from 'react';
import { Box, BoxProps } from 'grommet';
import styled, { css } from 'styled-components';

import { useWindowSize } from '../../hooks/useWindowSize';

interface WindowWidths {
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

const CloserCircle = styled(
  Box as React.FC<WindowWidths & BoxProps & JSX.IntrinsicElements['div']>
)(({ windowWidth, windowHeight }) => {
  const isLandscape = windowWidth > windowHeight;
  const width = isLandscape ? windowHeight * 0.67 : windowWidth * 0.67;
  const height = isLandscape ? windowHeight * 0.67 : windowWidth * 0.67;
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
    width: ${width}px;
    height: ${height}px;
    border: 3px solid white;
    background: transparent;
    border-radius: 50%;
    overflow: hidden;
  `;
});

const getCloserSegment = (
  rotation: number,
  skew: number,
  polygonPoints: string
) =>
  styled(Box as React.FC<BoxProps & JSX.IntrinsicElements['div']>)(() => {
    return css`
      position: absolute;
      left: 50%;
      bottom: 50%;
      width: 100%;
      height: 100%;
      border-left: 3px solid white;
      background: transparent;
      border-radius: 0 100% 0 0;
      transform-origin: bottom left;
      transform: rotate(${rotation}deg) skewX(${skew}deg);
      clip-path: polygon(${polygonPoints});
      box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3),
        0 0 10px 1px rgba(0, 0, 0, 0.2), 0 0 5px 1px rgba(0, 0, 0, 0.3) inset,
        0 0 10px 1px rgba(0, 0, 0, 0.2) inset;
      &:hover {
        background-color: rgba(76, 104, 76, 0.33);
      }
    `;
  });

const CloserNorthSegment = getCloserSegment(
  -60,
  -30,
  '0% 78%,-7% 50% ,34% 73% ,51% 100%,25.5% 100%,23% 96%,18% 90%,6% 81%'
);
const CloserUpSegment = getCloserSegment(
  -30,
  -60,
  '0% 87.25%,0% 74%,52% 100%,25.5% 100%,18% 96%,6% 90%'
);
const CloserEastSegment = getCloserSegment(
  30,
  -30,
  '0% 78%,-7% 50% ,34% 73% ,51% 100%,25.5% 100%,23% 96%,18% 90%,6% 81%'
);
const CloserOutSegment = getCloserSegment(
  60,
  -60,
  '0% 87.25%,0% 74%,52% 100%,25.5% 100%,18% 96%,6% 90%'
);
const CloserSouthSegment = getCloserSegment(
  120,
  -30,
  '0% 78%,-7% 50% ,34% 73% ,51% 100%,25.5% 100%,23% 96%,18% 90%,6% 81%'
);
const CloserDownSegment = getCloserSegment(
  150,
  -60,
  '0% 87.25%,0% 74%,52% 100%,25.5% 100%,18% 96%,6% 90%'
);
const CloserWestSegment = getCloserSegment(
  210,
  -30,
  '0% 78%,-7% 50% ,34% 73% ,51% 100%,25.5% 100%,23% 96%,18% 90%,6% 81%'
);
const CloserInSegment = getCloserSegment(
  240,
  -60,
  '0% 87.25%,0% 74%,52% 100%,25.5% 100%,18% 96%,6% 90%'
);

const getFartherSegment = (
  rotation: number,
  skew: number,
  polygonPoints: string
) =>
  styled(Box as React.FC<BoxProps & JSX.IntrinsicElements['div']>)(() => {
    return css`
      position: absolute;
      left: 50%;
      bottom: 50%;
      width: 100%;
      height: 100%;
      border-left: 3px solid white;
      background: transparent;
      border-radius: 0 100% 0 0;
      transform-origin: bottom left;
      transform: rotate(${rotation}deg) skewX(${skew}deg);
      clip-path: polygon(${polygonPoints});
      box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3),
        0 0 10px 1px rgba(0, 0, 0, 0.2), 0 0 5px 1px rgba(0, 0, 0, 0.3) inset,
        0 0 10px 1px rgba(0, 0, 0, 0.2) inset;
      &:hover {
        background-color: rgba(76, 104, 76, 0.33);
      }
    `;
  });

const FartherNorthSegment = getFartherSegment(
  -60,
  -30,
  '0% 71%,0% 50%,58% 100%,33.5% 100%,31% 96%,28% 92%,24% 88%,19% 83%,14% 79%,9% 76%,4% 73%'
);
const FartherUpSegment = getFartherSegment(
  -30,
  -60,
  '0% 83.25%,0% 71%,38% 82%, 58% 100%,33.5% 100%,26% 96%,15% 90%'
);
const FartherEastSegment = getFartherSegment(
  30,
  -30,
  '0% 71%,0% 50%,58% 100%,33.5% 100%,31% 96%,28% 92%,24% 88%,19% 83%,14% 79%,9% 76%,4% 73%'
);
const FartherOutSegment = getFartherSegment(
  60,
  -60,
  '0% 83.25%,0% 71%,38% 82%, 58% 100%,33.5% 100%,26% 96%,15% 90%'
);
const FartherSouthSegment = getFartherSegment(
  120,
  -30,
  '0% 71%,0% 50%,58% 100%,33.5% 100%,31% 96%,28% 92%,24% 88%,19% 83%,14% 79%,9% 76%,4% 73%'
);
const FartherDownSegment = getFartherSegment(
  150,
  -60,
  '0% 83.25%,0% 71%,38% 82%, 58% 100%,33.5% 100%,26% 96%,15% 90%'
);
const FartherWestSegment = getFartherSegment(
  210,
  -30,
  '0% 71%,0% 50%,58% 100%,33.5% 100%,31% 96%,28% 92%,24% 88%,19% 83%,14% 79%,9% 76%,4% 73%'
);
const FartherInSegment = getFartherSegment(
  240,
  -60,
  '0% 83.25%,0% 71%,38% 82%, 58% 100%,33.5% 100%,26% 96%,15% 90%'
);

const ThreatMap = () => {
  const [width, height] = useWindowSize();
  return (
    <>
      <CenterCircle
        windowHeight={height}
        windowWidth={width}
        align="center"
        justify="center"
      >
        Center circle
      </CenterCircle>
      <CloserCircle windowHeight={height} windowWidth={width}>
        <CloserNorthSegment
          align="center"
          justify="center"
        ></CloserNorthSegment>
        <CloserUpSegment align="center" justify="center"></CloserUpSegment>
        <CloserEastSegment align="center" justify="center"></CloserEastSegment>
        <CloserOutSegment align="center" justify="center"></CloserOutSegment>
        <CloserSouthSegment
          align="center"
          justify="center"
        ></CloserSouthSegment>
        <CloserDownSegment align="center" justify="center"></CloserDownSegment>
        <CloserWestSegment align="center" justify="center"></CloserWestSegment>
        <CloserInSegment align="center" justify="center"></CloserInSegment>
      </CloserCircle>
      <FartherNorthSegment />
      <FartherUpSegment />
      <FartherEastSegment />
      <FartherOutSegment />
      <FartherSouthSegment />
      <FartherDownSegment />
      <FartherWestSegment />
      <FartherInSegment />
    </>
  );
};

export default ThreatMap;
