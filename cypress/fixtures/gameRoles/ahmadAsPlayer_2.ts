import { GameRole } from '../../../src/@types/dataInterfaces';
import { RoleType } from '../../../src/@types/enums';
import { MOCK_GAME_6_ID, MOCK_GAME_6_NAME } from '../games/game6';
import ahmad from '../users/ahmad';

// As created on backend
// Belongs on mock game 6
const ahmadAsPlayer_2: GameRole = {
  id: 'ahmad-player-gamerole-2-id',
  role: RoleType.player,
  userId: ahmad.id as string,
  gameId: MOCK_GAME_6_ID,
  gameName: MOCK_GAME_6_NAME,
  characters: [],
  npcs: [],
  threats: [],
};

export default ahmadAsPlayer_2;
