import { gql, TypedDocumentNode } from '@apollo/client';
import { VehicleInput } from '../@types';
import { Character } from '../@types/dataInterfaces';

export interface SetVehicleData {
  setVehicle: Character;
}

export interface SetVehicleVars {
  gameRoleId: string;
  characterId: string;
  vehicleInput: VehicleInput;
}

const SET_VEHICLE = gql`
  mutation SetVehicle(
    $gameRoleId: String!
    $characterId: String!
    $vehicleInput: VehicleInput!
  ) {
    setVehicle(
      gameRoleId: $gameRoleId
      characterId: $characterId
      vehicleInput: $vehicleInput
    ) {
      id
      name
      playbook
      vehicles {
        id
        name
        vehicleFrame {
          id
          frameType
          massive
          examples
          battleOptionCount
        }
        speed
        handling
        armor
        massive
        strengths
        weaknesses
        looks
        battleOptions {
          id
          battleOptionType
          name
        }
      }
    }
  }
` as TypedDocumentNode<SetVehicleData, SetVehicleVars>;

export default SET_VEHICLE;
