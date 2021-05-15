import { GameRole } from '../../../src/@types/dataInterfaces';
import { RoleType } from '../../../src/@types/enums';
import { MOCK_GAME_6_ID, MOCK_GAME_6_NAME } from '../games/game6';
import sergio from '../users/sergio';

// As created on backend
// Belongs on mock game 6
const sergioAsPlayer_2: GameRole = {
  id: 'sergio-player-gamerole-2-id',
  role: RoleType.player,
  userId: sergio.id as string,
  gameId: MOCK_GAME_6_ID,
  gameName: MOCK_GAME_6_NAME,
  characters: [],
  npcs: [],
  threats: [],
};

export default sergioAsPlayer_2;
