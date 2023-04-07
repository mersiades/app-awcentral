import { gql, TypedDocumentNode } from '@apollo/client';
import { Game } from '../@types/dataInterfaces';

export interface FinishPreGameData {
  finishPreGame: Partial<Game>;
}

export interface FinishPreGameVars {
  gameId: string;
}

export const getFinishPreGameOR = (id: string) => {
  const optimisticGame = {
    id,
    hasFinishedPreGame: true,
    showFirstSession: true,
    __typename: 'Game' as 'Game',
  };

  return {
    __typename: 'Mutation',
    finishPreGame: optimisticGame,
  };
};

const FINISH_PRE_GAME = gql`
  mutation FinishPreGame($gameId: String!) {
    finishPreGame(gameId: $gameId) {
      id
      hasFinishedPreGame
      showFirstSession
    }
  }
` as TypedDocumentNode<FinishPreGameData, FinishPreGameVars>;

export default FINISH_PRE_GAME;
