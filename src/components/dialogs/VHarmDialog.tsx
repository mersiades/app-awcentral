import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, FormField, TextInput } from 'grommet';

import DialogWrapper from '../DialogWrapper';
import {
  HeadingWS,
  ParagraphWS,
  ButtonWS,
  RedBox,
  sufferVHarmDialogBackground
} from '../../config/grommetConfig';
import { CharacterMove, Move } from '../../@types/staticDataInterfaces';
import { useFonts } from '../../contexts/fontContext';
import { useGame } from '../../contexts/gameContext';
import { logAmpEvent } from '../../config/amplitudeConfig';
import { useMoves } from '../../contexts/movesContext';

interface VHarmDialogProps {
  move: Move | CharacterMove;
  handleClose: () => void;
}

const VHarmDialog: FC<VHarmDialogProps> = ({ move, handleClose }) => {
  // ----------------------------- Component state -------------------------- //
  const [harm, setHarm] = useState(0);
  // ----------------------------- 3rd party hooks -------------------------- //
  const { gameId } = useParams<{ gameId: string }>();

  // ----------------------------- Hooks ------------------------------------ //
  const { crustReady } = useFonts();
  const { userGameRole, character } = useGame();
  const { makeSufferVHarmMove, rollingMove } = useMoves();

  // ----------------------------- Component functions ---------------------- //
  const handleSufferVHarmMove = async () => {
    if (
      gameId &&
      !!userGameRole &&
      !!character &&
      !character.isDead &&
      !rollingMove
    ) {
      try {
        makeSufferVHarmMove!({
          variables: {
            gameId,
            gameRoleId: userGameRole.id,
            characterId: character.id,
            vHarm: harm
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
    <DialogWrapper
      background={sufferVHarmDialogBackground}
      handleClose={handleClose}
    >
      <Box gap='24px'>
        <HeadingWS crustReady={crustReady} level={4} alignSelf='start'>
          {move.name}
        </HeadingWS>
        <Box
          fill
          direction='row'
          align='start'
          justify='between'
          pad='12px'
          gap='12px'
        >
          <Box fill>
            <ParagraphWS alignSelf='center'>
              How much v-harm did your vehicle suffer?
            </ParagraphWS>
            <RedBox
              alignSelf='center'
              width='150px'
              align='center'
              justify='between'
              pad='24px'
              margin={{ vertical: '52px' }}
            >
              <FormField>
                <TextInput
                  type='number'
                  value={harm}
                  size='xlarge'
                  textAlign='center'
                  onChange={(e) => setHarm(parseInt(e.target.value))}
                />
              </FormField>
            </RedBox>
          </Box>
        </Box>
        <Box fill='horizontal' direction='row' justify='end' gap='small'>
          <ButtonWS
            label='CANCEL'
            style={{
              background: 'transparent',
              textShadow:
                '0 0 1px #000, 0 0 3px #000, 0 0 5px #000, 0 0 10px #000'
            }}
            onClick={handleClose}
          />
          <ButtonWS
            label='ROLL'
            primary
            onClick={() =>
              !!harm && !rollingMove && handleSufferVHarmMove()
            }
            disabled={!harm || rollingMove}
          />
        </Box>
      </Box>
    </DialogWrapper>
  );
};

export default VHarmDialog;
