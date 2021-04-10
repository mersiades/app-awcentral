import { gql } from '@apollo/client';
import { Character, CustomWeapons, PlaybookUnique } from '../@types/dataInterfaces';
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
  let optimisticPlaybookUnique: PlaybookUnique;
  if (!!character.playbookUnique && character.playbookUnique.customWeapons) {
    optimisticPlaybookUnique = {
      id: character.playbookUnique.id,
      type: character.playbookUnique.type,
      customWeapons: {
        id: character.playbookUnique.customWeapons.id,
        weapons,
        __typename: 'CustomWeapons',
      },
      __typename: 'PlaybookUnique',
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
      __typename: 'PlaybookUnique',
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
      playbookUnique {
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
