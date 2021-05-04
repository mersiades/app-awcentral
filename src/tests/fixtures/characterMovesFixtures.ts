import { MoveType, PlaybookType, StatType } from '../../@types/enums';
import { CharacterMove } from '../../@types/staticDataInterfaces';
import {
  ANGEL_SPECIAL_NAME,
  COOL_2_MAX_NAME,
  HARD_2_MAX_NAME,
  HOT_2_MAX_NAME,
  SHARP_2_MAX_NAME,
  WEIRD_2_MAX_NAME,
} from '../../config/constants';
import { dummyStatModifier, dummyRollModifier, dummyMoveAction } from './dummyData';

import { mockCoolMax2Mod, mockHardMax2Mod, mockHotMax2Mod, mockSharpMax2Mod, mockWeirdMax2Mod } from './mockStatModifiers';

// --------------------------------- Improvement CharacterMoves ------------------------------- //
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

// --------------------------------- Playbook CharacterMoves ------------------------------- //

export const mockCharacterMoveAngel1: CharacterMove = {
  id: 'angel-move-id-1',
  name: ANGEL_SPECIAL_NAME,
  kind: MoveType.default,
  description: 'If you and another character have sex,',
  playbook: PlaybookType.angel,
  stat: StatType.hx,
  statModifier: dummyStatModifier,
  rollModifier: dummyRollModifier,
  moveAction: dummyMoveAction,
  isSelected: true,
  __typename: 'CharacterMove',
};

export const mockCharacterMoveAngel2: CharacterMove = {
  id: 'angel-move-id-2',
  name: 'SIXTH SENSE',
  kind: MoveType.character,
  description: 'when you open your brain to the world’s psychic maelstrom...',
  playbook: PlaybookType.angel,
  stat: StatType.sharp,
  rollModifier: dummyRollModifier,
  statModifier: dummyStatModifier,
  moveAction: dummyMoveAction,
  isSelected: false,
  __typename: 'CharacterMove',
};

export const mockCharacterMoveAngel3: CharacterMove = {
  id: 'angel-move-id-3',
  name: 'INFIRMARY',
  description: 'you get an infirmary, a workspace with life support...',
  kind: MoveType.character,
  playbook: PlaybookType.angel,
  stat: StatType.sharp,
  rollModifier: dummyRollModifier,
  statModifier: dummyStatModifier,
  moveAction: dummyMoveAction,
  isSelected: false,
  __typename: 'CharacterMove',
};

export const mockCharacterMoveAngel4: CharacterMove = {
  id: 'angel-move-id-4',
  name: 'PROFESSIONAL COMPASSION',
  description: 'you can roll+sharp instead of roll+Hx when you help someone who’s rolling.',
  kind: MoveType.character,
  playbook: PlaybookType.angel,
  stat: StatType.hx,
  rollModifier: dummyRollModifier,
  statModifier: dummyStatModifier,
  moveAction: dummyMoveAction,
  isSelected: false,
  __typename: 'CharacterMove',
};

export const mockSeeingSoulsAsCM: CharacterMove = {
  id: 'mock-seeing-souls-character-move-id',
  isSelected: false,
  name: 'SEEING SOULS',
  description: '_**Seeing souls**_: when you help or...',
  playbook: PlaybookType.hocus,
  kind: MoveType.character,
  __typename: 'CharacterMove',
};
