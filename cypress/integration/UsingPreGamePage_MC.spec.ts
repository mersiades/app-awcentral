import { MOCK_GAME_1_NAME } from '../fixtures/games/game1';
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

describe('Using the PreGamePage as an MC', () => {
  beforeEach(() => {
    cy.login('dave@email.com');
    cy.visit('/');
  });

  context('with a game with hasFinishedPreGame = false', () => {
    it('should navigate to PreGamePage, allow ScriptChange preview, and allow START GAME', () => {
      // Navigate to game
      cy.contains(RETURN_TO_GAME_TEXT).click();
      cy.contains(MOCK_GAME_1_NAME).click();
      cy.url().should('contain', 'mc-game');
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
      // Start game
      cy.contains(START_GAME_TEXT).click();

      // Check McPage content
      cy.url().should('contain', 'mc-game');
      cy.contains('Pre-game').should('not.exist');

      // Check FirstSessionDialog
      cy.contains('The first session').should('exist');
      cy.contains('During the first session').should('exist');
      cy.contains('The threat map').should('exist');
      cy.contains('After the first session').should('exist');

      // Close FirstSessionDialog
      cy.get('div[data-testid="close-icon-button"]').click();
      cy.contains('The first session').should('not.exist');
    });
  });
});

export default {};
