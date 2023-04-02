import { CyHttpMessages } from 'cypress/types/net-stubbing';
import IncomingHttpRequest = CyHttpMessages.IncomingHttpRequest;

// ONQ = query operation name
// ONM = mutation operation name
export const ONQ_GAME_ROLES = 'GameRolesByUserId'
export const ONQ_MC_CONTENT = 'McContent'
export const ONQ_ALL_MOVES = 'AllMoves'
export const ONQ_GAME = 'Game'
export const ONQ_DEATH_MOVES = 'DeathMoves'
export const ONQ_PLAYBOOK = 'Playbook'
export const ONQ_PLAYBOOKS = 'Playbooks'
export const ONQ_PLAYBOOK_CREATOR = 'PlaybookCreator'
export const ONQ_VEHICLE_CREATOR = 'VehicleCreator'
export const ONM_PERFORM_HEAL_HARM = 'PerformHealHarmMove'
export const ONM_UPDATE_FOLLOWERS = 'UpdateFollowers'
export const ONM_PERFORM_STAT_ROLL = 'PerformStatRollMove'
export const ONM_SET_GANG = 'SetGang'
export const ONM_SET_CHARACTER_MOVES = 'SetCharacterMoves'
export const ONM_SET_CHARACTER_VEHICLE = 'SetVehicle'
export const ONM_CREATE_CHARACTER = 'CreateCharacter'
export const ONM_SET_PLAYBOOK = 'SetCharacterPlaybook'
export const ONM_SET_CHARACTER_NAME = 'SetCharacterName'
export const ONM_SET_CHARACTER_LOOK = 'SetCharacterLook'
export const ONM_SET_CHARACTER_STATS = 'SetCharacterStats'
export const ONM_SET_CHARACTER_GEAR = 'SetCharacterGear'
export const ONM_SET_CHARACTER_BARTER = 'SetCharacterBarter'
export const ONM_SET_ANGEL_KIT = 'SetAngelKit'
export const ONM_SET_VEHICLE_COUNT = 'SetVehicleCount'
export const ONM_SET_BATTLE_VEHICLE_COUNT = 'SetBattleVehicleCount'
export const ONM_SET_BATTLE_VEHICLE = 'SetBattleVehicle'
export const ONM_ADJUST_HX = 'AdjustCharacterHx'
export const ONM_TOGGLE_STAT_HIGHLIGHT = 'ToggleStatHighlight'
export const ONM_ADD_INVITEE = 'AddInvitee'
export const ONM_REMOVE_INVITEE = 'RemoveInvitee'
export const ONM_SET_HARM = 'SetCharacterHarm'

export const generateAlias = (operationName: string): string =>  `gql${operationName}Query`;
export const generateWaitAlias = (operationName: string) => `@${generateAlias(operationName)}`

// Utility to match GraphQL mutation based on the operation name
export const hasOperationName = (req: IncomingHttpRequest, operationName: string) => {
  const { body } = req
  return (
    body.hasOwnProperty('operationName') && body.operationName === operationName
  )
}

// Alias query if operationName matches
export const aliasQuery = (req: IncomingHttpRequest, operationName: string) => {
  if (hasOperationName(req, operationName)) {
    req.alias = generateAlias(operationName);
  }
}

// Alias mutation if operationName matches
export const aliasMutation = (req: IncomingHttpRequest, operationName: string) => {
  if (hasOperationName(req, operationName)) {
    req.alias = generateAlias(operationName);
  }
}

export const waitMutationWithGame = (operationName: string) => {
  cy.wait(generateWaitAlias(operationName))
  cy.wait(generateWaitAlias(ONQ_GAME))
}

export const setupQueryAliases = (req: IncomingHttpRequest) => {
  aliasQuery(req, ONQ_GAME_ROLES)
  aliasQuery(req, ONQ_MC_CONTENT)
  aliasQuery(req, ONQ_ALL_MOVES)
  aliasQuery(req, ONQ_GAME)
  aliasQuery(req, ONQ_DEATH_MOVES)
  aliasQuery(req, ONQ_PLAYBOOK)
  aliasQuery(req, ONQ_PLAYBOOKS)
  aliasQuery(req, ONQ_PLAYBOOK_CREATOR)
  aliasQuery(req, ONQ_VEHICLE_CREATOR)
}

export const visitHomePage = () => {
  cy.visit('/');
  cy.wait(generateWaitAlias(ONQ_GAME_ROLES))
  cy.wait(generateWaitAlias(ONQ_MC_CONTENT))
}
