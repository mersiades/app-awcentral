import game6 from '../fixtures/games/game6';
import { decapitalize } from '../../src/helpers/decapitalize';
import { UniqueTypes } from '../../src/@types/enums';
import {
  HARDHOLDER_SPECIAL_NAME,
  LEADERSHIP_NAME,
  SET_TEXT,
  VEHICLES_TITLE,
  WEALTH_NAME,
} from '../../src/config/constants';
import { setupQueryAliases } from '../utils/graphql-test-utils';

describe('Creating a new Hardholder Character', () => {
  beforeEach(() => {
    cy.login('olayinka@email.com');
    cy.intercept('POST', `${Cypress.env('GRAPHQL_HOST')}/graphql`, (req)=> {
      setupQueryAliases(req)
    })
    cy.visit('/');
    cy.returnToGame(game6.name);
    cy.navToCharacterCreationViaPlaybookPanel('holding & gang-edit-link');
  });

  it('should set a Holding and stop at MovesForm', () => {
    const hardholderName = 'Kobe';
    const hardholderNameUC = hardholderName.toUpperCase();
    const hardholderWeapon = '9mm';

    // ------------------------------------------ HoldingForm ------------------------------------------ //

    const gig1 = 'lucrative raiding';
    const gig2 = 'protection tribute';
    const gig3 = 'manufactory';
    const gig4 = 'market commons';

    // Check form content
    cy.contains(`${hardholderNameUC}'S HOLDING`, { timeout: 6000 }).should(
      'exist'
    );
    cy.contains('By default, your holding has:').should('exist');
    cy.contains('Then, choose 4:').should('exist');
    cy.contains('And choose 2:').should('exist');
    cy.get('input[type="checkbox"]').should('have.length', 20);

    // Check CharacterCreationStepper
    cy.get('div[data-testid="gear-box"]').should('contain', hardholderWeapon);
    cy.get('div[data-testid="holding-box"]').should(
      'contain',
      decapitalize(UniqueTypes.holding)
    );
    cy.get('div[data-testid="holding-box"]').should(
      'contain',
      'Holding size: Medium'
    );
    cy.get('div[data-testid="holding-box"]').should(
      'contain',
      'Gang size: Medium'
    );
    cy.get('div[data-testid="holding-box"]').should('contain', 'Barter: 0');
    cy.get('div[data-testid="holding-box"]').should('contain', 'Wants: hungry');
    cy.get('div[data-testid="holding-box"]').should(
      'contain',
      decapitalize(UniqueTypes.holding)
    );
    cy.get('div[data-testid="moves-box"]').should(
      'contain',
      decapitalize(HARDHOLDER_SPECIAL_NAME)
    );
    cy.get('div[data-testid="moves-box"]').should(
      'contain',
      decapitalize(LEADERSHIP_NAME)
    );
    cy.get('div[data-testid="moves-box"]').should(
      'contain',
      decapitalize(WEALTH_NAME)
    );

    // Check form functionality
    selectItem('large', [
      { box: 'holding size', expectedResult: 'LARGE' },
      { box: 'wants-tags', expectedResult: 'disease' },
      { box: 'surplus', expectedResult: '+2barter' },
    ]);
    deSelectItem('large', [
      { box: 'holding size', expectedResult: 'LARGE' },
      { box: 'wants-tags', expectedResult: 'disease' },
      { box: 'surplus', expectedResult: '+2barter' },
    ]);
    selectItem('small', [
      { box: 'holding size', expectedResult: 'SMALL' },
      { box: 'wants-tags', expectedResult: 'anxiety' },
    ]);
    selectItem(gig1, [
      { box: 'surplus', expectedResult: '+2barter' },
      { box: 'wants-tags', expectedResult: 'reprisals' },
      { box: 'gigs-tags', expectedResult: gig1 },
    ]);
    selectItem(gig2, [
      { box: 'surplus', expectedResult: '+3barter' },
      { box: 'wants-tags', expectedResult: 'obligation' },
      { box: 'gigs-tags', expectedResult: gig2 },
    ]);
    selectItem(gig3, [
      { box: 'surplus', expectedResult: '+4barter' }, // 4
      { box: 'wants-tags', expectedResult: 'idle' },
      { box: 'gigs-tags', expectedResult: gig3 },
    ]);
    checkSelectionLimit(gig4, [
      { box: 'surplus', expectedResult: '+5barter' }, // 4
      { box: 'wants-tags', expectedResult: 'strangers' },
      { box: 'gigs-tags', expectedResult: gig4 },
    ]);
    deSelectItem(gig1, [
      { box: 'surplus', expectedResult: '+4barter' }, // 3
      { box: 'wants-tags', expectedResult: 'reprisals' },
      { box: 'gigs-tags', expectedResult: gig1 },
    ]);
    selectItem(gig4, [
      { box: 'surplus', expectedResult: '+4barter' }, // 4
      { box: 'wants-tags', expectedResult: 'idle' },
      { box: 'gigs-tags', expectedResult: gig4 },
    ]);
    deSelectItem(gig2, [
      { box: 'surplus', expectedResult: '+4barter' }, // 3
      { box: 'wants-tags', expectedResult: 'obligation' },
      { box: 'gigs-tags', expectedResult: gig2 },
    ]);
    selectItem('your gang is large', [
      { box: 'gang size', expectedResult: 'LARGE' },
    ]);

    deSelectItem(gig3, [
      { box: 'surplus', expectedResult: '+3barter' }, // 2
      { box: 'wants-tags', expectedResult: 'idle' },
      { box: 'gigs-tags', expectedResult: gig3 },
    ]);

    cy.contains('your gang is well-disciplined').click();
    cy.get(`div[data-testid="tags-tags-box"]`).should(
      'not.include.text',
      'unruly'
    );

    deSelectItem('your gang is large', [
      { box: 'gang size', expectedResult: 'LARGE' },
    ]);

    cy.contains('your armory is sophisticated').click();
    cy.get(`h2[aria-label="harm-value"]`).should('include.text', '3');

    cy.contains('your gang is well-disciplined').click();
    cy.get(`div[data-testid="tags-tags-box"]`).should('include.text', 'unruly');

    selectItem('your compound is tall', [
      { box: 'defense bonus', expectedResult: '+2armor' },
    ]);

    selectItem('filthy and unwell', [
      { box: 'wants-tags', expectedResult: 'disease' },
    ]);
    selectItem('lazy and drug-stupored', [
      { box: 'wants-tags', expectedResult: 'famine' },
    ]);
    checkSelectionLimit('decadent and perverse', [
      { box: 'wants-tags', expectedResult: 'savagery' },
      { box: 'surplus', expectedResult: '+1barter' }, // 2
    ]);

    deSelectItem('filthy and unwell', [
      { box: 'wants-tags', expectedResult: 'disease' },
    ]);
    selectItem('decadent and perverse', [
      { box: 'wants-tags', expectedResult: 'savagery' },
      { box: 'surplus', expectedResult: '+1barter' }, // 1
    ]);
    deSelectItem('lazy and drug-stupored', [
      { box: 'wants-tags', expectedResult: 'famine' },
    ]);
    selectItem('protection to tribute', [
      { box: 'wants-tags', expectedResult: 'reprisals' },
      { box: 'surplus', expectedResult: '+0barter' }, // 0
    ]);

    deSelectItem('decadent and perverse', [
      { box: 'wants-tags', expectedResult: 'savagery' },
      { box: 'surplus', expectedResult: '+0barter' }, // 1
    ]);

    selectItem('your gang is small', [
      { box: 'gang size', expectedResult: 'SMALL' },
    ]);
    deSelectItem('your gang is small', [
      { box: 'gang size', expectedResult: 'SMALL' },
    ]);

    selectItem('your gang is a pack', [
      { box: 'tags-tags', expectedResult: 'savagery' },
    ]);
    deSelectItem('your gang is a pack', [
      { box: 'tags-tags', expectedResult: 'savagery' },
    ]);

    cy.contains('your armory is for shit').click();
    cy.get(`h2[aria-label="harm-value"]`).should('include.text', '2');

    cy.contains('your armory is for shit').click();
    cy.get(`h2[aria-label="harm-value"]`).should('include.text', '3');

    selectItem('your compound is mostly tents', [
      { box: 'defense bonus', expectedResult: '+0armor' },
    ]);

    // Submit form
    cy.contains(SET_TEXT).click();

    // ------------------------------------------ CharacterMovesForm ------------------------------------------ //
    // Check form content
    cy.contains(`WHAT ARE ${hardholderNameUC}'S MOVES`).should('exist');
    cy.get('input[type="checkbox"]').should('have.length', 3);
    cy.contains('Default moves').should('exist');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="moves-box"]').should(
      'contain',
      decapitalize(HARDHOLDER_SPECIAL_NAME)
    );
    cy.get('div[data-testid="moves-box"]').should(
      'contain',
      decapitalize(LEADERSHIP_NAME)
    );
    cy.get('div[data-testid="moves-box"]').should(
      'contain',
      decapitalize(WEALTH_NAME)
    );
    cy.get('div[data-testid="vehicles-box"]')
      .should('contain', VEHICLES_TITLE)
      .should('contain', '...');
  });
});

const selectItem = (
  item: string,
  checks: { box: string; expectedResult: string }[]
) => {
  cy.contains(item).click();
  checks.forEach((check) =>
    cy
      .get(`div[data-testid="${check.box}-box"]`)
      .should('include.text', check.expectedResult)
  );
};

const deSelectItem = (
  item: string,
  checks: { box: string; expectedResult: string }[]
) => {
  cy.contains(item).click();
  checks.forEach((check) =>
    cy
      .get(`div[data-testid="${check.box}-box"]`)
      .should('not.include.text', check.expectedResult)
  );
};

const checkSelectionLimit = (
  item: string,
  checks: { box: string; expectedResult: string }[]
) => {
  cy.contains(item).click();
  checks.forEach((check) =>
    cy
      .get(`div[data-testid="${check.box}-box"]`)
      .should('not.include.text', check.expectedResult)
  );
};
