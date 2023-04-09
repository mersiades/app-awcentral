import React, { FC } from 'react';
import { Box } from 'grommet';

import MoveMessage from './MoveMessage';
import { StyledMarkdown } from '../styledComponents';
import { ParagraphWS } from '../../config/grommetConfig';
import { MessageProps } from './MessagesPanel';

export interface StockMessageProps extends MessageProps {
}

const StockMessage: FC<StockMessageProps> = ({
                                               message,
                                               messagesLength,
                                               index,
                                               ticker,
                                               closeForRoll
                                             }) => (
  <MoveMessage
    message={message}
    messagesLength={messagesLength}
    index={index}
    ticker={ticker}
    closeForRoll={closeForRoll}
  >
    <>
      <Box fill='horizontal' direction='row' justify='around' align='center'>
        <ParagraphWS alignSelf='start'>{`Stock spent: ${message.stockSpent}`}</ParagraphWS>
        <ParagraphWS alignSelf='start'>{`Stock left: ${message.currentStock}`}</ParagraphWS>
      </Box>
      <StyledMarkdown>{message.content}</StyledMarkdown>
    </>
  </MoveMessage>
);

export default StockMessage;
