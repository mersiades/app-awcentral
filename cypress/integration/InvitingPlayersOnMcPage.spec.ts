import game7 from '../fixtures/games/game7';
import {
  ADD_ANOTHER_TEXT,
  ADD_EMAIL_ADDRESS_TEXT,
  ADD_TEXT,
  INVITE_A_PLAYER_TO_TEXT,
  INVITE_PLAYER_TEXT,
  NO_MC_AS_PLAYER_TEXT,
  PLAYER_ALREADY_JOINED_GAME_TEXT,
  TELL_HOW_JOIN_GAME_TEXT,
} from '../../src/config/constants';
import {
  aliasMutation,
  generateWaitAlias, ONM_ADD_INVITEE, ONM_REMOVE_INVITEE,
  ONQ_ALL_MOVES,
  setupQueryAliases,
  visitHomePage, waitMutationWithGame
} from '../utils/graphql-test-utils';

describe('Inviting players to a game from the McPage', () => {
  beforeEach(() => {
    cy.login('dave@email.com');
    cy.intercept('POST', `${Cypress.env('GRAPHQL_HOST')}/graphql`, (req)=> {
      setupQueryAliases(req)
      aliasMutation(req, ONM_ADD_INVITEE)
      aliasMutation(req, ONM_REMOVE_INVITEE)
    })
    visitHomePage();
    cy.returnToGame(game7.name);
    cy.wait(generateWaitAlias(ONQ_ALL_MOVES))
  });

  it.only('should add two invitees, then delete them', () => {
    const mockInvitee1Email = 'invitee1@email.com';
    const mockInvitee2Email = 'invitee2@email.com';
    cy.contains(INVITE_PLAYER_TEXT).scrollIntoView().click();
    cy.contains(`${INVITE_A_PLAYER_TO_TEXT} ${game7.name}`).should('exist');
    cy.contains(ADD_EMAIL_ADDRESS_TEXT).should('exist');
    cy.get('input[aria-label="Email input"]').type(mockInvitee1Email);
    cy.contains(ADD_TEXT).click();
    waitMutationWithGame(ONM_ADD_INVITEE)
    cy.get('div[data-testid="invitations-box"]').within(() => {
      cy.contains(mockInvitee1Email).should('exist');
    });
    cy.contains(TELL_HOW_JOIN_GAME_TEXT).should('exist');
    cy.contains(ADD_ANOTHER_TEXT).click();
    cy.contains(ADD_EMAIL_ADDRESS_TEXT).should('exist');
    cy.get('input[aria-label="Email input"]').type(mockInvitee2Email);
    cy.contains(ADD_TEXT).click();
    waitMutationWithGame(ONM_ADD_INVITEE)
    cy.get('div[data-testid="invitations-box"]').within(() => {
      cy.contains(mockInvitee2Email).should('exist');
      cy.get(`svg[data-testid="${mockInvitee1Email}-trash-icon"]`).click();
      waitMutationWithGame(ONM_REMOVE_INVITEE)
      cy.contains(mockInvitee1Email).should('not.exist');
      cy.get(`svg[data-testid="${mockInvitee2Email}-trash-icon"]`).click();
      waitMutationWithGame(ONM_REMOVE_INVITEE)
      cy.contains(mockInvitee2Email).should('not.exist');
    });
    cy.get('div[data-testid="close-icon-button"]').click();
    cy.contains(`${INVITE_A_PLAYER_TO_TEXT} ${game7.name}`).should('not.exist');
  });

  it('should NOT invite the MC as a player', () => {
    cy.contains(INVITE_PLAYER_TEXT).scrollIntoView().click();
    cy.get('input[aria-label="Email input"]').type('dave@email.com');
    cy.contains(ADD_TEXT).click();
    cy.contains(NO_MC_AS_PLAYER_TEXT).should('be.visible');
    cy.get('div[data-testid="invitations-box"]').within(() => {
      cy.contains('dave@email.com').should('not.exist');
    });
  });

  it('should NOT invite a player that has already joined the game', () => {
    cy.contains(INVITE_PLAYER_TEXT).scrollIntoView().click();
    cy.get('input[aria-label="Email input"]').type('wilmer@email.com');
    cy.contains(ADD_TEXT).click();
    cy.contains(PLAYER_ALREADY_JOINED_GAME_TEXT).should('be.visible');
    cy.get('div[data-testid="invitations-box"]').within(() => {
      cy.contains('wilmer@email.com').should('not.exist');
    });
  });
});
