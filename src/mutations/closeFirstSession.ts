import { gql } from '@apollo/client';
import { Game } from '../@types/dataInterfaces';

export interface CloseFirstSessionData {
  closeFirstSession: Partial<Game>;
}

export interface CloseFirstSessionVars {
  gameId: string;
}

export const getCloseFirstSessionOR = (gameId: string) => {
  let optimisticGame = {
    id: gameId,
    showFirstSession: false,
    __typename: 'Game' as 'Game',
  };

  return {
    __typename: 'Mutation',
    closeFirstSession: optimisticGame,
  };
};

const CLOSE_FIRST_SESSION = gql`
  mutation CloseFirstSession($gameId: String!) {
    closeFirstSession(gameId: $gameId) {
      id
      showFirstSession
    }
  }
`;

export default CLOSE_FIRST_SESSION;
