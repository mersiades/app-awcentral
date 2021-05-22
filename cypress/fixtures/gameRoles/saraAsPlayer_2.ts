import { GameRole } from '../../../src/@types/dataInterfaces';
import { RoleType } from '../../../src/@types/enums';
import angel_sara_2_complete from '../characters/angel_sara_2_complete';
import { MOCK_GAME_6_ID, MOCK_GAME_6_NAME } from '../games/game6';
import sara from '../users/sara';

// As created on backend
// Belongs on mock game 6
// The only GameRole on game 6 that starts with a Character
const saraAsPlayer_2: GameRole = {
  id: 'sara-player-gamerole-2-id',
  role: RoleType.player,
  userId: sara.id as string,
  gameId: MOCK_GAME_6_ID,
  gameName: MOCK_GAME_6_NAME,
  characters: [angel_sara_2_complete],
  npcs: [],
  threats: [],
};

export default saraAsPlayer_2;
