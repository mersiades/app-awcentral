import { gql } from '@apollo/client';

export interface SetCharacterBarterData {
  setCharacterBarter: {
    id: string;
    barter: number;
    __typename?: 'Character';
  };
}

export interface SetCharacterBarterVars {
  gameRoleId: string;
  characterId: string;
  amount: number;
}

export const getSetCharacterBarterOR = (
  id: string,
  barter: number
): SetCharacterBarterData => {
  return {
    setCharacterBarter: {
      id,
      barter,
      __typename: 'Character',
    },
  };
};

const SET_CHARACTER_BARTER = gql`
  mutation SetCharacterBarter(
    $gameRoleId: String!
    $characterId: String!
    $amount: Int!
  ) {
    setCharacterBarter(
      gameRoleId: $gameRoleId
      characterId: $characterId
      amount: $amount
    ) {
      id
      barter
    }
  }
`;

export default SET_CHARACTER_BARTER;
