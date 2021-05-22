import { GameRole } from '../../../src/@types/dataInterfaces';
import { RoleType } from '../../../src/@types/enums';
import angel_sara_1_complete from '../characters/angel_sara_2_complete';
import { MOCK_GAME_1_ID, MOCK_GAME_1_NAME } from '../games/game1';
import sara from '../users/sara';

// As created on backend
// Belongs on mock game 1
const saraAsPlayer_1: GameRole = {
  id: 'sara-player-gamerole-2-id',
  role: RoleType.player,
  userId: sara.id as string,
  gameId: MOCK_GAME_1_ID,
  gameName: MOCK_GAME_1_NAME,
  characters: [angel_sara_1_complete],
  npcs: [],
  threats: [],
};

export default saraAsPlayer_1;
