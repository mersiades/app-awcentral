import { RoleType } from '../../../../src/@types/enums';
import { GameRolesByUserIdGameRoles } from '../../../../src/queries/gameRolesByUserId';
import {
  MOCK_GAMEROLE_1_ID,
  MOCK_GAME_1_ID,
  MOCK_GAME_1_NAME,
  MOCK_GAMEROLE_2_ID,
  MOCK_GAME_2_ID,
  MOCK_GAME_2_NAME,
} from '../../constants';

const gameRolesByUserId_1McGameRole_1PlayerGameRole: GameRolesByUserIdGameRoles[] =
  [
    {
      id: MOCK_GAMEROLE_1_ID,
      role: RoleType.mc,
      gameId: MOCK_GAME_1_ID,
      gameName: MOCK_GAME_1_NAME,
      characters: [],
      __typename: 'GameRole',
    },
    {
      id: MOCK_GAMEROLE_2_ID,
      role: RoleType.player,
      gameId: MOCK_GAME_2_ID,
      gameName: MOCK_GAME_2_NAME,
      characters: [],
      __typename: 'GameRole',
    },
  ];

export default gameRolesByUserId_1McGameRole_1PlayerGameRole;
