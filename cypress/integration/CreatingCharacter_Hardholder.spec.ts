import {
  BACKUP_WEAPONS_TEXT,
  BATTLEFIELD_INSTINCTS_NAME,
  BATTLE_HARDENED_NAME,
  BATTLE_VEHICLES_TITLE,
  BIG_GUNS_TEXT,
  FUCK_THIS_SHIT_NAME,
  GEAR_TITLE,
  GUNLUGGER_SPECIAL_NAME,
  HARDHOLDER_SPECIAL_NAME,
  HX_TITLE,
  LEADERSHIP_NAME,
  PLAYBOOK_TITLE,
  SERIOUS_GUNS_TEXT,
  SET_TEXT,
  STATS_TITLE,
  VEHICLES_TITLE,
  WEALTH_NAME,
} from '../../src/config/constants';
import game6 from '../fixtures/games/game6';
import { decapitalize } from '../../src/helpers/decapitalize';
import { PlaybookType, UniqueTypes } from '../../src/@types/enums';

describe('Creating a new Hardholder Character', () => {
  beforeEach(() => {
    cy.kcLogout();
    cy.kcLogin('olayinka');
    cy.visit(`character-creation/${game6.id}?step=0`);
  });

  it('should create a HardHolder and stop at HxForm', () => {
    // ------------------------------------------ NewGameIntro ------------------------------------------ //
    cy.moveThroughNewGameIntro();

    // ------------------------------------------ CharacterPlaybookForm ------------------------------------------ //

    cy.selectPlaybook(PlaybookType.hardholder);

    // ------------------------------------------ CharacterNameForm ------------------------------------------ //
    const hardholderName = 'Kobe';
    const hardholderNameUC = hardholderName.toUpperCase();

    // Check form content
    cy.contains('WHAT IS THE HARDHOLDER CALLED?').should('exist');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="playbook-box"]')
      .should('contain', PLAYBOOK_TITLE)
      .should('contain', decapitalize(PlaybookType.hardholder));

    cy.setCharacterName(hardholderName);

    // ------------------------------------------ CharacterLooksForm ------------------------------------------ //
    const gender = 'man';
    const clothes = 'junta wear';
    const face = 'strong face';
    const eyes = 'cool eyes';
    const body = 'wiry body';

    cy.completeLooksForm(hardholderNameUC, hardholderName, gender, clothes, face, eyes, body);

    // ------------------------------------------ CharacterStatsForm ------------------------------------------ //
    cy.setCharacterStat(hardholderNameUC);

    // ------------------------------------------ CharacterGearForm ------------------------------------------ //
    const hardholderWeapon = '9mm';

    // Check CharacterCreationStepper
    cy.get('div[data-testid="stats-box"]').should('contain', STATS_TITLE);
    cy.get('div[data-testid="gear-box"]').should('contain', GEAR_TITLE).should('contain', '...');
    cy.get('div[data-testid="holding-box"]').should('contain', decapitalize(UniqueTypes.holding));

    cy.completeGearForm(hardholderNameUC, hardholderWeapon, []);

    // ------------------------------------------ HoldingForm ------------------------------------------ //

    const gig1 = 'lucrative raiding';
    const gig2 = 'protection tribute';
    const gig3 = 'manufactory';
    const gig4 = 'market commons';
    // Check form content
    cy.contains(`${hardholderNameUC}'S HOLDING`).should('exist');
    cy.contains('By default, your holding has:').should('exist');
    cy.contains('Then, choose 4:').should('exist');
    cy.contains('And choose 2:').should('exist');
    cy.get('input[type="checkbox"]').should('have.length', 20);

    // Check CharacterCreationStepper
    cy.get('div[data-testid="gear-box"]').should('contain', hardholderWeapon);
    cy.get('div[data-testid="holding-box"]').should('contain', decapitalize(UniqueTypes.holding));
    cy.get('div[data-testid="holding-box"]').should('contain', 'Holding size: Medium');
    cy.get('div[data-testid="holding-box"]').should('contain', 'Gang size: Medium');
    cy.get('div[data-testid="holding-box"]').should('contain', 'Barter: 0');
    cy.get('div[data-testid="holding-box"]').should('contain', 'Wants: hungry');
    cy.get('div[data-testid="holding-box"]').should('contain', decapitalize(UniqueTypes.holding));
    cy.get('div[data-testid="moves-box"]').should('contain', decapitalize(HARDHOLDER_SPECIAL_NAME));
    cy.get('div[data-testid="moves-box"]').should('contain', decapitalize(LEADERSHIP_NAME));
    cy.get('div[data-testid="moves-box"]').should('contain', decapitalize(WEALTH_NAME));

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
    selectItem('your gang is large', [{ box: 'gang size', expectedResult: 'LARGE' }]);

    deSelectItem(gig3, [
      { box: 'surplus', expectedResult: '+3barter' }, // 2
      { box: 'wants-tags', expectedResult: 'idle' },
      { box: 'gigs-tags', expectedResult: gig3 },
    ]);

    cy.contains('your gang is well-disciplined').click();
    cy.get(`div[data-testid="tags-tags-box"]`).should('not.include.text', 'unruly');

    deSelectItem('your gang is large', [{ box: 'gang size', expectedResult: 'LARGE' }]);

    cy.contains('your armory is sophisticated').click();
    cy.get(`h2[aria-label="harm-value"]`).should('include.text', '3');

    cy.contains('your gang is well-disciplined').click();
    cy.get(`div[data-testid="tags-tags-box"]`).should('include.text', 'unruly');

    selectItem('your compound is tall', [{ box: 'defense bonus', expectedResult: '+2armor' }]);

    selectItem('filthy and unwell', [{ box: 'wants-tags', expectedResult: 'disease' }]);
    selectItem('lazy and drug-stupored', [{ box: 'wants-tags', expectedResult: 'famine' }]);
    checkSelectionLimit('decadent and perverse', [
      { box: 'wants-tags', expectedResult: 'savagery' },
      { box: 'surplus', expectedResult: '+1barter' }, // 2
    ]);

    deSelectItem('filthy and unwell', [{ box: 'wants-tags', expectedResult: 'disease' }]);
    selectItem('decadent and perverse', [
      { box: 'wants-tags', expectedResult: 'savagery' },
      { box: 'surplus', expectedResult: '+1barter' }, // 1
    ]);
    deSelectItem('lazy and drug-stupored', [{ box: 'wants-tags', expectedResult: 'famine' }]);
    selectItem('protection to tribute', [
      { box: 'wants-tags', expectedResult: 'reprisals' },
      { box: 'surplus', expectedResult: '+0barter' }, // 0
    ]);

    deSelectItem('decadent and perverse', [
      { box: 'wants-tags', expectedResult: 'savagery' },
      { box: 'surplus', expectedResult: '+0barter' }, // 1
    ]);

    selectItem('your gang is small', [{ box: 'gang size', expectedResult: 'SMALL' }]);
    deSelectItem('your gang is small', [{ box: 'gang size', expectedResult: 'SMALL' }]);

    selectItem('your gang is a pack', [{ box: 'tags-tags', expectedResult: 'savagery' }]);
    deSelectItem('your gang is a pack', [{ box: 'tags-tags', expectedResult: 'savagery' }]);

    cy.contains('your armory is for shit').click();
    cy.get(`h2[aria-label="harm-value"]`).should('include.text', '2');

    cy.contains('your armory is for shit').click();
    cy.get(`h2[aria-label="harm-value"]`).should('include.text', '3');

    selectItem('your compound is mostly tents', [{ box: 'defense bonus', expectedResult: '+0armor' }]);

    // Submit form
    cy.contains(SET_TEXT).click();

    // ------------------------------------------ CharacterMovesForm ------------------------------------------ //
    // Check form content
    cy.contains(`WHAT ARE ${hardholderNameUC}'S MOVES`).should('exist');
    cy.get('input[type="checkbox"]').should('have.length', 3);
    cy.contains('Default moves').should('exist');

    // Check CharacterCreationStepper

    cy.get('div[data-testid="moves-box"]').should('contain', decapitalize(HARDHOLDER_SPECIAL_NAME));
    cy.get('div[data-testid="moves-box"]').should('contain', decapitalize(LEADERSHIP_NAME));
    cy.get('div[data-testid="moves-box"]').should('contain', decapitalize(WEALTH_NAME));
    cy.get('div[data-testid="vehicles-box"]').should('contain', VEHICLES_TITLE).should('contain', '...');

    // Check form functionality
    // No optional moves for Hardholder to choose

    // // Submit form
    cy.contains(SET_TEXT).click();

    // ------------------------------------------ VehiclesForm ------------------------------------------ //
    const vehicleName1 = 'Vehicle Name 1';
    const vehicleName2 = 'Vehicle Name 2';
    const vehicleName3 = 'Vehicle Name 3';
    const vehicleName4 = 'Vehicle Name 4';
    // Check form content
    for (let i = 1; i < 5; i++) {
      cy.get(`button[name="vehicle-${i}-tab"]`).should('exist');
    }

    // Check CharacterCreationStepper
    cy.get('div[data-testid="moves-box"]').should('contain', decapitalize(HARDHOLDER_SPECIAL_NAME));
    cy.get('div[data-testid="moves-box"]').should('contain', decapitalize(LEADERSHIP_NAME));
    cy.get('div[data-testid="moves-box"]').should('contain', decapitalize(WEALTH_NAME));
    cy.get('div[data-testid="vehicles-box"]').should('contain', VEHICLES_TITLE).should('contain', '...');
    cy.get('div[data-testid="battle-vehicles-box"]').should('contain', BATTLE_VEHICLES_TITLE).should('contain', '...');

    // Check form functionality
    makeQuickVehicle(vehicleName1);
    makeQuickVehicle(vehicleName2);
    makeQuickVehicle(vehicleName3);
    makeQuickVehicle(vehicleName4);

    // ------------------------------------------ BattleVehiclesForm ------------------------------------------ //
    const bVehicleName1 = 'Battle V Name 1';
    const bVehicleName2 = 'Battle V Name 2';
    const bVehicleName3 = 'Battle V Name 3';
    const bVehicleName4 = 'Battle V Name 4';
    // Check form content
    for (let i = 1; i < 5; i++) {
      cy.get(`button[name="battle-vehicle-${i}-tab"]`).should('exist');
    }

    // Check CharacterCreationStepper
    cy.get('div[data-testid="vehicles-box"]').within(() => {
      cy.contains(VEHICLES_TITLE).should('exist');
      cy.contains(vehicleName1).should('exist');
      cy.contains(vehicleName2).should('exist');
      cy.contains(vehicleName3).should('exist');
      cy.contains(vehicleName4).should('exist');
    });
    cy.get('div[data-testid="battle-vehicles-box"]').should('contain', BATTLE_VEHICLES_TITLE).should('contain', '...');
    cy.get('div[data-testid="hx-box"]').should('contain', HX_TITLE).should('contain', '...');

    // Check form functionality
    makeQuickVehicle(bVehicleName1, true);
    makeQuickVehicle(bVehicleName2, true);
    makeQuickVehicle(bVehicleName3, true);
    makeQuickVehicle(bVehicleName4, true);

    // ------------------------------------------ HxForm ------------------------------------------ //
    cy.url().should('contain', 'step=10');
  });
});

