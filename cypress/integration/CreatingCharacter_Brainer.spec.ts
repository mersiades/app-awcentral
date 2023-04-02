import game6 from '../fixtures/games/game6';
import { decapitalize } from '../../src/helpers/decapitalize';
import { UniqueTypes } from '../../src/@types/enums';
import {
  BRAINER_SPECIAL_NAME,
  SET_TEXT,
  VEHICLES_TITLE,
} from '../../src/config/constants';
import { aliasMutation, ONM_SET_CHARACTER_MOVES, ONM_SET_GANG, setupQueryAliases } from '../utils/graphql-test-utils';

describe('Creating a new Brainer Character', () => {
  beforeEach(() => {
    cy.login('maya@email.com');
    cy.intercept('POST', `${Cypress.env('GRAPHQL_HOST')}/graphql`, (req)=> {
      setupQueryAliases(req)
    })
    cy.visit('/');
    cy.returnToGame(game6.name);
    cy.navToCharacterCreationViaPlaybookPanel('brainer gear-edit-link');
  });

  it('should set BrainerGear and stop at MovesForm', () => {
    const brainerName = 'Smith';
    const brainerNameUC = brainerName.toUpperCase();

    // ------------------------------------------ BrainerGearForm ------------------------------------------ //
    const option1Text = 'implant syringe (tag hi-tech)';
    const option2Text = 'brain relay (area close hi-tech)';
    const option3Text = 'receptivity drugs (tag hi-tech)';
    const brainerWeapon = 'Sharp kitchen knife'; // Set by backend

    // Check form content
    cy.contains(`WHAT SPECIAL BRAINER GEAR DOES ${brainerNameUC} HAVE?`, {
      timeout: 8000,
    }).should('exist');
    cy.contains(SET_TEXT).as('setButton');
    cy.contains('Select 2').should('exist');
    cy.get('input[type="checkbox"]').should('have.length', 6);
    // cy.get('[aria-label="option-implant syringe (tag hi-tech)"]');
    cy.get(`[aria-label="option-${option1Text}"]`).as('option1');
    cy.get(`[aria-label="option-${option2Text}"]`).as('option2');
    cy.get(`[aria-label="option-${option3Text}"]`).as('option3');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="gear-box"]').should('contain', brainerWeapon);
    cy.get('div[data-testid="brainer-gear-box"]').should(
      'contain',
      decapitalize(UniqueTypes.brainerGear)
    );
    cy.get('div[data-testid="moves-box"]').should(
      'contain',
      decapitalize(BRAINER_SPECIAL_NAME)
    );

    // Check form functionality
    cy.contains(option1Text).click();
    cy.get('@option1').within(() => {
      cy.get('input').should('be.checked');
    });

    cy.contains(option2Text).click();
    cy.get('@option2').within(() => {
      cy.get('input').should('be.checked');
    });

    cy.contains(option3Text).click();
    cy.get('@option3').within(() => {
      cy.get('input').should('not.be.checked');
    });

    cy.contains(option2Text).click();
    cy.get('@option2').within(() => {
      cy.get('input').should('not.be.checked');
    });

    cy.contains(option3Text).click();
    cy.get('@option3').within(() => {
      cy.get('input').should('be.checked');
    });

    // Submit form
    cy.contains(SET_TEXT).click();

    // ------------------------------------------ CharacterMovesForm ------------------------------------------ //
    // Check form content
    cy.contains(`WHAT ARE ${brainerNameUC}'S MOVES`).should('exist');
    cy.get('input[type="checkbox"]').should('have.length', 7);
    cy.contains('Select 2').should('exist');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="moves-box"]').should(
      'contain',
      decapitalize(BRAINER_SPECIAL_NAME)
    );
    cy.get('div[data-testid="vehicles-box"]')
      .should('contain', VEHICLES_TITLE)
      .should('contain', '...');
  });
});
