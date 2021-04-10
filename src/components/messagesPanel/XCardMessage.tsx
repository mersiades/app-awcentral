import React, { FC, useState, useEffect } from 'react';
import { Box, Heading } from 'grommet';
import { FormUp, FormDown } from 'grommet-icons';

import { accentColors } from '../../config/grommetConfig';
import { GameMessage } from '../../@types/dataInterfaces';
import { StyledMarkdown } from '../styledComponents';

export interface XCardMessageProps {
  message: GameMessage;
  messagesLength: number;
  index: number;
}

// This components wraps around specific move message type components,
// providing standardised layout, styling and functionality for all move message components
const XCardMessage: FC<XCardMessageProps> = ({ message, messagesLength, index }) => {
  // -------------------------------------------------- Component state ---------------------------------------------------- //
  const [showDetails, setShowDetails] = useState(messagesLength - 1 === index);

  // ------------------------------------------------------- Effects -------------------------------------------------------- //
  // Opens/closes the message details whenever a new message comes in
  useEffect(() => {
    setShowDetails(messagesLength - 1 === index);
  }, [messagesLength, index]);

  // ------------------------------------------------------ Render -------------------------------------------------------- //
  return (
    <>
      <Box direction="row" justify="between" align="center" background={{ color: accentColors[0] }}>
        <Box direction="row" align="center" justify="between">
          {showDetails ? (
            <FormUp
              data-testid="hide-move-details-icon"
              onClick={() => setShowDetails(false)}
              style={{ cursor: 'pointer' }}
              color="#fff"
            />
          ) : (
            <FormDown
              data-testid="show-move-details-icon"
              onClick={() => setShowDetails(true)}
              style={{ cursor: 'pointer' }}
              color="#fff"
            />
          )}
          <Heading level={4} margin={{ vertical: '6px', bottom: '3px' }} color="white">
            {message.title}
          </Heading>
        </Box>
      </Box>
      {showDetails && (
        <Box animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }} pad={{ top: '12px' }}>
          <StyledMarkdown>{message.content}</StyledMarkdown>
        </Box>
      )}
    </>
  );
};
export default XCardMessage;
