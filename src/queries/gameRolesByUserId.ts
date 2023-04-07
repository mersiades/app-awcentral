import { gql, TypedDocumentNode } from '@apollo/client';
import { RoleType } from '../@types/enums';

export interface GameRolesByUserIdGameRoles {
  id: string;
  role: RoleType;
  gameId: string;
  gameName: string;
  characters: {
    id: string;
    __typename: 'Character';
  }[];
  __typename: 'GameRole';
}

export interface GameRolesByUserIdData {
  gameRolesByUserId: GameRolesByUserIdGameRoles[];
}

export interface GameRolesByUserIdVars {
  id: string;
}

const GAMEROLES_BY_USER_ID = gql`
  query GameRolesByUserId($id: String!) {
    gameRolesByUserId(id: $id) {
      id
      role
      gameId
      gameName
      characters {
        id
      }
    }
  }
` as TypedDocumentNode<GameRolesByUserIdData, GameRolesByUserIdVars>;

export default GAMEROLES_BY_USER_ID;
