import {
  ADD_TEXT,
  ADD_VEHICLE_TEXT,
  ANGEL_SPECIAL_NAME,
  BATTLE_VEHICLES_TITLE,
  CHOOSE_STAT_SET_TEXT,
  CHOOSE_YOUR_PLAYBOOK_TEXT,
  COOL_TEXT,
  DEFAULT_MOVES_TITLE,
  GEAR_FORM_INSTRUCTIONS,
  GEAR_TITLE,
  GET_STARTED_TEXT,
  GIVE_VEHICLE_NAME_EXAMPLES_TEXT,
  GIVE_VEHICLE_NAME_TEXT,
  HARD_TEXT,
  HOT_TEXT,
  HX_TITLE,
  HX_VALIDATION_TEXT,
  INFIRMARY_NAME,
  LOOKS_TITLE,
  MOVES_TITLE,
  NAME_TITLE,
  NEW_GAME_TEXT,
  NEW_PLAYER_INTRO_TEXT,
  NEXT_TEXT,
  OPTIONS_TITLE,
  PASS_TEXT,
  PLAYBOOK_TITLE,
  REMOVE_TEXT,
  SET_TEXT,
  SHARP_TEXT,
  SIXTH_SENSE_NAME,
  START_PLAY_WITH_BATTLE_VEHICLE_TEXT,
  START_PLAY_WITH_VEHICLE_TEXT,
  STATS_TITLE,
  VEHICLES_TITLE,
  WEIRD_TEXT,
  WELCOME_JUNGLE_TEXT,
} from '../../src/config/constants';
import game6 from '../fixtures/games/game6';
import { decapitalize } from '../../src/helpers/decapitalize';
import { PlaybookType, UniqueTypes } from '../../src/@types/enums';

/**
 * This test is the first of the character creation tests.
 * As such, it is longer and more thorough than the other character creation tests,
 * allowing the other character creation tests to focus on functionality
 * specific to their particular playbooks
 */
