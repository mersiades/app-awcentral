import React, { FC } from 'react';
import { Box } from 'grommet';

import DialogWrapper from '../DialogWrapper';
import { warningDialogBackground, HeadingWS, ButtonWS } from '../../config/grommetConfig';
import { useFonts } from '../../contexts/fontContext';
import { CANCEL_TEXT } from '../../config/constants';

export const SCRIPT_CHANGE_TITLE = 'Script Change';

interface ScriptChangeDialogProps {
  handleClose: () => void;
}

const ScriptChangeDialog: FC<ScriptChangeDialogProps> = ({ handleClose }) => {
  const { crustReady } = useFonts();
  return (
    <DialogWrapper background={warningDialogBackground} handleClose={handleClose}>
      <Box data-testid={'script-change-dialog'} gap="12px">
        <HeadingWS crustReady={crustReady} level={4} alignSelf="start">
          {SCRIPT_CHANGE_TITLE}
        </HeadingWS>
        <Box fill="horizontal" direction="row" justify="end" gap="small">
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
