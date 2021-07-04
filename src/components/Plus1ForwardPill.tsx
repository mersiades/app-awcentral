import React, { FC } from 'react';
import { Box, BoxProps, Text } from 'grommet';

import styled, { css } from 'styled-components';
import { accentColors } from '../config/grommetConfig';

export const PillBox = styled(
  Box as FC<BoxProps & JSX.IntrinsicElements['div']>
)(() => {
  return css`
    background-color: ${accentColors[2]};
    padding: 12px;
    margin: 12px;
    border-radius: 30px;
    box-shadow: 0 0 5px 1px #000;
    cursor: default;
  `;
});

const Plus1ForwardPill: FC = () => (
  <PillBox aria-label="+1forward token" align="center" justify="center">
    <Text style={{ cursor: 'default' }}>
      <strong>+1forward</strong>
    </Text>
  </PillBox>
);

export default Plus1ForwardPill;
