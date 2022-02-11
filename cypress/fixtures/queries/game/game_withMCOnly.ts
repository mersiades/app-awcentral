import { Game } from '../../../../src/@types/dataInterfaces';
import { RoleType } from '../../../../src/@types/enums';
import {
  MOCK_GAME_1_ID,
  MOCK_GAME_1_NAME,
  MOCK_USER_1_ID,
  MOCK_USER_1_NAME,
} from '../../constants';

const game_withMcOnly: Game = {
  id: MOCK_GAME_1_ID,
  name: MOCK_GAME_1_NAME,
  invitees: [],
  commsApp: '',
  commsUrl: '',
  hasFinishedPreGame: false,
  showFirstSession: false,
  mc: { id: MOCK_USER_1_ID, displayName: MOCK_USER_1_NAME, __typename: 'User' },
  players: [],
  gameMessages: [],
  gameRoles: [
    {
      id: '9e314be3-35cb-4fb9-bb41-3f23c6fab2d8',
      role: RoleType.mc,
      gameId: MOCK_GAME_1_ID,
      gameName: MOCK_GAME_1_NAME,
      userId: MOCK_USER_1_ID,
      npcs: [],
      threats: [],
      characters: [],
      __typename: 'GameRole',
    },
  ],
  __typename: 'Game',
};

export default game_withMcOnly;
