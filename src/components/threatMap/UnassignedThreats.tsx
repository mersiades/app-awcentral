import React, { FC } from 'react';
import { useDrop } from 'react-dnd';
import { Box } from 'grommet';

import { ThreatMapCharacterItem, ThreatMapItem } from './ThreatMapData';
import { rgba } from 'polished';
import { ThreatMapLocation } from '../../@types/enums';

interface UnassignedThreatsProps {
  notAssigned: ThreatMapItem[];
  handleCharacterPositionChange: (
    gameRoleId: string,
    characterId: string,
    newPosition: ThreatMapLocation
  ) => void;
}

const UnassignedThreats: FC<UnassignedThreatsProps> = ({
  notAssigned,
  handleCharacterPositionChange,
}) => {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'THREAT_MAP_ITEM',
      drop: (item: ThreatMapCharacterItem) => {
        console.log(`item`, item);
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
  console.log(`notAssigned`, notAssigned);
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
