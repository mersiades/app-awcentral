import {
  CANCEL_TEXT,
  NO_TEXT,
  PRE_GAME_INCOMPLETE_TEXT_MC,
  PRE_GAME_INCOMPLETE_TITLE,
  RETURN_TO_GAME_TEXT,
  SCRIPT_CHANGE_FRAME_TITLE,
  START_GAME_TEXT,
  YES_TEXT,
} from '../../src/config/constants';
import { MOCK_GAME_1_NAME } from '../fixtures/games/game1';
describe('Using the PreGamePage as a player', () => {
  beforeEach(() => {
    cy.kcLogout();
    cy.kcLogin('sara');
    cy.visit('/');
  });

  context('with a game with hasFinishedPreGame = false', () => {
    it('should navigate to PreGamePage, and allow ScriptChange preview', () => {
      // Navigate to game
      cy.contains(RETURN_TO_GAME_TEXT).click();
      cy.contains(MOCK_GAME_1_NAME).click();
      cy.url().should('contain', 'player-game');

      // Check GoToPreGameDialog
      cy.contains(PRE_GAME_INCOMPLETE_TITLE).should('exist');
      cy.contains(PRE_GAME_INCOMPLETE_TEXT_MC).should('exist');
      cy.contains(NO_TEXT).should('exist');
      cy.contains(YES_TEXT).as('yesButton');

      // Go to PreGamePage
      cy.get('@yesButton').click();
      cy.url().should('contain', 'pre-game');

      // Check Script Change preview
      cy.get('img[aria-label="script-change-button"]').click();
      cy.contains(SCRIPT_CHANGE_FRAME_TITLE).should('exist');
      cy.contains(CANCEL_TEXT).scrollIntoView().click();

      // Go to player page event though pre-game not complete
      cy.get('div[data-testid="close-icon-button"]').click();
      cy.url().should('contain', 'player-game');
      cy.contains('Pre-game').should('exist');

      // Close GoToPreGameDialog
      cy.contains(NO_TEXT).click();
      cy.contains(PRE_GAME_INCOMPLETE_TITLE).should('not.exist');
    });
  });
});

export default {};
