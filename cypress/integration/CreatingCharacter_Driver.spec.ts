import {
  BATTLE_OPTIONS_TEXT,
  BATTLE_VEHICLES_TITLE,
  CHOOSE_1_OR_2_TEXT,
  DRIVER_SPECIAL_NAME,
  GIVE_VEHICLE_NAME_EXAMPLES_TEXT,
  GIVE_VEHICLE_NAME_TEXT,
  HX_TITLE,
  LOOKS_TEXT,
  SET_TEXT,
  STRENGTHS_TEXT,
  VEHICLES_TITLE,
  WEAKNESSES_TEXT,
} from '../../src/config/constants';
import game6 from '../fixtures/games/game6';
import { decapitalize } from '../../src/helpers/decapitalize';

describe('Creating a new Driver Character', () => {
  beforeEach(() => {
    cy.kcLogout();
    cy.kcLogin('ahmad');
    cy.visit(`character-creation/${game6.id}?step=8`);
  });

  it('should create 3 Vehicles and stop at BattleVehicleForm', () => {
    // ------------------------------------------ VehiclesForm ------------------------------------------ //
    const vehicleName1 = "Phoenix's Jeep";
    const vehicleName2 = 'V2';
    const vehicleName3 = 'V3';
    // Check form content
    cy.contains('Vehicle 1', { timeout: 8000 }).should('exist');
    cy.contains('Vehicle 2').should('exist');
    cy.contains('Vehicle 3').should('exist');
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

    cy.get('@nameInput').type('{selectall}{backspace}').type(vehicleName1);

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
    cy.contains(SET_TEXT).should('not.be.disabled');
    cy.contains(SET_TEXT).click();

    makeQuickVehicle(vehicleName2);
    makeQuickVehicle(vehicleName3);

    // ------------------------------------------ BattleVehiclesForm ------------------------------------------ //

    // Check form content
    cy.contains('BATTLE VEHICLES').should('exist');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="moves-box"]').should('contain', decapitalize(DRIVER_SPECIAL_NAME));
    cy.get('div[data-testid="vehicles-box"]');
    cy.get('div[data-testid="vehicles-box"]').should('contain', VEHICLES_TITLE);
    cy.get('div[data-testid="vehicles-box"]').should('contain', vehicleName1);
    cy.get('div[data-testid="vehicles-box"]').should('contain', vehicleName2);
    cy.get('div[data-testid="vehicles-box"]').should('contain', vehicleName3);
    cy.get('div[data-testid="battle-vehicles-box"]').should('contain', BATTLE_VEHICLES_TITLE).should('contain', '...');
    cy.get('div[data-testid="hx-box"]').should('contain', HX_TITLE).should('contain', '...');

    // Finish test here because remainder of character creation process has been tested elsewhere
  });
});

const makeQuickVehicle = (name: string, isBattle: boolean = false) => {
  cy.wait(100); // https://www.cypress.io/blog/2019/01/22/when-can-the-test-click/
  cy.get('div[data-testid="Looks-tags-box"]').should('contain.text', '');
  cy.get('div[data-testid="Strengths-tags-box"]').should('contain.text', '');
  cy.get('div[data-testid="Weaknesses-tags-box"]').should('contain.text', '');
  cy.get('div[data-testid="Looks-tags-box"]').should('contain.text', '');
  cy.get('h2[aria-label="speed-value"]').should('contain.text', '0');
  cy.get('h2[aria-label="handling-value"]').should('contain.text', '0');
  cy.get('input[aria-label="name-input"]').type('{selectall}{backspace}');
  cy.get('input[aria-label="name-input"]').type(name);
  cy.contains('uncomplaining').click();
  cy.get('div[data-testid="Strengths-tags-box"]').should('contain.text', 'uncomplaining');
  cy.contains('guzzler').click();
  cy.get('div[data-testid="Weaknesses-tags-box"]').should('contain.text', 'guzzler');
  cy.contains('vintage').click();
  cy.get('div[data-testid="Looks-tags-box"]').should('contain.text', 'vintage');
  cy.contains('SPEED').click();
  cy.get('h2[aria-label="speed-value"]').should('contain.text', '1');
  cy.contains('HANDLING').click();
  cy.get('h2[aria-label="handling-value"]').should('contain.text', '1');
  if (isBattle) {
    cy.contains('+1speed').click();
    cy.contains('+1handling').click();
  }
  cy.contains(SET_TEXT).should('not.be.disabled');
  cy.contains(SET_TEXT).click();
};
