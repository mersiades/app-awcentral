import react, { useState } from 'react';
import { Box } from 'grommet';
import { FormUp, FormDown } from 'grommet-icons';

import { StyledMarkdown } from '../styledComponents';
import { HeadingWS } from '../../config/grommetConfig';
import { useFonts } from '../../contexts/fontContext';
import { useMcContent } from '../../contexts/mcContentContext';

const McHarmBox = () => {
  // -------------------------------------------------- Component state ---------------------------------------------------- //
  const [showHarm, setShowHarm] = useState(false);
  const [showHarmDetails, setShowHarmDetails] = useState<string[]>([]);

  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { crustReady } = useFonts();
  const { harm } = useMcContent();

  // ------------------------------------------------- Component functions -------------------------------------------------- //
  const toggleShowHarm = () => setShowHarm(!showHarm);

  const toggleShowHarmDetails = (tickerId: string) => {
    if (showHarmDetails.includes(tickerId)) {
      setShowHarmDetails(showHarmDetails.filter((m) => m !== tickerId));
    } else {
      setShowHarmDetails([...showHarmDetails, tickerId]);
    }
  };

  // ------------------------------------------------- Render component -------------------------------------------------- //
  return (
    <Box
      data-testid="mc-harm-box"
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
          onClick={toggleShowHarm}
          style={{ cursor: 'pointer' }}
        >
          Harm rules
        </HeadingWS>
        <Box direction="row" align="center" gap="12px">
          {showHarm ? (
            <FormUp data-testid="hide-moves-icon" onClick={toggleShowHarm} style={{ cursor: 'pointer' }} />
          ) : (
            <FormDown data-testid="show-moves-icon" onClick={toggleShowHarm} style={{ cursor: 'pointer' }} />
          )}
        </Box>
      </Box>
      {!!showHarm &&
        !!harm &&
        harm.map((item) => (
          <Box key={item.id} fill="horizontal" animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}>
            <Box fill="horizontal" direction="row" justify="between" align="center">
              <Box direction="row" justify="start" align="center" pad="12px" gap="12px">
                {showHarmDetails.includes(item.id) ? (
                  <FormUp
                    data-testid="hide-move-details-icon"
                    onClick={() => toggleShowHarmDetails(item.id)}
                    style={{ cursor: 'pointer' }}
                  />
                ) : (
                  <FormDown
                    data-testid="show-move-details-icon"
                    onClick={() => toggleShowHarmDetails(item.id)}
                    style={{ cursor: 'pointer' }}
                  />
                )}
                <HeadingWS
                  crustReady={crustReady}
                  level="3"
                  margin={{ top: '3px', bottom: '3px' }}
                  onClick={() => toggleShowHarmDetails(item.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {item.title === '&Psi;-harm' ? `${String.fromCharCode(936)}-harm` : item.title}
                </HeadingWS>
              </Box>
            </Box>

            {showHarmDetails.includes(item.id) && (
              <Box pad="12px" animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}>
                <StyledMarkdown>{item.content}</StyledMarkdown>
              </Box>
            )}
          </Box>
        ))}
    </Box>
  );
};

export default McHarmBox;
