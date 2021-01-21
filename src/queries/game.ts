import { gql } from '@apollo/client';
import { Game } from '../@types/dataInterfaces';

export interface GameData {
  game: Game;
}

export interface GameVars {
  gameId: string;
}

const GAME = gql`
  query Game($gameId: String!) {
    game(gameId: $gameId) {
      id
      name
      invitees
      commsApp
      commsUrl
      hasFinishedPreGame
      gameMessages {
        id
        gameId
        gameroleId
        messageType
        title
        content
        sentOn
      }
      mc {
        id
        displayName
      }
      players {
        id
        displayName
      }
      gameRoles {
        id
        role
        userId
        npcs {
          id
        }
        threats {
          id
        }
        characters {
          id
          name
          playbook
          hasCompletedCharacterCreation
          gear
          barter
          harm {
            id
            value
            isStabilized
            hasComeBackHard
            hasComeBackWeird
            hasChangedPlaybook
            hasDied
          }
          statsBlock {
            id
            statsOptionId
            stats {
              id
              stat
              value
              isHighlighted
            }
          }
          hxBlock {
            id
            characterId
            characterName
            hxValue
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
            moveAction {
              id
              actionType
              rollType
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
`;

export default GAME;
