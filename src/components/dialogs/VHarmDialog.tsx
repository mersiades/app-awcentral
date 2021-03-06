import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Box, FormField, TextInput } from 'grommet';

import DialogWrapper from '../DialogWrapper';
import {
  HeadingWS,
  ParagraphWS,
  ButtonWS,
  RedBox,
  sufferVHarmDialogBackground,
} from '../../config/grommetConfig';
import { CharacterMove, Move } from '../../@types/staticDataInterfaces';
import PERFORM_SUFFER_V_HARM_MOVE, {
  PerformSufferVHarmMoveData,
  PerformSufferVHarmMoveVars,
} from '../../mutations/performSufferVHarmMove';
import { useFonts } from '../../contexts/fontContext';
import { useGame } from '../../contexts/gameContext';
import { logAmpEvent } from '../../config/amplitudeConfig';

interface VHarmDialogProps {
  move: Move | CharacterMove;
  handleClose: () => void;
}

const VHarmDialog: FC<VHarmDialogProps> = ({ move, handleClose }) => {
  // ----------------------------- Component state ------------------------------ //
  const [harm, setHarm] = useState(0);
  // ----------------------------- 3rd party hooks ------------------------------- //
  const { gameId } = useParams<{ gameId: string }>();

  // ----------------------------- Hooks ---------------------------------------- //
  const { crustReady } = useFonts();
  const { userGameRole, character } = useGame();

  // ----------------------------- GraphQL -------------------------------------- //
  const [performSufferVHarmMove, { loading: performingSufferVHarmMove }] =
    useMutation<PerformSufferVHarmMoveData, PerformSufferVHarmMoveVars>(
      PERFORM_SUFFER_V_HARM_MOVE
    );

  // ----------------------------- Component functions ------------------------- //
  const handleSufferVHarmMove = async () => {
    if (
      !!userGameRole &&
      !!character &&
      !character.isDead &&
      !performingSufferVHarmMove
    ) {
      try {
        await performSufferVHarmMove({
          variables: {
            gameId,
            gameRoleId: userGameRole.id,
            characterId: character.id,
            vHarm: harm,
          },
        });
        logAmpEvent('make move', { move: move.name });
        handleClose();
      } catch (error) {
        console.error(error);
      }
    }
  };

  // ----------------------------- Render ---------------------------------------- //

  return (
    <DialogWrapper
      background={sufferVHarmDialogBackground}
      handleClose={handleClose}
    >
      <Box gap="24px">
        <HeadingWS crustReady={crustReady} level={4} alignSelf="start">
          {move.name}
        </HeadingWS>
        <Box
          fill
          direction="row"
          align="start"
          justify="between"
          pad="12px"
          gap="12px"
        >
          <Box fill>
            <ParagraphWS alignSelf="center">
              How much v-harm did your vehicle suffer?
            </ParagraphWS>
            <RedBox
              alignSelf="center"
              width="150px"
              align="center"
              justify="between"
              pad="24px"
              margin={{ vertical: '52px' }}
            >
              <FormField>
                <TextInput
                  type="number"
                  value={harm}
                  size="xlarge"
                  textAlign="center"
                  onChange={(e) => setHarm(parseInt(e.target.value))}
                />
              </FormField>
            </RedBox>
          </Box>
        </Box>
        <Box fill="horizontal" direction="row" justify="end" gap="small">
          <ButtonWS
            label="CANCEL"
            style={{
              background: 'transparent',
              textShadow:
                '0 0 1px #000, 0 0 3px #000, 0 0 5px #000, 0 0 10px #000',
            }}
            onClick={handleClose}
          />
          <ButtonWS
            label="ROLL"
            primary
            onClick={() =>
              !!harm && !performingSufferVHarmMove && handleSufferVHarmMove()
            }
            disabled={!harm || performingSufferVHarmMove}
          />
        </Box>
      </Box>
    </DialogWrapper>
  );
};

export default VHarmDialog;
