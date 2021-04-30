import { gql } from '@apollo/client';
import { HoldingInput } from '../@types';
import { Character, Holding, PlaybookUniques } from '../@types/dataInterfaces';
import { UniqueTypes } from '../@types/enums';

export interface SetHoldingData {
  setHolding: {
    id: string;
    playbookUniques: {
      id: string;
      type: UniqueTypes;
      holding?: Holding;
    };
    __typename?: 'Character';
  };
  __typename?: 'Mutation';
}

export interface SetHoldingVars {
  gameRoleId: string;
  characterId: string;
  holding: HoldingInput;
  vehicleCount: number;
  battleVehicleCount: number;
}

export const getSetHoldingOR = (character: Character, holdingInput: HoldingInput): SetHoldingData => {
  let optimisticPlaybookUniques: PlaybookUniques;
  if (!!character.playbookUniques?.holding) {
    optimisticPlaybookUniques = {
      id: character.playbookUniques.id,
      type: UniqueTypes.holding,
      holding: {
        ...holdingInput,
        id: character.playbookUniques.holding.id,
        selectedStrengths: holdingInput.selectedStrengths.map((str) => ({ ...str, __typename: 'HoldingOption' })),
        selectedWeaknesses: holdingInput.selectedWeaknesses.map((wk) => ({ ...wk, __typename: 'HoldingOption' })),
      },
      __typename: 'PlaybookUniques',
    };
  } else {
    optimisticPlaybookUniques = {
      id: 'temp-id-1',
      type: UniqueTypes.holding,
      holding: {
        ...holdingInput,
        id: 'temp-id-2',
        selectedStrengths: holdingInput.selectedStrengths.map((str) => ({ ...str, __typename: 'HoldingOption' })),
        selectedWeaknesses: holdingInput.selectedWeaknesses.map((wk) => ({ ...wk, __typename: 'HoldingOption' })),
      },
      __typename: 'PlaybookUniques',
    };
  }

  return {
    setHolding: {
      ...character,
      playbookUniques: optimisticPlaybookUniques,
      __typename: 'Character',
    },
    __typename: 'Mutation',
  };
};

const SET_HOLDING = gql`
  mutation SetHolding(
    $gameRoleId: String!
    $characterId: String!
    $holding: HoldingInput!
    $vehicleCount: Int!
    $battleVehicleCount: Int!
  ) {
    setHolding(
      gameRoleId: $gameRoleId
      characterId: $characterId
      holding: $holding
      vehicleCount: $vehicleCount
      battleVehicleCount: $battleVehicleCount
    ) {
      id
      playbookUniques {
        id
        type
        holding {
          id
          holdingSize
          gangSize
          souls
          surplus
          barter
          gangHarm
          gangArmor
          gangDefenseArmorBonus
          wants
          gigs
          gangTags
          selectedStrengths {
            id
            description
            surplusChange
            wantChange
            newHoldingSize
            gigChange
            newGangSize
            gangTagChange
            gangHarmChange
            newVehicleCount
            newBattleVehicleCount
            newArmorBonus
          }
          selectedWeaknesses {
            id
            description
            surplusChange
            wantChange
            newHoldingSize
            gigChange
            newGangSize
            gangTagChange
            gangHarmChange
            newVehicleCount
            newBattleVehicleCount
            newArmorBonus
          }
        }
      }
    }
  }
`;

export default SET_HOLDING;
