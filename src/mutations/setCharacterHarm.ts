import { gql } from '@apollo/client';
import { HarmInput } from '../@types';
import { Character, CharacterHarm } from '../@types/dataInterfaces';

export interface SetCharacterHarmData {
  setCharacterHarm: {
    id: string;
    harm: CharacterHarm;
    __typename?: 'Character';
  };
}

export interface SetCharacterHarmVars {
  gameRoleId: string;
  characterId: string;
  harm: HarmInput;
}

export const getSetCharacterHarmOR = (
  character: Character,
  harmInput: HarmInput
): SetCharacterHarmData => {
  return {
    setCharacterHarm: {
      id: character.id,
      harm: { ...harmInput, __typename: 'CharacterHarm' },
      __typename: 'Character',
    },
  };
};

const SET_CHARACTER_HARM = gql`
  mutation SetCharacterHarm(
    $gameRoleId: String!
    $characterId: String!
    $harm: HarmInput!
  ) {
    setCharacterHarm(
      gameRoleId: $gameRoleId
      characterId: $characterId
      harm: $harm
    ) {
      id
      harm {
        id
        value
        isStabilized
        hasComeBackHard
        hasComeBackWeird
        hasChangedPlaybook
        hasDied
      }
    }
  }
`;

export default SET_CHARACTER_HARM;
