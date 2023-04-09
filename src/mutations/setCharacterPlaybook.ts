import { gql, TypedDocumentNode } from '@apollo/client';
import { Character } from '../@types/dataInterfaces';
import { PlaybookType } from '../@types/enums';

export interface SetCharacterPlaybookData {
  setPlaybookCharacter: Character;
}

export interface SetCharacterPlaybookVars {
  gameRoleId: string;
  characterId: string;
  playbookType: PlaybookType;
}

const SET_CHARACTER_PLAYBOOK = gql`
  mutation SetCharacterPlaybook(
    $gameRoleId: String!
    $characterId: String!
    $playbookType: PlaybookType!
  ) {
    setCharacterPlaybook(
      gameRoleId: $gameRoleId
      characterId: $characterId
      playbookType: $playbookType
    ) {
      id
      name
      playbook
      gear
      looks {
        look
        category
      }
      statsBlock {
        id
      }
    }
  }
` as TypedDocumentNode<SetCharacterPlaybookData, SetCharacterPlaybookVars>;

export default SET_CHARACTER_PLAYBOOK;
