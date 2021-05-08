import { gql } from '@apollo/client';
import { Game } from '../@types/dataInterfaces';

export interface GameData {
  game: Game;
}

export interface GameVars {
  gameId: string;
}

export const playbookUniqueFragments = {
  angelKit: gql`
    fragment AngelKit on PlaybookUnique {
      angelKit {
        id
        uniqueType
        description
        stock
        angelKitMoves {
          id
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
        hasSupplier
        supplierText
      }
    }
  `,
  brainerGear: gql`
    fragment BrainerGear on PlaybookUnique {
      brainerGear {
        id
        uniqueType
        allowedItemsCount
        brainerGear
      }
    }
  `,

  customWeapons: gql`
    fragment CustomWeapons on PlaybookUnique {
      customWeapons {
        id
        uniqueType
        weapons
      }
    }
  `,
  establishment: gql`
    fragment Establishment on PlaybookUnique {
      establishment {
        id
        uniqueType
        mainAttraction
        bestRegular
        worstRegular
        wantsInOnIt
        oweForIt
        wantsItGone
        sideAttractions
        atmospheres
        regulars
        interestedParties
        securityOptions {
          id
          description
          value
        }
        castAndCrew {
          id
          name
          description
        }
      }
    }
  `,
  followers: gql`
    fragment Followers on PlaybookUnique {
      followers {
        id
        uniqueType
        description
        travelOption
        characterization
        followers
        fortune
        barter
        surplusBarter
        surplus
        wants
        selectedStrengths {
          id
          description
          newNumberOfFollowers
          surplusBarterChange
          fortuneChange
          surplusChange
          wantChange
        }
        selectedWeaknesses {
          id
          description
          newNumberOfFollowers
          surplusBarterChange
          fortuneChange
          surplusChange
          wantChange
        }
      }
    }
  `,
  gang: gql`
    fragment Gang on PlaybookUnique {
      gang {
        id
        uniqueType
        size
        harm
        armor
        allowedStrengths
        strengths {
          id
          description
          modifier
          tag
        }
        weaknesses {
          id
          description
          modifier
          tag
        }
        tags
      }
    }
  `,
  holding: gql`
    fragment Holding on PlaybookUnique {
      holding {
        id
        uniqueType
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
  `,
  skinnerGear: gql`
    fragment SkinnerGear on PlaybookUnique {
      skinnerGear {
        id
        uniqueType
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
  `,
  weapons: gql`
    fragment Weapons on PlaybookUnique {
      weapons {
        id
        uniqueType
        weapons
      }
    }
  `,
  workspace: gql`
    fragment Workspace on PlaybookUnique {
      workspace {
        id
        uniqueType
        workspaceInstructions
        projectInstructions
        workspaceItems
        projects {
          id
          name
          notes
        }
      }
    }
  `,
};

export const characterFragments = {
  holds: gql`
    fragment Holds on Character {
      holds {
        id
        moveName
        moveDescription
        rollResult
      }
    }
  `,
  harm: gql`
    fragment Harm on Character {
      harm {
        id
        value
        isStabilized
        hasComeBackHard
        hasComeBackWeird
        hasChangedPlaybook
        hasDied
      }
    }
  `,
  statsBlock: gql`
    fragment StatsBlock on Character {
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
    }
  `,
  hxBlock: gql`
    fragment HxBlock on Character {
      hxBlock {
        id
        characterId
        characterName
        hxValue
      }
    }
  `,
  looks: gql`
    fragment Looks on Character {
      looks {
        id
        look
        category
        playbookType
      }
    }
  `,
  characterMoves: gql`
    fragment CharacterMoves on Character {
      characterMoves {
        id
        isSelected
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
  `,
  vehicles: gql`
    fragment Vehicles on Character {
      vehicles {
        id
        name
        vehicleType
        vehicleFrame {
          id
          frameType
          massive
          examples
          battleOptionCount
        }
        speed
        handling
        armor
        massive
        strengths
        weaknesses
        looks
        battleOptions {
          id
          battleOptionType
          name
        }
      }
    }
  `,
  battleVehicles: gql`
    fragment BattleVehicles on Character {
      battleVehicles {
        id
        name
        vehicleType
        vehicleFrame {
          id
          frameType
          massive
          examples
          battleOptionCount
        }
        speed
        handling
        armor
        massive
        strengths
        weaknesses
        looks
        weapons
        battleOptions {
          id
          battleOptionType
          name
        }
        battleVehicleOptions {
          id
          battleOptionType
          name
        }
      }
    }
  `,
  playbookUnique: gql`
    fragment PlaybookUnique on Character {
      playbookUniques {
        id
        type
        ...AngelKit
        ...BrainerGear
        ...CustomWeapons
        ...Establishment
        ...Followers
        ...Gang
        ...Holding
        ...SkinnerGear
        ...Weapons
        ...Workspace
      }
    }
    ${playbookUniqueFragments.angelKit}
    ${playbookUniqueFragments.brainerGear}
    ${playbookUniqueFragments.customWeapons}
    ${playbookUniqueFragments.establishment}
    ${playbookUniqueFragments.followers}
    ${playbookUniqueFragments.gang}
    ${playbookUniqueFragments.holding}
    ${playbookUniqueFragments.skinnerGear}
    ${playbookUniqueFragments.weapons}
    ${playbookUniqueFragments.workspace}
  `,
};

