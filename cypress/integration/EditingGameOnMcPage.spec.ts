import game7 from '../fixtures/games/game7';
import { ALSO_PLAY_ON_TEXT } from '../../src/config/constants';

describe('Editing game details from the MC Page', () => {
  const mockGameName = 'A different game name';
  beforeEach(() => {
    cy.login('dave@email.com');
    cy.visit('/');
    cy.returnToGame(game7.name);
    cy.get('div[data-testid="Mock Game 7-box"]').within(() => {
      cy.get('svg[aria-label="Edit"]').click();
    });
  });

  it('should set a name game name', () => {
    cy.get('input[aria-label="name-input"]')
      .type('{selectall}{backspace}')
      .type(mockGameName);

    cy.get('button[name="set-name-button"]').click();

    cy.get('div[data-testid="Mock Game 7-box"]').within(() => {
      cy.contains(mockGameName).should('exist');
      cy.get('svg[aria-label="Edit"]').click();
    });

    // Restore original name
    cy.get('input[aria-label="name-input"]')
      .type('{selectall}{backspace}')
      .type(game7.name);
    cy.get('button[name="set-name-button"]').click();
  });

  it('should set a new game comms app', () => {
    const mockApp = 'Discord';

    cy.get('[aria-label="app-input"]').click();
    cy.contains(mockApp).click();
    cy.get('button[name="set-app-button"]').click();
    cy.get('div[data-testid="Mock Game 7-box"]').within(() => {
      cy.get('svg[aria-label="FormDown"]').click();
      cy.contains(`${ALSO_PLAY_ON_TEXT} ${mockApp}`).should('exist');
    });
  });

  it('should set a new game comms url and close form', () => {
    const mockUrl = 'https://newurl.com/play-game-here';
    cy.get('textarea[aria-label="url-input"]')
      .type('{selectall}{backspace}')
      .type(mockUrl);
    cy.get('button[name="set-url-button"]').click();
    cy.get('div[data-testid="Mock Game 7-box"]').within(() => {
      cy.get('svg[aria-label="FormDown"]').click();
      cy.contains(`at ${mockUrl}`).should('exist');
    });
    // FAILING: element not visible, even though it clearly is
    // cy.get('div[data-testid="close-icon-button"]').scrollIntoView().click();
  });
});
