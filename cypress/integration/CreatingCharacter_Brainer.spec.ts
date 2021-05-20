import {
  ADD_TEXT,
  BRAINER_SPECIAL_NAME,
  BRAINSCAN_NAME,
  BRAIN_RECEPTIVITY_NAME,
  GEAR_TITLE,
  LOOKS_TITLE,
  NAME_TITLE,
  NEW_GAME_TEXT,
  NEXT_TEXT,
  PLAYBOOK_TITLE,
  SET_TEXT,
  STATS_TITLE,
  VEHICLES_TITLE,
} from '../../src/config/constants';
import game6 from '../fixtures/games/game6';
import { decapitalize } from '../../src/helpers/decapitalize';
import { PlaybookType, UniqueTypes } from '../../src/@types/enums';

describe('Creating a new Brainer Character', () => {
  beforeEach(() => {
    cy.kcLogout();
    cy.kcLogin('maya');
    cy.visit(`character-creation/${game6.id}?step=0`);
  });

  it('should create a Brainer and stop at VehicleForm', () => {
    // ------------------------------------------ NewGameIntro ------------------------------------------ //
    // Check form content
    cy.contains(NEW_GAME_TEXT).should('exist');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="playbook-box"]').should('contain', PLAYBOOK_TITLE).should('contain', '...');

    // Go to next
    cy.contains(NEXT_TEXT).click();

    // ------------------------------------------ CharacterPlaybookForm ------------------------------------------ //

    // Check form functionality
    cy.get('div[data-testid="brainer-button"]').click();
    cy.contains('SELECT Brainer').click(); // SELECT BRAINER

    // ------------------------------------------ CharacterNameForm ------------------------------------------ //
    const brainerName = 'Smith';
    const brainerNameUC = brainerName.toUpperCase();
    // Check form content
    cy.contains('WHAT IS THE BRAINER CALLED?').should('exist');
    cy.get('input[aria-label="name-input"]').as('nameInput');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="playbook-box"]')
      .should('contain', PLAYBOOK_TITLE)
      .should('contain', decapitalize(PlaybookType.brainer));

    // Check form functionality
    cy.contains(brainerName).click();

    // Submit form
    cy.contains(SET_TEXT).click();
    cy.get('div[data-testid="spinner"]').should('exist');
    cy.get('div[data-testid="spinner"]').should('not.exist');

    // ------------------------------------------ CharacterLooksForm ------------------------------------------ //
    const gender = 'concealed';
    const clothes = 'high formal wear';
    const face = 'scarred face';
    const eyes = 'soft eyes';
    const body = 'soft body';
    // Check form content
    cy.contains(`WHAT DOES ${brainerNameUC} LOOK LIKE?`).should('exist');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="name-box"]').should('contain', NAME_TITLE).should('contain', brainerName);

    // Check form functionality
    cy.contains(gender).click();
    cy.get('div[data-testid="looks-box"]').should('contain', LOOKS_TITLE).should('contain', gender);

    cy.contains(clothes).click();
    cy.get('div[data-testid="looks-box"]').should('contain', clothes);

    cy.contains(face).click();
    cy.get('div[data-testid="looks-box"]').should('contain', face);

    cy.contains(eyes).click();
    cy.get('div[data-testid="looks-box"]').should('contain', eyes);

    cy.contains(body).click();
    cy.get('div[data-testid="looks-box"]').should('contain', body);

    // Should automatically progress
    // ------------------------------------------ CharacterStatsForm ------------------------------------------ //
    // Check form content
    cy.contains(`WHAT ARE ${brainerNameUC}'S STRENGTHS AND WEAKNESSES`).should('exist');

    // Check form functionality
    cy.get('div[data-testid="stats-option-box-1"]').click();

    // Submit form
    cy.contains(SET_TEXT).click();

    // ------------------------------------------ CharacterGearForm ------------------------------------------ //
    const brainerClothes = 'toga robes';
    const brainerWeapon = 'silenced 9mm (2-harm close hi-tech)';

    // Check form content
    cy.contains(`WHAT IS ${brainerNameUC}'S GEAR`).should('exist');
    cy.contains(ADD_TEXT).as('addButton');
    cy.get('ul[aria-label="interim-gear-list"]').as('interimGearList');
    cy.get('textarea[aria-label="item-input"]').as('itemInput');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="stats-box"]').should('contain', STATS_TITLE);
    cy.get('div[data-testid="gear-box"]').should('contain', GEAR_TITLE).should('contain', '...');
    cy.get('div[data-testid="brainer-gear-box"]').should('contain', decapitalize(UniqueTypes.brainerGear));

    // Check form functionality
    cy.get('@itemInput').type(brainerClothes);

    cy.get('@addButton').click();
    cy.get('@interimGearList').should('contain', brainerClothes);

    cy.contains(brainerWeapon).click();
    cy.get('@addButton').click();
    cy.get('@interimGearList').should('contain', brainerWeapon);

    // Submit form
    cy.contains(SET_TEXT).click();

    // ------------------------------------------ BrainerGearForm ------------------------------------------ //
    const option1Text = 'implant syringe (tag hi-tech)';
    const option2Text = 'brain relay (area close hi-tech)';
    const option3Text = 'receptivity drugs (tag hi-tech)';

    // Check form content
    cy.contains(`WHAT SPECIAL BRAINER GEAR DOES ${brainerNameUC} HAVE?`).should('exist');
    cy.contains(SET_TEXT).as('setButton');
    cy.contains('Select 2').should('exist');
    cy.get('input[type="checkbox"]').should('have.length', 6);
    cy.get(`input[aria-label="option-${option1Text}"]`).as('option1');
    cy.get(`input[aria-label="option-${option2Text}"]`).as('option2');
    cy.get(`input[aria-label="option-${option3Text}"]`).as('option3');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="gear-box"]').should('contain', brainerClothes);
    cy.get('div[data-testid="brainer-gear-box"]').should('contain', decapitalize(UniqueTypes.brainerGear));
    cy.get('div[data-testid="moves-box"]').should('contain', decapitalize(BRAINER_SPECIAL_NAME));

    // Check form functionality
    cy.contains(option1Text).click();
    cy.get('@option1').should('be.checked');

    cy.contains(option2Text).click();
    cy.get('@option2').should('be.checked');

    cy.contains(option3Text).click();
    cy.get('@option3').should('not.be.checked');

    cy.contains(option2Text).click();
    cy.get('@option2').should('not.be.checked');

    cy.contains(option3Text).click();
    cy.get('@option3').should('be.checked');

    // Submit form
    cy.contains(SET_TEXT).click();

    // ------------------------------------------ CharacterMovesForm ------------------------------------------ //
    const brainScanMoveName = decapitalize(BRAINSCAN_NAME);
    const brainReceptivityMoveName = decapitalize(BRAIN_RECEPTIVITY_NAME);
    // Check form content
    cy.contains(`WHAT ARE ${brainerNameUC}'S MOVES`).should('exist');
    cy.get('input[type="checkbox"]').should('have.length', 7);
    cy.contains('Select 2').should('exist');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="moves-box"]').should('contain', decapitalize(BRAINER_SPECIAL_NAME));
    cy.get('div[data-testid="vehicles-box"]').should('contain', VEHICLES_TITLE).should('contain', '...');

    // Check form functionality
    cy.contains(brainScanMoveName).click();
    cy.contains(brainReceptivityMoveName).click();

    // Submit form
    cy.contains(SET_TEXT).click();

    // ------------------------------------------ VehiclesForm ------------------------------------------ //
    // Check form content
    cy.contains('VEHICLES').should('exist');

    // Finish test here because remainder of character creation process has ben tested elsewhere
  });
});
