import { StatsBlock } from '../../@types/dataInterfaces';
import { StatType } from '../../@types/enums';

export const mockStatsBlock1: StatsBlock = {
  id: 'mock-stats-block-id-1',
  statsOptionId: 'mock-stats-option-id-1',
  stats: [
    {
      id: 'mock-statsblock-stat-id-1',
      stat: StatType.cool,
      value: 1,
      isHighlighted: true,
    },
    {
      id: 'mock-statsblock-stat-id-2',
      stat: StatType.hard,
      value: 1,
      isHighlighted: true,
    },
    {
      id: 'mock-statsblock-stat-id-3',
      stat: StatType.hot,
      value: 1,
      isHighlighted: false,
    },
    {
      id: 'mock-statsblock-stat-id-4',
      stat: StatType.sharp,
      value: 1,
      isHighlighted: false,
    },
    {
      id: 'mock-statsblock-stat-id-5',
      stat: StatType.weird,
      value: 1,
      isHighlighted: false,
    },
  ],
};

export const mockStatsBlockWithHighlight: StatsBlock = {
  id: 'mock-stats-block-id-1',
  statsOptionId: 'mock-stats-option-id-1',
  stats: [
    {
      id: 'mock-statsblock-stat-id-1',
      stat: StatType.cool,
      value: 1,
      isHighlighted: true,
    },
    {
      id: 'mock-statsblock-stat-id-2',
      stat: StatType.hard,
      value: 1,
      isHighlighted: false,
    },
    {
      id: 'mock-statsblock-stat-id-3',
      stat: StatType.hot,
      value: 1,
      isHighlighted: false,
    },
    {
      id: 'mock-statsblock-stat-id-4',
      stat: StatType.sharp,
      value: 1,
      isHighlighted: false,
    },
    {
      id: 'mock-statsblock-stat-id-5',
      stat: StatType.weird,
      value: 1,
      isHighlighted: false,
    },
  ],
};
