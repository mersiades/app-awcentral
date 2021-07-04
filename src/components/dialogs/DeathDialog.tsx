import React, { FC } from 'react';
import { Box } from 'grommet';

import DialogWrapper from '../DialogWrapper';
import {
  HeadingWS,
  ButtonWS,
  deathDialogBackground,
  TextWS,
} from '../../config/grommetConfig';
import { useFonts } from '../../contexts/fontContext';
import { useGame } from '../../contexts/gameContext';
import {
  ADD_CHANGE_PLAYBOOK_TEXT_1,
  ADD_CHANGE_PLAYBOOK_TEXT_2,
  ADD_DIE_TEXT_1,
  ADD_DIE_TEXT_2,
  ADD_HARD_MINUS_1_TEXT,
  ADD_WEIRD_1_TEXT,
  CANCEL_TEXT,
  DEATH_CHANGE_PLAYBOOK_NAME,
  DEATH_WEIRD_MAX_3_NAME,
  DIE_NAME,
  DO_IT_TEXT,
  HARD_MINUS_1_NAME,
  MAKE_CHANGE_TEXT,
  REMOVE_CHANGE_PLAYBOOK_TEXT,
  REMOVE_DIE_TEXT_1,
  REMOVE_DIE_TEXT_2,
  REMOVE_HARD_MINUS_1_TEXT,
  REMOVE_WEIRD_1_TEXT,
} from '../../config/constants';
import { getUniqueFromPlaybookType } from '../../helpers/getUniqueFromPlaybookType';

interface DeathDialogProps {
  addedMoves: string[];
  removedMoves: string[];
  settingDeathMoves: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const DeathDialog: FC<DeathDialogProps> = ({
  addedMoves,
  removedMoves,
  settingDeathMoves,
  handleClose,
  handleConfirm,
}) => {
  // ----------------------------- Hooks ---------------------------------------- //
  const { crustReady } = useFonts();
  const { character } = useGame();

  // ----------------------------- GraphQL -------------------------------------- //

  // ----------------------------- Component functions ------------------------- //

  const getText = () => {
    const textArray: string[] = [];
    if (addedMoves.includes(HARD_MINUS_1_NAME)) {
      textArray.push(ADD_HARD_MINUS_1_TEXT);
    }

    if (addedMoves.includes(DEATH_WEIRD_MAX_3_NAME)) {
      textArray.push(ADD_WEIRD_1_TEXT);
    }

    if (addedMoves.includes(DEATH_CHANGE_PLAYBOOK_NAME) && !!character) {
      textArray.push(
        `${ADD_CHANGE_PLAYBOOK_TEXT_1} ${getUniqueFromPlaybookType(
          character.playbook
        )}, ${ADD_CHANGE_PLAYBOOK_TEXT_2}`
      );
    }

    if (addedMoves.includes(DIE_NAME) && !!character) {
      textArray.push(`${ADD_DIE_TEXT_1} ${character.name} ${ADD_DIE_TEXT_2}`);
    }

    if (removedMoves.includes(HARD_MINUS_1_NAME)) {
      textArray.push(REMOVE_HARD_MINUS_1_TEXT);
    }

    if (removedMoves.includes(DEATH_WEIRD_MAX_3_NAME)) {
      textArray.push(REMOVE_WEIRD_1_TEXT);
    }

    if (removedMoves.includes(DEATH_CHANGE_PLAYBOOK_NAME) && !!character) {
      textArray.push(REMOVE_CHANGE_PLAYBOOK_TEXT);
    }

    if (removedMoves.includes(DIE_NAME) && !!character) {
      textArray.push(
        `${REMOVE_DIE_TEXT_1} ${character.name} ${REMOVE_DIE_TEXT_2}`
      );
    }
    return textArray;
  };

  // ----------------------------- Render ---------------------------------------- //

  return (
    <DialogWrapper background={deathDialogBackground} handleClose={handleClose}>
      <Box gap="12px">
        <HeadingWS crustReady={crustReady} level={4} alignSelf="start">
          {MAKE_CHANGE_TEXT}
        </HeadingWS>
        <TextWS>This will:</TextWS>
        <ul>
          {getText().map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>
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
            label={DO_IT_TEXT}
            primary
            onClick={() => !settingDeathMoves && handleConfirm()}
            disabled={settingDeathMoves}
          />
        </Box>
      </Box>
    </DialogWrapper>
  );
};

export default DeathDialog;
