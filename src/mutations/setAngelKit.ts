import { gql } from '@apollo/client';
import { Character } from '../@types/dataInterfaces';

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

const SET_ANGEL_KIT = gql`
  mutation SetAngelKit($gameRoleId: String!, $characterId: String!, $stock: Int!, $hasSupplier: Boolean!) {
    setAngelKit(gameRoleId: $gameRoleId, characterId: $characterId, stock: $stock, hasSupplier: $hasSupplier) {
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