describe('Creating a new Angel Character', () => {
  beforeEach(() => {
    cy.login('cristi@email.com');
    cy.visit('/');
    cy.returnToGame(game6.name);
  });

  it('should create an Angel and stop at CharacterHxPage', () => {
    // ------------------------------------------ NewGameIntro ------------------------------------------ //
    // Check form content
    cy.contains(NEW_GAME_TEXT).should('exist');
    cy.contains(WELCOME_JUNGLE_TEXT).should('exist');
    cy.contains(GET_STARTED_TEXT).should('exist');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="playbook-box"]')
      .should('contain', PLAYBOOK_TITLE)
      .should('contain', '...');
    cy.get('div[data-testid="name-box"]')
      .should('contain', NAME_TITLE)
      .should('contain', '...');
    cy.get('div[data-testid="looks-box"]')
      .should('contain', LOOKS_TITLE)
      .should('contain', '...');
    cy.get('div[data-testid="stats-box"]')
      .should('contain', STATS_TITLE)
      .should('contain', '...');
    cy.get('div[data-testid="gear-box"]')
      .should('contain', GEAR_TITLE)
      .should('contain', '...');

    // Go to next
    cy.contains(NEXT_TEXT).click();

    // ------------------------------------------ CharacterPlaybookForm ------------------------------------------ //
    // Check form content
    cy.contains(CHOOSE_YOUR_PLAYBOOK_TEXT, { timeout: 8000 }).should('exist');
    cy.contains(NEW_PLAYER_INTRO_TEXT).should('exist');

    // Check CharacterCreationStepper
    // Should be no change

    // Check form functionality
    cy.selectPlaybook(PlaybookType.angel);

    // ------------------------------------------ CharacterNameForm ------------------------------------------ //
    const angelName = 'Diana';
    const angelNameUC = angelName.toUpperCase();

    // Check form content
    cy.contains('WHAT IS THE ANGEL CALLED?').should('exist');
    cy.get('input[aria-label="name-input"]').as('nameInput');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="playbook-box"]')
      .should('contain', PLAYBOOK_TITLE)
      .should('contain', decapitalize(PlaybookType.angel));

    // Check form functionality
    cy.contains('Dou').click();
    cy.get('@nameInput').then((input) => {
      // @ts-ignore
      expect(input[0].value).to.equal('Dou');
    });

    cy.contains('Di').click();
    cy.get('@nameInput')
      .then((input) => {
        // @ts-ignore
        expect(input[0].value).to.equal('Di');
      })
      .focus()
      .type('ana')
      .then((input) => {
        // @ts-ignore
        expect(input[0].value).to.equal(angelName);
      });

    // Submit form
    cy.contains(SET_TEXT).click();

    // ------------------------------------------ CharacterLooksForm ------------------------------------------ //
    const customEyes = 'tired eyes';
    // Check form content
    cy.contains('WHAT DOES DIANA LOOK LIKE?', { timeout: 8000 }).should(
      'exist'
    );
    cy.contains('GENDER').should('exist');
    cy.contains('CLOTHES').should('exist');
    cy.contains('FACE').should('exist');
    cy.contains('EYES').should('exist');
    cy.contains('BODY').should('exist');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="name-box"]').should('contain', NAME_TITLE);
    cy.get('div[data-testid="name-box"]').should('contain', angelName);

    // Check form functionality
    cy.contains('man').click();
    cy.get('div[data-testid="looks-box"]').should('contain', LOOKS_TITLE);
    cy.get('div[data-testid="looks-box"]', { timeout: 8000 }).should(
      'contain',
      'man'
    );

    cy.contains('utility wear').click();
    cy.get('div[data-testid="looks-box"]');
    cy.get('div[data-testid="looks-box"]').should('contain', LOOKS_TITLE);
    cy.get('div[data-testid="looks-box"]').should('contain', 'man');
    cy.get('div[data-testid="looks-box"]', { timeout: 8000 }).should(
      'contain',
      'utility wear'
    );

    cy.contains('haggard face').click();
    cy.get('div[data-testid="looks-box"]');
    cy.get('div[data-testid="looks-box"]').should('contain', LOOKS_TITLE);
    cy.get('div[data-testid="looks-box"]').should('contain', 'man');
    cy.get('div[data-testid="looks-box"]').should('contain', 'utility wear');
    cy.get('div[data-testid="looks-box"]', { timeout: 8000 }).should(
      'contain',
      'haggard face'
    );

    cy.get('input[aria-label="eyes-input"]').type(customEyes); // Check that looks can also be typed
    cy.contains('SET').click();
    cy.get('div[data-testid="looks-box"]');
    cy.get('div[data-testid="looks-box"]').should('contain', LOOKS_TITLE);
    cy.get('div[data-testid="looks-box"]').should('contain', 'man');
    cy.get('div[data-testid="looks-box"]').should('contain', 'utility wear');
    cy.get('div[data-testid="looks-box"]').should('contain', 'haggard face');
    cy.get('div[data-testid="looks-box"]', { timeout: 8000 }).should(
      'contain',
      customEyes
    );

    cy.contains('big body').click();
    cy.get('div[data-testid="looks-box"]');
    cy.get('div[data-testid="looks-box"]').should('contain', LOOKS_TITLE);
    cy.get('div[data-testid="looks-box"]').should('contain', 'man');
    cy.get('div[data-testid="looks-box"]').should('contain', 'utility wear');
    cy.get('div[data-testid="looks-box"]').should('contain', 'haggard face');
    cy.get('div[data-testid="looks-box"]', { timeout: 8000 }).should(
      'contain',
      'big body'
    );

    // Should automatically progress
    // ------------------------------------------ CharacterStatsForm ------------------------------------------ //
    cy.contains(CHOOSE_STAT_SET_TEXT).should('exist');
    cy.setCharacterStat(angelNameUC);

    // ------------------------------------------ CharacterGearForm ------------------------------------------ //
    const angelClothes = 'disheveled paramedic uniform';
    const angelWeapon1 = '.38 revolver (2-harm close reload loud)';
    const angelWeapon2 = '9mm (2-harm close loud)';
    // Check form content
    cy.contains("WHAT IS DIANA'S GEAR").should('exist');
    cy.contains(GEAR_FORM_INSTRUCTIONS).should('exist');
    cy.contains(GEAR_TITLE).should('exist');
    cy.contains(OPTIONS_TITLE).should('exist');
    cy.contains(ADD_TEXT).should('exist');
    cy.contains(REMOVE_TEXT).should('exist');
    cy.get('ul[aria-label="interim-gear-list"]').should('exist');
    cy.get('textarea[aria-label="item-input"]').as('itemInput');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="stats-box"]').should('contain', STATS_TITLE);
    cy.get('div[data-testid="stats-box"]').should('contain', COOL_TEXT);
    cy.get('div[data-testid="stats-box"]').should('contain', HARD_TEXT);
    cy.get('div[data-testid="stats-box"]').should('contain', HOT_TEXT);
    cy.get('div[data-testid="stats-box"]').should('contain', SHARP_TEXT);
    cy.get('div[data-testid="stats-box"]').should('contain', WEIRD_TEXT);
    cy.get('div[data-testid="gear-box"]')
      .should('contain', GEAR_TITLE)
      .should('contain', '...');
    cy.get('div[data-testid="angel-kit-box"]').should(
      'contain',
      decapitalize(UniqueTypes.angelKit)
    );
    cy.get('div[data-testid="angel-kit-box"]').should('contain', 'Stock: 6');
    cy.get('div[data-testid="angel-kit-box"]').should(
      'contain',
      'No supplier yet'
    );

    // Check form functionality
    cy.contains('fashion suitable to your look').click();
    cy.get('textarea[aria-label="item-input"]')
      .then((input) => {
        // @ts-ignore
        expect(input[0].value).to.contain('fashion suitable to your look');
      })
      .type('{selectall}{backspace}')
      .type(angelClothes);

    cy.contains(ADD_TEXT).click();
    cy.get('ul[aria-label="interim-gear-list"]').should(
      'contain',
      angelClothes
    );
    cy.contains(angelWeapon1).click();
    cy.get('textarea[aria-label="item-input"]').then((input) => {
      // @ts-ignore
      expect(input[0].value).to.contain(angelWeapon1);
    });
    cy.contains(ADD_TEXT).click();
    cy.get('ul[aria-label="interim-gear-list"]').should(
      'contain',
      angelClothes
    );
    cy.get('ul[aria-label="interim-gear-list"]').should(
      'contain',
      angelWeapon1
    );

    cy.get('ul[aria-label="interim-gear-list"]').contains(angelWeapon1).click();
    cy.get('textarea[aria-label="item-input"]').then((input) => {
      // @ts-ignore
      expect(input[0].value).to.contain(angelWeapon1);
    });
    cy.contains(REMOVE_TEXT).click();
    cy.get('ul[aria-label="interim-gear-list"]').should(
      'contain',
      angelClothes
    );
    cy.get('ul[aria-label="interim-gear-list"]').should(
      'not.contain',
      angelWeapon1
    );

    cy.contains(angelWeapon2).click();
    cy.contains(ADD_TEXT).click();
    cy.get('ul[aria-label="interim-gear-list"]').should(
      'contain',
      angelClothes
    );
    cy.get('ul[aria-label="interim-gear-list"]').should(
      'contain',
      angelWeapon2
    );

    // Submit form
    cy.contains(SET_TEXT).click();

    // ------------------------------------------ AngelKitForm ------------------------------------------ //
    // Check form content
    cy.contains("DIANA'S ANGEL KIT").should('exist');
    cy.get('h2[aria-label="stock-value"]').should('include.text', '6');
    cy.get('h2[aria-label="supplier-status"]').should('include.text', 'No');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="gear-box"]').should('contain', GEAR_TITLE);
    cy.get('div[data-testid="gear-box"]').should('contain', angelClothes);
    cy.get('div[data-testid="gear-box"]').should('contain', angelWeapon2);
    cy.get('div[data-testid="angel-kit-box"]').should(
      'contain',
      decapitalize(UniqueTypes.angelKit)
    );
    cy.get('div[data-testid="angel-kit-box"]').should('contain', 'Stock: 6');
    cy.get('div[data-testid="angel-kit-box"]').should(
      'contain',
      'No supplier yet'
    );
    cy.get('div[data-testid="moves-box"]').should('contain', MOVES_TITLE);
    cy.get('div[data-testid="moves-box"]').should(
      'contain',
      decapitalize(ANGEL_SPECIAL_NAME)
    );

    // Check form functionality
    // AngelKitForm has no functionality apart from the SET button

    // Submit form
    cy.contains(SET_TEXT).click();

    // ------------------------------------------ CharacterMovesForm ------------------------------------------ //
    const sixthSenseMoveName = decapitalize(SIXTH_SENSE_NAME);
    const infirmaryMoveName = decapitalize(INFIRMARY_NAME);
    // Check form content
    cy.contains("WHAT ARE DIANA'S MOVES", { timeout: 8000 }).should('exist');
    cy.contains(DEFAULT_MOVES_TITLE).should('exist');
    cy.get('input[type="checkbox"]').should('have.length', 7);
    cy.contains('Select 2').should('exist');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="moves-box"]').should('contain', MOVES_TITLE);
    cy.get('div[data-testid="moves-box"]').should(
      'contain',
      decapitalize(ANGEL_SPECIAL_NAME)
    );
    cy.get('div[data-testid="vehicles-box"]')
      .should('contain', VEHICLES_TITLE)
      .should('contain', '...');

    // Check form functionality
    cy.contains(sixthSenseMoveName).click();
    cy.contains(infirmaryMoveName).click();

    // Submit form
    cy.contains(SET_TEXT).click();

    // ------------------------------------------ VehiclesForm ------------------------------------------ //
    const vehicleName = "Diana's Dodge";
    // Check form content
    cy.contains('VEHICLES').should('exist');
    cy.contains(PASS_TEXT).should('exist');
    cy.contains(START_PLAY_WITH_VEHICLE_TEXT).should('exist');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="moves-box"]').should('contain', MOVES_TITLE);
    cy.get('div[data-testid="moves-box"]').should(
      'contain',
      decapitalize(ANGEL_SPECIAL_NAME)
    );
    cy.get('div[data-testid="moves-box"]').should(
      'contain',
      sixthSenseMoveName
    );
    cy.get('div[data-testid="moves-box"]').should('contain', infirmaryMoveName);
    cy.get('div[data-testid="vehicles-box"]')
      .should('contain', VEHICLES_TITLE)
      .should('contain', '...');
    cy.get('div[data-testid="battle-vehicles-box"]')
      .should('contain', BATTLE_VEHICLES_TITLE)
      .should('contain', '...');

    // Check form functionality
    cy.contains(ADD_VEHICLE_TEXT).click();
    cy.contains('Vehicle 1').should('exist');
    cy.contains(GIVE_VEHICLE_NAME_TEXT).should('exist');
    cy.contains(GIVE_VEHICLE_NAME_EXAMPLES_TEXT).should('exist');
    cy.get('input[aria-label="name-input"]')
      .type('{selectall}{backspace}')
      .type(vehicleName);

    cy.contains('small').click();
    cy.get('h3[aria-label="frame-value"]').should('include.text', 'SMALL');

    cy.contains('fast').click();
    cy.get('div[data-testid="Strengths-tags-box"]').should(
      'include.text',
      'fast'
    );

    cy.contains('rugged').click();
    cy.get('div[data-testid="Strengths-tags-box"]').should(
      'include.text',
      'rugged'
    );

    cy.contains('aggressive').click();
    cy.get('div[data-testid="Strengths-tags-box"]').should(
      'not.include.text',
      'aggressive'
    );

    cy.contains('slow').click();
    cy.get('div[data-testid="Weaknesses-tags-box"]').should(
      'include.text',
      'slow'
    );

    cy.contains('sloppy').click();
    cy.get('div[data-testid="Weaknesses-tags-box"]').should(
      'include.text',
      'sloppy'
    );

    cy.contains('guzzler').click();
    cy.get('div[data-testid="Weaknesses-tags-box"]').should(
      'not.include.text',
      'guzzler'
    );

    cy.contains('sleek').click();
    cy.get('div[data-testid="Looks-tags-box"]').should('include.text', 'sleek');

    cy.contains('vintage').click();
    cy.get('div[data-testid="Looks-tags-box"]').should(
      'include.text',
      'vintage'
    );

    cy.contains('muscular').click();
    cy.get('div[data-testid="Looks-tags-box"]').should(
      'not.include.text',
      'muscular'
    );

    cy.contains('SPEED').click();
    cy.get('h2[aria-label="speed-value"]').should('include.text', '1');

    cy.contains('HANDLING').click();
    cy.get('h2[aria-label="handling-value"]').should('include.text', '1');

    cy.contains('ARMOR').click();
    cy.get('h2[aria-label="armor-value"]').should('include.text', '0'); // Should be unchanged

    cy.get('h2[aria-label="massive-value"]').should('include.text', '1'); // Should be unchanged

    // Submit form
    cy.contains(SET_TEXT).click();

    // ------------------------------------------ BattleVehiclesForm ------------------------------------------ //
    const battleVehicleName = 'Death-bringer';
    const battleVehicleWeapon1 =
      'Mounted machine guns (3-harm close/far area messy)';
    const battleVehicleWeapon2 = 'Mounted 50cal mg (5-harm far area messy)';

    // Check form content
    cy.contains('BATTLE VEHICLES').should('exist');
    cy.contains(PASS_TEXT).should('exist');
    cy.contains(START_PLAY_WITH_BATTLE_VEHICLE_TEXT).should('exist');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="vehicles-box"]')
      .should('contain', VEHICLES_TITLE)
      .should('contain', vehicleName);
    cy.get('div[data-testid="battle-vehicles-box"]')
      .should('contain', BATTLE_VEHICLES_TITLE)
      .should('contain', '...');
    cy.get('div[data-testid="hx-box"]')
      .should('contain', HX_TITLE)
      .should('contain', '...');

    // Check form functionality
    cy.contains(ADD_VEHICLE_TEXT).click();
    cy.contains('Battle Vehicle 1').should('exist');
    cy.contains(GIVE_VEHICLE_NAME_TEXT).should('exist');
    cy.contains(GIVE_VEHICLE_NAME_EXAMPLES_TEXT).should('exist');

    cy.get('input[aria-label="name-input"]')
      .type('{selectall}{backspace}')
      .type(battleVehicleName);

    cy.contains('large').click();
    cy.get('h3[aria-label="frame-value"]').should('include.text', 'LARGE');
    cy.get('h2[aria-label="massive-value"]').should('include.text', '3');

    cy.contains('fast').click();
    cy.get('div[data-testid="Strengths-tags-box"]').should(
      'include.text',
      'fast'
    );

    cy.contains('rugged').click();
    cy.get('div[data-testid="Strengths-tags-box"]').should(
      'include.text',
      'rugged'
    );

    cy.contains('fast').click();
    cy.get('div[data-testid="Strengths-tags-box"]').should(
      'not.include.text',
      'fast'
    );

    cy.contains('workhorse').click();
    cy.get('div[data-testid="Strengths-tags-box"]').should(
      'include.text',
      'workhorse'
    );

    cy.contains('guzzler').click();
    cy.get('div[data-testid="Weaknesses-tags-box"]').should(
      'include.text',
      'guzzler'
    );

    cy.contains('muscular').click();
    cy.get('div[data-testid="Looks-tags-box"]').should(
      'include.text',
      'muscular'
    );

    cy.contains('MASSIVE').click();
    cy.get('h2[aria-label="massive-value"]').should('include.text', '4');

    cy.contains('ARMOR').click();
    cy.get('h2[aria-label="armor-value"]').should('include.text', '1');

    cy.contains('+1armor').click();
    cy.get('h2[aria-label="armor-value"]').should('include.text', '2');

    cy.contains(battleVehicleWeapon1).click();
    cy.get('div[data-testid="Weapons-tags-box"]').should(
      'include.text',
      battleVehicleWeapon1
    );

    cy.contains(battleVehicleWeapon2).click();
    cy.get('div[data-testid="Weapons-tags-box"]').should(
      'not.include.text',
      battleVehicleWeapon2
    );

    cy.contains(battleVehicleWeapon1).click();
    cy.get('div[data-testid="Weapons-tags-box"]').should(
      'not.include.text',
      battleVehicleWeapon1
    );

    cy.contains(battleVehicleWeapon2).click();
    cy.get('div[data-testid="Weapons-tags-box"]').should(
      'include.text',
      battleVehicleWeapon2
    );

    // Submit form
    cy.contains(SET_TEXT).click();

    // ------------------------------------------ CharacterHxForm ------------------------------------------ //
    // Check form content
    cy.contains('WHAT HISTORY DOES DIANA HAVE?').should('exist');
    cy.get('div[data-testid="Doc-hx-box"]').should('exist');
    cy.contains('Diana the Angel').should('exist');
    cy.contains(STATS_TITLE).should('exist');
    cy.get('div[data-testid="COOL-stat-box"]').should('exist');
    cy.get('div[data-testid="HARD-stat-box"]').should('exist');
    cy.get('div[data-testid="HOT-stat-box"]').should('exist');
    cy.get('div[data-testid="SHARP-stat-box"]').should('exist');
    cy.get('div[data-testid="WEIRD-stat-box"]').should('exist');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="vehicles-box"]')
      .should('contain', VEHICLES_TITLE)
      .should('contain', vehicleName);
    cy.get('div[data-testid="battle-vehicles-box"]');
    cy.get('div[data-testid="battle-vehicles-box"]').should(
      'contain',
      BATTLE_VEHICLES_TITLE
    );
    cy.get('div[data-testid="battle-vehicles-box"]').should(
      'contain',
      battleVehicleName
    );
    cy.get('div[data-testid="hx-box"]')
      .should('contain', HX_TITLE)
      .should('contain', '...');

    // Check form functionality
    cy.get('input[aria-label="Doc-hx-input"]').type('{backspace}5');
    cy.contains(HX_VALIDATION_TEXT).should('exist');

    cy.get('input[aria-label="Doc-hx-input"]').type('{backspace}2');
    cy.contains(HX_VALIDATION_TEXT).should('not.exist');
    cy.get('div[data-testid="hx-box"]', { timeout: 10000 });
    cy.get('div[data-testid="hx-box"]').should('contain', HX_TITLE);
    cy.get('div[data-testid="hx-box"]').should('contain', 'Doc');
    cy.get('div[data-testid="hx-box"]').should('contain', '2');

    cy.get('div[data-testid="HARD-stat-box"]').click();
    cy.get('div[data-testid="HOT-stat-box"]').click();

    // Submit form
    // Should not allow progress to PreGamePage because need Hx with all characters
  });
});
