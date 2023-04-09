import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Select } from 'grommet';

import DialogWrapper from '../DialogWrapper';
import { StyledMarkdown } from '../styledComponents';
import {
  HeadingWS,
  ParagraphWS,
  ButtonWS,
  angelSpecialBackground
} from '../../config/grommetConfig';
import { CharacterMove, Move } from '../../@types/staticDataInterfaces';
import { useFonts } from '../../contexts/fontContext';
import { useGame } from '../../contexts/gameContext';
import { useMoves } from '../../contexts/movesContext';
import { logAmpEvent } from '../../config/amplitudeConfig';
import {
  APPLY_TEXT,
  CANCEL_TEXT,
  WITH_WHO_QUESTION
} from '../../config/constants';

interface AngelSpecialDialogProps {
  move: Move | CharacterMove;
  handleClose: () => void;
}

const AngelSpecialDialog: FC<AngelSpecialDialogProps> = ({
                                                           move,
                                                           handleClose
                                                         }) => {
  // ----------------------------- Component state -------------------------- //
  const [otherCharacterId, setOtherCharacterId] = useState('');
  // ----------------------------- 3rd party hooks -------------------------- //
  const { gameId } = useParams<{ gameId: string }>();

  // ----------------------------- Hooks ------------------------------------ //
  const { crustReady } = useFonts();
  const { userGameRole, otherPlayerGameRoles, character } = useGame();
  const { makeAngelSpecialMove, rollingMove } = useMoves();

  // ----------------------------- Component functions ---------------------- //
  const characters =
    otherPlayerGameRoles?.map((gameRole) => gameRole.characters[0]) || [];
  const handleAngelSpecialMove = async () => {
    if (
      gameId &&
      !!userGameRole &&
      !!character &&
      !character.isDead &&
      !rollingMove &&
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
        makeAngelSpecialMove!({
          variables: {
            gameId,
            gameRoleId: userGameRole.id,
            otherGameroleId,
            characterId: character.id,
            otherCharacterId
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
      background={angelSpecialBackground}
      handleClose={handleClose}
    >
      <Box data-testid='angel-special-dialog' gap='12px'>
        <HeadingWS crustReady={crustReady} level={4} alignSelf='start'>
          {move.name}
        </HeadingWS>
        <StyledMarkdown>{move.description}</StyledMarkdown>
        <Box fill align='start' justify='start'>
          <ParagraphWS alignSelf='start'>{WITH_WHO_QUESTION}</ParagraphWS>
          <Select
            id='target-character-input'
            aria-label='target-character-input'
            name='target-character'
            placeholder='Select'
            options={characters}
            labelKey={'name'}
            valueKey={'id'}
            onChange={(e) => setOtherCharacterId(e.value.id)}
          />
        </Box>
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
            label={APPLY_TEXT}
            primary
            onClick={() =>
              !rollingMove &&
              !!otherCharacterId &&
              handleAngelSpecialMove()
            }
            disabled={rollingMove || !otherCharacterId}
          />
        </Box>
      </Box>
    </DialogWrapper>
  );
};

export default AngelSpecialDialog;
