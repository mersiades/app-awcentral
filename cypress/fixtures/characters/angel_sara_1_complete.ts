import { Character } from '../../../src/@types/dataInterfaces';
import { PlaybookType } from '../../../src/@types/enums';
import { genericHarm } from '../harm/genericHarm';
import { statsBlockAngel_1 } from '../statsBlocks/statsBlockAngel_1';
import { mockPlaybookUniqueAngel } from '../../../src/tests/fixtures/playBookUniquesFixtures';
import { mockAngelSpecialCM, mockInfirmaryCM, mockSixthSenseCM } from '../../../src/tests/fixtures/characterMovesFixtures';
import {
  angel_sara_1_hxstat_1,
  angel_sara_1_hxstat_2,
  angel_sara_1_hxstat_3,
  angel_sara_1_hxstat_4,
} from '../hxStats/angel_sara_1_hxstats';
import { mockLookAngel1, mockLookAngel2, mockLookAngel3, mockLookAngel4, mockLookAngel5 } from '../looks/angelLooks';
import { mockSixthSense, mockHealingTouch, mockAngelSpecial } from '../characterMoves/angelCharacterMoves';
import { angel_sara_1_playbookUnique } from '../playbookUniques/angelPlaybookUniques';

// Belongs on mock game 1 & 7
// Freshly-created character, complete
const angel_sara_1_complete: Character = {
  id: 'angel-character-1-id',
  name: 'Doc',
  playbook: PlaybookType.angel,
  playbookUniques: angel_sara_1_playbookUnique,
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
  hxBlock: [angel_sara_1_hxstat_1, angel_sara_1_hxstat_2, angel_sara_1_hxstat_3, angel_sara_1_hxstat_4],
  gear: ['Shotgun', 'Rusty screwdriver'],
  looks: [mockLookAngel1, mockLookAngel2, mockLookAngel3, mockLookAngel4, mockLookAngel5],
  characterMoves: [mockSixthSense, mockHealingTouch, mockAngelSpecial],
  improvementMoves: [],
  futureImprovementMoves: [],
  deathMoves: [],
  holds: [],
};

export default angel_sara_1_complete;
