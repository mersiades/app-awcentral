import { Box } from 'grommet';

import ContentItemBox from './ContentItemBox';
import CollapsiblePanelBox from '../CollapsiblePanelBox';
import { useMcContent } from '../../contexts/mcContentContext';
import { HARM_RULES_TITLE } from '../../config/constants';

const McHarmBox = () => {
  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { harm } = useMcContent();

  // ------------------------------------------------- Render component -------------------------------------------------- //
  return (
    <CollapsiblePanelBox title={HARM_RULES_TITLE}>
      <Box fill="horizontal" animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}>
        {!!harm && harm.map((item) => <ContentItemBox key={item.id} contentItem={item} />)}
      </Box>
    </CollapsiblePanelBox>
  );
};

export default McHarmBox;
