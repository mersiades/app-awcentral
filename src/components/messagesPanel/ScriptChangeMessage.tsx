import React, { FC, useState, useEffect } from 'react';
import { Box, Heading } from 'grommet';
import { FormUp, FormDown } from 'grommet-icons';

import ScriptChangeAttribution from '../ScriptChangeAttribution';
import { StyledMarkdown } from '../styledComponents';
import { accentColors } from '../../config/grommetConfig';
import { MessageProps } from './MessagesPanel';

export interface ScriptChangeMessageProps extends Pick<
  MessageProps,
  'message' |
  'messagesLength' |
  'index' |
  'closeForRoll'
> {
}

const ScriptChangeMessage: FC<ScriptChangeMessageProps> = ({
                                                             message,
                                                             messagesLength,
                                                             index,
                                                             closeForRoll
                                                           }) => {
  // ----------------------------- Component state -------------------------- //
  const [showDetails, setShowDetails] = useState(messagesLength - 1 === index);

  // ----------------------------- Effects ---------------------------------- //
  // Opens/closes the message details whenever a new message comes in
  useEffect(() => {
    if (closeForRoll) {
      setShowDetails(false);
    } else {
      setShowDetails(messagesLength - 1 === index);
    }
  }, [messagesLength, index, closeForRoll]);

  // ----------------------------- Render ----------------------------------- //
  return (
    <div data-testid={`${message.title}-message`}>
      <Box
        direction='row'
        justify='between'
        align='center'
        background={{ color: accentColors[0] }}
      >
        <Box direction='row' align='center' justify='between'>
          {showDetails ? (
            <FormUp
              data-testid='hide-move-details-icon'
              onClick={() => setShowDetails(false)}
              style={{ cursor: 'pointer' }}
              color='#fff'
            />
          ) : (
            <FormDown
              data-testid='show-move-details-icon'
              onClick={() => setShowDetails(true)}
              style={{ cursor: 'pointer' }}
              color='#fff'
            />
          )}
          <Heading
            level={4}
            margin={{ vertical: '6px', bottom: '3px' }}
            color='white'
          >
            {message.title}
          </Heading>
        </Box>
      </Box>
      {showDetails && (
        <Box
          animation={{
            type: 'fadeIn',
            delay: 0,
            duration: 500,
            size: 'xsmall'
          }}
          pad={{ top: '12px' }}
        >
          <StyledMarkdown>{message.content}</StyledMarkdown>
          <ScriptChangeAttribution />
        </Box>
      )}
    </div>
  );
};
export default ScriptChangeMessage;
