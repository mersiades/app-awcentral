import { StatType } from '../../src/@types/enums';
import { decapitalize } from '../../src/helpers/decapitalize';
import johnAsPlayer_1 from '../fixtures/gameRoles/johnAsPlayer_1';
import game7 from '../fixtures/games/game7';
import {
  SUFFER_HARM_NAME,
  SUFFER_V_HARM,
  INFLICT_HARM_NAME,
  HEAL_HARM_NAME,
  GIVE_BARTER_NAME,
  GO_MARKET_NAME,
  MAKE_WANT_KNOWN_NAME,
  INSIGHT_NAME,
  AUGURY_NAME,
  CHANGE_HIGHLIGHTED_STAT_NAME,
} from '../../src/config/constants';
import {
  aliasMutation,
  generateWaitAlias,
  ONQ_ALL_MOVES,
  ONM_PERFORM_HEAL_HARM,
  setupQueryAliases,
  visitHomePage,
  ONM_PERFORM_PRINT,
  ONM_PERFORM_SUFFER_HARM,
  waitMutationWithGame,
  ONM_PERFORM_SUFFER_V_HARM,
  ONM_PERFORM_INFLICT_HARM,
  ONM_SET_CHARACTER_BARTER,
  ONM_PERFORM_STAT_ROLL,
  ONM_PERFORM_MAKE_WANT_KNOWN
} from '../utils/graphql-test-utils';

