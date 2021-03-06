import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Box, Select } from 'grommet';

import DialogWrapper from '../DialogWrapper';
import { StyledMarkdown } from '../styledComponents';
import {
  HeadingWS,
  ParagraphWS,
  ButtonWS,
  hocusSpecialDialogBackground,
} from '../../config/grommetConfig';
import { CharacterMove, Move } from '../../@types/staticDataInterfaces';
import { useFonts } from '../../contexts/fontContext';
import { useGame } from '../../contexts/gameContext';
import PERFORM_HOCUS_SPECIAL_MOVE, {
  PerformHocusSpecialMoveData,
  PerformHocusSpecialMoveVars,
} from '../../mutations/performHocusSpecialMove';
import { logAmpEvent } from '../../config/amplitudeConfig';

interface HocusSpecialDialogProps {
  move: Move | CharacterMove;
  handleClose: () => void;
}

const HocusSpecialDialog: FC<HocusSpecialDialogProps> = ({
  move,
  handleClose,
}) => {
  // ----------------------------- Component state ------------------------------ //
  const [otherCharacterId, setotherCharacterId] = useState('');
  // ----------------------------- 3rd party hooks ------------------------------- //
  const { gameId } = useParams<{ gameId: string }>();

  // ----------------------------- Hooks ---------------------------------------- //
  const { crustReady } = useFonts();
  const { userGameRole, otherPlayerGameRoles, character } = useGame();

  // ----------------------------- GraphQL -------------------------------------- //
  const [performHocusSpecialMove, { loading: performingHocusSpecialMove }] =
    useMutation<PerformHocusSpecialMoveData, PerformHocusSpecialMoveVars>(
      PERFORM_HOCUS_SPECIAL_MOVE
    );

  // ----------------------------- Component functions ------------------------- //
  const characters =
    otherPlayerGameRoles?.map((gameRole) => gameRole.characters[0]) || [];
  const handleHocusSpecialMove = async () => {
    if (
      !!userGameRole &&
      !!character &&
      !character.isDead &&
      !performingHocusSpecialMove &&
      !!otherCharacterId
    ) {
      const otherGameroleId = otherPlayerGameRoles?.find((gameRole) => {
        let isMatch = false;
        gameRole.characters.forEach((character) => {
          if (character.id === otherCharacterId) isMatch = true;
        });
        return isMatch;
      })?.id;

      if (!otherGameroleId) return;

      try {
        performHocusSpecialMove({
          variables: {
            gameId,
            gameRoleId: userGameRole.id,
            otherGameroleId,
            characterId: character.id,
            otherCharacterId,
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
      background={hocusSpecialDialogBackground}
      handleClose={handleClose}
    >
      <Box gap="12px">
        <HeadingWS crustReady={crustReady} level={4} alignSelf="start">
          {move.name}
        </HeadingWS>
        <StyledMarkdown>{move.description}</StyledMarkdown>
        <Box fill align="start" justify="start">
          <ParagraphWS alignSelf="start">
            Who did you have sex with?
          </ParagraphWS>
          <Select
            id="target-character-input"
            aria-label="target-character-input"
            name="target-character"
            placeholder="Who?"
            options={characters}
            labelKey={'name'}
            valueKey={'id'}
            onChange={(e) => setotherCharacterId(e.value.id)}
          />
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
            label="APPLY"
            primary
            onClick={() =>
              !performingHocusSpecialMove &&
              !!otherCharacterId &&
              handleHocusSpecialMove()
            }
            disabled={performingHocusSpecialMove || !otherCharacterId}
          />
        </Box>
      </Box>
    </DialogWrapper>
  );
};

export default HocusSpecialDialog;
