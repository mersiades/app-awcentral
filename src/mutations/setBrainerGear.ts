import { gql } from '@apollo/client';
import { BrainerGear } from '../@types/dataInterfaces';
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

const SET_BRAINER_GEAR = gql`
  mutation SetBrainerGear($gameRoleId: String!, $characterId: String!, $brainerGear: [String]!) {
    setBrainerGear(gameRoleId: $gameRoleId, characterId: $characterId, brainerGear: $brainerGear) {
      id
      name
      playbook
      playbookUniques {
        id
        type
        brainerGear {
          id
          allowedItemsCount
          brainerGear
        }
      }
    }
  }
`;

export default SET_BRAINER_GEAR;
