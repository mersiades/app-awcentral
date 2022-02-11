import { MoveType, PlaybookType, StatType } from '../../@types/enums';
import { Move } from '../../@types/staticDataInterfaces';
import {
  ADD_ANGEL_MOVE_1_NAME,
  ADD_ANGEL_MOVE_2_NAME,
  ADD_OTHER_PB_MOVE_1_NAME,
  ADD_OTHER_PB_MOVE_2_NAME,
  ADD_SECOND_CHAR_NAME,
  ADJUST_ANGEL_UNIQUE_1_NAME,
  ANGEL_SPECIAL_NAME,
  BONEFEEL_NAME,
  CHANGE_PLAYBOOK_NAME,
  COOL_2_MAX_NAME,
  GENERIC_INCREASE_STAT_NAME,
  HARD_2_MAX_NAME,
  HOT_2_MAX_NAME,
  IMPROVE_BASIC_MOVES_1_NAME,
  IMPROVE_BASIC_MOVES_2_NAME,
  RETIRE_NAME,
  SHARP_2_MAX_NAME,
  WEIRD_2_MAX_NAME,
} from '../../config/constants';
import {
  dummyStatModifier,
  dummyRollModifier,
  dummyMoveAction,
} from './dummyData';
import {
  mockCoolMax2Mod,
  mockHardMax2Mod,
  mockHotMax2Mod,
  mockSharpMax2Mod,
  mockWeirdMax2Mod,
} from './statModifierFixtures';

// --------------------------------- Improvement Moves ------------------------------- //

export const mockAddOtherPBMove1: Move = {
  id: 'mock-add-other-pb-move-move-1-id',
  name: ADD_OTHER_PB_MOVE_1_NAME,
  kind: MoveType.addOtherPBMove,
  description: 'get a move from another playbook',
  playbook: PlaybookType.angel,
  __typename: 'Move',
};

export const mockAddOtherPBMove2: Move = {
  id: 'mock-add-other-pb-move-move-2-id',
  name: ADD_OTHER_PB_MOVE_2_NAME,
  kind: MoveType.addOtherPBMove,
  description: 'get a move from another playbook',
  playbook: PlaybookType.angel,
  __typename: 'Move',
};

export const mockSharpMax2: Move = {
  id: 'mock-improve-stat-move-1-id',
  name: SHARP_2_MAX_NAME,
  kind: MoveType.improveStat,
  description: 'get +1sharp (max sharp+2)',
  playbook: PlaybookType.angel,
  statModifier: mockSharpMax2Mod,
  __typename: 'Move',
};

export const mockCoolMax2: Move = {
  id: 'mock-improve-stat-move-2-id',
  name: COOL_2_MAX_NAME,
  description: 'get +1cool (max cool+2)',
  statModifier: mockCoolMax2Mod,
  kind: MoveType.improveStat,
  playbook: PlaybookType.angel,
  __typename: 'Move',
};

export const mockHardMax2: Move = {
  id: 'mock-improve-stat-move-3-id',
  name: HARD_2_MAX_NAME,
  description: 'get +1hard (max hard+2)',
  statModifier: mockHardMax2Mod,
  playbook: PlaybookType.angel,
  kind: MoveType.improveStat,
  __typename: 'Move',
};

export const mockHotMax2: Move = {
  id: 'mock-improve-stat-move-4-id',
  name: HOT_2_MAX_NAME,
  description: 'get +1hot (max hot+2)',
  statModifier: mockHotMax2Mod,
  playbook: PlaybookType.angel,
  kind: MoveType.improveStat,
  __typename: 'Move',
};

export const mockWeirdMax2: Move = {
  id: 'mock-improve-stat-move-5-id',
  name: WEIRD_2_MAX_NAME,
  description: 'get +1weird (max weird+2)',
  statModifier: mockWeirdMax2Mod,
  playbook: PlaybookType.angel,
  kind: MoveType.improveStat,
  __typename: 'Move',
};

export const mockAddAngelMove1: Move = {
  id: 'mock-add-move-move-1-id',
  name: ADD_ANGEL_MOVE_1_NAME,
  description: 'get a new angel move',
  playbook: PlaybookType.angel,
  kind: MoveType.addCharacterMove,
  __typename: 'Move',
};

