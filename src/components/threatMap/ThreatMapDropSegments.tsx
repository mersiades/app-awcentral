import React from 'react';
import { rgba } from 'polished';
import { useDrop } from 'react-dnd';
import styled, { css } from 'styled-components';
import { Box, BoxProps } from 'grommet';

import { WindowWidths } from './ThreatMap';
import {
  ThreatMapCharacterItem,
  useThreatMap,
} from '../../contexts/threatMapContext';
import { useWindowSize } from '../../hooks/useWindowSize';
import { ThreatMapLocation } from '../../@types/enums';

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
    border: 2px solid white;
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
      border-left: 2px solid white;
      border-radius: 0 100% 0 0;
      z-index: 2;
      transform-origin: bottom left;
      transform: rotate(${rotation}deg) skewX(${skew}deg);
      clip-path: polygon(${polygonPoints});
      box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3),
        0 0 10px 1px rgba(0, 0, 0, 0.2), 0 0 5px 1px rgba(0, 0, 0, 0.3) inset,
        0 0 10px 1px rgba(0, 0, 0, 0.2) inset;
    `;
  });

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
      border-left: 2px solid white;
      border-radius: 0 100% 0 0;
      z-index: 2;
      transform-origin: bottom left;
      transform: rotate(${rotation}deg) skewX(${skew}deg);
      clip-path: polygon(${polygonPoints});
      box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3),
        0 0 10px 1px rgba(0, 0, 0, 0.2), 0 0 5px 1px rgba(0, 0, 0, 0.3) inset,
        0 0 10px 1px rgba(0, 0, 0, 0.2) inset;
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

const ThreatMapDropSegments = () => {
  // ----------------------------- Hooks ---------------------------------------- //
  const [width, height] = useWindowSize();
  const { handleCharacterPositionChange } = useThreatMap();

  // ----------------------------- 3rd party hooks ------------------------------- //
  const [{ isOver: isOverCenterCircle }, centerCircle] = useDrop(
    () => ({
      accept: 'THREAT_MAP_ITEM',
      drop: (item: ThreatMapCharacterItem) =>
        !!handleCharacterPositionChange &&
        handleCharacterPositionChange(
          item.game,
          item.gameRoleId,
          item.id,
          ThreatMapLocation.center
        ),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  const [{ isOver: isOverCloserNorth }, closerNorth] = useDrop(
    () => ({
      accept: 'THREAT_MAP_ITEM',
      drop: (item: ThreatMapCharacterItem) =>
        !!handleCharacterPositionChange &&
        handleCharacterPositionChange(
          item.game,
          item.gameRoleId,
          item.id,
          ThreatMapLocation.closerNorth
        ),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  const [{ isOver: isOverCloserUp }, closerUp] = useDrop(
    () => ({
      accept: 'THREAT_MAP_ITEM',
      drop: (item: ThreatMapCharacterItem) =>
        !!handleCharacterPositionChange &&
        handleCharacterPositionChange(
          item.game,
          item.gameRoleId,
          item.id,
          ThreatMapLocation.closerUp
        ),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  const [{ isOver: isOverCloserEast }, closerEast] = useDrop(
    () => ({
      accept: 'THREAT_MAP_ITEM',
      drop: (item: ThreatMapCharacterItem) =>
        !!handleCharacterPositionChange &&
        handleCharacterPositionChange(
          item.game,
          item.gameRoleId,
          item.id,
          ThreatMapLocation.closerEast
        ),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  const [{ isOver: isOverCloserOut }, closerOut] = useDrop(
    () => ({
      accept: 'THREAT_MAP_ITEM',
      drop: (item: ThreatMapCharacterItem) =>
        !!handleCharacterPositionChange &&
        handleCharacterPositionChange(
          item.game,
          item.gameRoleId,
          item.id,
          ThreatMapLocation.closerOut
        ),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  const [{ isOver: isOverCloserSouth }, closerSouth] = useDrop(
    () => ({
      accept: 'THREAT_MAP_ITEM',
      drop: (item: ThreatMapCharacterItem) =>
        !!handleCharacterPositionChange &&
        handleCharacterPositionChange(
          item.game,
          item.gameRoleId,
          item.id,
          ThreatMapLocation.closerSouth
        ),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  const [{ isOver: isOverCloserDown }, closerDown] = useDrop(
    () => ({
      accept: 'THREAT_MAP_ITEM',
      drop: (item: ThreatMapCharacterItem) =>
        !!handleCharacterPositionChange &&
        handleCharacterPositionChange(
          item.game,
          item.gameRoleId,
          item.id,
          ThreatMapLocation.closerDown
        ),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  const [{ isOver: isOverCloserWest }, closerWest] = useDrop(
    () => ({
      accept: 'THREAT_MAP_ITEM',
      drop: (item: ThreatMapCharacterItem) =>
        !!handleCharacterPositionChange &&
        handleCharacterPositionChange(
          item.game,
          item.gameRoleId,
          item.id,
          ThreatMapLocation.closerWest
        ),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  const [{ isOver: isOverCloserIn }, closerIn] = useDrop(
    () => ({
      accept: 'THREAT_MAP_ITEM',
      drop: (item: ThreatMapCharacterItem) =>
        !!handleCharacterPositionChange &&
        handleCharacterPositionChange(
          item.game,
          item.gameRoleId,
          item.id,
          ThreatMapLocation.closerIn
        ),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  const [{ isOver: isOverFartherNorth }, fartherNorth] = useDrop(
    () => ({
      accept: 'THREAT_MAP_ITEM',
      drop: (item: ThreatMapCharacterItem) =>
        !!handleCharacterPositionChange &&
        handleCharacterPositionChange(
          item.game,
          item.gameRoleId,
          item.id,
          ThreatMapLocation.fartherNorth
        ),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  const [{ isOver: isOverFartherEast }, fartherEast] = useDrop(
    () => ({
      accept: 'THREAT_MAP_ITEM',
      drop: (item: ThreatMapCharacterItem) =>
        !!handleCharacterPositionChange &&
        handleCharacterPositionChange(
          item.game,
          item.gameRoleId,
          item.id,
          ThreatMapLocation.fartherEast
        ),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  const [{ isOver: isOverFartherSouth }, fartherSouth] = useDrop(
    () => ({
      accept: 'THREAT_MAP_ITEM',
      drop: (item: ThreatMapCharacterItem) =>
        !!handleCharacterPositionChange &&
        handleCharacterPositionChange(
          item.game,
          item.gameRoleId,
          item.id,
          ThreatMapLocation.fartherSouth
        ),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  const [{ isOver: isOverFartherWest }, fartherWest] = useDrop(
    () => ({
      accept: 'THREAT_MAP_ITEM',
      drop: (item: ThreatMapCharacterItem) =>
        !!handleCharacterPositionChange &&
        handleCharacterPositionChange(
          item.game,
          item.gameRoleId,
          item.id,
          ThreatMapLocation.fartherWest
        ),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  const [{ isOver: isOverFartherUp }, fartherUp] = useDrop(
    () => ({
      accept: 'THREAT_MAP_ITEM',
      drop: (item: ThreatMapCharacterItem) =>
        !!handleCharacterPositionChange &&
        handleCharacterPositionChange(
          item.game,
          item.gameRoleId,
          item.id,
          ThreatMapLocation.fartherUp
        ),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  const [{ isOver: isOverFartherOut }, fartherOut] = useDrop(
    () => ({
      accept: 'THREAT_MAP_ITEM',
      drop: (item: ThreatMapCharacterItem) =>
        !!handleCharacterPositionChange &&
        handleCharacterPositionChange(
          item.game,
          item.gameRoleId,
          item.id,
          ThreatMapLocation.fartherOut
        ),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  const [{ isOver: isOverFartherDown }, fartherDown] = useDrop(
    () => ({
      accept: 'THREAT_MAP_ITEM',
      drop: (item: ThreatMapCharacterItem) =>
        !!handleCharacterPositionChange &&
        handleCharacterPositionChange(
          item.game,
          item.gameRoleId,
          item.id,
          ThreatMapLocation.fartherDown
        ),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  const [{ isOver: isOverFartherIn }, fartherIn] = useDrop(
    () => ({
      accept: 'THREAT_MAP_ITEM',
      drop: (item: ThreatMapCharacterItem) =>
        !!handleCharacterPositionChange &&
        handleCharacterPositionChange(
          item.game,
          item.gameRoleId,
          item.id,
          ThreatMapLocation.fartherIn
        ),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  const getBackground = (isOver: boolean) =>
    isOver ? { color: rgba(76, 104, 76, 0.33) } : {};

  // ----------------------------- Render ---------------------------------------- //
  return (
    <>
      <CenterCircle
        ref={centerCircle}
        background={getBackground(isOverCenterCircle)}
        windowHeight={height}
        windowWidth={width}
      />
      <CloserCircle windowHeight={height} windowWidth={width}>
        <CloserNorthSegment
          ref={closerNorth}
          background={getBackground(isOverCloserNorth)}
        />
        <CloserUpSegment
          ref={closerUp}
          background={getBackground(isOverCloserUp)}
        />
        <CloserEastSegment
          ref={closerEast}
          background={getBackground(isOverCloserEast)}
        />
        <CloserOutSegment
          ref={closerOut}
          background={getBackground(isOverCloserOut)}
        />
        <CloserSouthSegment
          ref={closerSouth}
          background={getBackground(isOverCloserSouth)}
        />
        <CloserDownSegment
          ref={closerDown}
          background={getBackground(isOverCloserDown)}
        />
        <CloserWestSegment
          ref={closerWest}
          background={getBackground(isOverCloserWest)}
        />
        <CloserInSegment
          ref={closerIn}
          background={getBackground(isOverCloserIn)}
        />
      </CloserCircle>
      <FartherNorthSegment
        ref={fartherNorth}
        background={getBackground(isOverFartherNorth)}
      />
      <FartherUpSegment
        ref={fartherUp}
        background={getBackground(isOverFartherUp)}
      />
      <FartherEastSegment
        ref={fartherEast}
        background={getBackground(isOverFartherEast)}
      />
      <FartherOutSegment
        ref={fartherOut}
        background={getBackground(isOverFartherOut)}
      />
      <FartherSouthSegment
        ref={fartherSouth}
        background={getBackground(isOverFartherSouth)}
      />
      <FartherDownSegment
        ref={fartherDown}
        background={getBackground(isOverFartherDown)}
      />
      <FartherWestSegment
        ref={fartherWest}
        background={getBackground(isOverFartherWest)}
      />
      <FartherInSegment
        ref={fartherIn}
        background={getBackground(isOverFartherIn)}
      />
    </>
  );
};

export default ThreatMapDropSegments;
