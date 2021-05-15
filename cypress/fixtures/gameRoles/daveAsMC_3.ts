import { GameRole } from '../../../src/@types/dataInterfaces';
import { RoleType } from '../../../src/@types/enums';
import { MOCK_GAME_6_ID, MOCK_GAME_6_NAME } from '../games/game6';
import dave from '../users/dave';

// As created on backend
// Belongs on mock game 6
const daveAsMC_3: GameRole = {
  id: 'dave-mc-gamerole-3-id',
  role: RoleType.mc,
  userId: dave.id as string,
  gameId: MOCK_GAME_6_ID,
  gameName: MOCK_GAME_6_NAME,
  characters: [],
  npcs: [],
  threats: [],
};

export default daveAsMC_3;
