import { CharacterStat, StatsBlock } from '../../../src/@types/dataInterfaces';
import { StatType } from '../../../src/@types/enums';

export const statAngelCool_1: CharacterStat = {
  id: 'angel-cool-stat-1-id',
  stat: StatType.cool,
  value: 1,
  isHighlighted: false,
};

export const statAngelHard_1: CharacterStat = {
  id: 'angel-hard-stat-1-id',
  stat: StatType.hard,
  value: 0,
  isHighlighted: true,
};

export const statAngelHot_1: CharacterStat = {
  id: 'angel-hot-stat-1-id',
  stat: StatType.hot,
  value: 1,
  isHighlighted: true,
};

export const statAngelSharp_1: CharacterStat = {
  id: 'angel-sharp-stat-1-id',
  stat: StatType.sharp,
  value: 2,
  isHighlighted: false,
};

export const statAngelWeird_1: CharacterStat = {
  id: 'angel-weird-stat-1-id',
  stat: StatType.weird,
  value: -1,
  isHighlighted: false,
};

// Belongs on angel_sara_1_complete
// Mimics stats block created on backend
export const statsBlockAngel_1: StatsBlock = {
  id: 'angel-stats-block-1-id',
  statsOptionId: '609e42b4784e276a94ff2995',
  stats: [
    statAngelCool_1,
    statAngelHard_1,
    statAngelHot_1,
    statAngelSharp_1,
    statAngelWeird_1,
  ],
};
