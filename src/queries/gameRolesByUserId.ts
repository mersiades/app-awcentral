import { gql } from '@apollo/client';
import { GameRole } from '../@types/dataInterfaces';

export interface GameRolesByUserIdData {
  gameRolesByUserId: Partial<GameRole>[];
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
`;

export default GAMEROLES_BY_USER_ID;
