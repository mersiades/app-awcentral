import game3 from '../fixtures/games/game3';
import dave from '../fixtures/users/dave';

describe('Joining an existing Game via invitation', () => {
  beforeEach(() => {
    cy.kcLogout();
    cy.kcLogin('john');
    cy.visit('/');
  });

  it('should add John to game and navigate to CharacterCreationPage', () => {
    cy.contains('JOIN GAME').click();
    cy.contains(game3.name).should('exist');
    cy.contains(`with ${dave.username}`).should('exist');
    cy.contains('JOIN').click();
    cy.contains('NEW GAME').should('exist');
    cy.url().should('contain', `character-creation/${game3.id}?step=0`);
  });
});
