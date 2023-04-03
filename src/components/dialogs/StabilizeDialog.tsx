import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, FormField, TextInput } from 'grommet';

import DialogWrapper from '../DialogWrapper';
import {
  HeadingWS,
  ParagraphWS,
  ButtonWS,
  RedBox,
  stabilizeBackground
} from '../../config/grommetConfig';
import { CharacterMove, Move } from '../../@types/staticDataInterfaces';
import { useFonts } from '../../contexts/fontContext';
import { useGame } from '../../contexts/gameContext';
import { useMoves } from '../../contexts/movesContext';
import { StyledMarkdown } from '../styledComponents';
import { logAmpEvent } from '../../config/amplitudeConfig';
import {
  CANCEL_TEXT,
  CURRENT_STOCK_1_TEXT,
  CURRENT_STOCK_2_TEXT,
  HOW_MUCH_STOCK_TEXT,
  STABILIZE_TEXT
} from '../../config/constants';

interface StabilizeDialogProps {
  move: Move | CharacterMove;
  handleClose: () => void;
}

const StabilizeDialog: FC<StabilizeDialogProps> = ({ move, handleClose }) => {
  // ----------------------------- Component state -------------------------- //
  const [stockSpent, setStockSpent] = useState(0);
  // ----------------------------- 3rd party hooks -------------------------- //
  const { gameId } = useParams<{ gameId: string }>();

  // ----------------------------- Hooks ------------------------------------ //
  const { crustReady } = useFonts();
  const { userGameRole, character } = useGame();
  const { makeStabilizeAndHealMove, rollingMove } = useMoves();

  // ----------------------------- Component functions ---------------------- //
  const currentStock = character?.playbookUniques?.angelKit?.stock || 0;

  const handleStabilizeAndHealMove = async () => {
    if (currentStock - stockSpent < 0) {
      console.warn('You don\'t have enough stock');
      return;
    }
    if (
      !!userGameRole &&
      !!character &&
      !character.isDead &&
      !rollingMove
    ) {
      try {
        makeStabilizeAndHealMove!({
          variables: {
            gameId,
            gameRoleId: userGameRole.id,
            characterId: character.id,
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
    <DialogWrapper background={stabilizeBackground} handleClose={handleClose}>
      <Box gap='12px' overflow='auto'>
        <HeadingWS crustReady={crustReady} level={4} alignSelf='start'>
          {move.name}
        </HeadingWS>
        <StyledMarkdown>{move.description}</StyledMarkdown>
        <Box
          direction='row'
          align='start'
          justify='start'
          gap='12px'
          flex='grow'
        >
          <RedBox
            alignSelf='center'
            width='150px'
            align='center'
            justify='between'
            pad='24px'
          >
            <FormField>
              <TextInput
                type='number'
                value={stockSpent}
                size='xlarge'
                textAlign='center'
                onChange={(e) =>
                  [0, 1, 2, 3].includes(parseInt(e.target.value)) &&
                  setStockSpent(parseInt(e.target.value))
                }
              />
            </FormField>
          </RedBox>
          <Box>
            <ParagraphWS alignSelf='start'>
              {HOW_MUCH_STOCK_TEXT}
            </ParagraphWS>
            <ParagraphWS alignSelf='start'>
              {`${CURRENT_STOCK_1_TEXT} ${currentStock} ${CURRENT_STOCK_2_TEXT}`}
            </ParagraphWS>
          </Box>
        </Box>
        <Box
          fill='horizontal'
          direction='row'
          justify='end'
          gap='small'
          flex='grow'
        >
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
            label={STABILIZE_TEXT}
            name='stabilize-button'
            primary
            onClick={() =>
              [0, 1, 2, 3].includes(stockSpent) &&
              !rollingMove &&
              handleStabilizeAndHealMove()
            }
            disabled={
              ![0, 1, 2, 3].includes(stockSpent) ||
              rollingMove
            }
          />
        </Box>
      </Box>
    </DialogWrapper>
  );
};

export default StabilizeDialog;
