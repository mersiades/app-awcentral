import React, { FC } from 'react';
import { Box } from 'grommet';

import MoveMessage from './MoveMessage';
import { StyledMarkdown } from '../styledComponents';
import { ParagraphWS } from '../../config/grommetConfig';
import { MessageProps } from './MessagesPanel';

export interface BarterMessageProps extends MessageProps {
}

const BarterMessage: FC<BarterMessageProps> = ({
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
      <>
        <Box fill='horizontal' direction='row' justify='around' align='center'>
          <ParagraphWS alignSelf='start'>
            {`Barter spent: ${message.barterSpent}`}
          </ParagraphWS>
          <ParagraphWS alignSelf='start'>
            {`Barter left: ${message.currentBarter}`}
          </ParagraphWS>
        </Box>
        <StyledMarkdown>{message.content}</StyledMarkdown>
      </>
    </MoveMessage>
  );
};

export default BarterMessage;
