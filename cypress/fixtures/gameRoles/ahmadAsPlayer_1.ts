import { GameRole } from '../../../src/@types/dataInterfaces';
import { RoleType } from '../../../src/@types/enums';
import { MOCK_GAME_1_ID, MOCK_GAME_1_NAME } from '../games/game1';
import ahmad from '../users/ahmad';

// As created on backend
// Belongs on mock game 1
const ahmadAsPlayer_1: GameRole = {
  id: 'ahmad-player-gamerole-1-id',
  role: RoleType.player,
  userId: ahmad.id as string,
  gameId: MOCK_GAME_1_ID,
  gameName: MOCK_GAME_1_NAME,
  characters: [],
  npcs: [],
  threats: [],
};

export default ahmadAsPlayer_1;
