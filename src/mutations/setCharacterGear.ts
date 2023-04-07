import { gql, TypedDocumentNode } from '@apollo/client';
import { Character } from '../@types/dataInterfaces';

export interface SetCharacterGearData {
  setCharacterGear: Character;
  __typename?: 'Mutation';
}

export interface SetCharacterGearVars {
  gameRoleId: string;
  characterId: string;
  gear: string[];
}

const SET_CHARACTER_GEAR = gql`
  mutation SetCharacterGear(
    $gameRoleId: String!
    $characterId: String!
    $gear: [String]!
  ) {
    setCharacterGear(
      gameRoleId: $gameRoleId
      characterId: $characterId
      gear: $gear
    ) {
      id
      name
      playbook
      gear
    }
  }
` as TypedDocumentNode<SetCharacterGearData, SetCharacterGearVars>;

export default SET_CHARACTER_GEAR;
