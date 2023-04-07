import { gql, TypedDocumentNode } from '@apollo/client';
import { Game } from '../@types/dataInterfaces';
import { PerformSufferHarmMoveData } from './performSufferHarmMove';

export interface PerformSufferVHarmMoveData {
  performSufferVHarmMove: Game;
}

export interface PerformSufferVHarmMoveVars {
  gameId: string;
  gameRoleId: string;
  characterId: string;
  vHarm: number;
}

const PERFORM_SUFFER_V_HARM_MOVE = gql`
  mutation PerformSufferVHarmMove(
    $gameId: String!
    $gameRoleId: String!
    $characterId: String!
    $vHarm: Int!
  ) {
    performSufferVHarmMove(
      gameId: $gameId
      gameRoleId: $gameRoleId
      characterId: $characterId
      vHarm: $vHarm
    ) {
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
` as TypedDocumentNode<PerformSufferHarmMoveData, PerformSufferVHarmMoveVars>;

export default PERFORM_SUFFER_V_HARM_MOVE;
