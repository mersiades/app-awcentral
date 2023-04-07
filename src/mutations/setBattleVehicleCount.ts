import { gql, TypedDocumentNode } from '@apollo/client';
import { Character } from '../@types/dataInterfaces';

export interface SetBattleVehicleCountData {
  setBattleVehicleCount: Character;
  __typename: 'Mutation';
}

export interface SetBattleVehicleCountVars {
  gameRoleId: string;
  characterId: string;
  battleVehicleCount: number;
}

const SET_BATTLE_VEHICLE_COUNT = gql`
  mutation SetBattleVehicleCount(
    $gameRoleId: String!
    $characterId: String!
    $battleVehicleCount: Int!
  ) {
    setBattleVehicleCount(
      gameRoleId: $gameRoleId
      characterId: $characterId
      battleVehicleCount: $battleVehicleCount
    ) {
      id
      battleVehicleCount
    }
  }
`as TypedDocumentNode<SetBattleVehicleCountData, SetBattleVehicleCountVars>;

export default SET_BATTLE_VEHICLE_COUNT;
