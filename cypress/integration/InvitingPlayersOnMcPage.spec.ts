import {
  ADD_ANOTHER_TEXT,
  ADD_EMAIL_ADDRESS_TEXT,
  ADD_TEXT,
  INVITE_A_PLAYER_TO_TEXT,
  INVITE_PLAYER_TEXT,
  TELL_HOW_JOIN_GAME_TEXT,
} from '../../src/config/constants';
import game7 from '../fixtures/games/game7';

describe('Inviting players to a game from the McPage', () => {
  beforeEach(() => {
    cy.kcLogout();
    cy.kcLogin('dave');
    cy.visit(`/mc-game/${game7.id}`);
  });

  it('should add two invitees, then delete them', () => {
    const mockInvitee1Email = 'invitee1@email.com';
    const mockInvitee2Email = 'invitee2@email.com';
    cy.contains(INVITE_PLAYER_TEXT).scrollIntoView().click();
    cy.contains(`${INVITE_A_PLAYER_TO_TEXT} ${game7.name}`).should('exist');
    cy.contains(ADD_EMAIL_ADDRESS_TEXT).should('exist');
    cy.get('input[aria-label="Email input"]').type(mockInvitee1Email);
    cy.contains(ADD_TEXT).click();
    cy.get('div[data-testid="invitations-box"]').within(() => {
      cy.contains(mockInvitee1Email).should('exist');
    });
    cy.contains(TELL_HOW_JOIN_GAME_TEXT).should('exist');
    cy.contains(ADD_ANOTHER_TEXT).click();
    cy.contains(ADD_EMAIL_ADDRESS_TEXT).should('exist');
    cy.get('input[aria-label="Email input"]').type(mockInvitee2Email);
    cy.contains(ADD_TEXT).click();
    cy.get('div[data-testid="invitations-box"]').within(() => {
      cy.contains(mockInvitee2Email).should('exist');
      cy.get(`svg[data-testid="${mockInvitee1Email}-trash-icon"]`).click();
      cy.contains(mockInvitee1Email).should('not.exist');
      cy.get(`svg[data-testid="${mockInvitee2Email}-trash-icon"]`).click();
      cy.contains(mockInvitee2Email).should('not.exist');
    });
    cy.get('div[data-testid="close-icon-button"]').click();
    cy.contains(`${INVITE_A_PLAYER_TO_TEXT} ${game7.name}`).should('not.exist');
  });
});