const selectItem = (item: string, checks: { box: string; expectedResult: string }[]) => {
  cy.contains(item).click();
  checks.forEach((check) => cy.get(`div[data-testid="${check.box}-box"]`).should('include.text', check.expectedResult));
};

const deSelectItem = (item: string, checks: { box: string; expectedResult: string }[]) => {
  cy.contains(item).click();
  checks.forEach((check) => cy.get(`div[data-testid="${check.box}-box"]`).should('not.include.text', check.expectedResult));
};

const checkSelectionLimit = (item: string, checks: { box: string; expectedResult: string }[]) => {
  cy.contains(item).click();
  checks.forEach((check) => cy.get(`div[data-testid="${check.box}-box"]`).should('not.include.text', check.expectedResult));
};

const makeQuickVehicle = (name: string, isBattle: boolean = false) => {
  cy.wait(100); // https://www.cypress.io/blog/2019/01/22/when-can-the-test-click/
  cy.get('input[aria-label="name-input"]').clear();
  cy.get('input[aria-label="name-input"]').type(name);
  cy.contains('uncomplaining').click();
  cy.contains('guzzler').click();
  cy.contains('vintage').click();
  cy.contains('SPEED').click();
  cy.contains('HANDLING').click();
  if (isBattle) {
    cy.contains('+1speed').click();
    cy.contains('+1handling').click();
  }
  cy.contains(SET_TEXT).click();
};
