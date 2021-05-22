import { Character } from '../../../src/@types/dataInterfaces';
import { PlaybookType } from '../../../src/@types/enums';
import { genericHarm } from '../harm/genericHarm';
import { statsBlockAngel_1 } from '../statsBlocks/statsBlockAngel_1';
import { mockPlaybookUniqueAngel } from '../../../src/tests/fixtures/playBookUniquesFixtures';
import { mockLookAngel1, mockLookAngel2, mockLookAngel3, mockLookAngel4, mockLookAngel5 } from '../looks/angelLooks';
import { mockAngelSpecialCM, mockInfirmaryCM, mockSixthSenseCM } from '../../../src/tests/fixtures/characterMovesFixtures';

// Belongs on mock game 6.
// Freshly created character, almost complete except for missing HxBlock
const angel_sara_2_complete: Character = {
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
  looks: [mockLookAngel1, mockLookAngel2, mockLookAngel3, mockLookAngel4, mockLookAngel5],
  characterMoves: [mockAngelSpecialCM, mockSixthSenseCM, mockInfirmaryCM],
  improvementMoves: [],
  futureImprovementMoves: [],
  deathMoves: [],
  holds: [],
};

export default angel_sara_2_complete;
