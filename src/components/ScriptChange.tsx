import React, { FC, useState } from 'react';
import { Box, BoxProps } from 'grommet';

import ScriptChangeDialog from './dialogs/ScriptChangeDialog';
import scriptChangeIcon from '../assets/script-change-icon.png';

interface ScriptChangeProps {
  // Sets the ScriptChangeDialog to be a non-functional preview of Script Change
  isPreview?: boolean;
}

const ScriptChange: FC<ScriptChangeProps & BoxProps> = ({ isPreview = false, height = '64px', width = '64px' }) => {
  // -------------------------------------------------- Component state ---------------------------------------------------- //
  const [showDialog, setShowDialog] = useState(false);

  // ------------------------------------------------------- Render ------------------------------------------------------- //
  return (
    <Box
      height={height}
      width={width}
      align="center"
      justify="center"
      margin={{ horizontal: '12px' }}
      // style={{ float: 'right', shapeOutside: 'inherit', shapeMargin: '12px' }}
    >
      {showDialog && <ScriptChangeDialog handleClose={() => setShowDialog(false)} isPreview={isPreview} />}
      <img
        src={scriptChangeIcon}
        style={{ height: height as string, width: width as string, cursor: 'pointer' }}
        onClick={() => setShowDialog(true)}
        alt="Script Change icon"
      />
    </Box>
  );
};

export default ScriptChange;
