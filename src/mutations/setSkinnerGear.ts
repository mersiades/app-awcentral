import { gql } from '@apollo/client';
import { SkinnerGearInput } from '../@types';
import { Character, PlaybookUniques, SkinnerGear } from '../@types/dataInterfaces';
import { UniqueTypes } from '../@types/enums';

export interface SetSkinnerGearData {
  setSkinnerGear: {
    id: string;
    playbookUniques: {
      id: string;
      type: UniqueTypes;
      skinnerGear?: SkinnerGear;
    };
    __typename?: 'Character';
  };
}

export interface SetSkinnerGearVars {
  gameRoleId: string;
  characterId: string;
  skinnerGear: SkinnerGearInput;
}

export const getSetSkinnerGearOR = (character: Character, skinnerGearInput: SkinnerGearInput): SetSkinnerGearData => {
  const optimisticPlaybookUniques: PlaybookUniques = {
    id: character.playbookUniques ? character.playbookUniques.id : 'temp-id-1',
    type: UniqueTypes.skinnerGear,
    skinnerGear: {
      ...skinnerGearInput,
      id: character.playbookUniques?.skinnerGear ? character.playbookUniques.skinnerGear.id : 'temp-id-2',
      graciousWeapon: { ...skinnerGearInput.graciousWeapon, __typename: 'SkinnerGearItem' },
      luxeGear: skinnerGearInput.luxeGear.map((lg) => ({ ...lg, __typename: 'SkinnerGearItem' })),
      __typename: 'SkinnerGear',
    },
    __typename: 'PlaybookUniques',
  };

  return {
    setSkinnerGear: {
      ...character,
      playbookUniques: optimisticPlaybookUniques,
      __typename: 'Character',
    },
  };
};

const SET_SKINNER_GEAR = gql`
  mutation SetSkinnerGear($gameRoleId: String!, $characterId: String!, $skinnerGear: SkinnerGearInput!) {
    setSkinnerGear(gameRoleId: $gameRoleId, characterId: $characterId, skinnerGear: $skinnerGear) {
      id
      playbookUniques {
        id
        type
        skinnerGear {
          id
          graciousWeapon {
            id
            item
            note
          }
          luxeGear {
            id
            item
            note
          }
        }
      }
    }
  }
`;

export default SET_SKINNER_GEAR;
