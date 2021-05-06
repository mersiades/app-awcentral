import { StatType } from '../../@types/enums';
import { StatModifier } from '../../@types/staticDataInterfaces';

export const mockSharpMax2Mod: StatModifier = {
  id: 'mock-stat-modifier-1-id',
  statToModify: StatType.sharp,
  modification: 1,
  maxLimit: 2,
  __typename: 'StatModifier',
};

export const mockCoolMax2Mod: StatModifier = {
  id: 'mock-stat-modifier-2-id',
  statToModify: StatType.cool,
  modification: 1,
  maxLimit: 2,
  __typename: 'StatModifier',
};

export const mockHardMax2Mod: StatModifier = {
  id: 'mock-stat-modifier-3-id',
  statToModify: StatType.hard,
  modification: 1,
  maxLimit: 2,
  __typename: 'StatModifier',
};

export const mockHotMax2Mod: StatModifier = {
  id: 'mock-stat-modifier-4-id',
  statToModify: StatType.hot,
  modification: 1,
  maxLimit: 2,
  __typename: 'StatModifier',
};

export const mockWeirdMax2Mod: StatModifier = {
  id: 'mock-stat-modifier-5-id',
  statToModify: StatType.weird,
  modification: 1,
  maxLimit: 2,
  __typename: 'StatModifier',
};
