import { gql } from '@apollo/client';
import { Character, HxInput } from '../@types';

export interface SetCharacterHxData {
  setCharacterHx: Character
}

export interface SetCharacterHxVars {
  gameRoleId: string
  characterId: string
  hxStats: HxInput[]
}

const SET_CHARACTER_HX = gql`
  mutation SetCharacterHx($gameRoleId: String!,$characterId: String!, $hxStats: [HxInput]!) {
    setCharacterHx(gameRoleId: $gameRoleId, characterId: $characterId, hxStats: $hxStats) {
      id
      name
      playbook
      gear
      looks {
        look
        category
      }
      hxBlock {
        characterId
        characterName
        hxValue
      }
    }
  }
`

export default SET_CHARACTER_HX