export const gameRoleFragments = {
  npcs: gql`
    fragment Npcs on GameRole {
      npcs {
        id
        name
        description
      }
    }
  `,
  threats: gql`
    fragment Threats on GameRole {
      threats {
        id
        name
        threatKind
        impulse
        description
        stakes
      }
    }
  `,
  characters: gql`
    fragment Characters on GameRole {
      characters {
        id
        name
        playbook
        hasCompletedCharacterCreation
        hasPlusOneForward
        gear
        barter
        vehicleCount
        battleVehicleCount
        ...Holds
        ...Harm
        ...StatsBlock
        ...HxBlock
        ...Looks
        ...CharacterMoves
        ...Vehicles
        ...BattleVehicles
        ...PlaybookUnique
      }
    }
    ${characterFragments.holds}
    ${characterFragments.harm}
    ${characterFragments.statsBlock}
    ${characterFragments.hxBlock}
    ${characterFragments.looks}
    ${characterFragments.characterMoves}
    ${characterFragments.vehicles}
    ${characterFragments.battleVehicles}
    ${characterFragments.playbookUnique}
  `,
};

export const gameFragments = {
  gameMessages: gql`
    fragment GameMessages on Game {
      gameMessages {
        id
        gameId
        gameRoleId
        messageType
        title
        content
        sentOn
        roll1
        roll2
        rollModifier
        usedPlusOneForward
        rollResult
        modifierStatName
        additionalModifierValue
        additionalModifierName
        barterSpent
        currentBarter
        harmSuffered
        currentHarm
        stockSpent
        currentStock
      }
    }
  `,
  mc: gql`
    fragment MC on Game {
      mc {
        id
        displayName
      }
    }
  `,
  players: gql`
    fragment Players on Game {
      players {
        id
        displayName
      }
    }
  `,
  gameRoles: gql`
    fragment GameRoles on Game {
      gameRoles {
        id
        role
        userId
        ...Npcs
        ...Threats
        ...Characters
      }
    }
    ${gameRoleFragments.npcs}
    ${gameRoleFragments.threats}
    ${gameRoleFragments.characters}
  `,
};

const GAME = gql`
  query Game($gameId: String!) {
    game(gameId: $gameId) {
      id
      name
      invitees
      commsApp
      commsUrl
      hasFinishedPreGame
      showFirstSession
      mc {
        id
        displayName
      }
      players {
        id
        displayName
      }
      gameMessages {
        id
        gameId
        gameRoleId
        messageType
        title
        content
        sentOn
        roll1
        roll2
        rollModifier
        usedPlusOneForward
        rollResult
        modifierStatName
        additionalModifierValue
        additionalModifierName
        barterSpent
        currentBarter
        harmSuffered
        currentHarm
        stockSpent
        currentStock
      }
      gameRoles {
        id
        role
        userId
        npcs {
          id
          name
          description
        }
        threats {
          id
          name
          threatKind
          impulse
          description
          stakes
        }
        characters {
          id
          name
          playbook
          hasCompletedCharacterCreation
          hasPlusOneForward
          gear
          barter
          experience
          allowedImprovements
          allowedPlaybookMoves
          allowedOtherPlaybookMoves
          vehicleCount
          battleVehicleCount
          holds {
            id
            moveName
            moveDescription
            rollResult
          }
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
            id
            look
            category
            playbookType
          }
          characterMoves {
            id
            isSelected
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
          improvementMoves {
            id
            isSelected
            name
            kind
            description
            playbook
          }
          futureImprovementMoves {
            id
            isSelected
            name
            kind
            description
            playbook
          }
          vehicles {
            id
            name
            vehicleType
            vehicleFrame {
              id
              frameType
              massive
              examples
              battleOptionCount
            }
            speed
            handling
            armor
            massive
            strengths
            weaknesses
            looks
            battleOptions {
              id
              battleOptionType
              name
            }
          }
          battleVehicles {
            id
            name
            vehicleType
            vehicleFrame {
              id
              frameType
              massive
              examples
              battleOptionCount
            }
            speed
            handling
            armor
            massive
            strengths
            weaknesses
            looks
            weapons
            battleOptions {
              id
              battleOptionType
              name
            }
            battleVehicleOptions {
              id
              battleOptionType
              name
            }
          }
          playbookUniques {
            id
            type
            angelKit {
              id
              uniqueType
              description
              stock
              angelKitMoves {
                id
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
              hasSupplier
              supplierText
            }
            brainerGear {
              id
              uniqueType
              allowedItemsCount
              brainerGear
            }
            customWeapons {
              id
              uniqueType
              weapons
            }
            followers {
              id
              uniqueType
              description
              travelOption
              characterization
              followers
              fortune
              barter
              surplusBarter
              surplus
              wants
              strengthsCount
              weaknessesCount
              selectedStrengths {
                id
                description
                newNumberOfFollowers
                surplusBarterChange
                fortuneChange
                surplusChange
                wantChange
              }
              selectedWeaknesses {
                id
                description
                newNumberOfFollowers
                surplusBarterChange
                fortuneChange
                surplusChange
                wantChange
              }
            }
            gang {
              id
              uniqueType
              size
              harm
              armor
              allowedStrengths
              strengths {
                id
                description
                modifier
                tag
              }
              weaknesses {
                id
                description
                modifier
                tag
              }
              tags
            }
            holding {
              id
              uniqueType
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
              strengthsCount
              weaknessesCount
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
            skinnerGear {
              id
              uniqueType
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
            weapons {
              id
              uniqueType
              weapons
            }
            workspace {
              id
              uniqueType
              workspaceInstructions
              projectInstructions
              itemsCount
              workspaceItems
              projects {
                id
                name
                notes
              }
            }
            establishment {
              id
              uniqueType
              mainAttraction
              bestRegular
              worstRegular
              wantsInOnIt
              oweForIt
              wantsItGone
              sideAttractions
              atmospheres
              regulars
              interestedParties
              securityOptions {
                id
                description
                value
              }
              castAndCrew {
                id
                name
                description
              }
            }
          }
        }
      }
    }
  }
`;

export default GAME;
