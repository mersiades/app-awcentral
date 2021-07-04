import { gql } from '@apollo/client';
import { BrainerGear, Character } from '../@types/dataInterfaces';
import { PlaybookType, UniqueTypes } from '../@types/enums';

export interface SetBrainerGearData {
  setBrainerGear: {
    id: string;
    name: string;
    playbook: PlaybookType;
    playbookUniques: {
      id: string;
      type: UniqueTypes;
      brainerGear: BrainerGear;
    };
    __typename: 'Character';
  };
}

export interface SetBrainerGearVars {
  gameRoleId: string;
  characterId: string;
  brainerGear: string[];
}

export const setBrainerGearOR = (
  character: Character,
  brainerGear: string[]
): SetBrainerGearData => ({
  setBrainerGear: {
    id: character.id,
    name: character.name || 'temp-name',
    playbook: character.playbook,
    playbookUniques: {
      id: character.playbookUniques?.id || 'temp-id',
      type: UniqueTypes.brainerGear,
      brainerGear: {
        id:
          character.playbookUniques?.brainerGear?.id || 'temp-brainer-gear-id',
        uniqueType: UniqueTypes.brainerGear,
        allowedItemsCount:
          character.playbookUniques?.brainerGear?.allowedItemsCount || 2,
        brainerGear,
      },
    },
    __typename: 'Character',
  },
});

const SET_BRAINER_GEAR = gql`
  mutation SetBrainerGear(
    $gameRoleId: String!
    $characterId: String!
    $brainerGear: [String]!
  ) {
    setBrainerGear(
      gameRoleId: $gameRoleId
      characterId: $characterId
      brainerGear: $brainerGear
    ) {
      id
      name
      playbook
      playbookUniques {
        id
        type
        brainerGear {
          id
          uniqueType
          allowedItemsCount
          brainerGear
        }
      }
    }
  }
`;

export default SET_BRAINER_GEAR;
