import { GameRole } from '../../../src/@types/dataInterfaces';
import { RoleType } from '../../../src/@types/enums';
import { MOCK_GAME_6_ID, MOCK_GAME_6_NAME } from '../games/game6';
import ivette from '../users/ivette';

// As created on backend
// Belongs on mock game 6
const ivetteAsPlayer_2: GameRole = {
  id: 'ivette-player-gamerole-2-id',
  role: RoleType.player,
  userId: ivette.id as string,
  gameId: MOCK_GAME_6_ID,
  gameName: MOCK_GAME_6_NAME,
  characters: [],
  npcs: [],
  threats: [],
};

export default ivetteAsPlayer_2;
