import { Box, BoxProps } from 'grommet';
import React from 'react';
import styled, { css } from 'styled-components';
import { HeadingWS, TextWS } from '../../config/grommetConfig';
import { useFonts } from '../../contexts/fontContext';
import { useWindowSize } from '../../hooks/useWindowSize';
import { WindowWidths } from './ThreatMap';

const getOuterLabel = (rotation: number, topRatio: number, leftRatio: number) =>
  styled(
    Box as React.FC<WindowWidths & BoxProps & JSX.IntrinsicElements['div']>
  )(({ windowWidth, windowHeight }) => {
    const isLandscape = windowWidth > windowHeight;
    const width = 75;
    const height = 30;
    const left = isLandscape
      ? windowHeight * leftRatio - width / 2
      : windowWidth * leftRatio - width / 2;
    const top = isLandscape
      ? windowHeight * topRatio - height / 2
      : windowWidth * topRatio - height / 2;

    return css`
      position: absolute;
      left: ${left}px;
      top: ${top}px;
      width: ${width}px;
      background: transparent;
      transform: rotate(${rotation}deg);
    `;
  });

const CenterLabelContainer = styled(
  Box as React.FC<WindowWidths & BoxProps & JSX.IntrinsicElements['div']>
)(({ windowWidth, windowHeight }) => {
  const isLandscape = windowWidth > windowHeight;
  const width = 150;
  const height = 30;
  const left = isLandscape
    ? windowHeight * 0.5 - width / 2
    : windowWidth * 0.5 - width / 2;
  const top = isLandscape
    ? windowHeight * 0.375 - height / 2
    : windowWidth * 0.375 - height / 2;

  return css`
    position: absolute;
    left: ${left}px;
    top: ${top}px;
    width: ${width}px;
    background: transparent;
  `;
});

const DistanceLabelContainer = styled(
  Box as React.FC<WindowWidths & BoxProps & JSX.IntrinsicElements['div']>
)(({ windowWidth, windowHeight }) => {
  const isLandscape = windowWidth > windowHeight;
  const width = 100;
  const height = 30;
  const left = isLandscape
    ? windowHeight * 0.675 - width / 2
    : windowWidth * 0.675 - width / 2;
  const top = isLandscape
    ? windowHeight * 0.205 - height / 2
    : windowWidth * 0.205 - height / 2;

  return css`
    position: absolute;
    left: ${left}px;
    top: ${top}px;
    width: ${width}px;
    background: transparent;
    transform: rotate(30deg);
  `;
});

const NorthLabelContainer = getOuterLabel(0, 0.02, 0.5);
const UpLabelContainer = getOuterLabel(45, 0.1, 0.88);
const EastLabelContainer = getOuterLabel(90, 0.5, 0.97);
const OutLabelContainer = getOuterLabel(135, 0.9, 0.88);
const SouthLabelContainer = getOuterLabel(180, 0.97, 0.5);
const DownLabelContainer = getOuterLabel(225, 0.9, 0.12);
const WestLabelContainer = getOuterLabel(270, 0.5, 0.03);
const InLabelContainer = getOuterLabel(315, 0.1, 0.12);

const ThreatMapLabels = () => {
  // ----------------------------- Hooks ---------------------------------------- //
  const [width, height] = useWindowSize();
  const { crustReady } = useFonts();

  // ----------------------------- Render ---------------------------------------- //
  return (
    <>
      <NorthLabelContainer windowHeight={height} windowWidth={width}>
        <HeadingWS
          crustReady={crustReady}
          level={3}
          textAlign="center"
          margin={{ vertical: '0px' }}
        >
          NORTH
        </HeadingWS>
      </NorthLabelContainer>
      <UpLabelContainer windowHeight={height} windowWidth={width}>
        <HeadingWS
          crustReady={crustReady}
          level={3}
          textAlign="center"
          margin={{ vertical: '0px' }}
        >
          UP
        </HeadingWS>
      </UpLabelContainer>
      <EastLabelContainer windowHeight={height} windowWidth={width}>
        <HeadingWS
          crustReady={crustReady}
          level={3}
          textAlign="center"
          margin={{ vertical: '0px' }}
        >
          EAST
        </HeadingWS>
      </EastLabelContainer>
      <OutLabelContainer windowHeight={height} windowWidth={width}>
        <HeadingWS
          crustReady={crustReady}
          level={3}
          textAlign="center"
          margin={{ vertical: '0px' }}
        >
          OUT
        </HeadingWS>
      </OutLabelContainer>
      <SouthLabelContainer windowHeight={height} windowWidth={width}>
        <HeadingWS
          crustReady={crustReady}
          level={3}
          textAlign="center"
          margin={{ vertical: '0px' }}
        >
          SOUTH
        </HeadingWS>
      </SouthLabelContainer>
      <DownLabelContainer windowHeight={height} windowWidth={width}>
        <HeadingWS
          crustReady={crustReady}
          level={3}
          textAlign="center"
          margin={{ vertical: '0px' }}
        >
          DOWN
        </HeadingWS>
      </DownLabelContainer>
      <WestLabelContainer windowHeight={height} windowWidth={width}>
        <HeadingWS
          crustReady={crustReady}
          level={3}
          textAlign="center"
          margin={{ vertical: '0px' }}
        >
          WEST
        </HeadingWS>
      </WestLabelContainer>
      <InLabelContainer windowHeight={height} windowWidth={width}>
        <HeadingWS
          crustReady={crustReady}
          level={3}
          textAlign="center"
          margin={{ vertical: '0px' }}
        >
          IN
        </HeadingWS>
      </InLabelContainer>
      <CenterLabelContainer windowHeight={height} windowWidth={width}>
        <HeadingWS
          crustReady={crustReady}
          level={3}
          textAlign="center"
          margin={{ vertical: '0px' }}
        >
          THE PCS
        </HeadingWS>
        <TextWS textAlign="center">& their resources</TextWS>
      </CenterLabelContainer>
      <DistanceLabelContainer windowHeight={height} windowWidth={width}>
        <TextWS
          color="accent-1"
          textAlign="center"
          weight="bold"
          style={{ marginBottom: '3px' }}
        >
          Farther ↑
        </TextWS>
        <TextWS color="accent-1" textAlign="center" weight="bold">
          Closer ↓
        </TextWS>
      </DistanceLabelContainer>
    </>
  );
};

export default ThreatMapLabels;
