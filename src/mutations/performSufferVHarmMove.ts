import { gql } from '@apollo/client';
import { Game } from '../@types/dataInterfaces';

export interface PerformSufferVHarmMoveData {
  performSufferVHarmMove: Game;
}

export interface PerformSufferVHarmMoveVars {
  gameId: string;
  gameRoleId: string;
  characterId: string;
  harm: number;
}

const PERFORM_SUFFER_V_HARM_MOVE = gql`
  mutation PerformSufferVHarmMove($gameId: String!, $gameRoleId: String!, $characterId: String!, $harm: Int!) {
    performSufferVHarmMove(gameId: $gameId, gameRoleId: $gameRoleId, characterId: $characterId, harm: $harm) {
      id
      gameMessages {
        id
        gameId
        gameRoleId
        messageType
        title
        content
        sentOn
        roll1
        roll2
        rollResult
        harmSuffered
      }
    }
  }
`;

export default PERFORM_SUFFER_V_HARM_MOVE;
