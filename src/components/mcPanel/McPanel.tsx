import { Box } from 'grommet';

import CoreBox from './CoreBox';
import FirstSessionBox from './FirstSessionBox';
import McHarmBox from './McHarmBox';
import SelectedBox from './SelectedBox';

const McPanel = () => {
  return (
    <Box data-testid="mc-panel" direction="row" wrap pad="12px" overflow="auto">
      <CoreBox />
      <McHarmBox />
      <SelectedBox />
      <FirstSessionBox />
    </Box>
  );
};

export default McPanel;
