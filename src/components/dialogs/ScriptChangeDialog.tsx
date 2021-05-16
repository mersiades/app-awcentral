import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import { Anchor, Box, BoxProps, FormField, TextInput } from 'grommet';

import DialogWrapper from '../DialogWrapper';
import { warningDialogBackground, HeadingWS, ButtonWS, ParagraphWS, brandColor, TextWS } from '../../config/grommetConfig';
import { useFonts } from '../../contexts/fontContext';
import {
  CANCEL_TEXT,
  SCRIPT_CHANGE_FAST_FORWARD_CONTENT,
  SCRIPT_CHANGE_FAST_FORWARD_TITLE,
  SCRIPT_CHANGE_FRAME_CONTENT,
  SCRIPT_CHANGE_FRAME_TITLE,
  SCRIPT_CHANGE_PAUSE_CONTENT,
  SCRIPT_CHANGE_PAUSE_TITLE,
  SCRIPT_CHANGE_REPLAY_CONTENT,
  SCRIPT_CHANGE_REPLAY_TITLE,
  SCRIPT_CHANGE_RESUME_CONTENT,
  SCRIPT_CHANGE_RESUME_TITLE,
  SCRIPT_CHANGE_REWIND_CONTENT,
  SCRIPT_CHANGE_REWIND_TITLE,
  SCRIPT_CHANGE_TITLE,
} from '../../config/constants';
import { ScriptChangeType } from '../../@types/enums';
import { useMutation } from '@apollo/client';
import CHANGE_SCRIPT, { ChangeScriptData, ChangeScriptVars } from '../../mutations/changeScript';
import { useGame } from '../../contexts/gameContext';

interface ScriptChangeDialogProps {
  handleClose: () => void;
}

const RedBox = styled(Box as FC<BoxProps & JSX.IntrinsicElements['div']>)(() => {
  return css`
    border-color: ${brandColor};
    border-width: 1px;
    border-style: solid;
    cursor: pointer;
    &:hover {
      background-color: rgba(205, 63, 62, 0.25);
    }
    &:focus {
      outline: 0;
      box-shadow: none;
      border-color: #fff;
      color: #fff;
    }
  `;
});

const ScriptChangeDialog: FC<ScriptChangeDialogProps> = ({ handleClose }) => {
  // -------------------------------------------------- Component state ---------------------------------------------------- //
  const [comment, setComment] = useState<string>('');

  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { game } = useGame();
  const { crustReady } = useFonts();

  // ------------------------------------------------------ GraphQL -------------------------------------------------------- //
  const [changeScript, { loading: changingScript }] = useMutation<ChangeScriptData, ChangeScriptVars>(CHANGE_SCRIPT);

  // ------------------------------------------------ Component functions -------------------------------------------------- //

  const handleSubmit = (scriptChangeType: ScriptChangeType) => {
    if (!!game) {
      try {
        changeScript({ variables: { gameId: game.id, scriptChangeType, comment } });
      } catch (error) {
        console.error(error);
      }
    }
    handleClose();
  };

  // ------------------------------------------------------- Render -------------------------------------------------------- //
  const generateTile = (title: string, content: string, scriptChangeType: ScriptChangeType) => (
    <RedBox align="center" border pad="12px" flex="grow" onClick={() => !changingScript && handleSubmit(scriptChangeType)}>
      <HeadingWS crustReady={crustReady} level={3} margin={{ bottom: '0px' }}>
        {title}
      </HeadingWS>
      <ParagraphWS textAlign="center" style={{ cursor: 'pointer' }}>
        {content}
      </ParagraphWS>
    </RedBox>
  );

  const attribution = (
    <Box>
      <TextWS>
        Script Change was created by{' '}
        <strong>
          <em>Beau Jágr Sheldon</em>
        </strong>{' '}
        and you can and should{' '}
        <Anchor href="http://briebeau.com/scriptchange" target="_blank" rel="noopener noreferrer">
          read more about it here
        </Anchor>
        .
      </TextWS>
    </Box>
  );

  return (
    <DialogWrapper background={warningDialogBackground} handleClose={handleClose}>
      <Box data-testid={'script-change-dialog'} gap="12px" width="700px" overflow="auto">
        <HeadingWS crustReady={crustReady} level={4} alignSelf="start">
          {SCRIPT_CHANGE_TITLE}
        </HeadingWS>
        <Box flex="grow">
          <FormField width="100%" label="Add a comment to your call (optional), then click a box below">
            <TextInput
              placeholder="Type comment"
              aria-label="script-change-comment-input"
              size="large"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </FormField>
        </Box>
        <Box fill="horizontal" direction="row" gap="small" flex="grow">
          <Box fill="horizontal" gap="small">
            {generateTile(SCRIPT_CHANGE_PAUSE_TITLE, SCRIPT_CHANGE_PAUSE_CONTENT, ScriptChangeType.pause)}
            {generateTile(SCRIPT_CHANGE_RESUME_TITLE, SCRIPT_CHANGE_RESUME_CONTENT, ScriptChangeType.resume)}
          </Box>
          <Box fill="horizontal" gap="small">
            {generateTile(SCRIPT_CHANGE_REPLAY_TITLE, SCRIPT_CHANGE_REPLAY_CONTENT, ScriptChangeType.replay)}
            {generateTile(SCRIPT_CHANGE_FAST_FORWARD_TITLE, SCRIPT_CHANGE_FAST_FORWARD_CONTENT, ScriptChangeType.forward)}
          </Box>
          <Box fill="horizontal" gap="small">
            {generateTile(SCRIPT_CHANGE_REWIND_TITLE, SCRIPT_CHANGE_REWIND_CONTENT, ScriptChangeType.rewind)}
            {generateTile(SCRIPT_CHANGE_FRAME_TITLE, SCRIPT_CHANGE_FRAME_CONTENT, ScriptChangeType.frame)}
          </Box>
        </Box>
        <Box flex="grow">{attribution}</Box>
        <Box fill="horizontal" direction="row" justify="end" gap="small" flex="grow">
          <ButtonWS
            label={CANCEL_TEXT}
            style={{
              background: 'transparent',
              textShadow: '0 0 1px #000, 0 0 3px #000, 0 0 5px #000, 0 0 10px #000',
            }}
            onClick={handleClose}
          />
        </Box>
      </Box>
    </DialogWrapper>
  );
};

export default ScriptChangeDialog;
