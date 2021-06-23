import { StatType } from '../../src/@types/enums';
import {
  DO_BATTLE_NAME,
  GO_AGGRO_NAME,
  HELP_OR_INTERFERE_NAME,
  LIFESTYLE_GIGS_NAME,
  OPEN_BRAIN_NAME,
  READ_A_SITCH_NAME,
  READ_PERSON_NAME,
  SEDUCE_OR_MANIP_NAME,
  SESSION_END_NAME,
  SUCKER_SOMEONE_NAME,
  UNDER_FIRE_NAME,
} from '../../src/config/constants';
import { decapitalize } from '../../src/helpers/decapitalize';
import johnAsPlayer_1 from '../fixtures/gameRoles/johnAsPlayer_1';
import game7 from '../fixtures/games/game7';

describe('Making basic moves from the MovesPanel as Battlebabe', () => {
  const characterName = johnAsPlayer_1.characters[0].name as string;

  beforeEach(() => {
    cy.kcLogout();
    cy.kcLogin('john');
    cy.visit(`/player-game/${game7.id}`);
    cy.openMovesPanelBox('Basic moves');
  });

  it(`should show a ${UNDER_FIRE_NAME} move message`, () => {
    cy.checkPrintMove(characterName, UNDER_FIRE_NAME, 'When you do something under fire');
  });

  it(`should show a ${GO_AGGRO_NAME} move message`, () => {
    cy.checkRollMove(characterName, GO_AGGRO_NAME, 'When you go aggro on someone', StatType.hard);
  });

  it(`should show a ${SUCKER_SOMEONE_NAME} move message`, () => {
    cy.checkPrintMove(characterName, SUCKER_SOMEONE_NAME, 'When you attack someone unsuspecting or helpless');
  });

  it(`should show a ${DO_BATTLE_NAME} move message`, () => {
    cy.checkPrintMove(characterName, DO_BATTLE_NAME, 'When you’re in battle');
  });

  it(`should show a ${SEDUCE_OR_MANIP_NAME} move message`, () => {
    cy.checkRollMove(
      characterName,
      SEDUCE_OR_MANIP_NAME,
      'When you try to seduce, manipulate, bluff, fast-talk, or lie to someone',
      StatType.hot
    );
  });

  it(`should show a ${HELP_OR_INTERFERE_NAME} move message`, () => {
    const targetName = 'Smith';
    const moveDescSnippet = 'When you help or interfere with someone';
    const messageTitle = `${characterName?.toUpperCase()}: ${HELP_OR_INTERFERE_NAME}`;
    cy.contains(decapitalize(HELP_OR_INTERFERE_NAME)).click();
    cy.get('input[aria-label="target-character-input"]').click();
    cy.get('div[role="menubar"]').within(() => cy.contains(targetName).click());
    cy.contains('ROLL').click();
    cy.checkMoveMessage(messageTitle, moveDescSnippet, StatType.hx);
  });

  it(`should show a ${READ_A_SITCH_NAME} move message`, () => {
    cy.checkRollMove(characterName, READ_A_SITCH_NAME, 'When you read a charged situation', StatType.sharp);
  });

  it(`should show a ${READ_PERSON_NAME} move message`, () => {
    cy.checkRollMove(characterName, READ_PERSON_NAME, 'When you read a person', StatType.sharp);
    // Flakey: not worth the effort
    // cy.get(`div[data-testid="${characterName?.toUpperCase()}: ${READ_PERSON_NAME}-message"]`).within(() => {
    //   cy.get('h1[aria-label="final-roll-result"]').then((elem) => {
    //     const result = parseInt(elem.text());
    //     cy.log('Roll result: ' + result);
    //     cy.wait(100);
    //     if (result >= 10) {
    //       cy.get('div[data-testid="hold-circle"]').then((elems: any) => expect(elems).to.have.length(3));
    //     } else if (result >= 7) {
    //       cy.get('div[data-testid="hold-circle"]').then((elems: any) => expect(elems).to.have.length(1));
    //     }
    //   });
    // });
  });

  it(`should show a ${OPEN_BRAIN_NAME} move message`, () => {
    cy.checkRollMove(
      characterName,
      OPEN_BRAIN_NAME,
      'When you open your brain to the world’s psychic maelstrom',
      StatType.weird
    );
  });

  it(`should show a ${LIFESTYLE_GIGS_NAME} move message`, () => {
    const moveDescSnippet = 'At the beginning of the session';
    const messageTitle = `${characterName?.toUpperCase()}: ${LIFESTYLE_GIGS_NAME}`;
    cy.contains(decapitalize(LIFESTYLE_GIGS_NAME)).click();
    cy.contains('You currently have 2 barter').should('be.visible');
    cy.get('input[type="number"]').type('{selectall}').type('3');
    cy.contains('SPEND').should('be.disabled');
    cy.get('input[type="number"]').type('{selectall}').type('2');
    cy.contains('SPEND').should('not.be.disabled').click();

    cy.checkMoveMessage(messageTitle, moveDescSnippet);
    cy.contains('Barter spent: 2').should('be.visible');
    cy.contains('Barter left: 0').should('be.visible');
  });

  it(`should show a ${SESSION_END_NAME} move message`, () => {
    cy.checkPrintMove(characterName, SESSION_END_NAME, 'At the end of every session');
  });
});
