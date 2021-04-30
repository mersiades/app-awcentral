import { Box } from 'grommet';
import React, { FC } from 'react';
import { chopperSpecialBackground, HeadingWS } from '../../config/grommetConfig';
import { useFonts } from '../../contexts/fontContext';
import DialogWrapper from '../DialogWrapper';

interface CharacterImprovementDialogProps {
  handleClose: () => void;
}

const CharacterImprovementDialog: FC<CharacterImprovementDialogProps> = ({ handleClose }) => {
  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { crustReady } = useFonts();

  return (
    <DialogWrapper background={chopperSpecialBackground} handleClose={handleClose}>
      <Box gap="12px">
        <HeadingWS crustReady={crustReady} level={4} alignSelf="start">
          Improvements
        </HeadingWS>
      </Box>
    </DialogWrapper>
  );
};

export default CharacterImprovementDialog;
