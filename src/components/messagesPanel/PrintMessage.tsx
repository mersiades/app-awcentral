import React, { FC } from 'react';

import MoveMessage from './MoveMessage';
import { StyledMarkdown } from '../styledComponents';
import { MessageProps } from './MessagesPanel';

export interface PrintMessageProps extends MessageProps {
}

const PrintMessage: FC<PrintMessageProps> = ({
                                               message,
                                               messagesLength,
                                               index,
                                               ticker,
                                               closeForRoll
                                             }) =>
  <MoveMessage
    message={message}
    messagesLength={messagesLength}
    index={index}
    ticker={ticker}
    closeForRoll={closeForRoll}
  >
    <StyledMarkdown>{message.content}</StyledMarkdown>
  </MoveMessage>;

export default PrintMessage;
