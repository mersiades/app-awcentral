import { StatType } from '../../src/@types/enums';
import {
  ANGEL_SPECIAL_NAME,
  APPLY_TEXT,
  CURRENT_STOCK_1_TEXT,
  CURRENT_STOCK_2_TEXT,
  HEALING_TOUCH_NAME,
  HOW_MUCH_STOCK_TEXT,
  REVIVE_SOMEONE_NAME,
  REVIVE_TEXT,
  SIXTH_SENSE_NAME,
  SPEED_RECOVERY_NAME,
  SPEED_RECOVERY_TEXT,
  STABILIZE_AND_HEAL_NAME,
  STABILIZE_TEXT,
  TREAT_NPC_NAME,
  TREAT_TEXT,
  USE_STOCK_TEXT,
} from '../../src/config/constants';
import { decapitalize } from '../../src/helpers/decapitalize';
import angel_sara_1_complete from '../fixtures/characters/angel_sara_1_complete';
import game1 from '../fixtures/games/game1';

describe('Using the PlaybookPanel to make Angel and AngelKit moves', () => {
  beforeEach(() => {
    cy.kcLogout();
    cy.kcLogin('sara');
    cy.visit(`/player-game/${game1.id}`);
    cy.get('button[data-testid="cancel-button"]').click();
    cy.openPlaybookPanel();
  });

  it(`should show message for the ${HEALING_TOUCH_NAME} character move`, () => {
    cy.checkRollMove(
      'Doc',
      HEALING_TOUCH_NAME,
      'when you put your hands skin-to-skin on a wounded person and open your brain to them, roll+weird.',
      StatType.weird
    );
  });

  it(`should show message for the ${ANGEL_SPECIAL_NAME} character move`, () => {
    const moveDescSnippet = 'If you and another character have sex, your Hx with them on your sheet goes immediately';
    cy.get('div[data-testid="moves-box"]').within(() => {
      cy.contains(decapitalize(ANGEL_SPECIAL_NAME)).click();
    });

    cy.contains(moveDescSnippet).should('be.visible');
    cy.contains('button', APPLY_TEXT).should('be.disabled');
    cy.get('input[aria-label="target-character-input"]').click();
    cy.get('div[role="menubar"]').within(() => {
      cy.contains('button', 'Dog').should('be.visible');
      cy.contains('button', 'Scarlet').should('be.visible');
      cy.contains('button', 'Smith').should('be.visible');
      cy.contains('button', 'Phoenix').should('be.visible'); // -1 Hx
      cy.contains('button', 'Phoenix').click();
    });
    cy.contains('button', APPLY_TEXT).should('not.be.disabled');
    cy.contains('button', APPLY_TEXT).click();
    cy.contains('button', APPLY_TEXT).should('not.exist');
    const messageTitle = `DOC: ${ANGEL_SPECIAL_NAME}`;
    cy.checkMoveMessage(messageTitle, "Doc and Phoenix shagged, and now Doc's Hx with Phoenix is 3");
    cy.get('div[data-testid="Hx-box"]').scrollIntoView();
    cy.get('h2[aria-label="phoenix-value"]').should('contain.text', '3');
  });

  it(`should show message for the ${STABILIZE_AND_HEAL_NAME} AngelKit move`, () => {
    const moveDescSnippet = 'stabilize and heal someone at 9:00 or past';
    cy.contains(decapitalize(STABILIZE_AND_HEAL_NAME)).scrollIntoView().click();

    // Check initial content of StabilizeDialog
    cy.contains(STABILIZE_AND_HEAL_NAME).should('exist');
    cy.contains(moveDescSnippet).should('exist');
    cy.contains(HOW_MUCH_STOCK_TEXT).should('exist');
    cy.contains(
      `${CURRENT_STOCK_1_TEXT} ${angel_sara_1_complete.playbookUniques?.angelKit?.stock} ${CURRENT_STOCK_2_TEXT}`
    ).should('exist');

    cy.get('input[type=number]').type('{uparrow}').trigger('change');
    cy.get('input[type=number]').should('have.value', '1');

    cy.contains('button', STABILIZE_TEXT).click();
    cy.contains('button', STABILIZE_TEXT).should('not.exist');
    const messageTitle = `DOC: ${STABILIZE_AND_HEAL_NAME}`;
    cy.checkMoveMessage(messageTitle, moveDescSnippet);
    cy.contains('STOCK').should('be.visible');
    cy.contains('Stock spent: 1').should('be.visible');
  });

  it(`should show message for the ${SPEED_RECOVERY_NAME} AngelKit move`, () => {
    const moveDescSnippet = 'speed the recovery of someone at 3:00 or 6:00';
    cy.contains(decapitalize(SPEED_RECOVERY_NAME)).scrollIntoView().click();

    // Check initial content of SpeedRecoveryDialog
    cy.contains(SPEED_RECOVERY_NAME).should('be.visible');
    cy.contains(moveDescSnippet).should('be.visible');
    cy.contains(USE_STOCK_TEXT).should('be.visible');
    cy.get('label[for="No"]').click();
    cy.contains('button', SPEED_RECOVERY_TEXT).should('not.be.disabled');
    cy.contains('button', SPEED_RECOVERY_TEXT).click();

    const messageTitle = `DOC: ${SPEED_RECOVERY_NAME}`;
    cy.checkMoveMessage(messageTitle, moveDescSnippet);
    cy.contains('Stock spent: 0').should('be.visible');
  });

  it("should increase AngelKit's stock", () => {
    let stockValue: number;
    cy.get('div[data-testid="stock-box"]')
      .scrollIntoView()
      .within(() => {
        cy.get('h2[aria-label="stock-value"]').then((elem) => {
          stockValue = parseInt(elem[0].innerText);
          cy.get('div[data-testid="increase-caret"]').click();
          cy.get('h2[aria-label="stock-value"]').should('contain.text', stockValue + 1);
        });
      });
  });

  // Note: This test relies on the stock levels set in the previous two tests
  it(`should show message for the ${REVIVE_SOMEONE_NAME} AngelKit move`, () => {
    const moveDescSnippet = 'revive someone whose life has become untenable,';
    cy.contains(decapitalize(REVIVE_SOMEONE_NAME)).scrollIntoView().click();

    // Check initial content of ReviveDialog
    cy.contains(REVIVE_SOMEONE_NAME).should('be.visible');
    cy.contains(moveDescSnippet).should('be.visible');
    cy.contains('This will cost 2-stock. You currently have 2 stock.').should('be.visible');
    cy.contains('button', REVIVE_TEXT).should('not.be.disabled');
    cy.contains('button', REVIVE_TEXT).click();

    const messageTitle = `DOC: ${REVIVE_SOMEONE_NAME}`;
    cy.checkMoveMessage(messageTitle, moveDescSnippet);
    cy.contains('Stock spent: 2').should('be.visible');
    cy.contains('Stock left: 0').should('be.visible');
  });

  // Note: This test relies on the stock levels set in the previous test
  it(`should show message for the ${TREAT_NPC_NAME} AngelKit move`, () => {
    // Ensure Doc has enough stock for the move
    cy.get('div[data-testid="stock-box"]')
      .scrollIntoView()
      .within(() => {
        cy.get('div[data-testid="increase-caret"]').click();
      });

    const moveDescSnippet = 'treat an NPC: spend 1-stock.';
    cy.contains(decapitalize(TREAT_NPC_NAME)).scrollIntoView().click();

    // Check initial content of StabilizeDialog
    cy.contains(TREAT_NPC_NAME).should('be.visible');
    cy.contains(moveDescSnippet).should('be.visible');
    cy.contains('This will cost 1-stock. You currently have 1 stock.').should('be.visible');
    cy.contains('button', TREAT_TEXT).should('not.be.disabled');
    cy.contains('button', TREAT_TEXT).click();

    const messageTitle = `DOC: ${TREAT_NPC_NAME}`;
    cy.checkMoveMessage(messageTitle, moveDescSnippet);
    cy.contains('Stock spent: 1').should('be.visible');
    cy.contains('Stock left: 0').should('be.visible');
  });
});
