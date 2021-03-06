import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Box } from 'grommet';

import CloseButton from '../CloseButton';
import DialogWrapper from '../DialogWrapper';
import { StyledMarkdown } from '../styledComponents';
import {
  boardVehicleDialogBackground,
  HeadingWS,
} from '../../config/grommetConfig';
import CLOSE_FIRST_SESSION, {
  CloseFirstSessionData,
  CloseFirstSessionVars,
  getCloseFirstSessionOR,
} from '../../mutations/closeFirstSession';
import { useFonts } from '../../contexts/fontContext';
import { useMcContent } from '../../contexts/mcContentContext';

const FirstSessionDialog = () => {
  // ----------------------------- 3rd party hooks ------------------------------- //
  const { gameId } = useParams<{ gameId: string }>();

  // ----------------------------- Hooks ---------------------------------------- //
  const { crustReady } = useFonts();
  const { firstSession } = useMcContent();

  // ----------------------------- GraphQL -------------------------------------- //
  const [closeFirstSession, { loading: closingFirstSession }] = useMutation<
    CloseFirstSessionData,
    CloseFirstSessionVars
  >(CLOSE_FIRST_SESSION);

  // ----------------------------- Component functions ------------------------- //
  const handleClose = async () => {
    if (!!gameId && !closingFirstSession) {
      try {
        await closeFirstSession({
          variables: { gameId },
          optimisticResponse: getCloseFirstSessionOR(
            gameId
          ) as CloseFirstSessionData,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  // ----------------------------- Render ---------------------------------------- //
  return (
    <DialogWrapper
      background={boardVehicleDialogBackground}
      handleClose={handleClose}
    >
      <Box pad="12px" overflow="auto" align="center" justify="center">
        <CloseButton handleClose={handleClose} />

        <Box direction="row" gap="12px" wrap>
          <Box style={{ maxWidth: '590px' }}>
            <HeadingWS
              crustReady={crustReady}
              level={2}
              margin={{ top: '6px', bottom: '6px' }}
            >
              The first session
            </HeadingWS>
            <Box>
              <StyledMarkdown>
                {!!firstSession?.intro ? firstSession.intro : '...'}
              </StyledMarkdown>
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
            <StyledMarkdown>
              {!!firstSession?.threatMapInstructions.content
                ? firstSession.threatMapInstructions.content
                : '...'}
            </StyledMarkdown>
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
