import { Character } from '../../@types/dataInterfaces';
import { PlaybookType } from '../../@types/enums';
import { mockCharacterHarm } from '../mocks';
import { mockAngelSpecialCM } from './characterMovesFixtures';
import { mockLookAngel1, mockLookAngel3, mockLookAngel5, mockLookAngel7, mockLookAngel9 } from './lookFixtures';
import { mockPlaybookUniqueAngel, mockPlaybookUniqueBattlebabe, mockPlaybookUniqueChopper } from './playBookUniquesFixtures';
import { mockStatsBlock1 } from './statsBlockFixtures';

export const mockAngel_fresh: Character = {
  id: 'mock-angel-character-1-id',
  name: '',
  playbook: PlaybookType.angel,
  hasCompletedCharacterCreation: false,
  hasPlusOneForward: false,
  holds: [],
  gear: [],
  barter: 2,
  experience: 0,
  vehicleCount: 0,
  battleVehicleCount: 0,
  allowedImprovements: 0,
  allowedPlaybookMoves: 0,
  allowedOtherPlaybookMoves: 0,
  isDead: false,
  mustChangePlaybook: false,
  harm: mockCharacterHarm,
  statsBlock: mockStatsBlock1,
  hxBlock: [],
  looks: [],
  characterMoves: [mockAngelSpecialCM],
  playbookUniques: mockPlaybookUniqueAngel,
  vehicles: [],
  battleVehicles: [],
  improvementMoves: [],
  futureImprovementMoves: [],
  deathMoves: [],
  __typename: 'Character',
};

export const mockAngel_readyToAddMoves: Character = {
  ...mockAngel_fresh,
  name: 'Mock Angel 1',
  gear: ['item1', 'item2'],
  statsBlock: mockStatsBlock1,
  looks: [mockLookAngel1, mockLookAngel3, mockLookAngel5, mockLookAngel7, mockLookAngel9],
  __typename: 'Character',
};

// Newly-created, character creation 100% incomplete
export const mockChopper_fresh: Character = {
  id: 'mock-chopper-character-1-id',
  name: '',
  playbook: PlaybookType.chopper,
  hasCompletedCharacterCreation: false,
  hasPlusOneForward: false,
  holds: [],
  gear: [],
  barter: 2,
  experience: 0,
  vehicleCount: 0,
  battleVehicleCount: 0,
  allowedImprovements: 0,
  allowedPlaybookMoves: 0,
  allowedOtherPlaybookMoves: 0,
  isDead: false,
  mustChangePlaybook: false,
  harm: mockCharacterHarm,
  statsBlock: mockStatsBlock1,
  hxBlock: [],
  looks: [],
  characterMoves: [],
  playbookUniques: mockPlaybookUniqueChopper,
  vehicles: [],
  battleVehicles: [],
  improvementMoves: [],
  futureImprovementMoves: [],
  deathMoves: [],
  __typename: 'Character',
};

export const mockChopper_withName: Character = {
  ...mockChopper_fresh,
  name: 'Mock Chopper 1',
};

export const mockBattlebabe_fresh: Character = {
  id: 'mock-battlebabe-character-1-id',
  name: '',
  playbook: PlaybookType.battlebabe,
  hasCompletedCharacterCreation: false,
  hasPlusOneForward: false,
  holds: [],
  gear: [],
  barter: 2,
  experience: 0,
  vehicleCount: 0,
  battleVehicleCount: 0,
  allowedImprovements: 0,
  allowedPlaybookMoves: 0,
  allowedOtherPlaybookMoves: 0,
  isDead: false,
  mustChangePlaybook: false,
  harm: mockCharacterHarm,
  statsBlock: mockStatsBlock1,
  hxBlock: [],
  looks: [],
  characterMoves: [],
  playbookUniques: mockPlaybookUniqueBattlebabe,
  vehicles: [],
  battleVehicles: [],
  improvementMoves: [],
  futureImprovementMoves: [],
  deathMoves: [],
  __typename: 'Character',
};
