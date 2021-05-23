import { Box } from 'grommet';

import TickerListBox from './TickerListBox';
import ContentItemBox from './ContentItemBox';
import CollapsiblePanelBox from '../CollapsiblePanelBox';
import Spinner from '../Spinner';
import { TextWS } from '../../config/grommetConfig';
import { useMcContent } from '../../contexts/mcContentContext';
import { FIRST_SESSION_TEXT } from '../../config/constants';

const FirstSessionBox = () => {
  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { firstSession } = useMcContent();

  // ------------------------------------------------- Render component -------------------------------------------------- //
  return (
    <CollapsiblePanelBox title={FIRST_SESSION_TEXT}>
      <Box fill="horizontal" animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}>
        {!!firstSession ? (
          <>
            <TextWS>{firstSession?.intro}</TextWS>
            <ContentItemBox contentItem={firstSession.duringCharacterCreation} />
            <TickerListBox tickerList={firstSession.duringFirstSession} />
            <ContentItemBox contentItem={firstSession.threatMapInstructions} />
            <TickerListBox tickerList={firstSession.afterFirstSession} />
          </>
        ) : (
          <Spinner width="100%" />
        )}
      </Box>
    </CollapsiblePanelBox>
  );
};

export default FirstSessionBox;
