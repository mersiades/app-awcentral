import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, RadioButtonGroup, Select } from 'grommet';

import DialogWrapper from '../DialogWrapper';
import { StyledMarkdown } from '../styledComponents';
import {
  HeadingWS,
  ParagraphWS,
  ButtonWS,
  justGiveMotiveDialogBackground,
} from '../../config/grommetConfig';
import { CharacterMove, Move } from '../../@types/staticDataInterfaces';
import { useFonts } from '../../contexts/fontContext';
import { useGame } from '../../contexts/gameContext';
import { useMoves } from '../../contexts/movesContext';
import { logAmpEvent } from '../../config/amplitudeConfig';
import { CANCEL_TEXT, ROLL_TEXT } from '../../config/constants';

interface JustGiveMotiveDialogProps {
  move: Move | CharacterMove;
  handleClose: () => void;
}

const JustGiveMotiveDialog: FC<JustGiveMotiveDialogProps> = ({
  move,
  handleClose,
}) => {
  // ----------------------------- Component state -------------------------- //
  const [targetId, setTargetId] = useState<string | undefined>();
  const [target, setTarget] = useState<'PC' | 'NPC'>('NPC');

  // ----------------------------- 3rd party hooks -------------------------- //
  const { gameId } = useParams<{ gameId: string }>();

  // ----------------------------- Hooks ------------------------------------ //
  const { crustReady } = useFonts();
  const { userGameRole, otherPlayerGameRoles, character } = useGame();
  const {makeJustGiveMotivationMove , rollingMove} = useMoves()

  // ----------------------------- Component functions ---------------------- //
  const characters =
    otherPlayerGameRoles?.map((gameRole) => gameRole.characters[0]) || [];

  const handleJustGiveMotivationMove = async () => {
    if (
      !!userGameRole &&
      !!character &&
      !character.isDead &&
      !rollingMove
    ) {
      try {
        makeJustGiveMotivationMove!({
          variables: {
            gameId,
            gameRoleId: userGameRole.id,
            characterId: character.id,
            targetId,
          },
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
      background={justGiveMotiveDialogBackground}
      handleClose={handleClose}
    >
      <Box gap="12px">
        <HeadingWS crustReady={crustReady} level={4} alignSelf="start">
          {move.name}
        </HeadingWS>
        <StyledMarkdown>{move.description}</StyledMarkdown>
        <Box direction="row" gap="24px">
          <Box fill align="start" justify="start">
            <ParagraphWS alignSelf="start">
              What are you acting against?
            </ParagraphWS>
            <RadioButtonGroup
              justify="around"
              alignSelf="start"
              name="pc-or-npc"
              value={target}
              options={['NPC', 'PC']}
              onChange={(e: any) => {
                setTarget(e.target.value);
                e.target.value === 'NPC' && setTargetId(undefined);
              }}
            />
          </Box>
          {target === 'PC' && (
            <Box fill align="start" justify="start">
              <ParagraphWS alignSelf="start">
                What are you acting against?
              </ParagraphWS>
              <Select
                id="target-character-input"
                aria-label="target-character-input"
                name="target-character"
                placeholder="Who?"
                options={characters}
                labelKey={'name'}
                valueKey={'id'}
                onChange={(e) => setTargetId(e.value.id)}
              />
            </Box>
          )}
        </Box>
        <Box fill="horizontal" direction="row" justify="end" gap="small">
          <ButtonWS
            label={CANCEL_TEXT}
            style={{
              background: 'transparent',
              textShadow:
                '0 0 1px #000, 0 0 3px #000, 0 0 5px #000, 0 0 10px #000',
            }}
            onClick={handleClose}
          />
          <ButtonWS
            label={ROLL_TEXT}
            primary
            onClick={() => !rollingMove && handleJustGiveMotivationMove()}
            disabled={rollingMove || (target === 'PC' && !targetId)}
          />
        </Box>
      </Box>
    </DialogWrapper>
  );
};

export default JustGiveMotiveDialog;
