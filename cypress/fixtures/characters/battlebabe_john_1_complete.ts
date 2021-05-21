import { Character } from '../../../src/@types/dataInterfaces';
import { PlaybookType } from '../../../src/@types/enums';
import { genericHarm } from '../harm/genericHarm';
import { statsBlockAngel_1 } from '../statsBlocks/statsBlockAngel_1';
import {
  mockLookBattleBabe1,
  mockLookBattleBabe2,
  mockLookBattleBabe3,
  mockLookBattleBabe4,
  mockLookBattleBabe5,
} from '../looks/battlebabeLooks';
import {
  battlebabe_john_1_hxstat_1,
  battlebabe_john_1_hxstat_2,
  battlebabe_john_1_hxstat_3,
  battlebabe_john_1_hxstat_4,
} from '../hxStats/battlebabe_john_1_hxstats';
import {
  mockBattlebabeSpecial,
  mockDangerousAndSexy,
  mockPerfectInstincts,
} from '../characterMoves/battlebabeCharacterMoves';
import { battlebabe_john_1_playbookUnique } from '../playbookUniques/battlebabePlaybookUniques';

const battlebabe_john_1_complete: Character = {
  id: 'battlebabe-character-1-id',
  name: 'Scarlet',
  playbook: PlaybookType.battlebabe,
  playbookUniques: battlebabe_john_1_playbookUnique,
  hasCompletedCharacterCreation: true,
  hasPlusOneForward: false,
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
  hxBlock: [battlebabe_john_1_hxstat_1, battlebabe_john_1_hxstat_2, battlebabe_john_1_hxstat_3, battlebabe_john_1_hxstat_4],
  gear: ['Black leather boots', 'Broken motorcycle helmet'],
  looks: [mockLookBattleBabe1, mockLookBattleBabe2, mockLookBattleBabe3, mockLookBattleBabe4, mockLookBattleBabe5],
  characterMoves: [mockBattlebabeSpecial, mockPerfectInstincts, mockDangerousAndSexy],
  improvementMoves: [],
  futureImprovementMoves: [],
  deathMoves: [],
  holds: [],
};

export default battlebabe_john_1_complete;
