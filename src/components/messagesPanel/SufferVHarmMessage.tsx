import React, { FC } from 'react';
import { Box } from 'grommet';

import MoveMessage from './MoveMessage';
import { StyledMarkdown } from '../styledComponents';
import { useFonts } from '../../contexts/fontContext';
import { HeadingWS, TextWS } from '../../config/grommetConfig';
import { getDiceImage } from '../../helpers/getDiceImage';
import { MessageProps } from './MessagesPanel';

export interface SufferVHarmMessageProps extends MessageProps {
}

const SufferVHarmMessage: FC<SufferVHarmMessageProps> = ({
                                                           message,
                                                           messagesLength,
                                                           index,
                                                           ticker,
                                                           closeForRoll
                                                         }) => {
  // ----------------------------- Hooks ------------------------------------ //
  const { crustReady, vtksReady } = useFonts();

  // ----------------------------- Render ----------------------------------- //
  return (
    <MoveMessage
      message={message}
      messagesLength={messagesLength}
      index={index}
      ticker={ticker}
      closeForRoll={closeForRoll}
    >
      <Box fill justify='center' align='center'>
        <Box fill='horizontal' align='center' justify='center' pad='12px'>
          <Box direction='row' align='center' justify='around' width='67%'>
            {getDiceImage(message.roll1)}
            <HeadingWS
              crustReady={crustReady}
              level={2}
              color='brand'
              margin='3px'
            >
              +
            </HeadingWS>
            {getDiceImage(message.roll2)}
            <HeadingWS
              crustReady={crustReady}
              level={2}
              color='brand'
              margin='3px'
            >
              +
            </HeadingWS>
            <Box align='center' justify='between' pad='12px'>
              <HeadingWS
                crustReady={crustReady}
                level={2}
                color='brand'
                margin={{ top: '32px', bottom: '0px', horizontal: '3px' }}
              >
                {message.harmSuffered}
              </HeadingWS>
              <TextWS>HARM</TextWS>
            </Box>
            <HeadingWS
              crustReady={crustReady}
              level={2}
              color='brand'
              margin='3px'
            >
              =
            </HeadingWS>
            <Box
              align='center'
              justify='between'
              pad={{ vertical: '12px', horizontal: '24px' }}
            >
              <HeadingWS
                vtksReady={vtksReady}
                level={1}
                color='brand'
                margin='3px'
                style={{ fontSize: '80px' }}
              >
                {message.rollResult}
              </HeadingWS>
            </Box>
          </Box>
        </Box>
        <StyledMarkdown>{message.content}</StyledMarkdown>
      </Box>
    </MoveMessage>
  );
};

export default SufferVHarmMessage;
