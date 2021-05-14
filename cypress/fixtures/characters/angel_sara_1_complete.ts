import { Character } from '../../../src/@types/dataInterfaces';
import { PlaybookType } from '../../../src/@types/enums';
import { genericHarm } from '../harm/genericHarm';
import { statsBlockAngel_1 } from '../statsBlocks/statsBockAngel_1';
import { mockPlaybookUniqueAngel } from '../../../src/tests/fixtures/playBookUniquesFixtures';
import {
  mockLookAngel1,
  mockLookAngel3,
  mockLookAngel5,
  mockLookAngel8,
  mockLookAngel9,
} from '../../../src/tests/fixtures/lookFixtures';
import { mockAngelSpecialCM, mockInfirmaryCM, mockSixthSenseCM } from '../../../src/tests/fixtures/characterMovesFixtures';

const angel_sara_1_complete: Character = {
  id: 'angel-character-1-id',
  name: 'Doc',
  playbook: PlaybookType.angel,
  playbookUniques: mockPlaybookUniqueAngel,
  hasCompletedCharacterCreation: true,
  hasPlusOneForward: true,
  barter: 2,
  statsBlock: statsBlockAngel_1,
  harm: genericHarm,
  vehicleCount: 0,
  battleVehicleCount: 0,
  experience: 0,
  allowedImprovements: 0,
  allowedPlaybookMoves: 2,
  allowedOtherPlaybookMoves: 0,
  isDead: false,
  mustChangePlaybook: false,
  battleVehicles: [],
  vehicles: [],
  hxBlock: [],
  gear: ['Shotgun', 'Rusty screwdriver'],
  looks: [mockLookAngel1, mockLookAngel9, mockLookAngel3, mockLookAngel5, mockLookAngel8],
  characterMoves: [mockAngelSpecialCM, mockSixthSenseCM, mockInfirmaryCM],
  improvementMoves: [],
  futureImprovementMoves: [],
  deathMoves: [],
  holds: [],
};

export default angel_sara_1_complete;
