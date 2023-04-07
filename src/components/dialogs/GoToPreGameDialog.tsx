import React, { FC } from 'react';
import { Box } from 'grommet';

import DialogWrapper from '../DialogWrapper';
import {
  warningDialogBackground,
  HeadingWS,
  ButtonWS,
  ParagraphWS,
} from '../../config/grommetConfig';
import { useFonts } from '../../contexts/fontContext';
import {
  NO_TEXT,
  PRE_GAME_INCOMPLETE_TEXT_MC,
  PRE_GAME_INCOMPLETE_TITLE,
  YES_TEXT,
} from '../../config/constants';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../contexts/gameContext';

interface GoToPreGameDialogProps {
  handleClose: () => void;
}

const GoToPreGameDialog: FC<GoToPreGameDialogProps> = ({ handleClose }) => {
  // ----------------------------- 3rd party hooks ------------------------------- //

  const navigate = useNavigate();

  // ----------------------------- Hooks ---------------------------------------- //
  const { game } = useGame();
  const { crustReady } = useFonts();

  const handleConfirm = () => {
    !!game && navigate(`/pre-game/${game.id}`);
  };

  return (
    <DialogWrapper
      background={warningDialogBackground}
      handleClose={handleClose}
    >
      <Box data-testid={'go-to-pregame-dialog'} gap="12px">
        <HeadingWS crustReady={crustReady} level={4} alignSelf="start">
          {PRE_GAME_INCOMPLETE_TITLE}
        </HeadingWS>
        <ParagraphWS>{PRE_GAME_INCOMPLETE_TEXT_MC}</ParagraphWS>
        <Box fill="horizontal" direction="row" justify="end" gap="small">
          <ButtonWS
            data-testid="cancel-button"
            label={NO_TEXT}
            style={{
              background: 'transparent',
              textShadow:
                '0 0 1px #000, 0 0 3px #000, 0 0 5px #000, 0 0 10px #000',
            }}
            onClick={handleClose}
          />
          <ButtonWS label={YES_TEXT} primary onClick={handleConfirm} />
        </Box>
      </Box>
    </DialogWrapper>
  );
};

export default GoToPreGameDialog;
