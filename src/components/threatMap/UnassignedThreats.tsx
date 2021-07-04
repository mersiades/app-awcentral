import React, { FC } from 'react';
import { useDrop } from 'react-dnd';
import { Box } from 'grommet';

import { ThreatMapItem } from './ThreatMapData';
import { rgba } from 'polished';

interface UnassignedThreatsProps {
  notAssigned: ThreatMapItem[];
}

const UnassignedThreats: FC<UnassignedThreatsProps> = ({ notAssigned }) => {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'THREAT_MAP_ITEM',
      drop: () => {},
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
