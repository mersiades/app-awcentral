import React, { FC } from 'react';
import { rgba } from 'polished';
import { useDrop } from 'react-dnd';
import { Box } from 'grommet';

import {
  ThreatMapCharacterItem,
  useThreatMap,
} from '../../contexts/threatMapContext';
import { ThreatMapLocation } from '../../@types/enums';
import ThreatMapItemPill from './ThreatMapItemPill';

const UnassignedThreats: FC = () => {
  // ----------------------------- Hooks ---------------------------------------- //
  const { handleCharacterPositionChange, notAssigned } = useThreatMap();

  // ----------------------------- 3rd party hooks ------------------------------- //
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'THREAT_MAP_ITEM',
      drop: (item: ThreatMapCharacterItem) => handleCharacterDrop(item),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  // ----------------------------- Component functions ------------------------- //
  const handleCharacterDrop = (item: ThreatMapCharacterItem) => {
    !!handleCharacterPositionChange &&
      handleCharacterPositionChange(
        item.game,
        item.gameRoleId,
        item.id,
        ThreatMapLocation.notAssigned
      );
  };

  // ----------------------------- Render ---------------------------------------- //
  return (
    <Box
      ref={drop}
      border
      fill
      background={isOver ? { color: rgba(76, 104, 76, 0.33) } : {}}
    >
      {notAssigned.map((item) => (
        <ThreatMapItemPill key={item.id} item={item} />
      ))}
    </Box>
  );
};

export default UnassignedThreats;
