import { GameRole } from '../../../src/@types/dataInterfaces';
import { RoleType } from '../../../src/@types/enums';
import { MOCK_GAME_6_ID, MOCK_GAME_6_NAME } from '../games/game6';
import caesar from '../users/caesar';

// As created on backend
// Belongs on mock game 6
const caesarAsPlayer_2: GameRole = {
  id: 'caesar-player-gamerole-2-id',
  role: RoleType.player,
  userId: caesar.id as string,
  gameId: MOCK_GAME_6_ID,
  gameName: MOCK_GAME_6_NAME,
  characters: [],
  npcs: [],
  threats: [],
};

export default caesarAsPlayer_2;
