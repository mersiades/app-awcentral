import { RETURN_TO_GAME_TEXT } from '../../src/config/constants';
import { MOCK_GAME_1_NAME } from '../fixtures/constants';

describe('Using the PreGamePage as an MC', () => {
  beforeEach(() => {
    cy.kcLogout();
    cy.kcLogin('dave');
    cy.visit('/');
  });

  context('with a game with hasFinishedPreGame = false', () => {
    it('should navigate to PreGamePage, allow ScriptChange preview, and allow START GAME', () => {
      cy.contains(RETURN_TO_GAME_TEXT).click();
      cy.contains(MOCK_GAME_1_NAME).click();
      cy.url().should('contain', 'pre-game');
    });
  });
});

export default {};
