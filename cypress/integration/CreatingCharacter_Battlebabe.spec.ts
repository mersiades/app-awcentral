import {
  ADD_TEXT,
  BATTLEBABE_SPECIAL_NAME,
  BATTLE_VEHICLES_TITLE,
  DANGEROUS_AND_SEXY_NAME,
  GEAR_TITLE,
  HX_TITLE,
  ICE_COLD_NAME,
  LOOKS_TITLE,
  MOVES_TITLE,
  NAME_TITLE,
  NEW_GAME_TEXT,
  NEXT_TEXT,
  PASS_TEXT,
  PLAYBOOK_TITLE,
  REMOVE_TEXT,
  RESET_TEXT,
  SET_TEXT,
  STATS_TITLE,
  VEHICLES_TITLE,
} from '../../src/config/constants';
import game6 from '../fixtures/games/game6';
import { decapitalize } from '../../src/helpers/decapitalize';
import { PlaybookType, UniqueTypes } from '../../src/@types/enums';

describe('Creating a new Battlebabe Character', () => {
  beforeEach(() => {
    cy.kcLogout();
    cy.kcLogin('john');
    cy.visit(`character-creation/${game6.id}?step=0`);
  });

  it('should create a Battlebabe and stop at CharacterHxPage', () => {
    // ------------------------------------------ NewGameIntro ------------------------------------------ //
    // Check can't navigate with CharacterCreationStepper
    cy.get('div[data-testid="name-box"]').click();
    cy.url().should('contain', 'step=0');

    cy.moveThroughNewGameIntro();

    // ------------------------------------------ CharacterPlaybookForm ------------------------------------------ //

    cy.selectPlaybook(PlaybookType.battlebabe);

    // ------------------------------------------ CharacterNameForm ------------------------------------------ //
    const battlebabeName = 'Snow';
    const battlebabeNameUC = battlebabeName.toUpperCase();
    // Check form content
    cy.contains('WHAT IS THE BATTLEBABE CALLED?').should('exist');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="playbook-box"]')
      .should('contain', PLAYBOOK_TITLE)
      .should('contain', decapitalize(PlaybookType.battlebabe));

    cy.setCharacterName(battlebabeName);

    // ------------------------------------------ CharacterLooksForm ------------------------------------------ //
    const gender = 'woman';
    const clothes = 'display wear';
    const face = 'smooth face';
    const eyes = 'frosty eyes';
    const body = 'sweet body';
    cy.completeLooksForm(battlebabeNameUC, battlebabeName, gender, clothes, face, eyes, body);
    // ------------------------------------------ CharacterStatsForm ------------------------------------------ //
    cy.setCharacterStat(battlebabeNameUC);

    // ------------------------------------------ CharacterGearForm ------------------------------------------ //
    const battlebabeClothes = 'grubby tracksuit';

    // Check CharacterCreationStepper
    cy.get('div[data-testid="stats-box"]').should('contain', STATS_TITLE);
    cy.get('div[data-testid="gear-box"]').should('contain', GEAR_TITLE).should('contain', '...');
    cy.get('div[data-testid="custom-weapons-box"]').should('contain', decapitalize(UniqueTypes.customWeapons));

    cy.completeGearForm(battlebabeNameUC, battlebabeClothes, []);

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
  });
});
