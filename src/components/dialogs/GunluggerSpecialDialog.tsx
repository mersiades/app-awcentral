import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, RadioButtonGroup, Select } from 'grommet';

import DialogWrapper from '../DialogWrapper';
import { StyledMarkdown } from '../styledComponents';
import {
  HeadingWS,
  ParagraphWS,
  ButtonWS,
  gunluggerSpecialDialogBackground
} from '../../config/grommetConfig';
import { CharacterMove, Move } from '../../@types/staticDataInterfaces';
import { useFonts } from '../../contexts/fontContext';
import { useGame } from '../../contexts/gameContext';
import { logAmpEvent } from '../../config/amplitudeConfig';
import { APPLY_TEXT, CANCEL_TEXT } from '../../config/constants';
import { useMoves } from '../../contexts/movesContext';

interface GunluggerSpecialDialogProps {
  move: Move | CharacterMove;
  handleClose: () => void;
}

const GunluggerSpecialDialog: FC<GunluggerSpecialDialogProps> = ({
                                                                   move,
                                                                   handleClose
                                                                 }) => {
  // ----------------------------- Component state -------------------------- //
  const [otherCharacterId, setOtherCharacterId] = useState('');
  const [addPlus1Forward, setAddPlus1Forward] = useState<string | undefined>();
  // ----------------------------- 3rd party hooks -------------------------- //
  const { gameId } = useParams<{ gameId: string }>();

  // ----------------------------- Hooks ------------------------------------ //
  const { crustReady } = useFonts();
  const { userGameRole, otherPlayerGameRoles, character } = useGame();
  const { makeGunluggerSpecialMove, rollingMove } = useMoves();

  // ----------------------------- Component functions ---------------------- //
  const characters =
    otherPlayerGameRoles?.map((gameRole) => gameRole.characters[0]) || [];
  const handleGunluggerSpecialMove = async () => {
    if (
      gameId &&
      !!userGameRole &&
      !!character &&
      !character.isDead &&
      !rollingMove &&
      !!otherCharacterId &&
      !!addPlus1Forward
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
        makeGunluggerSpecialMove!({
          variables: {
            gameId,
            gameRoleId: userGameRole.id,
            otherGameroleId,
            characterId: character.id,
            otherCharacterId,
            addPlus1Forward: addPlus1Forward === 'Yes'
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
      background={gunluggerSpecialDialogBackground}
      handleClose={handleClose}
    >
      <Box gap='12px'>
        <HeadingWS crustReady={crustReady} level={4} alignSelf='start'>
          {move.name}
        </HeadingWS>
        <StyledMarkdown>{move.description}</StyledMarkdown>
        <Box direction='row' gap='24px'>
          <Box fill align='start' justify='start'>
            <ParagraphWS alignSelf='start'>
              Who did you have sex with?
            </ParagraphWS>
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
          <Box fill align='start' justify='start'>
            <ParagraphWS alignSelf='start'>
              Do you want them to get a +1forward?
            </ParagraphWS>
            <RadioButtonGroup
              direction='row'
              justify='around'
              alignSelf='center'
              name='hxChange'
              value={addPlus1Forward}
              options={['Yes', 'No']}
              onChange={(e: any) => setAddPlus1Forward(e.target.value)}
            />
          </Box>
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
              handleGunluggerSpecialMove()
            }
            disabled={
              rollingMove ||
              !otherCharacterId ||
              !addPlus1Forward
            }
          />
        </Box>
      </Box>
    </DialogWrapper>
  );
};

export default GunluggerSpecialDialog;
