import { Box } from 'grommet';
import CoreBox from './CoreBox';
import McHarmBox from './McHarmBox';

const McPanel = () => {
  // -------------------------------------------------- Component state ---------------------------------------------------- //

  // -------------------------------------------------- 3rd party hooks ---------------------------------------------------- //

  // ------------------------------------------------------- Hooks --------------------------------------------------------- //

  // ------------------------------------------------- Component functions -------------------------------------------------- //

  return (
    <Box data-testid="mc-panel" direction="row" wrap pad="12px" overflow="auto">
      <CoreBox />
      <McHarmBox />
    </Box>
  );
};

export default McPanel;
