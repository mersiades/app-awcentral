import { gql } from '@apollo/client';
import { Game } from '../@types/dataInterfaces';

export interface RemovePlayerData {
  removePlayer: {
    id: string;
    players: {
      id: string;
      email: string;
      displayName: string;
      __typename: 'User';
    }[];
    __typename?: 'Game';
  };
}

export interface RemovePlayerVars {
  gameId: string;
  playerId: string;
}

export const getRemovePlayerOR = (
  game: Game,
  playerId: string
): RemovePlayerData => {
  const filteredPlayers = game.players
    .filter((player) => player.id !== playerId)
    .map((player) => ({ ...player, __typename: 'User' as const }));

  return {
    removePlayer: {
      id: game.id,
      players: filteredPlayers,
      __typename: 'Game',
    },
  };
};

const REMOVE_PLAYER = gql`
  mutation RemovePlayer($gameId: String!, $playerId: String!) {
    removePlayer(gameId: $gameId, playerId: $playerId) {
      id
      players {
        id
        email
        displayName
      }
    }
  }
`;

export default REMOVE_PLAYER;
