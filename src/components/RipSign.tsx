import React, { FC } from 'react';
import { BoxProps } from 'grommet';
import styled from 'styled-components';
import { HeadingWS } from '../config/grommetConfig';
import { useFonts } from '../contexts/fontContext';

const StyledDiv = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  margin-left: -60px;
  width: 120px;
  text-align: center;
  cursor: default;
  z-index: 10;
`;

const RipSign: FC<BoxProps> = () => {
  // ----------------------------- Hooks ---------------------------------------- //
  const { vtksReady } = useFonts();

  return (
    <StyledDiv>
      <HeadingWS vtksReady={vtksReady} level={1} style={{ fontSize: '80px' }}>
        RIP
      </HeadingWS>
    </StyledDiv>
  );
};

export default RipSign;
