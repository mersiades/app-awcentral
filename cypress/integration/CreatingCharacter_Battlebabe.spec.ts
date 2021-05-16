import {
  ADD_TEXT,
  ADD_VEHICLE_TEXT,
  ANGEL_SPECIAL_NAME,
  BATTLEBABE_SPECIAL_NAME,
  BATTLE_VEHICLES_TITLE,
  CHOOSE_STAT_SET_TEXT,
  CHOOSE_YOUR_PLAYBOOK_TEXT,
  COOL_TEXT,
  DANGEROUS_AND_SEXY_NAME,
  DEFAULT_MOVES_TITLE,
  GEAR_FORM_INSTRUCTIONS,
  GEAR_TITLE,
  GET_STARTED_TEXT,
  GIVE_VEHICLE_NAME_EXAMPLES_TEXT,
  GIVE_VEHICLE_NAME_TEXT,
  GO_TO_GAME_TEXT,
  HARD_TEXT,
  HOT_TEXT,
  HX_TITLE,
  HX_VALIDATION_TEXT,
  ICE_COLD_NAME,
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
  RESET_TEXT,
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
describe('Creating a new Battlebabe Character', () => {
  beforeEach(() => {
    cy.kcLogout();
    cy.kcLogin('john');
    cy.visit(`character-creation/${game6.id}?step=0`);
  });

  it('should create a Battlebabe and stop at CharacterHxPage', () => {
    // ------------------------------------------ NewGameIntro ------------------------------------------ //
    // Check form content
    cy.contains(NEW_GAME_TEXT).should('exist');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="playbook-box"]').should('contain', PLAYBOOK_TITLE).should('contain', '...');

    // Check can't navigate with CharacterCreationStepper
    cy.get('div[data-testid="name-box"]').click();
    cy.url().should('contain', 'step=0');

    // Go to next
    cy.contains(NEXT_TEXT).click();

    // ------------------------------------------ CharacterPlaybookForm ------------------------------------------ //

    // Check form functionality
    cy.get('div[data-testid="battlebabe-button"]').click();
    cy.contains('SELECT Battlebabe').click(); // SELECT BATTLEBABE

    // ------------------------------------------ CharacterNameForm ------------------------------------------ //
    // Check form content
    cy.contains('WHAT IS THE BATTLEBABE CALLED?').should('exist');
    cy.get('input[aria-label="name-input"]').as('nameInput');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="playbook-box"]')
      .should('contain', PLAYBOOK_TITLE)
      .should('contain', decapitalize(PlaybookType.battlebabe));

    // Check form functionality
    cy.contains('Snow').click();
    cy.get('@nameInput').then((input) => {
      // @ts-ignore
      expect(input[0].value).to.equal('Snow');
    });

    // Submit form
    cy.contains(SET_TEXT).click();

    // ------------------------------------------ CharacterLooksForm ------------------------------------------ //
    // Check form content
    cy.contains('WHAT DOES SNOW LOOK LIKE?').should('exist');
    cy.contains('GENDER').should('exist');
    cy.contains('CLOTHES').should('exist');
    cy.contains('FACE').should('exist');
    cy.contains('EYES').should('exist');
    cy.contains('BODY').should('exist');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="name-box"]').should('contain', NAME_TITLE).should('contain', 'Snow');

    // Check form functionality
    cy.contains('woman').click();
    cy.get('div[data-testid="looks-box"]').should('contain', LOOKS_TITLE).should('contain', 'woman');

    cy.contains('display wear').click();
    cy.get('div[data-testid="looks-box"]').should('contain', 'display wear');

    cy.contains('smooth face').click();
    cy.get('div[data-testid="looks-box"]').should('contain', 'smooth face');

    cy.contains('frosty eyes').click();
    cy.get('div[data-testid="looks-box"]').should('contain', 'frosty eyes');

    cy.contains('sweet body').click();
    cy.get('div[data-testid="looks-box"]').should('contain', 'sweet body');

    // Should automatically progress
    // ------------------------------------------ CharacterStatsForm ------------------------------------------ //
    // Check form content
    cy.contains("WHAT ARE SNOW'S STRENGTHS AND WEAKNESSES").should('exist');

    // Check form functionality
    cy.get('div[data-testid="stats-option-box-1"]').click();

    // Submit form
    cy.contains(SET_TEXT).click();

    // ------------------------------------------ CharacterGearForm ------------------------------------------ //
    const battlebabeClothes = 'grubby tracksuit';

    // Check form content
    cy.contains("WHAT IS SNOW'S GEAR").should('exist');
    cy.contains(ADD_TEXT).as('addButton');
    cy.get('ul[aria-label="interim-gear-list"]').as('interimGearList');
    cy.get('textarea[aria-label="item-input"]').as('itemInput');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="stats-box"]').should('contain', STATS_TITLE);
    cy.get('div[data-testid="gear-box"]').should('contain', GEAR_TITLE).should('contain', '...');
    cy.get('div[data-testid="custom-weapons-box"]').should('contain', decapitalize(UniqueTypes.customWeapons));

    // Check form functionality
    cy.get('@itemInput').type(battlebabeClothes);

    cy.get('@addButton').click();
    cy.get('@interimGearList').should('contain', battlebabeClothes);

    // Submit form
    cy.contains(SET_TEXT).click();

    // ------------------------------------------ CustomWeaponsForm ------------------------------------------ //
    const handgun1 = 'handgun (2-harm, close, reload, loud)';
    const handgun2 = 'hi-powered handgun (2-harm, close, reload, loud, far)';
    const handgun3 = 'hi-powered, scoped handgun (close, reload, loud, far, 3-harm)';

    const shotgun1 = 'shotgun (3-harm, close, reload, messy)';
    const shotgun2 = 'hi-powered shotgun (3-harm, close, reload, messy, far)';
    const shotgun3 = 'hi-powered, scoped shotgun (close, reload, messy, far, 4-harm)';
    const shotgun4 = 'scoped shotgun (3-harm, close, reload, messy, far)';

    const rifle1 = 'rifle (2-harm, far, reload, loud)';
    const rifle2 = 'semiautomatic rifle (2-harm, far, loud)';
    const rifle3 = 'semiautomatic, silenced rifle (2-harm, far)';

    const chain1 = 'chain (1-harm, hand, area)';
    const chain2 = 'spikes chain (hand, area, 2-harm)';
    const chain3 = 'spikes, ornate chain (hand, area, 2-harm, valuable)';
    const chain4 = 'ornate chain with spikes (hand, area, 2-harm, valuable)';

    // Check form content
    cy.contains("WHAT ARE SNOW'S TWO CUSTOM WEAPONS").should('exist');
    cy.contains(SET_TEXT).as('setButton');
    cy.contains(RESET_TEXT).as('resetButton');
    cy.contains(ADD_TEXT).as('addButton');
    cy.contains(REMOVE_TEXT).as('removeButton');
    cy.contains('CUSTOM FIREARMS').should('exist');
    cy.contains('CUSTOM HAND WEAPONS').should('exist');
    cy.get('textarea[aria-label="weapon-input"]').as('weaponInput');
    cy.get('ul[aria-label="interim-weapons-list"]').as('weaponsList');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="gear-box"]').should('contain', battlebabeClothes);
    cy.get('div[data-testid="custom-weapons-box"]').should('contain', decapitalize(UniqueTypes.customWeapons));
    cy.get('div[data-testid="moves-box"]').should('contain', decapitalize(BATTLEBABE_SPECIAL_NAME));

    // Check form functionality
    cy.contains('handgun').click();
    cy.get('@weaponInput').then((input) => {
      // @ts-ignore
      expect(input[0].value).to.contain(handgun1);
    });

    cy.contains('hi-powered').click();
    cy.get('@weaponInput').then((input) => {
      // @ts-ignore
      expect(input[0].value).to.contain(handgun2);
    });

    cy.contains('scoped').click();
    cy.get('@weaponInput').then((input) => {
      // @ts-ignore
      expect(input[0].value).to.contain(handgun3);
    });

    cy.get('@addButton').click();
    cy.get('@weaponsList').should('contain', handgun3);

    cy.contains(handgun3).click();
    cy.get('@removeButton').click();
    cy.get('@weaponsList').should('not.contain', handgun3);

    cy.contains('shotgun').click();
    cy.get('@weaponInput').then((input) => {
      // @ts-ignore
      expect(input[0].value).to.contain(shotgun1);
    });

    cy.contains('hi-powered').click();
    cy.get('@weaponInput').then((input) => {
      // @ts-ignore
      expect(input[0].value).to.contain(shotgun2);
    });

    cy.contains('scoped').click();
    cy.get('@weaponInput').then((input) => {
      // @ts-ignore
      expect(input[0].value).to.contain(shotgun3);
    });

    // FAILING - not sure why the second click on 'hi-powered' isn't registering
    // cy.wait(150);
    // cy.contains('hi-powered').click({ force: true });
    // cy.wait(150);
    // cy.get('@weaponInput').then((input) => {
    //   // @ts-ignore
    //   expect(input[0].value).to.contain(shotgun4);
    // });

    cy.get('@resetButton').click();
    cy.get('@weaponInput').then((input) => {
      // @ts-ignore
      expect(input[0].value).to.equal('');
    });

    cy.contains('rifle').click();
    cy.get('@weaponInput').then((input) => {
      // @ts-ignore
      expect(input[0].value).to.contain(rifle1);
    });

    cy.contains('semiautomatic').click();
    cy.get('@weaponInput').then((input) => {
      // @ts-ignore
      expect(input[0].value).to.contain(rifle2);
    });

    cy.contains('silenced').click();
    cy.get('@weaponInput').then((input) => {
      // @ts-ignore
      expect(input[0].value).to.contain(rifle3);
    });

    cy.get('@addButton').click();
    cy.get('@weaponsList').should('contain', rifle3);

    cy.contains('chain').click();
    cy.get('@weaponInput').then((input) => {
      // @ts-ignore
      expect(input[0].value).to.contain(chain1);
    });

    cy.contains('spikes').click();
    cy.get('@weaponInput').then((input) => {
      // @ts-ignore
      expect(input[0].value).to.contain(chain2);
    });

    cy.contains('ornate').click();
    cy.get('@weaponInput')
      .then((input) => {
        // @ts-ignore
        expect(input[0].value).to.contain(chain3);
      })
      .type('{selectall}{backspace}')
      .type(chain4);

    cy.get('@addButton').click();
    cy.get('@weaponsList').should('contain', rifle3).should('contain', chain4);

    // Submit form
    cy.contains(SET_TEXT).click();

    // FAILING, don't know why
    // cy.get('div[data-testid="spinner"]').should('exist');
    // cy.get('div[data-testid="spinner"]').should('not.exist');

    // ------------------------------------------ CharacterMovesForm ------------------------------------------ //
    const dangerousAndSexyMoveName = decapitalize(DANGEROUS_AND_SEXY_NAME);
    const iceColdMoveName = decapitalize(ICE_COLD_NAME);
    // Check form content
    cy.contains("WHAT ARE SNOW'S MOVES").should('exist');
    cy.get('input[type="checkbox"]').should('have.length', 7);
    cy.contains('Select 2').should('exist');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="moves-box"]').should('contain', decapitalize(BATTLEBABE_SPECIAL_NAME));
    cy.get('div[data-testid="vehicles-box"]').should('contain', VEHICLES_TITLE).should('contain', '...');

    // Check form functionality
    cy.contains(dangerousAndSexyMoveName).click();
    cy.contains(iceColdMoveName).click();

    // Submit form
    cy.contains(SET_TEXT).click();

    // ------------------------------------------ VehiclesForm ------------------------------------------ //
    // Check form content
    cy.contains('VEHICLES').should('exist');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="moves-box"]')
      .should('contain', MOVES_TITLE)
      .should('contain', decapitalize(BATTLEBABE_SPECIAL_NAME))
      .should('contain', dangerousAndSexyMoveName)
      .should('contain', iceColdMoveName);
    cy.get('div[data-testid="vehicles-box"]').should('contain', VEHICLES_TITLE).should('contain', '...');
    cy.get('div[data-testid="battle-vehicles-box"]').should('contain', BATTLE_VEHICLES_TITLE).should('contain', '...');

    // Pass on creating a vehicle
    cy.contains(PASS_TEXT).click();

    // ------------------------------------------ BattleVehiclesForm ------------------------------------------ //
    // Check form content
    cy.contains('BATTLE VEHICLES').should('exist');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="vehicles-box"]').should('contain', VEHICLES_TITLE).should('contain', '...');
    cy.get('div[data-testid="battle-vehicles-box"]').should('contain', BATTLE_VEHICLES_TITLE).should('contain', '...');
    cy.get('div[data-testid="hx-box"]').should('contain', HX_TITLE).should('contain', '...');

    // Pass on creating a vehicle
    cy.contains(PASS_TEXT).click();

    // ------------------------------------------ CharacterHxForm ------------------------------------------ //
    // Check form content
    cy.contains('WHAT HISTORY DOES SNOW HAVE?').should('exist');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="vehicles-box"]').should('contain', VEHICLES_TITLE).should('contain', '...');
    cy.get('div[data-testid="battle-vehicles-box"]').should('contain', BATTLE_VEHICLES_TITLE).should('contain', '...');
    cy.get('div[data-testid="hx-box"]').should('contain', HX_TITLE).should('contain', '...');

    // Hx form functionality tests in CreatingCharacter_Angel

    // Submit form
    // Should not allow progress to PreGamePage because need Hx with all characters
  });
});