export const mockAddAngelMove2: Move = {
  id: 'mock-add-move-move-2-id',
  name: ADD_ANGEL_MOVE_2_NAME,
  description: 'get a new angel move',
  playbook: PlaybookType.angel,
  kind: MoveType.addCharacterMove,
  __typename: 'Move',
};

export const mockAdjustAngelUnique1: Move = {
  id: 'mock-adjust-unique-move-1-id',
  name: ADJUST_ANGEL_UNIQUE_1_NAME,
  description: 'get a supplier (_cf_, detail with the MC)',
  playbook: PlaybookType.angel,
  kind: MoveType.adjustUnique,
  __typename: 'Move',
};

export const mockGenericIncreaseStat: Move = {
  id: 'mock-generic-increase-stat-move-id',
  name: GENERIC_INCREASE_STAT_NAME,
  description: 'get +1 to any stat (max stat+3)',
  playbook: PlaybookType.angel,
  kind: MoveType.genereicIncreaseStat,
  __typename: 'Move',
};

export const mockRetire: Move = {
  id: 'mock-retire-move-id',
  name: RETIRE_NAME,
  description: 'retire your character to safety',
  playbook: PlaybookType.angel,
  kind: MoveType.retire,
  __typename: 'Move',
};

export const mockAddSecondCharacter: Move = {
  id: 'mock-add-second-char-move-id',
  name: ADD_SECOND_CHAR_NAME,
  description: 'create a second character to play',
  playbook: PlaybookType.angel,
  kind: MoveType.addSecondCharacter,
  __typename: 'Move',
};

export const mockChangePlaybook: Move = {
  id: 'mock-change-playbook-move-id',
  name: CHANGE_PLAYBOOK_NAME,
  description: 'change your character to a new playbook',
  playbook: PlaybookType.angel,
  kind: MoveType.changePlaybook,
  __typename: 'Move',
};

export const mockImproveBasicMoves1: Move = {
  id: 'mock-improve-basic-moves-move-1-id',
  name: IMPROVE_BASIC_MOVES_1_NAME,
  description: 'choose 3 basic moves and advance them',
  playbook: PlaybookType.angel,
  kind: MoveType.improveBasicMoves,
  __typename: 'Move',
};

export const mockImproveBasicMoves2: Move = {
  id: 'mock-improve-basic-moves-move-2-id',
  name: IMPROVE_BASIC_MOVES_2_NAME,
  description: 'advance the other three basic moves',
  playbook: PlaybookType.angel,
  kind: MoveType.improveBasicMoves,
  __typename: 'Move',
};

// --------------------------------- Playbook Moves ------------------------------- //

export const mockBonefeel: Move = {
  id: 'mock-bonefeel-move-id',
  name: BONEFEEL_NAME,
  description: '_**Bonefeel**_: at the beginning of the session...',
  playbook: PlaybookType.savvyhead,
  kind: MoveType.character,
  __typename: 'Move',
};

export const mockEverybodyEats: Move = {
  id: 'mock-everybody-eats-move-id',
  name: 'EVERYBODY EATS, EVEN THAT GUY',
  description: '_**Everybody eats, even that guy**_: when you want...',
  playbook: PlaybookType.maestroD,
  kind: MoveType.character,
  __typename: 'Move',
};

export const mockSeeingSouls: Move = {
  id: 'mock-seeing-souls-move-id',
  name: 'SEEING SOULS',
  description: '_**Seeing souls**_: when you help or...',
  playbook: PlaybookType.hocus,
  kind: MoveType.character,
  __typename: 'Move',
};

export const mockAngelSpecial: Move = {
  id: 'angel-angel-special-move-id-1',
  name: ANGEL_SPECIAL_NAME,
  kind: MoveType.default,
  description: 'If you and another character have sex,',
  playbook: PlaybookType.angel,
  stat: StatType.hx,
  statModifier: dummyStatModifier,
  rollModifier: dummyRollModifier,
  moveAction: dummyMoveAction,
  __typename: 'Move',
};
