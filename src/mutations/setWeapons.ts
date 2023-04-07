import { gql, TypedDocumentNode } from '@apollo/client';
import { Character } from '../@types/dataInterfaces';

export interface SetWeaponsData {
  setWeapons: Character;
}

export interface SetWeaponsVars {
  gameRoleId: string;
  characterId: string;
  weapons: string[];
}

const SET_WEAPONS = gql`
  mutation SetWeapons(
    $gameRoleId: String!
    $characterId: String!
    $weapons: [String]!
  ) {
    setWeapons(
      gameRoleId: $gameRoleId
      characterId: $characterId
      weapons: $weapons
    ) {
      id
      name
      playbook
      playbookUniques {
        id
        type
        weapons {
          id
          uniqueType
          weapons
        }
      }
    }
  }
` as TypedDocumentNode<SetWeaponsData, SetWeaponsVars>;

export default SET_WEAPONS;
