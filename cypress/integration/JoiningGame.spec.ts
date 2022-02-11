import {
  JOIN_GAME_TEXT,
  JOIN_TEXT,
  NEW_GAME_TEXT,
} from '../../src/config/constants';
import game3 from '../fixtures/games/game3';
import dave from '../fixtures/users/dave';

describe('Joining an existing Game via invitation', () => {
  beforeEach(() => {
    cy.kcLogout();
    cy.kcLogin('john');
    cy.visit('/');
  });

  it('should add John to game and navigate to CharacterCreationPage', () => {
    cy.contains(JOIN_GAME_TEXT).click();
    cy.contains(game3.name).should('exist');
    cy.contains(`with ${dave.username}`).should('exist');
    cy.contains(JOIN_TEXT).click();
    cy.contains(NEW_GAME_TEXT, { timeout: 8000 }).should('exist');
    cy.url().should('contain', `character-creation/${game3.id}?step=0`);
  });
});
