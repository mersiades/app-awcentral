import { decapitalize } from '../../src/helpers/decapitalize';
import game7 from '../fixtures/games/game7';
import { ADD_TEXT, SET_TEXT } from '../../src/config/constants';
import { setupQueryAliases } from '../utils/graphql-test-utils';

interface checkAddingThreatOptions {
  type: string;
  name: string;
  impulse: string;
  description?: string;
  stakes?: string;
}

describe('Using the ThreatsPanel', () => {
  beforeEach(() => {
    cy.login('dave@email.com');
    cy.intercept('POST', `${Cypress.env('GRAPHQL_HOST')}/graphql`, (req)=> {
      setupQueryAliases(req)
    })
    cy.visit('/');
    cy.returnToGame(game7.name);
    cy.get('button[name="threats"]').click();
  });

  it('should add a Threat with no stakes or description', () => {
    const options: checkAddingThreatOptions = {
      type: 'GROTESQUE',
      name: 'Tao',
      impulse: 'Mutant',
    };
    checkAddingThreat(options);
  });

  it('should add a Threat with stakes and description', () => {
    const options: checkAddingThreatOptions = {
      type: 'BRUTE',
      name: 'Clarion',
      impulse: 'Family',
      description: 'Clarion is a badass',
      stakes: 'Will Clarion convince Doc to treat his cancer?',
    };
    checkAddingThreat(options);
  });

  it('should edit existing Threat', () => {
    const threatName = 'Gnarly';
    const originalThreatImpulse = 'Cannibal (craves satiety and plenty)';
    const newThreatImpulse = 'Pain addict';
    const threatStakes = 'Will Gnarly ever listen to Bob Marley?';
    cy.get(`svg[data-testid="${threatName.toLowerCase()}-edit-link"]`).click();
    cy.get('input[name="impulses"]')
      .should('have.value', originalThreatImpulse)
      .click();
    cy.contains(newThreatImpulse).click();
    cy.get('textarea[name="stakes"]').type(threatStakes);
    cy.contains(SET_TEXT).click();
    cy.get(
      `svg[data-testid="${threatName.toLowerCase()}-down-chevron"]`
    ).click();
    cy.contains(newThreatImpulse).should('exist');
    cy.contains(threatStakes).should('exist');
  });
});

const checkAddingThreat = (options: checkAddingThreatOptions) => {
  const expectedDialogContent1 = 'To create a threat:';
  const expectedDialogContent2 = 'Choose its kind';
  const expectedDialogContent3 = 'Essential threats';
  const expectedDialogContent4 = 'Where the PCs are';
  cy.contains(ADD_TEXT).click();
  cy.contains(expectedDialogContent1).should('exist');
  cy.contains(expectedDialogContent2).should('exist');
  cy.contains(expectedDialogContent3).should('exist');
  cy.contains(expectedDialogContent4).should('exist');
  cy.get('input[name="threatType"]').click();
  cy.contains(options.type).click();
  // Because name options is a long, randomised list, have to type to filter, then click
  cy.get('input[name="threatName"]').type(options.name[0] + options.name[1]);
  cy.contains(options.name).click();
  cy.get('input[name="impulses"]').click();
  cy.contains(options.impulse).click();
  if (!!options.description) {
    cy.get('textarea[name="description"]').type(options.description);
  }
  if (!!options.stakes) {
    cy.get('textarea[name="stakes"]').type(options.stakes);
  }
  cy.contains(SET_TEXT).click();
  cy.contains(expectedDialogContent1).should('not.exist');
  cy.contains(options.name).should('exist');
  cy.get(
    `svg[data-testid="${options.name.toLowerCase()}-down-chevron"]`
  ).click();
  cy.contains(decapitalize(options.type)).should('exist');
  cy.contains(options.impulse).should('exist');
  if (!!options.description) {
    cy.contains(options.description).should('exist');
  }
  if (!!options.stakes) {
    cy.contains(options.stakes).should('exist');
  }
  cy.get(`svg[data-testid="${options.name.toLowerCase()}-up-chevron"]`).click();
  cy.contains(decapitalize(options.type)).should('not.exist');
};
