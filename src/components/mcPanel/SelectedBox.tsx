import { Box } from 'grommet';

import ContentItemBox from './ContentItemBox';
import CollapsiblePanelBox from '../CollapsiblePanelBox';
import { useMcContent } from '../../contexts/mcContentContext';

const SelectedBox = () => {
  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { selected } = useMcContent();

  // ------------------------------------------------- Render component -------------------------------------------------- //
  return (
    <CollapsiblePanelBox title="Selected MC rules">
      <Box fill="horizontal" animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}>
        {!!selected && selected.map((item) => <ContentItemBox key={item.id} contentItem={item} />)}
      </Box>
    </CollapsiblePanelBox>
  );
};

export default SelectedBox;
