import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, FormField, Select, TextInput } from 'grommet';

import DialogWrapper from '../DialogWrapper';
import { StyledMarkdown } from '../styledComponents';
import {
  HeadingWS,
  ParagraphWS,
  ButtonWS,
  RedBox,
  healHarmBackground
} from '../../config/grommetConfig';
import { CharacterMove, Move } from '../../@types/staticDataInterfaces';
import { useFonts } from '../../contexts/fontContext';
import { useGame } from '../../contexts/gameContext';
import { useMoves } from '../../contexts/movesContext';
import { logAmpEvent } from '../../config/amplitudeConfig';

interface HealHarmDialogProps {
  move: Move | CharacterMove;
  handleClose: () => void;
}

const HealHarmDialog: FC<HealHarmDialogProps> = ({ move, handleClose }) => {
  // ----------------------------- Component state -------------------------- //
  const [otherCharacterId, setOtherCharacterId] = useState('');
  const [harm, setHarm] = useState(0);
  // ----------------------------- 3rd party hooks -------------------------- //
  const { gameId } = useParams<{ gameId: string }>();

  // ----------------------------- Hooks ------------------------------------ //
  const { crustReady } = useFonts();
  const { userGameRole, otherPlayerGameRoles, character } = useGame();
  const { makeHealHarmMove, rollingMove } = useMoves();

  // ----------------------------- Component functions ---------------------- //
  const characters =
    otherPlayerGameRoles?.map((gameRole) => gameRole.characters[0]) || [];
  const handleHealHarmMove = async () => {
    if (
      gameId &&
      !!userGameRole &&
      !!character &&
      !character.isDead &&
      !rollingMove &&
      harm > 0 &&
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
        makeHealHarmMove!({
          variables: {
            gameId,
            gameRoleId: userGameRole.id,
            otherGameroleId,
            characterId: character.id,
            otherCharacterId,
            harm
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
    <DialogWrapper background={healHarmBackground} handleClose={handleClose}>
      <Box gap='24px'>
        <HeadingWS crustReady={crustReady} level={4} alignSelf='start'>
          {move.name}
        </HeadingWS>
        <StyledMarkdown>{move.description}</StyledMarkdown>
        <Box
          fill
          direction='row'
          align='start'
          justify='between'
          pad='12px'
          gap='12px'
        >
          <Box fill>
            <ParagraphWS alignSelf='start'>Who did you heal?</ParagraphWS>
            <Select
              id='target-character-input'
              aria-label='target-character-input'
              name='target-character'
              placeholder='Who?'
              options={characters}
              labelKey={'name'}
              valueKey={'id'}
              onChange={(e) => setOtherCharacterId(e.value.id)}
            />
          </Box>
          <Box fill>
            <ParagraphWS alignSelf='center'>
              ...and how much did you heal?
            </ParagraphWS>
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
            label='APPLY'
            primary
            onClick={() =>
              !rollingMove &&
              harm > 0 &&
              !!otherCharacterId &&
              handleHealHarmMove()
            }
            disabled={rollingMove || harm === 0 || !otherCharacterId}
          />
        </Box>
      </Box>
    </DialogWrapper>
  );
};

export default HealHarmDialog;
