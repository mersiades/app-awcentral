import { GameRole } from '../../../src/@types/dataInterfaces';
import { RoleType } from '../../../src/@types/enums';
import { MOCK_GAME_1_ID, MOCK_GAME_1_NAME } from '../games/game1';
import maya from '../users/maya';

// As created on backend
// Belongs on mock game 1
const mayaAsPlayer_1: GameRole = {
  id: 'maya-player-gamerole-1-id',
  role: RoleType.player,
  userId: maya.id as string,
  gameId: MOCK_GAME_1_ID,
  gameName: MOCK_GAME_1_NAME,
  characters: [],
  npcs: [],
  threats: [],
};

export default mayaAsPlayer_1;
