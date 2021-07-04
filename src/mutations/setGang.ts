import { gql } from '@apollo/client';
import { GangInput } from '../@types';
import { Character, Gang, PlaybookUniques } from '../@types/dataInterfaces';
import { UniqueTypes } from '../@types/enums';

export interface SetGangData {
  setGang: {
    id: string;
    playbookUniques: {
      id: string;
      type: UniqueTypes;
      gang?: Gang;
    };
    __typename?: 'Character';
  };
  __typename?: 'Mutation';
}

export interface SetGangVars {
  gameRoleId: string;
  characterId: string;
  gang: GangInput;
}

export const getSetGangOR = (
  character: Character,
  gangInput: GangInput
): SetGangData => {
  let optimisticPlaybookUniques: PlaybookUniques;
  if (!!character.playbookUniques?.gang) {
    optimisticPlaybookUniques = {
      id: character.playbookUniques.id,
      type: UniqueTypes.gang,
      gang: {
        ...gangInput,
        id: character.playbookUniques.gang.id,
        uniqueType: UniqueTypes.gang,
        allowedStrengths: character.playbookUniques.gang.allowedStrengths,
        strengths: gangInput.strengths.map((str) => ({
          ...str,
          __typename: 'GangOption',
        })),
        weaknesses: gangInput.weaknesses.map((wk) => ({
          ...wk,
          __typename: 'GangOption',
        })),
        __typename: 'Gang',
      },
      __typename: 'PlaybookUniques',
    };
  } else {
    optimisticPlaybookUniques = {
      id: 'temp-id-1',
      type: UniqueTypes.gang,
      gang: {
        ...gangInput,
        id: 'temp-id-2',
        uniqueType: UniqueTypes.gang,
        allowedStrengths: 2,
        strengths: gangInput.strengths.map((str) => ({
          ...str,
          __typename: 'GangOption',
        })),
        weaknesses: gangInput.weaknesses.map((wk) => ({
          ...wk,
          __typename: 'GangOption',
        })),
        __typename: 'Gang',
      },
      __typename: 'PlaybookUniques',
    };
  }

  return {
    setGang: {
      ...character,
      playbookUniques: optimisticPlaybookUniques,
      __typename: 'Character',
    },
    __typename: 'Mutation',
  };
};

const SET_GANG = gql`
  mutation SetGang(
    $gameRoleId: String!
    $characterId: String!
    $gang: GangInput!
  ) {
    setGang(gameRoleId: $gameRoleId, characterId: $characterId, gang: $gang) {
      id
      name
      playbook
      playbookUniques {
        id
        type
        gang {
          id
          uniqueType
          size
          harm
          armor
          allowedStrengths
          strengths {
            id
            description
            modifier
            tag
          }
          weaknesses {
            id
            description
            modifier
            tag
          }
          tags
        }
      }
    }
  }
`;

export default SET_GANG;
