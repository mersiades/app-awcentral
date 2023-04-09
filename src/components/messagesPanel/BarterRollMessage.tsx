import React, { FC } from 'react';
import { Box } from 'grommet';

import MoveMessage from './MoveMessage';
import { StyledMarkdown } from '../styledComponents';
import { useFonts } from '../../contexts/fontContext';
import { HeadingWS, ParagraphWS, TextWS } from '../../config/grommetConfig';
import { getDiceImage } from '../../helpers/getDiceImage';
import { MessageProps } from './MessagesPanel';

export interface BarterRollMessageProps extends MessageProps {
}

const BarterRollMessage: FC<BarterRollMessageProps> = ({
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
      <Box fill>
        <Box
          fill='horizontal'
          direction='row'
          align='center'
          justify='center'
          pad='12px'
        >
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
                margin={{ top: '32px', bottom: '3px', horizontal: '3px' }}
              >
                {message.barterSpent}
              </HeadingWS>
              <TextWS>BARTER</TextWS>
            </Box>
            {message.usedPlusOneForward && (
              <>
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
                    1
                  </HeadingWS>
                  <TextWS>FWD</TextWS>
                </Box>
              </>
            )}
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
        <Box direction='row' justify='around' align='center'>
          <ParagraphWS alignSelf='start'>
            {`Barter spent: ${message.barterSpent}`}
          </ParagraphWS>
          <ParagraphWS alignSelf='start'>
            {`Barter left: ${message.currentBarter}`}
          </ParagraphWS>
        </Box>
        <StyledMarkdown>{message.content}</StyledMarkdown>
      </Box>
    </MoveMessage>
  );
};

export default BarterRollMessage;
