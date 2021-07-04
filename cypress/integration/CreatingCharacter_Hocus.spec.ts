import {
  CHARACTERIZE_THEM_TEXT,
  FORTUNES_NAME,
  HOCUS_SPECIAL_NAME,
  IF_YOU_TRAVEL_TEXT,
  SET_TEXT,
  VEHICLES_TITLE,
} from '../../src/config/constants';
import game6 from '../fixtures/games/game6';
import { decapitalize } from '../../src/helpers/decapitalize';
import { UniqueTypes } from '../../src/@types/enums';

describe('Creating a new Hocus Character', () => {
  beforeEach(() => {
    cy.kcLogout();
    cy.kcLogin('wilmer');
    cy.visit(`character-creation/${game6.id}?step=6`);
  });

  it('should set Followers and stop at MovesForm', () => {
    const hocusName = 'Vision';
    const hocusNameUC = hocusName.toUpperCase();
    const hocusGearItem = 'tattered bible';

    // ------------------------------------------ FollowersForm ------------------------------------------ //
    const characterization1 = 'Your cult';
    const characterization2 = 'Your scene';
    const travelOption1 = 'travel with you';
    const travelOption2 = 'congregate in their own communities';
    const strength1 = 'dedicated to you';
    const strength2 = 'successful commerce';
    const strength3 = 'powerful psychic antenna';
    const strength4 = 'joyous and celebratory';
    const strength5 = 'rigorous and argumentative';
    const strength6 = 'hard-working';
    const strength7 = 'successful recruiters';
    const weakness1 = 'few followers';
    const weakness2 = "aren't really yours";
    const weakness3 = 'rely entirely';
    const weakness4 = 'drug-fixated';
    const weakness5 = 'disdain fashion';
    const weakness6 = 'disdain law';
    const weakness7 = 'decadent and perverse';

    // Check form content
    cy.contains(`${hocusNameUC}'S FOLLOWERS`).should('exist');
    cy.contains('By default you have around 20').should('exist');
    cy.contains(CHARACTERIZE_THEM_TEXT).should('exist');
    cy.contains(IF_YOU_TRAVEL_TEXT).should('exist');
    cy.contains('Choose 2').should('exist');
    cy.get('input[type="checkbox"]').should('have.length', 16);
    cy.get('div[data-testid="fortune-box"]').should('contain', '+1fortune');
    cy.get('div[data-testid="want-tags-box"]').should('contain', 'desertion');
    cy.get('div[data-testid="surplus-tags-box"]').should('contain', '1-barter');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="gear-box"]').should('contain', hocusGearItem);
    cy.get('div[data-testid="followers-box"]').should(
      'contain',
      decapitalize(UniqueTypes.followers)
    );
    cy.get('div[data-testid="moves-box"]').should(
      'contain',
      decapitalize(HOCUS_SPECIAL_NAME)
    );
    cy.get('div[data-testid="moves-box"]').should(
      'contain',
      decapitalize(FORTUNES_NAME)
    );

    // Check form functionality
    cy.contains(characterization1.toLowerCase()).click();
    cy.get('div[data-testid="description-tags-box"]').should(
      'contain',
      characterization1
    );

    cy.contains(travelOption1).click();
    cy.get('div[data-testid="description-tags-box"]').should(
      'contain',
      travelOption1
    );

    cy.contains(travelOption2).click();
    cy.get('div[data-testid="description-tags-box"]').should(
      'contain',
      travelOption2
    );

    cy.contains(characterization2.toLowerCase()).click();
    cy.get('div[data-testid="description-tags-box"]').should(
      'contain',
      characterization2
    );

    selectItem(strength1, [
      { box: 'surplus-tags', expectedResult: '2-barter' },
      { box: 'want-tags', expectedResult: 'hungry' },
    ]);

    selectItem(strength2, [{ box: 'fortune', expectedResult: '+2fortune' }]);
    deSelectItem(strength2, [
      { box: 'fortune', notExpectedResult: '+2fortune' },
    ]);

    selectItem(strength3, [{ box: 'surplus-tags', expectedResult: 'augury' }]);
    checkSelectionLimit(strength4, [
      { box: 'surplus-tags', notExpectedResult: 'party' },
    ]);
    deSelectItem(strength3, [
      { box: 'surplus-tags', notExpectedResult: 'augury' },
    ]);

    selectItem(strength4, [{ box: 'surplus-tags', expectedResult: 'party' }]);
    deSelectItem(strength4, [
      { box: 'surplus-tags', notExpectedResult: 'party' },
    ]);

    selectItem(strength5, [{ box: 'surplus-tags', expectedResult: 'insight' }]);
    deSelectItem(strength5, [
      { box: 'surplus-tags', notExpectedResult: 'insight' },
    ]);

    selectItem(strength6, [
      { box: 'surplus-tags', expectedResult: '3-barter' },
    ]);
    deSelectItem(strength6, [
      { box: 'surplus-tags', notExpectedResult: '3-barter' },
    ]); // 2-barter

    selectItem(strength7, [{ box: 'surplus-tags', expectedResult: 'growth' }]);
    deSelectItem(strength7, [
      { box: 'surplus-tags', notExpectedResult: 'growth' },
    ]);
    selectItem(strength7, [{ box: 'surplus-tags', expectedResult: 'growth' }]);

    selectItem(weakness1, [
      { box: 'surplus-tags', expectedResult: '1-barter' },
    ]);

    selectItem(weakness2, [{ box: 'want-tags', expectedResult: 'judgement' }]);
    deSelectItem(weakness2, [
      { box: 'want-tags', notExpectedResult: 'judgement' },
    ]);

    selectItem(weakness3, [
      { box: 'want-tags', expectedResult: 'desperation' },
    ]);
    checkSelectionLimit(weakness4, [
      { box: 'surplus-tags', notExpectedResult: 'stupor' },
    ]);
    deSelectItem(weakness3, [
      { box: 'want-tags', notExpectedResult: 'desperation' },
    ]);

    selectItem(weakness4, [{ box: 'surplus-tags', expectedResult: 'stupor' }]);
    deSelectItem(weakness4, [
      { box: 'surplus-tags', notExpectedResult: 'stupor' },
    ]);

    selectItem(weakness5, [{ box: 'want-tags', expectedResult: 'disease' }]);
    deSelectItem(weakness5, [
      { box: 'want-tags', notExpectedResult: 'disease' },
    ]);

    selectItem(weakness6, [
      { box: 'surplus-tags', expectedResult: 'violence' },
    ]);
    deSelectItem(weakness6, [
      { box: 'surplus-tags', notExpectedResult: 'violence' },
    ]);

    selectItem(weakness7, [{ box: 'want-tags', expectedResult: 'savagery' }]);
    deSelectItem(weakness7, [
      { box: 'want-tags', notExpectedResult: 'savagery' },
    ]);
    selectItem(weakness7, [{ box: 'want-tags', expectedResult: 'savagery' }]);

    // Submit form
    cy.contains(SET_TEXT).click();

    // ------------------------------------------ CharacterMovesForm ------------------------------------------ //
    // Check form content
    cy.contains(`WHAT ARE ${hocusNameUC}'S MOVES`).should('exist');
    cy.get('input[type="checkbox"]').should('have.length', 7);
    cy.contains('Default moves').should('exist');
    cy.contains('Select 2').should('exist');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="followers-box"]')
      .should('contain', decapitalize(UniqueTypes.followers))
      .should('contain', characterization2)
      .should('contain', travelOption2);
    cy.get('div[data-testid="moves-box"]').should(
      'contain',
      decapitalize(HOCUS_SPECIAL_NAME)
    );
    cy.get('div[data-testid="moves-box"]').should(
      'contain',
      decapitalize(FORTUNES_NAME)
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
  checks: { box: string; notExpectedResult: string }[]
) => {
  cy.contains(item).click();
  checks.forEach((check) =>
    cy
      .get(`div[data-testid="${check.box}-box"]`)
      .should('not.include.text', check.notExpectedResult)
  );
};

const checkSelectionLimit = (
  item: string,
  checks: { box: string; notExpectedResult: string }[]
) => {
  cy.contains(item).click();
  checks.forEach((check) =>
    cy
      .get(`div[data-testid="${check.box}-box"]`)
      .should('not.include.text', check.notExpectedResult)
  );
};
