import { gql, TypedDocumentNode } from '@apollo/client';
import { Character } from '../@types/dataInterfaces';

export interface SetCharacterNameData {
  setCharacterName: Character;
  __typename: 'Mutation';
}

export interface SetCharacterNameVars {
  gameRoleId: string;
  characterId: string;
  name: string;
}

const SET_CHARACTER_NAME = gql`
  mutation SetCharacterName(
    $gameRoleId: String!
    $characterId: String!
    $name: String!
  ) {
    setCharacterName(
      gameRoleId: $gameRoleId
      characterId: $characterId
      name: $name
    ) {
      id
      name
      playbook
      gear
      looks {
        look
        category
      }
    }
  }
` as TypedDocumentNode<SetCharacterNameData, SetCharacterNameVars>;

export default SET_CHARACTER_NAME;
