import { Box } from 'grommet';
import React from 'react';
import { boardVehicleDialogBackground, HeadingWS } from '../../config/grommetConfig';
import { useFonts } from '../../contexts/fontContext';
import { useMcContent } from '../../contexts/mcContentContext';
import CloseButton from '../CloseButton';
import DialogWrapper from '../DialogWrapper';
import { StyledMarkdown } from '../styledComponents';

const FirstSessionDialog = () => {
  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { crustReady } = useFonts();
  const { firstSession } = useMcContent();

  const handleClose = () => console.log('closing');
  return (
    <DialogWrapper background={boardVehicleDialogBackground} handleClose={handleClose}>
      <Box pad="12px" overflow="auto" align="center" justify="center">
        <CloseButton handleClose={handleClose} />

        <Box direction="row" gap="12px" wrap>
          <Box style={{ maxWidth: '590px' }}>
            <HeadingWS crustReady={crustReady} level={2} margin={{ top: '6px', bottom: '6px' }}>
              The first session
            </HeadingWS>
            <Box>
              <StyledMarkdown>{firstSession?.intro}</StyledMarkdown>
            </Box>
          </Box>
          <Box style={{ maxWidth: '590px' }}>
            <HeadingWS crustReady={crustReady} level={3} alignSelf="start">
              {firstSession?.duringFirstSession.title}
            </HeadingWS>
            {firstSession?.duringFirstSession.items.map((item) => (
              <StyledMarkdown key={item}>{item}</StyledMarkdown>
            ))}
          </Box>
          <Box style={{ maxWidth: '590px' }}>
            <HeadingWS crustReady={crustReady} level={3} alignSelf="start">
              {firstSession?.threatMapInstructions.title}
            </HeadingWS>
            <StyledMarkdown>{firstSession?.threatMapInstructions.content}</StyledMarkdown>
          </Box>
          <Box>
            <HeadingWS crustReady={crustReady} level={3} alignSelf="start">
              {firstSession?.afterFirstSession.title}
            </HeadingWS>
            {firstSession?.afterFirstSession.items.map((item) => (
              <StyledMarkdown key={item}>{item}</StyledMarkdown>
            ))}
          </Box>
        </Box>
      </Box>
    </DialogWrapper>
  );
};

export default FirstSessionDialog;
