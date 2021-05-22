import {
  BATTLE_OPTIONS_TEXT,
  BATTLE_VEHICLES_TITLE,
  CHOOSE_1_OR_2_TEXT,
  COMBAT_DRIVER_NAME,
  DRIVER_SPECIAL_NAME,
  GEAR_TITLE,
  GIVE_VEHICLE_NAME_EXAMPLES_TEXT,
  GIVE_VEHICLE_NAME_TEXT,
  HX_TITLE,
  IMPROVE_DRIVER_FOR_WORKSPACE_TEXT,
  LOOKS_TEXT,
  PLAYBOOK_TITLE,
  REPUTATION_NAME,
  SET_TEXT,
  STATS_TITLE,
  STRENGTHS_TEXT,
  VEHICLES_TITLE,
  WEAKNESSES_TEXT,
} from '../../src/config/constants';
import game6 from '../fixtures/games/game6';
import { decapitalize } from '../../src/helpers/decapitalize';
import { PlaybookType } from '../../src/@types/enums';

describe('Creating a new Driver Character', () => {
  beforeEach(() => {
    cy.kcLogout();
    cy.kcLogin('takeshi');
    cy.visit(`character-creation/${game6.id}?step=0`);
  });

  it('should create a Driver and stop at BattleVehicleForm', () => {
    // ------------------------------------------ NewGameIntro ------------------------------------------ //
    cy.moveThroughNewGameIntro();

    // ------------------------------------------ CharacterPlaybookForm ------------------------------------------ //

    cy.selectPlaybook(PlaybookType.driver);

    // ------------------------------------------ CharacterNameForm ------------------------------------------ //
    const driverName = 'Lauren';
    const driverNameUC = driverName.toUpperCase();
    // Check form content
    cy.contains('WHAT IS THE DRIVER CALLED?').should('exist');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="playbook-box"]')
      .should('contain', PLAYBOOK_TITLE)
      .should('contain', decapitalize(PlaybookType.driver));

    cy.setCharacterName(driverName);

    // ------------------------------------------ CharacterLooksForm ------------------------------------------ //
    const gender = 'man';
    const clothes = 'vintage wear';
    const face = 'handsome face';
    const eyes = 'cool eyes';
    const body = 'slim body';

    cy.completeLooksForm(driverNameUC, driverName, gender, clothes, face, eyes, body);
    // ------------------------------------------ CharacterStatsForm ------------------------------------------ //
    cy.setCharacterStat(driverNameUC);

    // ------------------------------------------ CharacterGearForm ------------------------------------------ //
    const driverClothes = 'leather jacket';
    const driverWeapon = 'machete (3-harm hand messy)';

    // Check CharacterCreationStepper
    cy.get('div[data-testid="stats-box"]').should('contain', STATS_TITLE);
    cy.get('div[data-testid="gear-box"]').should('contain', GEAR_TITLE).should('contain', '...');
    cy.contains(IMPROVE_DRIVER_FOR_WORKSPACE_TEXT).should('exist');

    cy.completeGearForm(driverNameUC, driverClothes, [driverWeapon]);

    // ------------------------------------------ CharacterMovesForm ------------------------------------------ //
    const reputationMoveName = decapitalize(REPUTATION_NAME);
    const combatDriverMoveName = decapitalize(COMBAT_DRIVER_NAME);
    // Check form content
    cy.contains(`WHAT ARE ${driverNameUC}'S MOVES`).should('exist');
    cy.get('input[type="checkbox"]').should('have.length', 8);
    cy.contains('Default moves').should('exist');
    cy.contains('Select 2').should('exist');

    // Check CharacterCreationStepper
    cy.contains(IMPROVE_DRIVER_FOR_WORKSPACE_TEXT).should('exist');
    cy.get('div[data-testid="moves-box"]').should('contain', decapitalize(DRIVER_SPECIAL_NAME));
    cy.get('div[data-testid="vehicles-box"]').should('contain', VEHICLES_TITLE).should('contain', '...');

    // Check form functionality
    cy.contains(reputationMoveName).click();
    cy.contains(combatDriverMoveName).click();

    // Submit form
    cy.contains(SET_TEXT).click();

    // ------------------------------------------ VehiclesForm ------------------------------------------ //
    const vehicleName = "Lauren's Jeep";
    // Check form content
    cy.contains('Vehicle 1').should('exist');
    cy.get('div[aria-label="Vehicle 1 Tab Contents"]').should('exist');
    cy.contains(GIVE_VEHICLE_NAME_TEXT).should('exist');
    cy.contains(GIVE_VEHICLE_NAME_EXAMPLES_TEXT).should('exist');
    cy.contains(STRENGTHS_TEXT).should('exist');
    cy.contains(WEAKNESSES_TEXT).should('exist');
    cy.contains(LOOKS_TEXT).should('exist');
    cy.contains(BATTLE_OPTIONS_TEXT).should('exist');
    cy.contains(CHOOSE_1_OR_2_TEXT).should('exist');
    cy.contains('choose 1').should('exist');
    cy.get('input[aria-label="name-input"]').as('nameInput');
    cy.get('h3[aria-label="frame-value"]').as('frameValue');
    cy.get('h2[aria-label="speed-value"]').as('speedValue');
    cy.get('h2[aria-label="armor-value"]').as('armorValue');
    cy.get('h2[aria-label="handling-value"]').as('handlingValue');
    cy.get('h2[aria-label="massive-value"]').as('massiveValue');

    cy.get('div[data-testid="+1speed-pill"]').as('speedOption');
    cy.get('div[data-testid="+1handling-pill"]').as('handlingOption');
    cy.get('div[data-testid="+1massive-pill"]').as('massiveOption');
    cy.get('div[data-testid="+1armor-pill"]').as('armorOption');

    // Check form functionality
    cy.get('@frameValue').should('include.text', 'MEDIUM');
    cy.get('@speedValue').should('include.text', '0');
    cy.get('@armorValue').should('include.text', '0');
    cy.get('@handlingValue').should('include.text', '0');
    cy.get('@massiveValue').should('include.text', '2');

    cy.get('@nameInput').type('{selectall}{backspace}').type(vehicleName);

    // Check strengths click combos
    cy.setVehicleOptions('aggressive', 'tight', 'huge', 'Strengths');

    // Check weaknesses click combos
    cy.setVehicleOptions('guzzler', 'lazy', 'unreliable', 'Weaknesses');

    // Check looks click combos
    cy.setVehicleOptions('luxe', 'pristine', 'powerful', 'Looks');

    // Check battle options click combos
    cy.get('@speedOption').click();
    cy.get('@speedValue').should('include.text', '1');

    cy.get('@handlingOption').click();
    cy.get('@speedValue').should('include.text', '1');
    cy.get('@handlingValue').should('include.text', '1');

    cy.get('@armorOption').click();
    cy.get('@speedValue').should('include.text', '1');
    cy.get('@handlingValue').should('include.text', '1');
    cy.get('@armorValue').should('include.text', '0');

    cy.get('@handlingOption').click();
    cy.get('@speedValue').should('include.text', '1');
    cy.get('@handlingValue').should('include.text', '0');
    cy.get('@armorValue').should('include.text', '0');

    cy.get('@armorOption').click();
    cy.get('@speedValue').should('include.text', '1');
    cy.get('@handlingValue').should('include.text', '0');
    cy.get('@armorValue').should('include.text', '1');

    cy.get('@massiveOption').click();
    cy.get('@speedValue').should('include.text', '1');
    cy.get('@handlingValue').should('include.text', '0');
    cy.get('@armorValue').should('include.text', '1');
    cy.get('@massiveValue').should('include.text', '2');

    cy.get('@speedOption').click();
    cy.get('@speedValue').should('include.text', '0');
    cy.get('@handlingValue').should('include.text', '0');
    cy.get('@armorValue').should('include.text', '1');
    cy.get('@massiveValue').should('include.text', '2');

    cy.get('@massiveOption').click();
    cy.get('@speedValue').should('include.text', '0');
    cy.get('@handlingValue').should('include.text', '0');
    cy.get('@armorValue').should('include.text', '1');
    cy.get('@massiveValue').should('include.text', '3');

    // Submit form
    cy.contains(SET_TEXT).click();

    // ------------------------------------------ BattleVehiclesForm ------------------------------------------ //

    // Check form content
    cy.contains('BATTLE VEHICLES').should('exist');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="moves-box"]').should('contain', decapitalize(DRIVER_SPECIAL_NAME));
    cy.get('div[data-testid="vehicles-box"]').should('contain', VEHICLES_TITLE).should('contain', vehicleName);
    cy.get('div[data-testid="battle-vehicles-box"]').should('contain', BATTLE_VEHICLES_TITLE).should('contain', '...');
    cy.get('div[data-testid="hx-box"]').should('contain', HX_TITLE).should('contain', '...');

    // Finish test here because remainder of character creation process has been tested elsewhere
  });
});
