import { gql, TypedDocumentNode } from '@apollo/client';
import { Character } from '../@types/dataInterfaces';

export interface CreateCharacterData {
  createCharacter: Character;
}

export interface CreateCharacterVars {
  gameRoleId: string;
}

const CREATE_CHARACTER = gql`
  mutation CreateCharacter($gameRoleId: String!) {
    createCharacter(gameRoleId: $gameRoleId) {
      id
    }
  }
` as TypedDocumentNode<CreateCharacterData, CreateCharacterVars>;

export default CREATE_CHARACTER;
