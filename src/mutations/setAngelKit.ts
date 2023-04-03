import { gql } from '@apollo/client';
import { Character, PlaybookUniques } from '../@types/dataInterfaces';
import { UniqueTypes } from '../@types/enums';

export interface SetAngelKitData {
  setAngelKit: Character;
  __typename?: 'Mutation';
}

export interface SetAngelKitVars {
  gameRoleId: string;
  characterId: string;
  stock: number;
  hasSupplier: boolean;
}

export const setAngelKitOR = (character: Character, stock: number): SetAngelKitData => {
  let optimisticPlaybookUnique: PlaybookUniques;
  const pbUnique = character?.playbookUniques
  const angelKit = pbUnique?.angelKit
  if (!!pbUnique && !!angelKit) {
    optimisticPlaybookUnique = {
      id: pbUnique.id,
      type: pbUnique.type,
      angelKit: {
        ...angelKit,
        stock,
        __typename: 'AngelKit',
      },
      __typename: 'PlaybookUniques',
    }
  } else {
    optimisticPlaybookUnique = {
      id: 'temp-id-1',
      type: UniqueTypes.angelKit,
      angelKit: {
        id: 'temp-id-2',
        uniqueType: UniqueTypes.angelKit,
        description: "",
        angelKitMoves: [],
        hasSupplier: false,
        supplierText: "",
        stock,
        __typename: 'AngelKit',
      },
      __typename: 'PlaybookUniques',
    }
  }
  return {
    setAngelKit: {
      ...character,
      playbookUniques: optimisticPlaybookUnique,
      __typename: 'Character',
    }
  }
}

const SET_ANGEL_KIT = gql`
  mutation SetAngelKit(
    $gameRoleId: String!
    $characterId: String!
    $stock: Int!
    $hasSupplier: Boolean!
  ) {
    setAngelKit(
      gameRoleId: $gameRoleId
      characterId: $characterId
      stock: $stock
      hasSupplier: $hasSupplier
    ) {
      id
      name
      playbook
      playbookUniques {
        id
        type
        angelKit {
          id
          description
          stock
          hasSupplier
          supplierText
          angelKitMoves {
            name
            kind
            description
            playbook
            stat
            moveAction {
              id
              actionType
              rollType
              statToRollWith
            }
          }
        }
      }
    }
  }
`;

export default SET_ANGEL_KIT;