describe('Making peripheral moves from the MovesPanel as Battlebabe', () => {
  const characterName = johnAsPlayer_1.characters[0].name as string;

  beforeEach(() => {
    cy.login('john@email.com');
    cy.intercept('POST', `${Cypress.env('GRAPHQL_HOST')}/graphql`, (req)=> {
      setupQueryAliases(req)
      aliasMutation(req, ONM_PERFORM_HEAL_HARM)
      aliasMutation(req, ONM_PERFORM_PRINT)
      aliasMutation(req, ONM_PERFORM_SUFFER_HARM)
      aliasMutation(req, ONM_PERFORM_SUFFER_V_HARM)
      aliasMutation(req, ONM_PERFORM_INFLICT_HARM)
      aliasMutation(req, ONM_SET_CHARACTER_BARTER)
      aliasMutation(req, ONM_PERFORM_STAT_ROLL)
      aliasMutation(req, ONM_PERFORM_MAKE_WANT_KNOWN)
    })
    visitHomePage()
    cy.returnToGame(game7.name);
    cy.wait(generateWaitAlias(ONQ_ALL_MOVES))
    cy.openMovesPanelBox('Peripheral moves');
  });

  it(`should show a ${SUFFER_HARM_NAME} move message`, () => {
    const moveDescSnippet = 'When you suffer harm';
    const messageTitle = `${characterName?.toUpperCase()}: ${SUFFER_HARM_NAME}`;
    cy.contains(decapitalize(SUFFER_HARM_NAME)).click();
    cy.get('input[type="number"]').type('{selectall}{backspace}').type('2');
    cy.contains('ROLL').click();
    waitMutationWithGame(ONM_PERFORM_SUFFER_HARM)
    cy.checkMoveMessage(messageTitle, moveDescSnippet);
  });

  it(`should show a ${SUFFER_V_HARM} move message`, () => {
    const moveDescSnippet = 'When you suffer v-harm';
    const messageTitle = `${characterName?.toUpperCase()}: ${SUFFER_V_HARM}`;
    cy.contains(decapitalize(SUFFER_V_HARM)).click();
    cy.get('input[type="number"]').type('{selectall}{backspace}').type('2');
    cy.contains('ROLL').click();
    waitMutationWithGame(ONM_PERFORM_SUFFER_V_HARM)
    cy.checkMoveMessage(messageTitle, moveDescSnippet);
  });

  it(`should show a ${INFLICT_HARM_NAME} move message`, () => {
    const harmInflicted = '2';
    const messageTitle = `${characterName?.toUpperCase()}: ${INFLICT_HARM_NAME}`;
    const targetName = 'Doc';
    const moveDescSnippet =
      'When you inflict harm on another player’s character';
    const hxChangeDesc1 = `${targetName} suffered ${harmInflicted}-harm at the hand of ${characterName}.`;
    const hxChangeDesc2 = `${targetName}'s Hx with ${characterName} has been increased by ${harmInflicted}`;
    cy.contains(decapitalize(INFLICT_HARM_NAME)).click();
    cy.contains(moveDescSnippet).should('be.visible');
    cy.get('input[aria-label="target-character-input"]').click();
    cy.get('div[role="listbox"]').within(() => cy.contains(targetName).click());
    cy.get('input[type="number"]')
      .type('{selectall}{backspace}')
      .type(harmInflicted);
    cy.contains('OKAY').click();
    waitMutationWithGame(ONM_PERFORM_INFLICT_HARM)
    cy.checkMoveMessage(messageTitle, hxChangeDesc1);
    cy.contains(hxChangeDesc2).should('be.visible');
  });

  it(`should show a ${HEAL_HARM_NAME} move message`, () => {
    const harmInflicted = '2';
    const messageTitle = `${characterName?.toUpperCase()}: ${HEAL_HARM_NAME}`;
    const targetName = 'Dog';
    const moveDescSnippet = 'When you heal another player’s character’s harm';
    const hxChangeDesc1 = `${characterName} healed ${targetName} of ${harmInflicted}-harm`;
    const hxChangeDesc2 = `${characterName}'s Hx with ${targetName} has been increased by ${harmInflicted}, and ${targetName}'s harm has been decreased by ${harmInflicted}.`;
    cy.contains(decapitalize(HEAL_HARM_NAME)).click();
    cy.contains(moveDescSnippet).should('be.visible');
    cy.get('input[aria-label="target-character-input"]').click();
    cy.get('div[role="listbox"]').within(() => cy.contains(targetName).click());
    cy.get('input[type="number"]')
      .type('{selectall}{backspace}')
      .type(harmInflicted);
    cy.contains('APPLY').click();
    cy.wait(generateWaitAlias(ONM_PERFORM_HEAL_HARM))
    cy.checkMoveMessage(messageTitle, hxChangeDesc1);
    cy.contains(hxChangeDesc2).should('be.visible');
    cy.openPlaybookPanel();
    cy.get('div[data-testid="Hx-box"]').within(() =>
      cy.get('div[aria-label="Dog-hx"]').should('contain.text', '2')
    );
  });

  it(`should show a ${GIVE_BARTER_NAME} move message`, () => {
    // Make sure Scarlet has enough barter
    cy.openPlaybookPanel();
    cy.get('div[data-testid="Barter-box"]').within(() =>
      cy.get('div[data-testid="increase-caret"]').click()
    );
    cy.openMovesPanelBox('Peripheral moves');
    const moveDescSnippet =
      'When you give 1-barter to someone, but with strings attached';
    const messageTitle = `${characterName?.toUpperCase()}: ${GIVE_BARTER_NAME}`;
    cy.contains(decapitalize(GIVE_BARTER_NAME)).click();
    waitMutationWithGame(ONM_SET_CHARACTER_BARTER)

    cy.get('button[data-testid="give-button"]').click();
    cy.checkMoveMessage(messageTitle, moveDescSnippet);
    cy.contains('Barter spent: 1').should('be.visible');
  });

  it(`should show a ${GO_MARKET_NAME} move message`, () => {
    const moveDescSnippet = 'When you go into a holding’s bustling market';
    const messageTitle = `${characterName?.toUpperCase()}: ${GO_MARKET_NAME}`;
    cy.contains(decapitalize(GO_MARKET_NAME)).click();
    waitMutationWithGame(ONM_PERFORM_STAT_ROLL)
    cy.checkMoveMessage(messageTitle, moveDescSnippet, StatType.sharp);
  });

  it(`should show a ${MAKE_WANT_KNOWN_NAME} move message`, () => {
    // Make sure Scarlet has enough barter
    cy.openPlaybookPanel();
    cy.get('div[data-testid="Barter-box"]').within(() =>
      cy.get('div[data-testid="increase-caret"]').click()
    );
    cy.openMovesPanelBox('Peripheral moves');
    const moveDescSnippet = 'When you make known that you want a thing';
    const messageTitle = `${characterName?.toUpperCase()}: ${MAKE_WANT_KNOWN_NAME}`;
    cy.contains(decapitalize(MAKE_WANT_KNOWN_NAME)).click();
    cy.get('input[type="number"]').type('{selectall}{backspace}').type('1');
    cy.get('button[data-testid="drop-button"]').click();
    waitMutationWithGame(ONM_SET_CHARACTER_BARTER)
    waitMutationWithGame(ONM_PERFORM_MAKE_WANT_KNOWN)
    cy.checkMoveMessage(messageTitle, moveDescSnippet);
    cy.contains('Barter spent: 1').scrollIntoView().should('be.visible');
  });

  it(`should show a ${INSIGHT_NAME} move message`, () => {
    cy.checkPrintMove(
      characterName,
      INSIGHT_NAME,
      'When you are able to go to someone for insight'
    );
  });

  it(`should show a ${AUGURY_NAME} move message`, () => {
    const moveDescSnippet = 'When you are able to use something for augury';
    const messageTitle = `${characterName?.toUpperCase()}: ${AUGURY_NAME}`;
    cy.contains(decapitalize(AUGURY_NAME)).click();
    waitMutationWithGame(ONM_PERFORM_STAT_ROLL)
    cy.checkMoveMessage(messageTitle, moveDescSnippet, StatType.weird);
  });

  it(`should show a ${CHANGE_HIGHLIGHTED_STAT_NAME} move message`, () => {
    cy.checkPrintMove(
      characterName,
      CHANGE_HIGHLIGHTED_STAT_NAME,
      'At the beginning of any session'
    );
  });
});
