import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from 'grommet';

import DialogWrapper from '../DialogWrapper';
import {
  HeadingWS,
  ParagraphWS,
  ButtonWS,
  treatNpcBackground
} from '../../config/grommetConfig';
import { CharacterMove, Move } from '../../@types/staticDataInterfaces';
import { useFonts } from '../../contexts/fontContext';
import { useGame } from '../../contexts/gameContext';
import { StyledMarkdown } from '../styledComponents';
import { logAmpEvent } from '../../config/amplitudeConfig';
import { CANCEL_TEXT, TREAT_TEXT } from '../../config/constants';
import { useMoves } from '../../contexts/movesContext';

interface TreatNpcDialogProps {
  move: Move | CharacterMove;
  handleClose: () => void;
}

const TreatNpcDialog: FC<TreatNpcDialogProps> = ({ move, handleClose }) => {
  // ----------------------------- 3rd party hooks -------------------------- //
  const { gameId } = useParams<{ gameId: string }>();

  // ----------------------------- Hooks ------------------------------------ //
  const { crustReady } = useFonts();
  const { userGameRole, character } = useGame();
  const { makeStockMove, rollingMove } = useMoves();

  // ----------------------------- Component functions ---------------------- //
  const currentStock = character?.playbookUniques?.angelKit?.stock || 0;

  const handleStockMove = async () => {
    const stockSpent = 1;
    if (currentStock - stockSpent < 0) {
      console.warn('You don\'t have enough stock');
      return;
    }
    if (
      gameId &&
      !!userGameRole &&
      !!character &&
      !character.isDead &&
      !rollingMove
    ) {
      try {
        makeStockMove!({
          variables: {
            gameId,
            gameRoleId: userGameRole.id,
            characterId: character.id,
            moveName: move.name,
            stockSpent
          }
        });
        logAmpEvent('make move', { move: move.name });
        handleClose();
      } catch (error) {
        console.error(error);
      }
    }
  };

  // ----------------------------- Render ----------------------------------- //
  return (
    <DialogWrapper background={treatNpcBackground} handleClose={handleClose}>
      <Box gap='12px'>
        <HeadingWS crustReady={crustReady} level={4} alignSelf='start'>
          {move.name}
        </HeadingWS>
        <StyledMarkdown>{move.description}</StyledMarkdown>
        <ParagraphWS alignSelf='start'>
          {`This will cost 1-stock. You currently have ${currentStock} stock.`}
        </ParagraphWS>
        <Box fill='horizontal' direction='row' justify='end' gap='small'>
          <ButtonWS
            label={CANCEL_TEXT}
            style={{
              background: 'transparent',
              textShadow:
                '0 0 1px #000, 0 0 3px #000, 0 0 5px #000, 0 0 10px #000'
            }}
            onClick={handleClose}
          />
          <ButtonWS
            label={TREAT_TEXT}
            primary
            onClick={() => !rollingMove && handleStockMove()}
            disabled={rollingMove || currentStock < 1}
          />
        </Box>
      </Box>
    </DialogWrapper>
  );
};

export default TreatNpcDialog;
