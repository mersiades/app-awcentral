import { gql } from '@apollo/client';
import { Character, CustomWeapons, PlaybookUniques } from '../@types/dataInterfaces';
import { UniqueTypes } from '../@types/enums';

export interface SetCustomWeaponsData {
  setCustomWeapons: {
    id: string;
    playbookUnique: {
      id: string;
      type: UniqueTypes;
      customWeapons?: CustomWeapons;
    };
    __typename?: 'Character';
  };
}

export interface SetCustomWeaponsVars {
  gameRoleId: string;
  characterId: string;
  weapons: string[];
}

export const getSetCustomWeaponsOR = (character: Character, weapons: string[]): SetCustomWeaponsData => {
  let optimisticPlaybookUnique: PlaybookUniques;
  if (!!character.playbookUniques && character.playbookUniques.customWeapons) {
    optimisticPlaybookUnique = {
      id: character.playbookUniques.id,
      type: character.playbookUniques.type,
      customWeapons: {
        id: character.playbookUniques.customWeapons.id,
        weapons,
        __typename: 'CustomWeapons',
      },
      __typename: 'PlaybookUniques',
    };
  } else {
    optimisticPlaybookUnique = {
      id: 'temp-id-1',
      type: UniqueTypes.customWeapons,
      customWeapons: {
        id: 'temp-id-2',
        weapons,
        __typename: 'CustomWeapons',
      },
      __typename: 'PlaybookUniques',
    };
  }

  return {
    setCustomWeapons: {
      ...character,
      playbookUnique: optimisticPlaybookUnique,
      __typename: 'Character',
    },
  };
};

const SET_CUSTOM_WEAPONS = gql`
  mutation SetCustomWeapons($gameRoleId: String!, $characterId: String!, $weapons: [String]!) {
    setCustomWeapons(gameRoleId: $gameRoleId, characterId: $characterId, weapons: $weapons) {
      id
      playbookUniques {
        id
        type
        customWeapons {
          id
          weapons
        }
      }
    }
  }
`;

export default SET_CUSTOM_WEAPONS;
