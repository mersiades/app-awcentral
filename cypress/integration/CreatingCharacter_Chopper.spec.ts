import {
  BATTLE_OPTIONS_TEXT,
  BATTLE_VEHICLES_TITLE,
  CHOOSE_1_OR_2_TEXT,
  CHOPPER_SPECIAL_NAME,
  FUCKING_THIEVES_NAME,
  GIVE_VEHICLE_NAME_EXAMPLES_TEXT,
  GIVE_VEHICLE_NAME_TEXT,
  HX_TITLE,
  LOOKS_TEXT,
  PACK_ALPHA_NAME,
  SET_TEXT,
  STRENGTHS_TEXT,
  VEHICLES_TITLE,
  WEAKNESSES_TEXT,
} from '../../src/config/constants';
import game6 from '../fixtures/games/game6';
import { decapitalize } from '../../src/helpers/decapitalize';
import { UniqueTypes } from '../../src/@types/enums';

describe('Creating a new Chopper Character', () => {
  beforeEach(() => {
    cy.kcLogout();
    cy.kcLogin('takeshi');
    cy.visit(`character-creation/${game6.id}?step=6`);
  });

  it('should create a Gang and Bike and stop at BattleVehicleForm', () => {
    const chopperName = 'Dog';
    const chopperNameUC = chopperName.toUpperCase();
    const chopperWeapon1 = 'magnum (3-harm ';
    const chopperWeapon2 = 'machete (3-harm ';

    // ------------------------------------------ GangForm ------------------------------------------ //
    const strength1Text =
      'your gang consists of 30 or so violent bastards. Medium instead of small.';
    const strength2Text = "your gang's well-armed. +1harm";
    const strength3Text = "your gang's well-armored. +1armor";
    const strength4Text = "your gang's well-disciplined. Drop savage.";
    const strength5Text =
      "your gang's nomadic at heart, and able to maintain and repair its own bikes without a home base. It gets +mobile.";
    const strength6Text =
      "your gang's self-sufficient, able to provide for itself by raiding and scavenging. It gets +rich";
    const weakness1Text =
      "your gang's bikes are in bad shape and need constant attention. Vulnerable: breakdown.";
    const weakness2Text =
      "your gang's bikes are picky and high-maintenance. Vulnerable: grounded.";
    const weakness3Text =
      "your gang's loose-knit, with members coming and going as they choose. Vulnerable: desertion";
    const weakness4Text =
      'your gang is in significant debt to someone powerful. Vulnerable: obligation.';
    const weakness5Text =
      'your gang is filthy and unwell. Vulnerable: disease.';

    // Check form content
    cy.contains(`${chopperNameUC}'S GANG`, { timeout: 8000 }).should('exist');
    cy.contains(SET_TEXT).as('setButton');
    cy.contains('Then, choose 2:').should('exist');
    cy.contains('And choose 1:').should('exist');
    cy.get('input[type="checkbox"]').should('have.length', 11);
    cy.get(`[aria-label="option-${strength1Text}"]`).as('strength1');
    cy.get(`[aria-label="option-${strength2Text}"]`).as('strength2');
    cy.get(`[aria-label="option-${strength3Text}"]`).as('strength3');
    cy.get(`[aria-label="option-${strength4Text}"]`).as('strength4');
    cy.get(`[aria-label="option-${strength5Text}"]`).as('strength5');
    cy.get(`[aria-label="option-${strength6Text}"]`).as('strength6');
    cy.get(`[aria-label="option-${weakness1Text}"]`).as('weakness1');
    cy.get(`[aria-label="option-${weakness2Text}"]`).as('weakness2');
    cy.get(`[aria-label="option-${weakness3Text}"]`).as('weakness3');
    cy.get(`[aria-label="option-${weakness4Text}"]`).as('weakness4');
    cy.get(`[aria-label="option-${weakness5Text}"]`).as('weakness5');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="gear-box"]')
      .should('contain', chopperWeapon1)
      .should('contain', chopperWeapon2);
    cy.get('div[data-testid="gang-box"]')
      .should('contain', decapitalize(UniqueTypes.gang))
      .should('contain', 'Size')
      .should('contain', 'Harm')
      .should('contain', 'Armor')
      .should('contain', 'Tags: savage');
    cy.get('div[data-testid="moves-box"]')
      .should('contain', decapitalize(CHOPPER_SPECIAL_NAME))
      .should('contain', decapitalize(PACK_ALPHA_NAME))
      .should('contain', decapitalize(FUCKING_THIEVES_NAME));

    // Check form functionality
    cy.contains(strength1Text).click();
    cy.get('@strength1').within(() => cy.get('input').should('be.checked'));
    cy.get(`div[data-testid="size-box"]`).should('contain', 'MEDIUM');

    cy.contains(strength2Text).click();
    cy.get('@strength2').within(() => cy.get('input').should('be.checked'));
    cy.get(`div[data-testid="size-box"]`).should('contain', 'MEDIUM');
    cy.get(`h2[aria-label="harm-value"]`).should('include.text', '3');

    cy.contains(strength3Text).click();
    cy.get('@strength3').within(() => cy.get('input').should('not.be.checked'));
    cy.get(`div[data-testid="size-box"]`).should('contain', 'MEDIUM');
    cy.get(`h2[aria-label="harm-value"]`).should('include.text', '3');
    cy.get(`h2[aria-label="armor-value"]`).should('include.text', '1');

    cy.contains(strength2Text).click();
    cy.get('@strength2').within(() => cy.get('input').should('not.be.checked'));
    cy.get(`div[data-testid="size-box"]`).should('contain', 'MEDIUM');
    cy.get(`h2[aria-label="harm-value"]`).should('include.text', '2');

    cy.contains(strength3Text).click();
    cy.get('@strength3').within(() => cy.get('input').should('be.checked'));
    cy.get(`div[data-testid="size-box"]`).should('contain', 'MEDIUM');
    cy.get(`h2[aria-label="armor-value"]`).should('include.text', '2');
    cy.get(`div[data-testid="tags-tags-box"]`).should('contain', 'savage');

    cy.contains(strength1Text).click();
    cy.get('@strength1').within(() => cy.get('input').should('not.be.checked'));
    cy.get(`div[data-testid="size-box"]`).should('contain', 'SMALL');
    cy.get(`h2[aria-label="armor-value"]`).should('include.text', '2');
    cy.get(`div[data-testid="tags-tags-box"]`).should('contain', 'savage');

    cy.contains(strength4Text).click();
    cy.get('@strength4').within(() => cy.get('input').should('be.checked'));
    cy.get(`div[data-testid="size-box"]`).should('contain', 'SMALL');
    cy.get(`h2[aria-label="armor-value"]`).should('include.text', '2');
    cy.get(`div[data-testid="tags-tags-box"]`).should('not.contain', 'savage');

    cy.contains(strength3Text).click();
    cy.get('@strength3').within(() => cy.get('input').should('not.be.checked'));
    cy.get(`div[data-testid="size-box"]`).should('contain', 'SMALL');
    cy.get(`h2[aria-label="armor-value"]`).should('include.text', '1');
    cy.get(`div[data-testid="tags-tags-box"]`).should('not.contain', 'savage');

    cy.contains(strength5Text).click();
    cy.get('@strength5').within(() => cy.get('input').should('be.checked'));
    cy.get(`div[data-testid="size-box"]`).should('contain', 'SMALL');
    cy.get(`h2[aria-label="armor-value"]`).should('include.text', '1');
    cy.get(`div[data-testid="tags-tags-box"]`)
      .should('not.contain', 'savage')
      .should('contain', 'mobile');

    cy.contains(strength4Text).click();
    cy.get('@strength4').within(() => cy.get('input').should('not.be.checked'));
    cy.get(`div[data-testid="size-box"]`).should('contain', 'SMALL');
    cy.get(`h2[aria-label="armor-value"]`).should('include.text', '1');
    cy.get(`div[data-testid="tags-tags-box"]`)
      .should('contain', 'savage')
      .should('contain', 'mobile');

    cy.contains(strength6Text).click();
    cy.get('@strength6').within(() => cy.get('input').should('be.checked'));
    cy.get(`div[data-testid="size-box"]`).should('contain', 'SMALL');
    cy.get(`h2[aria-label="armor-value"]`).should('include.text', '1');
    cy.get(`div[data-testid="tags-tags-box"]`)
      .should('contain', 'savage')
      .should('contain', 'mobile')
      .should('contain', 'rich');

    cy.get('@setButton').should('be.disabled');

    cy.contains(weakness1Text).click();
    cy.get('@weakness1').within(() => cy.get('input').should('be.checked'));
    cy.get(`div[data-testid="size-box"]`).should('contain', 'SMALL');
    cy.get(`h2[aria-label="armor-value"]`).should('include.text', '1');
    cy.get(`div[data-testid="tags-tags-box"]`)
      .should('contain', 'savage')
      .should('contain', 'mobile')
      .should('contain', 'rich')
      .should('contain', 'vulnerable: breakdown');
    cy.get('@setButton').should('not.be.disabled');

    cy.contains(weakness1Text).click();
    cy.get('@weakness1').within(() => cy.get('input').should('not.be.checked'));
    cy.get(`div[data-testid="tags-tags-box"]`)
      .should('contain', 'savage')
      .should('contain', 'mobile')
      .should('contain', 'rich')
      .should('not.contain', 'vulnerable: breakdown');
    cy.get('@setButton').should('be.disabled');

    cy.contains(weakness2Text).click();
    cy.get('@weakness2').within(() => cy.get('input').should('be.checked'));
    cy.get(`div[data-testid="tags-tags-box"]`)
      .should('contain', 'savage')
      .should('contain', 'mobile')
      .should('contain', 'rich')
      .should('contain', 'vulnerable: grounded');

    cy.contains(weakness2Text).click();
    cy.get('@weakness2').within(() => cy.get('input').should('not.be.checked'));
    cy.get(`div[data-testid="tags-tags-box"]`)
      .should('contain', 'savage')
      .should('contain', 'mobile')
      .should('contain', 'rich')
      .should('not.contain', 'vulnerable: grounded');

    cy.contains(weakness3Text).click();
    cy.get('@weakness3').within(() => cy.get('input').should('be.checked'));
    cy.get(`div[data-testid="tags-tags-box"]`)
      .should('contain', 'savage')
      .should('contain', 'mobile')
      .should('contain', 'rich')
      .should('contain', 'vulnerable: desertion');

    cy.contains(weakness3Text).click();
    cy.get('@weakness3').within(() => cy.get('input').should('not.be.checked'));
    cy.get(`div[data-testid="tags-tags-box"]`)
      .should('contain', 'savage')
      .should('contain', 'mobile')
      .should('contain', 'rich')
      .should('not.contain', 'vulnerable: desertion');

    cy.contains(weakness4Text).click();
    cy.get('@weakness4').within(() => cy.get('input').should('be.checked'));
    cy.get(`div[data-testid="tags-tags-box"]`)
      .should('contain', 'savage')
      .should('contain', 'mobile')
      .should('contain', 'rich')
      .should('contain', 'vulnerable: obligation');

    cy.contains(weakness4Text).click();
    cy.get('@weakness4').within(() => cy.get('input').should('not.be.checked'));
    cy.get(`div[data-testid="tags-tags-box"]`)
      .should('contain', 'savage')
      .should('contain', 'mobile')
      .should('contain', 'rich')
      .should('not.contain', 'vulnerable: obligation');

    cy.contains(weakness5Text).click();
    cy.get('@weakness5').within(() => cy.get('input').should('be.checked'));
    cy.get(`div[data-testid="tags-tags-box"]`)
      .should('contain', 'savage')
      .should('contain', 'mobile')
      .should('contain', 'rich')
      .should('contain', 'vulnerable: disease');

    // Submit form
    cy.contains(SET_TEXT).click();

    // ------------------------------------------ CharacterMovesForm ------------------------------------------ //
    // Check form content
    cy.contains(`WHAT ARE ${chopperNameUC}'S MOVES`).should('exist');
    cy.get('input[type="checkbox"]').should('have.length', 3);
    cy.contains('Default moves').should('exist');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="gang-box"]')
      .should('contain', decapitalize(UniqueTypes.gang))
      .should('contain', 'Size: SMALL')
      .should('contain', 'Harm: 2')
      .should('contain', 'Armor: 1')
      .should('contain', 'Tags: mobile, savage, rich, vulnerable: disease');
    cy.get('div[data-testid="moves-box"]')
      .should('contain', decapitalize(CHOPPER_SPECIAL_NAME))
      .should('contain', decapitalize(PACK_ALPHA_NAME))
      .should('contain', decapitalize(FUCKING_THIEVES_NAME));
    cy.get('div[data-testid="vehicles-box"]')
      .should('contain', VEHICLES_TITLE)
      .should('contain', '...');

    // Check form functionality
    // Chopper has three default moves; no optional moves to select

    // Submit form
    cy.contains(SET_TEXT).click();

    // ------------------------------------------ VehiclesForm ------------------------------------------ //
    const vehicleName = "Dog's Kawasaki";
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
    cy.get('div[data-testid="Strengths-tags-box"]').as('strengthsBox');
    cy.get('div[data-testid="Weaknesses-tags-box"]').as('weaknessesBox');
    cy.get('div[data-testid="Looks-tags-box"]').as('looksBox');
    cy.get('div[data-testid="responsive-option-pill"]').as('responsiveOption');
    cy.get('div[data-testid="cramped-option-pill"]').as('crampedOption');
    cy.get('div[data-testid="flashy-option-pill"]').as('flashyOption');
    cy.get('div[data-testid="+1speed-pill"]').as('speedOption');
    cy.get('div[data-testid="+1handling-pill"]').as('handlingOption');

    // Check form functionality
    cy.get('@frameValue').should('include.text', 'BIKE');
    cy.get('@speedValue').should('include.text', '0');
    cy.get('@armorValue').should('include.text', '0');
    cy.get('@handlingValue').should('include.text', '0');
    cy.get('@massiveValue').should('include.text', '0');

    cy.get('@nameInput').type('{selectall}{backspace}').type(vehicleName);

    cy.get('@responsiveOption').click();
    cy.get('@strengthsBox').should('contain', 'responsive');

    cy.get('@crampedOption').click();
    cy.get('@weaknessesBox').should('contain', 'cramped');

    cy.get('@flashyOption').click();
    cy.get('@looksBox').should('contain', 'flashy');

    cy.get('@speedOption').click();
    cy.get('@speedValue').should('include.text', '1');

    cy.get('@handlingOption').click();
    cy.get('@speedValue').should('include.text', '1');
    cy.get('@handlingValue').should('include.text', '0');

    cy.get('@speedOption').click();
    cy.get('@speedValue').should('include.text', '0');
    cy.get('@handlingValue').should('include.text', '0');

    cy.contains(SET_TEXT).should('be.disabled');

    cy.get('@handlingOption').click();
    cy.get('@speedValue').should('include.text', '0');
    cy.get('@handlingValue').should('include.text', '1');

    // Submit form
    cy.contains(SET_TEXT).should('not.be.disabled');
    cy.contains(SET_TEXT).click();

    // ------------------------------------------ BattleVehiclesForm ------------------------------------------ //

    // Check form content
    cy.contains('BATTLE VEHICLES', { timeout: 16000 }).should('exist');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="moves-box"]')
      .should('contain', decapitalize(CHOPPER_SPECIAL_NAME))
      .should('contain', decapitalize(PACK_ALPHA_NAME))
      .should('contain', decapitalize(FUCKING_THIEVES_NAME));
    cy.get('div[data-testid="vehicles-box"]', { timeout: 10000 })
      .should('contain', VEHICLES_TITLE)
      .should('contain', vehicleName);
    cy.get('div[data-testid="battle-vehicles-box"]')
      .should('contain', BATTLE_VEHICLES_TITLE)
      .should('contain', '...');
    cy.get('div[data-testid="hx-box"]')
      .should('contain', HX_TITLE)
      .should('contain', '...');

    // Finish test here because remainder of character creation process has been tested elsewhere
  });
});
