import { gql, TypedDocumentNode } from '@apollo/client';
import { Character } from '../@types/dataInterfaces';

export interface SetVehicleCountData {
  setVehicleCount: Character;
  __typename?: 'Mutation';
}

export interface SetVehicleCountVars {
  gameRoleId: string;
  characterId: string;
  vehicleCount: number;
}

const SET_VEHICLE_COUNT = gql`
  mutation SetVehicleCount(
    $gameRoleId: String!
    $characterId: String!
    $vehicleCount: Int!
  ) {
    setVehicleCount(
      gameRoleId: $gameRoleId
      characterId: $characterId
      vehicleCount: $vehicleCount
    ) {
      id
      vehicleCount
    }
  }
` as TypedDocumentNode<SetVehicleCountData, SetVehicleCountVars>;

export default SET_VEHICLE_COUNT;
