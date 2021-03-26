import { gql } from '@apollo/client';
import { Game } from '../@types/dataInterfaces';

export interface FinishPreGameData {
  finishPreGame: Game;
}

export interface FinishPreGameVars {
  gameId: string;
}

const FINISH_PRE_GAME = gql`
  mutation FinishPreGame($gameId: String!) {
    finishPreGame(gameId: $gameId) {
      id
      hasFinishedPreGame
      showFirstSession
    }
  }
`;

export default FINISH_PRE_GAME;
