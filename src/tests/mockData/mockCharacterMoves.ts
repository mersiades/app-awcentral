import { MoveType, PlaybookType } from '../../@types/enums';
import { CharacterMove } from '../../@types/staticDataInterfaces';
import {
  COOL_2_MAX_NAME,
  HARD_2_MAX_NAME,
  HOT_2_MAX_NAME,
  SHARP_2_MAX_NAME,
  WEIRD_2_MAX_NAME,
} from '../../config/constants';
import { mockCoolMax2Mod, mockHardMax2Mod, mockHotMax2Mod, mockSharpMax2Mod, mockWeirdMax2Mod } from './mockStatModifiers';

export const mockSharpMax2AsCM: CharacterMove = {
  id: 'mock-improve-stat--character-move-1-id',
  isSelected: true,
  name: SHARP_2_MAX_NAME,
  kind: MoveType.improveStat,
  description: 'get +1sharp (max sharp+2)',
  playbook: PlaybookType.angel,
  statModifier: mockSharpMax2Mod,
  __typename: 'CharacterMove',
};

export const mockCoolMax2AsCM: CharacterMove = {
  id: 'mock-improve-stat--character-move-2-id',
  isSelected: true,
  name: COOL_2_MAX_NAME,
  kind: MoveType.improveStat,
  description: 'get +1cool (max cool+2)',
  playbook: PlaybookType.angel,
  statModifier: mockCoolMax2Mod,
  __typename: 'CharacterMove',
};

export const mockHardMax2AsCM: CharacterMove = {
  id: 'mock-improve-stat--character-move-3-id',
  isSelected: true,
  name: HARD_2_MAX_NAME,
  description: 'get +1hard (max hard+2)',
  statModifier: mockHardMax2Mod,
  playbook: PlaybookType.angel,
  kind: MoveType.improveStat,
  __typename: 'CharacterMove',
};

export const mockHotMax2AsCM: CharacterMove = {
  id: 'mock-improve-stat--character-move-4-id',
  isSelected: true,
  name: HOT_2_MAX_NAME,
  description: 'get +1hot (max hot+2)',
  statModifier: mockHotMax2Mod,
  playbook: PlaybookType.angel,
  kind: MoveType.improveStat,
  __typename: 'CharacterMove',
};

export const mockWeirdMax2AsCM: CharacterMove = {
  id: 'mock-improve-stat--character-move-5-id',
  isSelected: true,
  name: WEIRD_2_MAX_NAME,
  description: 'get +1weird (max weird+2)',
  statModifier: mockWeirdMax2Mod,
  playbook: PlaybookType.angel,
  kind: MoveType.improveStat,
  __typename: 'CharacterMove',
};
