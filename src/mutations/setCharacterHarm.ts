import { gql } from '@apollo/client';
import { HarmInput } from '../@types';
import { Character } from '../@types/dataInterfaces';

export interface SetCharacterHarmData {
  setCharacterHarm: Partial<Character>;
  __typename?: 'CharacterHarm';
}

export interface SetCharacterHarmVars {
  gameRoleId: string;
  characterId: string;
  harm: HarmInput;
}

export const getSetCharacterHarmOR = (character: Character, harmInput: HarmInput) => {
  return {
    // __typename: 'Mutation',
    setCharacterHarm: {
      id: character.id,
      name: character.name,
      playbook: character.playbook,
      harm: { ...harmInput, __typename: 'CharacterHarm' },
      __typename: 'Character',
    },
  };
};

const SET_CHARACTER_HARM = gql`
  mutation SetCharacterHarm($gameRoleId: String!, $characterId: String!, $harm: HarmInput!) {
    setCharacterHarm(gameRoleId: $gameRoleId, characterId: $characterId, harm: $harm) {
      id
      name
      playbook
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
