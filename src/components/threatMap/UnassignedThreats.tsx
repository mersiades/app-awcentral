import React, { FC } from 'react';
import { rgba } from 'polished';
import { useDrop } from 'react-dnd';
import { Box } from 'grommet';

import {
  ThreatMapCharacterItem,
  useThreatMap,
} from '../../contexts/threatMapContext';
import { ThreatMapLocation } from '../../@types/enums';

const UnassignedThreats: FC = () => {
  // ----------------------------- Hooks ---------------------------------------- //
  const { handleCharacterPositionChange } = useThreatMap();
  // ----------------------------- 3rd party hooks ------------------------------- //
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'THREAT_MAP_ITEM',
      drop: (item: ThreatMapCharacterItem) => {
        console.log(`item`, item);
        !!handleCharacterPositionChange &&
          handleCharacterPositionChange(
            item.gameRoleId,
            item.characterId,
            ThreatMapLocation.notAssigned
          );
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );
  return (
    <Box
      ref={drop}
      border
      fill
      background={isOver ? { color: rgba(76, 104, 76, 0.33) } : {}}
    >
      unassigned threats
    </Box>
  );
};

export default UnassignedThreats;
