import { Box } from 'grommet';
import React, { FC, useState } from 'react';

import ScriptChangeDialog from './dialogs/ScriptChangeDialog';
import scriptChangeIcon from '../assets/script-change-icon.png';

const ScriptChange: FC = () => {
  // -------------------------------------------------- Component state ---------------------------------------------------- //
  const [showDialog, setShowDialog] = useState(true);

  return (
    <Box height="64px" width="64px" align="center" justify="center" margin={{ horizontal: '12px' }}>
      {showDialog && <ScriptChangeDialog handleClose={() => setShowDialog(false)} />}
      <img
        src={scriptChangeIcon}
        style={{ height: '64px', width: '64px', cursor: 'pointer' }}
        onClick={() => setShowDialog(true)}
        alt="Script Change icon"
      />
    </Box>
  );
};

export default ScriptChange;
