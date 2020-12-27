import { gql } from '@apollo/client';
import { Game } from '../@types';

export interface GameForPlayerData {
  gameForPlayer: Game;
}

export interface GameForPlayerVars {
  gameId: string;
  userId: string;
}

const GAME_FOR_PLAYER = gql`
  query GameForPlayer($gameId: String!, $userId: String!) {
    gameForPlayer(gameId: $gameId, userId: $userId) {
      id
      name
      commsUrl
      commsApp
      gameRoles {
        id
        role
        characters {
          id
          name
          playbook
          gear
          statsBlock {
            id
            stats {
              id
              stat
              value
              isHighlighted
            }
          }
          looks {
            look
            category
          }
          characterMoves {
            id
            isSelected
            name
            kind
            description
            playbook
            stat
            rollModifier {
              id
              movesToModify {
                id
              }
              statToRollWith
            }
          }
          playbookUnique {
            id
            type
            brainerGear {
              id
              brainerGear
            }
            angelKit {
              id
              description
              stock
              angelKitMoves {
                id
              }
              hasSupplier
              supplierText
            }
            customWeapons {
              id
              weapons
            }
          }
        }
      }
    }
  }
`

export default GAME_FOR_PLAYER
