import React, { FC } from 'react';
import { Box } from 'grommet';

import { StatType } from '../../@types/enums';
import { CharacterStat } from '../../@types/dataInterfaces';
import CollapsiblePanelBox from '../CollapsiblePanelBox';
import StatBox from '../StatBox';

interface StatsBoxProps {
  stats: CharacterStat[];
  togglingHighlight: boolean;
  handleToggleHighlight: (stat: StatType) => void;
  navigateToCharacterCreation?: (step: string) => void;
}

const StatsBox: FC<StatsBoxProps> = ({ stats, togglingHighlight, handleToggleHighlight, navigateToCharacterCreation }) => (
  <CollapsiblePanelBox open title="Stats" navigateToCharacterCreation={navigateToCharacterCreation} targetCreationStep="4">
    <Box
      fill="horizontal"
      direction="row"
      align="center"
      justify="around"
      pad="12px"
      gap="12px"
      wrap
      animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}
    >
      {stats.map((stat) => {
        return (
          <StatBox key={stat.id} stat={stat} handleClick={() => !togglingHighlight && handleToggleHighlight(stat.stat)} />
        );
      })}
    </Box>
  </CollapsiblePanelBox>
);

export default StatsBox;
