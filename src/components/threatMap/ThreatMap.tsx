import React, { FC } from 'react';
import { Box, BoxProps } from 'grommet';
import styled, { css } from 'styled-components';

import ThreatMapLabels from './ThreatMapLabels';
import ThreatMapDropSegments from './ThreatMapDropSegments';
import ThreatMapItemPill from './ThreatMapItemPill';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useThreatMap } from '../../contexts/threatMapContext';

export interface WindowWidths {
  readonly windowHeight: number;
  readonly windowWidth: number;
}

const getPillContainer = (
  leftRatio: number,
  topRatio: number,
  heightRatio: number,
  widthRatio: number
) =>
  styled(
    Box as React.FC<WindowWidths & BoxProps & JSX.IntrinsicElements['div']>
  )(({ windowWidth, windowHeight }) => {
    const isLandscape = windowWidth > windowHeight;
    const width = isLandscape
      ? windowHeight * widthRatio
      : windowWidth * widthRatio;
    const height = isLandscape
      ? windowHeight * heightRatio
      : windowWidth * heightRatio;

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
      height: ${height}px;
      background: transparent;
    `;
  });

const CenterPillContainer = getPillContainer(0.5, 0.5, 0.15, 0.3);

const CloserNorthPillContainer = getPillContainer(0.5, 0.255, 0.15, 0.18);
const CloserEastPillContainer = getPillContainer(0.75, 0.5, 0.18, 0.15);
const CloserSouthPillContainer = getPillContainer(0.5, 0.745, 0.15, 0.18);
const CloserWestPillContainer = getPillContainer(0.25, 0.5, 0.18, 0.15);

const CloserUpPillContainer = getPillContainer(0.68, 0.32, 0.11, 0.13);
const CloserOutPillContainer = getPillContainer(0.68, 0.68, 0.11, 0.13);
const CloserDownPillContainer = getPillContainer(0.32, 0.68, 0.11, 0.13);
const CloserInPillContainer = getPillContainer(0.32, 0.32, 0.11, 0.13);

const FartherNorthPillContainer = getPillContainer(0.5, 0.1, 0.14, 0.4);
const FartherEastPillContainer = getPillContainer(0.9, 0.5, 0.4, 0.14);
const FartherSouthPillContainer = getPillContainer(0.5, 0.9, 0.14, 0.4);
const FartherWestPillContainer = getPillContainer(0.1, 0.5, 0.4, 0.14);

const FartherUpPillContainer = getPillContainer(0.83, 0.18, 0.14, 0.2);
const FartherOutPillContainer = getPillContainer(0.83, 0.82, 0.14, 0.2);
const FartherDownPillContainer = getPillContainer(0.17, 0.82, 0.14, 0.2);
const FartherInPillContainer = getPillContainer(0.17, 0.18, 0.14, 0.2);

const ThreatMap: FC = () => {
  // ----------------------------- Hooks ---------------------------------------- //
  const [width, height] = useWindowSize();
  const {
    center,
    closerNorth,
    closerUp,
    closerEast,
    closerOut,
    closerSouth,
    closerDown,
    closerWest,
    closerIn,
    fartherNorth,
    fartherEast,
    fartherSouth,
    fartherWest,
    fartherUp,
    fartherOut,
    fartherDown,
    fartherIn,
  } = useThreatMap();

  // ----------------------------- Render ---------------------------------------- //
  return (
    <>
      <ThreatMapDropSegments />
      <ThreatMapLabels />
      <CenterPillContainer
        direction="row"
        justify="around"
        align="center"
        wrap
        windowHeight={height}
        windowWidth={width}
      >
        {center.map((item) => (
          <ThreatMapItemPill key={item.id} item={item} />
        ))}
      </CenterPillContainer>

      <CloserNorthPillContainer
        direction="row"
        justify="around"
        align="center"
        wrap
        windowHeight={height}
        windowWidth={width}
      >
        {closerNorth.map((item) => (
          <ThreatMapItemPill key={item.id} item={item} />
        ))}
      </CloserNorthPillContainer>
      <CloserEastPillContainer
        direction="row-reverse"
        justify="around"
        align="center"
        wrap
        windowHeight={height}
        windowWidth={width}
      >
        {closerEast.map((item) => (
          <ThreatMapItemPill key={item.id} item={item} />
        ))}
      </CloserEastPillContainer>
      <CloserSouthPillContainer
        direction="row"
        justify="around"
        align="center"
        wrap
        windowHeight={height}
        windowWidth={width}
      >
        {closerSouth.map((item) => (
          <ThreatMapItemPill key={item.id} item={item} />
        ))}
      </CloserSouthPillContainer>
      <CloserWestPillContainer
        direction="row"
        justify="around"
        align="center"
        wrap
        windowHeight={height}
        windowWidth={width}
      >
        {closerWest.map((item) => (
          <ThreatMapItemPill key={item.id} item={item} />
        ))}
      </CloserWestPillContainer>

      <CloserUpPillContainer
        direction="row"
        justify="around"
        align="center"
        wrap
        windowHeight={height}
        windowWidth={width}
      >
        {closerUp.map((item) => (
          <ThreatMapItemPill key={item.id} item={item} />
        ))}
      </CloserUpPillContainer>
      <CloserOutPillContainer
        direction="row-reverse"
        justify="around"
        align="center"
        wrap
        windowHeight={height}
        windowWidth={width}
      >
        {closerOut.map((item) => (
          <ThreatMapItemPill key={item.id} item={item} />
        ))}
      </CloserOutPillContainer>
      <CloserDownPillContainer
        direction="row"
        justify="around"
        align="center"
        wrap
        windowHeight={height}
        windowWidth={width}
      >
        {closerDown.map((item) => (
          <ThreatMapItemPill key={item.id} item={item} />
        ))}
      </CloserDownPillContainer>
      <CloserInPillContainer
        direction="row"
        justify="around"
        align="center"
        wrap
        windowHeight={height}
        windowWidth={width}
      >
        {closerIn.map((item) => (
          <ThreatMapItemPill key={item.id} item={item} />
        ))}
      </CloserInPillContainer>

      <FartherNorthPillContainer
        direction="row"
        justify="around"
        align="center"
        wrap
        windowHeight={height}
        windowWidth={width}
      >
        {fartherNorth.map((item) => (
          <ThreatMapItemPill key={item.id} item={item} />
        ))}
      </FartherNorthPillContainer>
      <FartherEastPillContainer
        direction="row"
        justify="around"
        align="center"
        wrap
        windowHeight={height}
        windowWidth={width}
      >
        {fartherEast.map((item) => (
          <ThreatMapItemPill key={item.id} item={item} />
        ))}
      </FartherEastPillContainer>
      <FartherSouthPillContainer
        direction="row"
        justify="around"
        align="center"
        wrap
        windowHeight={height}
        windowWidth={width}
      >
        {fartherSouth.map((item) => (
          <ThreatMapItemPill key={item.id} item={item} />
        ))}
      </FartherSouthPillContainer>
      <FartherWestPillContainer
        direction="row"
        justify="around"
        align="center"
        wrap
        windowHeight={height}
        windowWidth={width}
      >
        {fartherWest.map((item) => (
          <ThreatMapItemPill key={item.id} item={item} />
        ))}
      </FartherWestPillContainer>

      <FartherUpPillContainer
        direction="row"
        justify="around"
        align="center"
        wrap
        windowHeight={height}
        windowWidth={width}
      >
        {fartherUp.map((item) => (
          <ThreatMapItemPill key={item.id} item={item} />
        ))}
      </FartherUpPillContainer>
      <FartherOutPillContainer
        direction="row"
        justify="around"
        align="center"
        wrap
        windowHeight={height}
        windowWidth={width}
      >
        {fartherOut.map((item) => (
          <ThreatMapItemPill key={item.id} item={item} />
        ))}
      </FartherOutPillContainer>
      <FartherDownPillContainer
        direction="row"
        justify="around"
        align="center"
        wrap
        windowHeight={height}
        windowWidth={width}
      >
        {fartherDown.map((item) => (
          <ThreatMapItemPill key={item.id} item={item} />
        ))}
      </FartherDownPillContainer>
      <FartherInPillContainer
        direction="row"
        justify="around"
        align="center"
        wrap
        windowHeight={height}
        windowWidth={width}
      >
        {fartherIn.map((item) => (
          <ThreatMapItemPill key={item.id} item={item} />
        ))}
      </FartherInPillContainer>
    </>
  );
};

export default ThreatMap;
