import { Box, Tip } from 'grommet';
import React, { FC, useState } from 'react';

import ScriptChangeDialog from './dialogs/ScriptChangeDialog';
import scriptChangeIcon from '../assets/script-change-icon.png';

export const SCRIPT_CHANGE_TOOLTIP_TEXT = 'Script Change, a safety-oriented communication tool.';

const ScriptChange: FC = () => {
  // -------------------------------------------------- Component state ---------------------------------------------------- //
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Tip content={SCRIPT_CHANGE_TOOLTIP_TEXT}>
      <Box height="64px" width="64px" align="center" justify="center" margin={{ horizontal: '12px' }}>
        {showDialog && <ScriptChangeDialog handleClose={() => setShowDialog(false)} />}
        <img
          src={scriptChangeIcon}
          style={{ height: '64px', width: '64px', cursor: 'pointer' }}
          onClick={() => setShowDialog(true)}
          alt="Script Change icon"
        />
      </Box>
    </Tip>
  );
};

export default ScriptChange;
