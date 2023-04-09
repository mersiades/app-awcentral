import React, { FC, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Box } from 'grommet';
import { FormUp, FormDown } from 'grommet-icons';

import { HeadingWS, TextWS } from '../../config/grommetConfig';
import { MessageProps } from './MessagesPanel';

dayjs.extend(relativeTime);

export interface MoveMessageProps extends MessageProps {
  children: JSX.Element;
}

// This component wraps around specific move message type components,
// providing standardised layout, styling and functionality for all move message components
const MoveMessage: FC<MoveMessageProps> = ({
  children,
  message,
  messagesLength,
  index,
  ticker,
  closeForRoll,
}) => {
  // ----------------------------- Component state -------------------------- //
  const [showDetails, setShowDetails] = useState(messagesLength - 1 === index);
  const [date, setDate] = useState(dayjs(message.sentOn).fromNow());

  // ----------------------------- Effects ---------------------------------- //
  // Updates the date displayed whenever the ticker ticks over (every minute)
  useEffect(() => {
    setDate(dayjs(message.sentOn).fromNow());
  }, [ticker, message.sentOn]);

  // Opens/closes the message details whenever a new message comes in
  useEffect(() => {
    if (closeForRoll) {
      setShowDetails(false)
    } else {
      setShowDetails(messagesLength - 1 === index);
    }
  }, [messagesLength, index, closeForRoll]);

  // ----------------------------- Render ----------------------------------- //
  return (
    <div data-testid={`${message.title}-message`}>
      <Box direction="row" justify="between" align="center">
        <Box direction="row" align="center" justify="between">
          {showDetails ? (
            <FormUp
              data-testid="hide-move-details-icon"
              onClick={() => setShowDetails(false)}
              style={{ cursor: 'pointer' }}
            />
          ) : (
            <FormDown
              data-testid="show-move-details-icon"
              onClick={() => setShowDetails(true)}
              style={{ cursor: 'pointer' }}
            />
          )}
          <HeadingWS level={4} margin={{ vertical: '6px' }}>
            {message.title}
          </HeadingWS>
        </Box>
        <TextWS color="neutral-1">{date}</TextWS>
      </Box>
      {showDetails && (
        <Box
          animation={{
            type: 'fadeIn',
            delay: 0,
            duration: 500,
            size: 'xsmall',
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
};
export default MoveMessage;
