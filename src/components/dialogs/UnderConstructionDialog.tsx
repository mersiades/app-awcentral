import React, { FC } from 'react';
import { Box } from 'grommet';

import DialogWrapper from '../DialogWrapper';
import {
  warningDialogBackground,
  HeadingWS,
  ButtonWS,
  ParagraphWS,
} from '../../config/grommetConfig';
import { useFonts } from '../../contexts/fontContext';

interface UnderConstructionDialogProps {
  handleClose: () => void;
}

const UnderConstructionDialog: FC<UnderConstructionDialogProps> = ({
  handleClose,
}) => {
  const { crustReady } = useFonts();
  return (
    <DialogWrapper
      background={warningDialogBackground}
      handleClose={handleClose}
    >
      <Box data-testid="under-construction-dialog" gap="12px">
        <HeadingWS crustReady={crustReady} level={4} alignSelf="start">
          Unavailable
        </HeadingWS>
        <ParagraphWS>
          Sorry, I haven't found the time to build this bit yet.
        </ParagraphWS>
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
        </Box>
      </Box>
    </DialogWrapper>
  );
};

export default UnderConstructionDialog;
