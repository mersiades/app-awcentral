import { StatType } from '../../src/@types/enums';
import johnAsPlayer_1 from '../fixtures/gameRoles/johnAsPlayer_1';
import game7 from '../fixtures/games/game7';
import {
  EXCHANGE_HARM_NAME,
  SEIZE_BY_FORCE_NAME,
  ASSAULT_POSITION_NAME,
  KEEP_HOLD_OF_SOMETHING_NAME,
  FIGHT_FREE_NAME,
  DEFEND_SOMEONE_NAME,
  DO_SINGLE_COMBAT_NAME,
  LAY_DOWN_FIRE_NAME,
  STAND_OVERWATCH_NAME,
  KEEP_EYE_OUT_NAME,
  BE_THE_BAIT_NAME,
  BE_THE_CAT_NAME,
  BE_THE_MOUSE_NAME,
  CAT_OR_MOUSE_NAME,
} from '../../src/config/constants';
import { setupQueryAliases } from '../utils/graphql-test-utils';

describe('Making battle moves from the MovesPanel as Battlebabe', () => {
  const characterName = johnAsPlayer_1.characters[0].name as string;

  beforeEach(() => {
    cy.login('john@email.com');
    cy.intercept('POST', `${Cypress.env('GRAPHQL_HOST')}/graphql`, (req)=> {
      setupQueryAliases(req)
    })
    cy.visit('/');
    cy.returnToGame(game7.name);
    cy.openMovesPanelBox('Battle moves');
  });

  it(`should show a ${EXCHANGE_HARM_NAME} move message`, () => {
    cy.checkPrintMove(
      characterName,
      EXCHANGE_HARM_NAME,
      'When you exchange harm, both sides'
    );
  });

  it(`should show a ${SEIZE_BY_FORCE_NAME} move message`, () => {
    cy.checkRollMove(
      characterName,
      SEIZE_BY_FORCE_NAME,
      'To seize something by force, exchange harm',
      StatType.hard
    );
  });

  it(`should show a ${ASSAULT_POSITION_NAME} move message`, () => {
    cy.checkRollMove(
      characterName,
      ASSAULT_POSITION_NAME,
      'To assault a secure position, exchange harm',
      StatType.hard
    );
  });

  it(`should show a ${KEEP_HOLD_OF_SOMETHING_NAME} move message`, () => {
    cy.checkRollMove(
      characterName,
      KEEP_HOLD_OF_SOMETHING_NAME,
      'To keep hold of something you have, exchange harm,',
      StatType.hard
    );
  });

  it(`should show a ${FIGHT_FREE_NAME} move message`, () => {
    cy.checkRollMove(
      characterName,
      FIGHT_FREE_NAME,
      'To fight your way free, exchange harm,',
      StatType.hard
    );
  });

  it(`should show a ${DEFEND_SOMEONE_NAME} move message`, () => {
    cy.checkRollMove(
      characterName,
      DEFEND_SOMEONE_NAME,
      'To defend someone else from attack, exchange harm,',
      StatType.hard
    );
  });

  it(`should show a ${DO_SINGLE_COMBAT_NAME} move message`, () => {
    cy.checkRollMove(
      characterName,
      DO_SINGLE_COMBAT_NAME,
      'When you do single combat with someone, no quarters,',
      StatType.hard
    );
  });

  it(`should show a ${LAY_DOWN_FIRE_NAME} move message`, () => {
    cy.checkRollMove(
      characterName,
      LAY_DOWN_FIRE_NAME,
      'When you lay down fire, roll+hard.',
      StatType.hard
    );
  });

  it(`should show a ${STAND_OVERWATCH_NAME} move message`, () => {
    cy.checkRollMove(
      characterName,
      STAND_OVERWATCH_NAME,
      'When you stand overwatch for an ally, roll+cool.',
      StatType.cool
    );
  });
  it(`should show a ${KEEP_EYE_OUT_NAME} move message`, () => {
    cy.checkRollMove(
      characterName,
      KEEP_EYE_OUT_NAME,
      'When you keep an eye out for what’s coming, roll+sharp.',
      StatType.sharp
    );
  });
  it(`should show a ${BE_THE_BAIT_NAME} move message`, () => {
    cy.checkRollMove(
      characterName,
      BE_THE_BAIT_NAME,
      'When you’re the bait, roll+cool.',
      StatType.cool
    );
  });
  it(`should show a ${BE_THE_CAT_NAME} move message`, () => {
    cy.checkRollMove(
      characterName,
      BE_THE_CAT_NAME,
      'When you’re the cat, roll+cool.',
      StatType.cool
    );
  });
  it(`should show a ${BE_THE_MOUSE_NAME} move message`, () => {
    cy.checkRollMove(
      characterName,
      BE_THE_MOUSE_NAME,
      'When you’re the mouse, roll+cool.',
      StatType.cool
    );
  });

  it(`should show a ${CAT_OR_MOUSE_NAME} move message`, () => {
    cy.checkRollMove(
      characterName,
      CAT_OR_MOUSE_NAME,
      'When it’s not certain whether you’re the cat or the mouse, roll+sharp.',
      StatType.sharp
    );
  });
});
