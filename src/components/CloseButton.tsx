import { BoxProps } from 'grommet';
import { Close } from 'grommet-icons';
import React, { FC } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  padding: 6px;
  cursor: pointer;
  & svg {
    &:hover {
      stroke: #fff;
    }
  }
  z-index: 1;
`;

interface CloseButtonProps {
  handleClose: () => void;
}

const CloseButton: FC<CloseButtonProps & BoxProps> = ({ handleClose }) => {
  return (
    <StyledDiv data-testid="close-icon-button">
      <Close color="accent-1" onClick={handleClose} />
    </StyledDiv>
  );
};

export default CloseButton;
