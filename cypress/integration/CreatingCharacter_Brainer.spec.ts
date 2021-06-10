import {
  BRAINER_SPECIAL_NAME,
  BRAINSCAN_NAME,
  BRAIN_RECEPTIVITY_NAME,
  GEAR_TITLE,
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
    cy.moveThroughNewGameIntro();

    // ------------------------------------------ CharacterPlaybookForm ------------------------------------------ //

    cy.selectPlaybook(PlaybookType.brainer);

    // ------------------------------------------ CharacterNameForm ------------------------------------------ //
    const brainerName = 'Smith';
    const brainerNameUC = brainerName.toUpperCase();

    // Check form content
    cy.contains('WHAT IS THE BRAINER CALLED?').should('exist');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="playbook-box"]')
      .should('contain', PLAYBOOK_TITLE)
      .should('contain', decapitalize(PlaybookType.brainer));

    cy.setCharacterName(brainerName);

    // ------------------------------------------ CharacterLooksForm ------------------------------------------ //
    const gender = 'concealed';
    const clothes = 'high formal wear';
    const face = 'scarred face';
    const eyes = 'soft eyes';
    const body = 'soft body';

    cy.completeLooksForm(brainerNameUC, brainerName, gender, clothes, face, eyes, body);

    // ------------------------------------------ CharacterStatsForm ------------------------------------------ //
    cy.setCharacterStat(brainerNameUC);

    // ------------------------------------------ CharacterGearForm ------------------------------------------ //
    const brainerClothes = 'toga robes';
    const brainerWeapon = 'silenced 9mm (2-harm close hi-tech)';

    // Check CharacterCreationStepper
    cy.get('div[data-testid="stats-box"]').should('contain', STATS_TITLE);
    cy.get('div[data-testid="gear-box"]').should('contain', GEAR_TITLE).should('contain', '...');
    cy.get('div[data-testid="brainer-gear-box"]').should('contain', decapitalize(UniqueTypes.brainerGear));

    cy.completeGearForm(brainerNameUC, brainerClothes, [brainerWeapon]);

    // ------------------------------------------ BrainerGearForm ------------------------------------------ //
    const option1Text = 'implant syringe (tag hi-tech)';
    const option2Text = 'brain relay (area close hi-tech)';
    const option3Text = 'receptivity drugs (tag hi-tech)';

    // Check form content
    cy.contains(`WHAT SPECIAL BRAINER GEAR DOES ${brainerNameUC} HAVE?`, { timeout: 8000 }).should('exist');
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

    // Finish test here because remainder of character creation process has been tested elsewhere
  });
});
