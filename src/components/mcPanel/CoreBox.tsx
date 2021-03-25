import { Box } from 'grommet';

import TickerListBox from './TickerListBox';
import ContentItemBox from './ContentItemBox';
import CollapsiblePanelBox from '../CollapsiblePanelBox';
import { useMcContent } from '../../contexts/mcContentContext';
import Spinner from '../Spinner';

const CoreBox = () => {
  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { core, decisionMaking } = useMcContent();

  // ------------------------------------------------- Render component -------------------------------------------------- //
  return (
    <CollapsiblePanelBox title="The master of ceremonies">
      <Box fill="horizontal" animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}>
        {!!core && !!decisionMaking ? (
          <>
            {core.map((ticker) => (
              <TickerListBox tickerList={ticker} />
            ))}
            <ContentItemBox contentItem={decisionMaking} />
          </>
        ) : (
          <Spinner width="100%" />
        )}
      </Box>
    </CollapsiblePanelBox>
  );
};

export default CoreBox;
