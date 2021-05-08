import { Character } from '../../@types/dataInterfaces';
import { PlaybookType } from '../../@types/enums';
import { mockCharacterHarm } from '../mocks';
import { mockPlaybookUniqueChopper } from './playBookUniquesFixtures';
import { mockStatsBlock1 } from './statsBlockFixtures';

// Newly-created, character creation 100% incomplete
export const mockChopper_fresh: Character = {
  id: 'mock-chopper-character-1-id',
  name: 'Mock Chopper 1',
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
  __typename: 'Character',
};
