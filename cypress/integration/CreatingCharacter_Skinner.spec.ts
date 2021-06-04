import {
  ARTFUL_NAME,
  BATTLE_VEHICLES_TITLE,
  GEAR_TITLE,
  GRACIOUS_WEAPONS,
  HYPNOTIC_NAME,
  LUXE_GEAR,
  PLAYBOOK_TITLE,
  SET_TEXT,
  SKINNER_SPECIAL_NAME,
  STATS_TITLE,
  VEHICLES_TITLE,
} from '../../src/config/constants';
import game6 from '../fixtures/games/game6';
import { decapitalize } from '../../src/helpers/decapitalize';
import { PlaybookType, UniqueTypes } from '../../src/@types/enums';

describe('Creating a new Skinner Character', () => {
  beforeEach(() => {
    cy.kcLogout();
    cy.kcLogin('caesar');
    cy.visit(`character-creation/${game6.id}?step=0`);
  });

  it('should create a Skinner and stop at VehicleForm', () => {
    // ------------------------------------------ NewGameIntro ------------------------------------------ //
    cy.moveThroughNewGameIntro();

    // ------------------------------------------ CharacterPlaybookForm ------------------------------------------ //

    cy.selectPlaybook(PlaybookType.skinner);

    // ------------------------------------------ CharacterNameForm ------------------------------------------ //
    const skinnerName = 'Venus';
    const skinnerNameUC = skinnerName.toUpperCase();

    // Check form content
    cy.contains('WHAT IS THE SKINNER CALLED?').should('exist');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="playbook-box"]')
      .should('contain', PLAYBOOK_TITLE)
      .should('contain', decapitalize(PlaybookType.skinner));

    cy.setCharacterName(skinnerName);

    // ------------------------------------------ CharacterLooksForm ------------------------------------------ //
    const gender = 'man';
    const clothes = 'display wear';
    const face = 'striking face';
    const eyes = 'laughing eyes';
    const body = 'slim body';

    cy.completeLooksForm(skinnerNameUC, skinnerName, gender, clothes, face, eyes, body);

    // ------------------------------------------ CharacterStatsForm ------------------------------------------ //
    cy.setCharacterStat(skinnerNameUC);

    // ------------------------------------------ CharacterGearForm ------------------------------------------ //
    const skinnerGearItem = 'expensive red dress';

    // Check CharacterCreationStepper
    cy.get('div[data-testid="stats-box"]').should('contain', STATS_TITLE);
    cy.get('div[data-testid="gear-box"]').should('contain', GEAR_TITLE).should('contain', '...');
    cy.get('div[data-testid="skinner-gear-box"]').should('contain', decapitalize(UniqueTypes.skinnerGear));

    cy.completeGearForm(skinnerNameUC, skinnerGearItem, []);

    // ------------------------------------------ SkinnerGearForm ------------------------------------------ //
    const graciousOption1 = 'sleeve pistol';
    const graciousOption2 = 'ornate dagger';
    const luxeOption1 = 'antique coins';
    const luxeOption2 = 'eyeglasses';
    const luxeOption3 = 'long gorgeous coat';

    // Check form content
    cy.contains(`WHAT SKINNER GEAR DOES ${skinnerNameUC} HAVE?`).should('exist');
    cy.contains(`${GRACIOUS_WEAPONS} (choose 1)`).should('exist');
    cy.contains(`${LUXE_GEAR} (choose 2)`).should('exist');
    cy.get('input[type="checkbox"]').should('have.length', 11);

    // Check CharacterCreationStepper
    cy.get('div[data-testid="gear-box"]').should('contain', skinnerGearItem);
    cy.get('div[data-testid="skinner-gear-box"]').should('contain', decapitalize(UniqueTypes.skinnerGear));
    cy.get('div[data-testid="moves-box"]').should('contain', decapitalize(SKINNER_SPECIAL_NAME));

    // Check form functionality
    // Gracious weapons
    cy.contains(graciousOption1).click();
    cy.contains(graciousOption2).click();
    cy.contains(graciousOption1).click();
    cy.contains(graciousOption2).click();

    // Luxe gear
    cy.contains(luxeOption1).click();
    cy.contains(luxeOption2).click();
    cy.contains(luxeOption3).click();
    cy.contains(luxeOption1).click();
    cy.contains(luxeOption3).click();

    // Submit form
    cy.contains(SET_TEXT).click();

    // ------------------------------------------ CharacterMovesForm ------------------------------------------ //

    const artfulMoveName = decapitalize(ARTFUL_NAME);
    const hypnoticMoveName = decapitalize(HYPNOTIC_NAME);

    // Check form content
    cy.contains(`WHAT ARE ${skinnerNameUC}'S MOVES`).should('exist');
    cy.get('input[type="checkbox"]').should('have.length', 6);
    cy.contains('Default moves').should('exist');
    cy.contains('Select 2').should('exist');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="skinner-gear-box"]')
      .should('contain', decapitalize(UniqueTypes.skinnerGear))
      .should('contain', graciousOption2)
      .should('contain', luxeOption2)
      .should('contain', luxeOption3);
    cy.get('div[data-testid="moves-box"]').should('contain', decapitalize(SKINNER_SPECIAL_NAME));
    cy.get('div[data-testid="vehicles-box"]').should('contain', VEHICLES_TITLE).should('contain', '...');

    // Check form functionality
    cy.contains(artfulMoveName).click();
    cy.contains(hypnoticMoveName).click();

    // Submit form
    cy.contains(SET_TEXT).click();

    // ------------------------------------------ VehiclesForm ------------------------------------------ //

    // Check CharacterCreationStepper
    cy.get('div[data-testid="moves-box"]').should('contain', decapitalize(SKINNER_SPECIAL_NAME));
    cy.get('div[data-testid="moves-box"]').should('contain', decapitalize(ARTFUL_NAME));
    cy.get('div[data-testid="moves-box"]').should('contain', decapitalize(HYPNOTIC_NAME));
    cy.get('div[data-testid="vehicles-box"]').should('contain', VEHICLES_TITLE).should('contain', '...');
    cy.get('div[data-testid="battle-vehicles-box"]').should('contain', BATTLE_VEHICLES_TITLE).should('contain', '...');
  });
});
