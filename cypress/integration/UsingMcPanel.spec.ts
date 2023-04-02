import game7 from '../fixtures/games/game7';
import { setupQueryAliases } from '../utils/graphql-test-utils';

describe('Using the MC panel on McPage', () => {
  beforeEach(() => {
    cy.login('dave@email.com');
    cy.intercept('POST', `${Cypress.env('GRAPHQL_HOST')}/graphql`, (req)=> {
      setupQueryAliases(req)
    })
    cy.visit('/');
    cy.returnToGame(game7.name);
    cy.get('button[name="mc"]').click();
  });

  it('should reveal "master of ceremonies" content', () =>
    checkMcPanelBox(
      'The master of ceremonies',
      'Agenda',
      'Make Apocalypse World seem real.'
    ));

  it('should reveal "harm rules" content', () =>
    checkMcPanelBox('Harm rules', 'Harm', 'Harm as established equals the'));

  it('should reveal "selected MC rules" content', () =>
    checkMcPanelBox(
      'Selected MC rules',
      'Lifestyle',
      'If the player pays 1-barter'
    ));

  it('should reveal "first session', () =>
    checkMcPanelBox(
      'First session',
      'During character creation',
      'While the players are making their characters'
    ));
});

const checkMcPanelBox = (
  boxTitle: string,
  boxSubTitle: string,
  expectedContent: string
) => {
  cy.get(`div[data-testid="${boxTitle}-box"]`).within(() => {
    cy.get('svg[aria-label="FormDown"]').click();
    cy.get(`svg[data-testid="${boxSubTitle}-down-icon"]`).click();
    cy.contains(expectedContent).should('exist');
    cy.get(`svg[data-testid="${boxSubTitle}-up-icon"]`).click();
    cy.contains(expectedContent).should('not.exist');
  });
};
