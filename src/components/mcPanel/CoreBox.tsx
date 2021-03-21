import { useState } from 'react';
import { Box } from 'grommet';
import { FormUp, FormDown } from 'grommet-icons';

import { StyledMarkdown } from '../styledComponents';
import { HeadingWS } from '../../config/grommetConfig';
import { useFonts } from '../../contexts/fontContext';
import { useMcContent } from '../../contexts/mcContentContext';

const CoreBox = () => {
  // -------------------------------------------------- Component state ---------------------------------------------------- //
  const [showCore, setShowCore] = useState(false);
  const [showCoreDetails, setShowCoreDetails] = useState<string[]>([]);

  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { crustReady } = useFonts();
  const { core, decisionMaking } = useMcContent();

  // ------------------------------------------------- Component functions -------------------------------------------------- //
  const toggleShowCore = () => setShowCore(!showCore);

  const toggleShowCoreDetails = (tickerId: string) => {
    if (showCoreDetails.includes(tickerId)) {
      setShowCoreDetails(showCoreDetails.filter((m) => m !== tickerId));
    } else {
      setShowCoreDetails([...showCoreDetails, tickerId]);
    }
  };

  return (
    <Box
      data-testid="core-box"
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
          onClick={toggleShowCore}
          style={{ cursor: 'pointer' }}
        >
          The master of ceremonies
        </HeadingWS>
        <Box direction="row" align="center" gap="12px">
          {showCore ? (
            <FormUp data-testid="hide-moves-icon" onClick={toggleShowCore} style={{ cursor: 'pointer' }} />
          ) : (
            <FormDown data-testid="show-moves-icon" onClick={toggleShowCore} style={{ cursor: 'pointer' }} />
          )}
        </Box>
      </Box>
      {!!showCore && !!core && (
        <>
          {core.map((ticker) => {
            return (
              <Box key={ticker.id} fill="horizontal" animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}>
                <Box fill="horizontal" direction="row" justify="between" align="center">
                  <Box direction="row" justify="start" align="center" pad="12px" gap="12px">
                    {showCoreDetails.includes(ticker.id) ? (
                      <FormUp
                        data-testid="hide-move-details-icon"
                        onClick={() => toggleShowCoreDetails(ticker.id)}
                        style={{ cursor: 'pointer' }}
                      />
                    ) : (
                      <FormDown
                        data-testid="show-move-details-icon"
                        onClick={() => toggleShowCoreDetails(ticker.id)}
                        style={{ cursor: 'pointer' }}
                      />
                    )}
                    <HeadingWS
                      crustReady={crustReady}
                      level="3"
                      margin={{ top: '3px', bottom: '3px' }}
                      onClick={() => toggleShowCoreDetails(ticker.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      {ticker.title}
                    </HeadingWS>
                  </Box>
                </Box>

                {showCoreDetails.includes(ticker.id) && (
                  <Box pad="12px" animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}>
                    <ul>
                      {ticker.items.map((item, index) => (
                        <li key={item + index}>
                          <StyledMarkdown>{item}</StyledMarkdown>
                        </li>
                      ))}
                    </ul>
                  </Box>
                )}
              </Box>
            );
          })}
          {!!decisionMaking && (
            <Box fill="horizontal" animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}>
              <Box fill="horizontal" direction="row" justify="between" align="center">
                <Box direction="row" justify="start" align="center" pad="12px" gap="12px">
                  {showCoreDetails.includes(decisionMaking.id) ? (
                    <FormUp
                      data-testid="hide-move-details-icon"
                      onClick={() => toggleShowCoreDetails(decisionMaking.id)}
                      style={{ cursor: 'pointer' }}
                    />
                  ) : (
                    <FormDown
                      data-testid="show-move-details-icon"
                      onClick={() => toggleShowCoreDetails(decisionMaking.id)}
                      style={{ cursor: 'pointer' }}
                    />
                  )}
                  <HeadingWS
                    crustReady={crustReady}
                    level="3"
                    margin={{ top: '3px', bottom: '3px' }}
                    onClick={() => toggleShowCoreDetails(decisionMaking.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {decisionMaking.title}
                  </HeadingWS>
                </Box>
              </Box>

              {showCoreDetails.includes(decisionMaking.id) && (
                <Box pad="12px" animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}>
                  <StyledMarkdown>{decisionMaking.content}</StyledMarkdown>
                </Box>
              )}
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default CoreBox;
