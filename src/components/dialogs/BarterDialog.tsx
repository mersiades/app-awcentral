import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, FormField, TextInput } from 'grommet';

import DialogWrapper from '../DialogWrapper';
import {
  HeadingWS,
  ParagraphWS,
  ButtonWS,
  barterBackground,
  RedBox,
} from '../../config/grommetConfig';
import { CharacterMove, Move } from '../../@types/staticDataInterfaces';
import { useFonts } from '../../contexts/fontContext';
import { useGame } from '../../contexts/gameContext';
import { logAmpEvent } from '../../config/amplitudeConfig';
import { useMoves } from '../../contexts/movesContext';

interface BarterDialogProps {
  move: Move | CharacterMove;
  handleClose: () => void;
}

const BarterDialog: FC<BarterDialogProps> = ({ move, handleClose }) => {
  // ----------------------------- Component state -------------------------- //
  const [barter, setBarter] = useState(
    move.name === 'LIFESTYLE AND GIGS' ? 0 : 1
  );
  // ----------------------------- 3rd party hooks -------------------------- //
  const { gameId } = useParams<{ gameId: string }>();

  // ----------------------------- Hooks ------------------------------------ //
  const { crustReady } = useFonts();
  const { userGameRole, character } = useGame();
  const { makeBarterMove, rollingMove} = useMoves()

  // ----------------------------- Component functions ---------------------- //
  const currentBarter = character?.barter || 0;

  const handleBarterMove = async (
    move: Move | CharacterMove,
    barter: number
  ) => {
    if (currentBarter - barter < 0) {
      console.warn("You don't have enough barter");
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
        makeBarterMove!({
          variables: {
            gameId,
            gameRoleId: userGameRole.id,
            characterId: character.id,
            moveId: move.id,
            barter,
          },
        });
        logAmpEvent('make move', { move: move.name });
        handleClose();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getText = () => {
    switch (move.name) {
      case 'LIFESTYLE AND GIGS':
        return 'How much barter will you spend?';
      case 'GIVE BARTER':
        return 'Give 1-barter?';
      default:
    }
  };
  // ----------------------------- Render ---------------------------------------- //

  return (
    <DialogWrapper background={barterBackground} handleClose={handleClose}>
      <Box gap="24px">
        <HeadingWS crustReady={crustReady} level={4} alignSelf="start">
          {move.name}
        </HeadingWS>
        {move.name === 'GIVE BARTER' ? (
          <ParagraphWS alignSelf="start">{getText()}</ParagraphWS>
        ) : (
          <>
            <ParagraphWS alignSelf="start">{getText()}</ParagraphWS>
            <RedBox
              alignSelf="center"
              width="150px"
              align="center"
              justify="between"
              pad="24px"
            >
              <FormField>
                <TextInput
                  type="number"
                  value={barter}
                  size="xlarge"
                  textAlign="center"
                  onChange={(e) => setBarter(parseInt(e.target.value))}
                />
              </FormField>
            </RedBox>
          </>
        )}
        <ParagraphWS alignSelf="start">{`You currently have ${currentBarter} barter`}</ParagraphWS>
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
            label={move.name === 'LIFESTYLE AND GIGS' ? 'SPEND' : 'GIVE'}
            data-testid={
              move.name === 'LIFESTYLE AND GIGS'
                ? 'spend-button'
                : 'give-button'
            }
            primary
            onClick={() =>
              !!barter &&
              !rollingMove &&
              handleBarterMove(move, barter)
            }
            disabled={
              !barter ||
              rollingMove ||
              (!!character?.barter && barter > character.barter)
            }
          />
        </Box>
      </Box>
    </DialogWrapper>
  );
};

export default BarterDialog;
