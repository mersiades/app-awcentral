import { StatsOption } from '../../@types/staticDataInterfaces';

export const mockStatsOptionsDefault1: StatsOption = {
  id: 'default-stats-options-1',
  COOL: 1,
  HARD: 0,
  HOT: 1,
  SHARP: 2,
  WEIRD: -1,
  __typename: 'StatsOption',
};

export const mockStatsOptionsDefault2: StatsOption = {
  id: 'default-stats-options-2',
  COOL: 1,
  HARD: 1,
  HOT: 0,
  SHARP: 2,
  WEIRD: -1,
  __typename: 'StatsOption',
};

export const mockStatsOptionsDefault3: StatsOption = {
  id: 'default-stats-options-3',
  COOL: -1,
  HARD: 1,
  HOT: 0,
  SHARP: 2,
  WEIRD: 1,
  __typename: 'StatsOption',
};
