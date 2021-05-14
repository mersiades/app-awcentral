import game3 from '../fixtures/games/game3';
import { RoleType } from '../../src/@types/enums';
import {
  JOIN_GAME_TEXT,
  RETURN_TO_GAME_TEXT,
  YOUR_GAMES_TITLE,
  YOUR_INVITATIONS_TITLE,
  NO_INVITATIONS_TEXT,
} from '../../src/config/constants';

describe('Using menu on MenuPage', () => {
  beforeEach(() => {
    cy.kcLogout();
    cy.kcLogin('dave');
    cy.visit('/');
  });

  it('should move the user around the main menu', () => {
    cy.contains(RETURN_TO_GAME_TEXT).click();
    cy.contains(YOUR_GAMES_TITLE).should('exist');
    cy.contains(game3.name).should('exist');
    cy.contains(RoleType.player).should('exist');
    cy.contains(RoleType.mc).should('exist');
    cy.get('svg[aria-label="Close"]').click();
    cy.contains(JOIN_GAME_TEXT).click();
    cy.contains(YOUR_INVITATIONS_TITLE).should('exist');
    cy.contains(NO_INVITATIONS_TEXT).should('exist');
    cy.get('svg[aria-label="Close"]').click();
    cy.contains(RETURN_TO_GAME_TEXT).click();
    cy.get('ul li:first').click();
    cy.url().should('contain', 'mc-game');
  });
});

export default {};
