import { FC } from 'react';
import { Box } from 'grommet';

import Spinner from '../Spinner';
import TickerListBox from './TickerListBox';
import ContentItemBox from './ContentItemBox';
import CollapsiblePanelBox from '../CollapsiblePanelBox';
import { useMcContent } from '../../contexts/mcContentContext';
import { CORE_BOX_TITLE } from '../../config/constants';

const CoreBox: FC = () => {
  // ----------------------------- Hooks ---------------------------------------- //
  const { core, decisionMaking } = useMcContent();

  // ------------------------------------------------- Render component -------------------------------------------------- //
  return (
    <CollapsiblePanelBox title={CORE_BOX_TITLE}>
      <Box
        fill="horizontal"
        animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}
      >
        {!!core && !!decisionMaking ? (
          <>
            {core.map((ticker) => (
              <TickerListBox key={ticker.id} tickerList={ticker} />
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
