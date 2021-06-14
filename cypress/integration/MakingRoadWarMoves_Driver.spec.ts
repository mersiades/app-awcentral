import { StatType } from '../../src/@types/enums';
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
  BOARD_VEHICLE_NAME,
  BOARD_TEXT,
  OUTDISTANCE_VEHICLE_NAME,
  OUTDISTANCE_TEXT,
  OVERTAKE_TEXT,
  OVERTAKE_VEHICLE_NAME,
  DEAL_WITH_TERRAIN_NAME,
  DRIVE_TEXT,
  SHOULDER_ANOTHER_VEHICLE_NAME,
} from '../../src/config/constants';
import { decapitalize } from '../../src/helpers/decapitalize';
import johnAsPlayer_1 from '../fixtures/gameRoles/johnAsPlayer_1';
import game1 from '../fixtures/games/game1';
import game7 from '../fixtures/games/game7';

describe('Making road war moves from the MovesPanel as Driver', () => {
  // const characterName = johnAsPlayer_1.characters[0].name as string;
  const characterName = 'Phoenix';
  const vehicle1 = 'Bess';
  const vehicle2 = 'Ducati Monster';

  beforeEach(() => {
    cy.kcLogout();
    cy.kcLogin('ahmad');
    cy.visit(`/player-game/${game1.id}`);
    cy.get('button[data-testid="cancel-button"]').click();
    cy.openMovesPanelBox('Road war moves');
  });

  it(`should show a ${BOARD_VEHICLE_NAME} move message`, () => {
    const moveDescSnippet = 'To board a moving vehicle, roll+cool, minus its speed.';
    const messageTitle = `${characterName?.toUpperCase()}: ${BOARD_VEHICLE_NAME}`;
    cy.contains(decapitalize(BOARD_VEHICLE_NAME)).click();
    cy.contains(moveDescSnippet).should('be.visible');
    cy.get('input[aria-label="my vehicle select"]').click();
    cy.contains('button', vehicle2).should('be.visible');
    cy.contains('button', vehicle1).should('be.visible');
    cy.contains('button', vehicle1).click();

    cy.get('input[aria-label="opposition speed"]').click();
    cy.contains('button', '1').should('be.visible');
    cy.contains('button', '2').should('be.visible');
    cy.contains('button', '1').click();

    cy.contains('button', BOARD_TEXT).should('not.be.disabled');
    cy.contains('button', BOARD_TEXT).click();

    cy.checkMoveMessage(messageTitle, moveDescSnippet, StatType.cool);
    cy.contains('SPEED DIFF.').should('be.visible');
  });

  it(`should show a ${OUTDISTANCE_VEHICLE_NAME} move message`, () => {
    const moveDescSnippet = 'When you try to outdistance another vehicle, roll+cool,';
    const messageTitle = `${characterName?.toUpperCase()}: ${OUTDISTANCE_VEHICLE_NAME}`;
    cy.contains(decapitalize(OUTDISTANCE_VEHICLE_NAME)).click();
    cy.contains(moveDescSnippet).should('be.visible');
    cy.get('input[aria-label="my vehicle select"]').click();
    cy.contains('button', vehicle2).should('be.visible');
    cy.contains('button', vehicle1).should('be.visible');
    cy.contains('button', vehicle2).click();

    cy.get('input[aria-label="opposition speed select"]').click();
    cy.contains('button', '1').should('be.visible');
    cy.contains('button', '2').should('be.visible');
    cy.contains('button', '2').click();

    cy.contains('button', OUTDISTANCE_TEXT).should('not.be.disabled');
    cy.contains('button', OUTDISTANCE_TEXT).click();

    cy.checkMoveMessage(messageTitle, moveDescSnippet, StatType.cool);
    cy.contains('REL. SPEED').should('be.visible');
  });

  it(`should show a ${OVERTAKE_VEHICLE_NAME} move message`, () => {
    const moveDescSnippet = 'When you try to overtake another vehicle, roll+cool';
    const messageTitle = `${characterName?.toUpperCase()}: ${OVERTAKE_VEHICLE_NAME}`;
    cy.contains(decapitalize(OVERTAKE_VEHICLE_NAME)).click();
    cy.contains(moveDescSnippet).should('be.visible');
    cy.get('input[aria-label="my vehicle select"]').click();
    cy.contains('button', vehicle2).should('be.visible');
    cy.contains('button', vehicle1).should('be.visible');
    cy.contains('button', vehicle2).click();

    cy.get('input[aria-label="opposition speed select"]').click();
    cy.contains('button', '1').should('be.visible');
    cy.contains('button', '2').should('be.visible');
    cy.contains('button', '2').click();

    cy.contains('button', OVERTAKE_TEXT).should('not.be.disabled');
    cy.contains('button', OVERTAKE_TEXT).click();

    cy.checkMoveMessage(messageTitle, moveDescSnippet, StatType.cool);
    cy.contains('REL. SPEED').should('be.visible');
  });

  it(`should show a ${DEAL_WITH_TERRAIN_NAME} move message`, () => {
    const moveDescSnippet = 'When you have to deal with bad terrain, roll+cool,';
    const messageTitle = `${characterName?.toUpperCase()}: ${DEAL_WITH_TERRAIN_NAME}`;
    cy.contains(decapitalize(DEAL_WITH_TERRAIN_NAME)).click();
    cy.contains(moveDescSnippet).should('be.visible');
    cy.get('input[aria-label="my vehicle select"]').click();
    cy.contains('button', vehicle2).should('be.visible');
    cy.contains('button', vehicle1).should('be.visible');
    cy.contains('button', vehicle2).click();

    cy.contains('button', DRIVE_TEXT).should('not.be.disabled');
    cy.contains('button', DRIVE_TEXT).click();

    cy.checkMoveMessage(messageTitle, moveDescSnippet, StatType.cool);
    cy.contains('HANDLING').should('be.visible');
  });

  it(`should show a ${SHOULDER_ANOTHER_VEHICLE_NAME} move message`, () => {
    cy.checkRollMove(characterName, SHOULDER_ANOTHER_VEHICLE_NAME, 'To shoulder another vehicle, roll+cool.', StatType.cool);
  });
});
