import { gql } from '@apollo/client';
import { LookInput } from '../@types';
import { Character } from '../@types/dataInterfaces';
import { LookType, PlaybookType } from '../@types/enums';

export interface SetCharacterLookData_Look {
  id: string;
  look: string;
  category: LookType;
  __typename?: 'Look';
}

export interface SetCharacterLookData {
  setCharacterLook: {
    id: string;
    name: string;
    playbook: PlaybookType;
    looks: SetCharacterLookData_Look[];
    __typename?: 'Character';
  };
}

export interface SetCharacterLookVars {
  gameRoleId: string;
  characterId: string;
  look: LookInput;
}

export const getSetCharacterLookOR = (
  character: Character,
  lookInput: LookInput
): SetCharacterLookData => {
  const optimisticLooks: SetCharacterLookData_Look[] = [
    {
      id: 'temp-id',
      look: lookInput.look,
      category: lookInput.category,
      __typename: 'Look',
    },
  ];
  const existingLooks = character.looks.map((look) => ({
    id: look.id,
    look: look.look,
    category: look.category,
    __typename: 'Look' as const,
  }));
  existingLooks.forEach((existingLook) => {
    if (existingLook.category !== lookInput.category) {
      optimisticLooks.push(existingLook);
    }
  });

  return {
    setCharacterLook: {
      id: character.id,
      name: character.name || 'temp-name',
      playbook: character.playbook,
      looks: optimisticLooks,
      __typename: 'Character',
    },
  };
};

const SET_CHARACTER_LOOK = gql`
  mutation SetCharacterLook(
    $gameRoleId: String!
    $characterId: String!
    $look: LookInput!
  ) {
    setCharacterLook(
      gameRoleId: $gameRoleId
      characterId: $characterId
      look: $look
    ) {
      id
      name
      playbook
      looks {
        id
        look
        category
      }
    }
  }
`;

export default SET_CHARACTER_LOOK;
