import react, { useState } from 'react';
import { Box } from 'grommet';
import { FormUp, FormDown } from 'grommet-icons';

import { StyledMarkdown } from '../styledComponents';
import { HeadingWS } from '../../config/grommetConfig';
import { useFonts } from '../../contexts/fontContext';
import { useMcContent } from '../../contexts/mcContentContext';

const SelectedBox = () => {
  // -------------------------------------------------- Component state ---------------------------------------------------- //
  const [showSelected, setShowSelected] = useState(false);
  const [showSelectedDetails, setShowSelectedDetails] = useState<string[]>([]);

  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { crustReady } = useFonts();
  const { selected } = useMcContent();

  // ------------------------------------------------- Component functions -------------------------------------------------- //
  const toggleShowSelected = () => setShowSelected(!showSelected);

  const toggleShowSelectedDetails = (tickerId: string) => {
    if (showSelectedDetails.includes(tickerId)) {
      setShowSelectedDetails(showSelectedDetails.filter((m) => m !== tickerId));
    } else {
      setShowSelectedDetails([...showSelectedDetails, tickerId]);
    }
  };
  return (
    <Box
      data-testid="mc-selected-box"
      fill="horizontal"
      align="center"
      justify="start"
      pad={{ vertical: '12px' }}
      style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.25)' }}
    >
      <Box fill="horizontal" direction="row" align="center" justify="between" pad={{ vertical: '12px' }}>
        <HeadingWS
          crustReady={crustReady}
          level="3"
          margin="0px"
          alignSelf="start"
          onClick={toggleShowSelected}
          style={{ cursor: 'pointer' }}
        >
          Selected MC rules
        </HeadingWS>
        <Box direction="row" align="center" gap="12px">
          {showSelected ? (
            <FormUp data-testid="hide-moves-icon" onClick={toggleShowSelected} style={{ cursor: 'pointer' }} />
          ) : (
            <FormDown data-testid="show-moves-icon" onClick={toggleShowSelected} style={{ cursor: 'pointer' }} />
          )}
        </Box>
      </Box>
      {!!showSelected &&
        !!selected &&
        selected.map((item) => (
          <Box key={item.id} fill="horizontal" animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}>
            <Box fill="horizontal" direction="row" justify="between" align="center">
              <Box direction="row" justify="start" align="center" pad="12px" gap="12px">
                {showSelectedDetails.includes(item.id) ? (
                  <FormUp
                    data-testid="hide-move-details-icon"
                    onClick={() => toggleShowSelectedDetails(item.id)}
                    style={{ cursor: 'pointer' }}
                  />
                ) : (
                  <FormDown
                    data-testid="show-move-details-icon"
                    onClick={() => toggleShowSelectedDetails(item.id)}
                    style={{ cursor: 'pointer' }}
                  />
                )}
                <HeadingWS
                  crustReady={crustReady}
                  level="3"
                  margin={{ top: '3px', bottom: '3px' }}
                  onClick={() => toggleShowSelectedDetails(item.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {item.title}
                </HeadingWS>
              </Box>
            </Box>

            {showSelectedDetails.includes(item.id) && (
              <Box pad="12px" animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}>
                <StyledMarkdown>{item.content}</StyledMarkdown>
              </Box>
            )}
          </Box>
        ))}
    </Box>
  );
};

export default SelectedBox;
