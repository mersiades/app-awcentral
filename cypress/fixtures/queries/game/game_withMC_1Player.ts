import { Game } from '../../../../src/@types/dataInterfaces';
import { RoleType } from '../../../../src/@types/enums';
import {
  MOCK_GAMEROLE_1_ID,
  MOCK_GAMEROLE_2_ID,
  MOCK_GAME_2_ID,
  MOCK_GAME_2_NAME,
  MOCK_USER_1_ID,
  MOCK_USER_1_NAME,
} from '../../constants';

const game_withMC_1Player: Game = {
  id: MOCK_GAME_2_ID,
  name: MOCK_GAME_2_NAME,
  invitees: [],
  commsApp: '',
  commsUrl: '',
  hasFinishedPreGame: false,
  showFirstSession: false,
  mc: {
    id: 'mock-user-2-id',
    displayName: 'mock-user-2-name',
    __typename: 'User',
  },
  players: [
    { id: MOCK_USER_1_ID, displayName: MOCK_USER_1_NAME, __typename: 'User' },
  ],
  gameMessages: [],
  gameRoles: [
    {
      id: MOCK_GAMEROLE_1_ID,
      role: RoleType.mc,
      gameId: MOCK_GAME_2_ID,
      gameName: MOCK_GAME_2_NAME,
      userId: 'mock-user-2-id',
      npcs: [],
      threats: [],
      characters: [],
      __typename: 'GameRole',
    },
    {
      id: MOCK_GAMEROLE_2_ID,
      role: RoleType.player,
      gameId: MOCK_GAME_2_ID,
      gameName: MOCK_GAME_2_NAME,
      userId: MOCK_USER_1_ID,
      npcs: [],
      threats: [],
      characters: [],
      __typename: 'GameRole',
    },
  ],
  __typename: 'Game',
};

export default game_withMC_1Player;
