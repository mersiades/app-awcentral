import { GameRole } from '../../../src/@types/dataInterfaces';
import { RoleType } from '../../../src/@types/enums';
import { MOCK_GAME_6_ID, MOCK_GAME_6_NAME } from '../games/game6';
import john from '../users/john';

// As created on backend
// Belongs on mock game 6
const johnAsPlayer_2: GameRole = {
  id: 'john-player-gamerole-2-id',
  role: RoleType.player,
  userId: john.id as string,
  gameId: MOCK_GAME_6_ID,
  gameName: MOCK_GAME_6_NAME,
  characters: [],
  npcs: [],
  threats: [],
};

export default johnAsPlayer_2;
