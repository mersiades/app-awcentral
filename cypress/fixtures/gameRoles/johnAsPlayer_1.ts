import { GameRole } from '../../../src/@types/dataInterfaces';
import { RoleType } from '../../../src/@types/enums';
import battlebabe_john_1_complete from '../characters/battlebabe_john_1_complete';
import { MOCK_GAME_1_ID, MOCK_GAME_1_NAME } from '../games/game1';
import john from '../users/john';

// As created on backend
// Belongs on mock game 1
const johnAsPlayer_1: GameRole = {
  id: 'john-player-gamerole-1-id',
  role: RoleType.player,
  userId: john.id as string,
  gameId: MOCK_GAME_1_ID,
  gameName: MOCK_GAME_1_NAME,
  characters: [battlebabe_john_1_complete],
  npcs: [],
  threats: [],
};

export default johnAsPlayer_1;
