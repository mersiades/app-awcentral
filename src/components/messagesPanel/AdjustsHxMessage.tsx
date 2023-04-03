import React, { FC } from 'react';

import MoveMessage from './MoveMessage';
import { StyledMarkdown } from '../styledComponents';
import { MessageProps } from './MessagesPanel';

export interface AdjustHxMessageProps extends MessageProps {
}

const AdjustHxMessage: FC<AdjustHxMessageProps> = ({
                                                     message,
                                                     messagesLength,
                                                     index,
                                                     ticker,
                                                     closeForRoll
                                                   }) => {
  return (
    <MoveMessage
      message={message}
      messagesLength={messagesLength}
      index={index}
      ticker={ticker}
      closeForRoll={closeForRoll}
    >
      <StyledMarkdown>{message.content}</StyledMarkdown>
    </MoveMessage>
  );
};

export default AdjustHxMessage;
