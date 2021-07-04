import { CharacterStat, StatsBlock } from '../../../src/@types/dataInterfaces';
import { StatType } from '../../../src/@types/enums';

export const statBattlebabeCool_1: CharacterStat = {
  id: 'battlebabe-cool-stat-1-id',
  stat: StatType.cool,
  value: 3,
  isHighlighted: false,
};

export const statBattlebabeHard_1: CharacterStat = {
  id: 'battlebabe-hard-stat-1-id',
  stat: StatType.hard,
  value: -1,
  isHighlighted: true,
};

export const statBattlebabeHot_1: CharacterStat = {
  id: 'battlebabe-hot-stat-1-id',
  stat: StatType.hot,
  value: 1,
  isHighlighted: true,
};

export const statBattlebabeSharp_1: CharacterStat = {
  id: 'battlebabe-sharp-stat-1-id',
  stat: StatType.sharp,
  value: 1,
  isHighlighted: false,
};

export const statBattlebabeWeird_1: CharacterStat = {
  id: 'battlebabe-weird-stat-1-id',
  stat: StatType.weird,
  value: 0,
  isHighlighted: false,
};

// Belongs on battlebabe_john_1_complete
// Mimics stats block created on backend
export const statsBlockBattlebabe_1: StatsBlock = {
  id: 'battlebabe-stats-block-1-id',
  statsOptionId: '60a7301f6a012a4e90170ec2',
  stats: [
    statBattlebabeCool_1,
    statBattlebabeHard_1,
    statBattlebabeHot_1,
    statBattlebabeSharp_1,
    statBattlebabeWeird_1,
  ],
};
