import { gql } from '@apollo/client';
import { RoleType } from '../@types/enums';

export interface CreateGameData {
  createGame: {
    id: string;
    name: string;
    mc: { id: string; displayName: string; __typename?: 'User' };
    players: { displayName: string; id: string; __typename?: 'User' }[];
    gameRoles: { id: string; role: RoleType; __typename?: 'GameRole' }[];
    __typename?: 'Game';
  };
}

export interface CreateGameVars {
  userId: string;
  name: string;
  displayName: string;
  email: string;
}

export const getCreateGameOR = (
  name: string,
  id: string,
  displayName: string
): CreateGameData => {
  return {
    createGame: {
      id: 'temp-id',
      name,
      mc: {
        id,
        displayName,
        __typename: 'User',
      },
      players: [],
      gameRoles: [
        { id: 'temp-id-2', role: RoleType.mc, __typename: 'GameRole' },
      ],
      __typename: 'Game',
    },
  };
};

const CREATE_GAME = gql`
  mutation CreateGame(
    $userId: String!
    $name: String!
    $displayName: String!
    $email: String!
  ) {
    createGame(
      userId: $userId
      name: $name
      displayName: $displayName
      email: $email
    ) {
      id
      name
      mc {
        id
        displayName
      }
      players {
        id
        displayName
      }
      gameRoles {
        id
        role
      }
    }
  }
`;

export default CREATE_GAME;
