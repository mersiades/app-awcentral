// As created on backend

import { GameRole } from '../../../src/@types/dataInterfaces';
import { RoleType } from '../../../src/@types/enums';
import { MOCK_GAME_7_ID, MOCK_GAME_7_NAME } from '../games/game7';
import { mockNbeke, mockVision } from '../npcs/dave_npcs';
import { mockGnarly, mockTumTum } from '../threats/dave_threats';
import dave from '../users/dave';

// Belongs on mock game 7
const daveAsMC_1: GameRole = {
  id: 'dave-mc-gamerole-1-id',
  role: RoleType.mc,
  userId: dave.id as string,
  gameId: MOCK_GAME_7_ID,
  gameName: MOCK_GAME_7_NAME,
  characters: [],
  npcs: [mockVision, mockNbeke],
  threats: [mockTumTum, mockGnarly],
};

export default daveAsMC_1;
