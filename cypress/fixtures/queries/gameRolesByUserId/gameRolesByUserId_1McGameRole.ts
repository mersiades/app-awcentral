import { RoleType } from '../../../../src/@types/enums';
import { GameRolesByUserIdGameRoles } from '../../../../src/queries/gameRolesByUserId';
import {
  MOCK_GAMEROLE_1_ID,
  MOCK_GAME_1_ID,
  MOCK_CHARACTER_1_ID,
  MOCK_GAME_1_NAME,
} from '../../constants';

const gameRolesByUserId_1McGameRole: GameRolesByUserIdGameRoles[] = [
  {
    id: MOCK_GAMEROLE_1_ID,
    role: RoleType.mc,
    gameId: MOCK_GAME_1_ID,
    gameName: MOCK_GAME_1_NAME,
    characters: [{ id: MOCK_CHARACTER_1_ID, __typename: 'Character' }],
    __typename: 'GameRole',
  },
];

export default gameRolesByUserId_1McGameRole;
