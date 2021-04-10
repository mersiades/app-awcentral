import React, { FC } from 'react';
import { Box } from 'grommet';

import { accentColors, brandColor, TextWS } from '../config/grommetConfig';

interface HarmClockProps {
  harmValue: number;
  isStabilized: boolean;
  diameter?: number;
  showNumbers?: boolean;
  margin?: number;
}

interface SectorBaseStyles {
  position: 'relative' | 'absolute';
  left: string;
  bottom: string;
  height: string;
  width: string;
  transformOrigin: string;
  borderColor: string;
  borderWidth: number;
  borderStyle: string;
  cursor: string;
}

interface CircleStyles {
  position: 'relative' | 'absolute';
  height: string;
  width: string;
  overflow: string;
  borderRadius: string;
}

interface OClockBaseStyles {
  position: 'absolute' | 'relative';
  padding: string;
  width: string;
  height: string;
}

interface OClockStyles extends OClockBaseStyles {
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
}

export const getCircle = (diameter: number): CircleStyles => ({
  position: 'relative' as const,
  height: `${diameter}px`,
  width: `${diameter}px`,
  overflow: 'hidden',
  borderRadius: '50%',
});

export const sectorBase: SectorBaseStyles = {
  position: 'absolute' as const,
  left: '50%',
  bottom: '50%',
  height: '100%',
  width: '100%',
  transformOrigin: 'bottom left',
  borderColor: '#000',
  borderWidth: 1,
  borderStyle: 'solid',
  cursor: 'pointer',
};

export const getSector = (value: number, comparator: number, rotate: number, skewY: number, isStabilized: boolean) => {
  const highlightColor = isStabilized ? accentColors[0] : brandColor;
  return {
    ...sectorBase,
    backgroundColor: value > comparator ? highlightColor : '#FFF',
    transform: `rotate(${rotate}deg) skewY(${skewY}deg)`,
  };
};

const oclockBase: OClockBaseStyles = {
  position: 'absolute' as 'absolute',
  padding: '3px',
  width: '30px',
  height: '30px',
};

export const oclock12: OClockStyles = {
  ...oclockBase,
  top: 0,
  left: 'calc(50% - 15px)',
};

export const oclock3: OClockStyles = {
  ...oclockBase,
  top: 'calc(50% - 15px)',
  right: 0,
};

export const oclock6: OClockStyles = {
  ...oclockBase,
  bottom: -3,
  left: 'calc(50% - 15px)',
};

export const oclock9: OClockStyles = {
  ...oclockBase,
  top: 'calc(50% -15px)',
  left: 0,
};

const HarmClock: FC<HarmClockProps> = ({ harmValue, isStabilized, diameter = 200, showNumbers = true, margin = 50 }) => {
  const circle = getCircle(diameter);

  return (
    <Box
      fill="horizontal"
      direction="row"
      justify="around"
      animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}
    >
      <Box
        data-testid="harm-clock"
        align="center"
        justify="center"
        style={{ position: 'relative', width: `${diameter + margin}px`, height: `${diameter + margin}px` }}
      >
        {showNumbers && (
          <>
            <Box style={oclock12} align="center" justify="center">
              <TextWS style={{ textAlign: 'center' }}>12</TextWS>
            </Box>
            <Box style={oclock3} align="center" justify="center">
              <TextWS>3</TextWS>
            </Box>
            <Box style={oclock6} align="center" justify="center">
              <TextWS>6</TextWS>
            </Box>
            <Box style={oclock9} align="center" justify="center">
              <TextWS>9</TextWS>
            </Box>
          </>
        )}

        <div style={circle}>
          <div data-testid="harm-sector-0" style={getSector(harmValue, 0, 0, 0, isStabilized)} />
          <div data-testid="harm-sector-1" style={getSector(harmValue, 1, 90, 0, isStabilized)} />
          <div data-testid="harm-sector-2" style={getSector(harmValue, 2, 180, 0, isStabilized)} />
          <div data-testid="harm-sector-3" style={getSector(harmValue, 3, 270, -60, isStabilized)} />
          <div data-testid="harm-sector-4" style={getSector(harmValue, 4, 300, -60, isStabilized)} />
          <div data-testid="harm-sector-5" style={getSector(harmValue, 5, 330, -60, isStabilized)} />
        </div>
      </Box>
    </Box>
  );
};

export default HarmClock;
