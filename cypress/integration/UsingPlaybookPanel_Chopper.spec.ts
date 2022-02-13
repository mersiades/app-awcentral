import { StatType } from '../../src/@types/enums';
import { decapitalize } from '../../src/helpers/decapitalize';
import game1 from '../fixtures/games/game1';
import {
  SIZE_TEXT,
  HARM_TEXT,
  ARMOR_TEXT,
  TAGS_TEXT,
  GANG_MOVES,
  SEIZE_BY_FORCE_NAME,
  SPEED_TEXT,
  HANDLING_TEXT,
  MASSIVE_TEXT,
  CHOPPER_SPECIAL_NAME,
  PACK_ALPHA_NAME,
  FUCKING_THIEVES_NAME,
  APPLY_TEXT,
} from '../../src/config/constants';

describe('Using the PlaybookPanel as a Chopper', () => {
  beforeEach(() => {
    cy.login('takeshi@email.com');
    cy.visit('/');
    cy.returnToGame(game1.name);
    cy.get('button[data-testid="cancel-button"]').click();
    cy.openPlaybookPanel();
  });

  it('should show character name', () => {
    cy.contains('Dog the Chopper').should('be.visible');
  });

  it('should render GangBox correctly and navigate to edit gang page', () => {
    cy.get('div[data-testid="Gang-box"]').scrollIntoView();
    cy.get('div[data-testid="Gang-box"]').within(() => {
      cy.get('div[data-testid="gang-size-box"]').should(
        'contain.text',
        SIZE_TEXT
      );
      cy.get('div[data-testid="gang-size-box"]').should(
        'contain.text',
        'MEDIUM'
      );
      cy.get('div[data-testid="gang-harm-box"]').should(
        'contain.text',
        HARM_TEXT
      );
      cy.get('div[data-testid="gang-harm-box"]').should('contain.text', '3');
      cy.get('div[data-testid="gang-armor-box"]').should(
        'contain.text',
        ARMOR_TEXT
      );
      cy.get('div[data-testid="gang-armor-box"]').should('contain.text', '1');
      cy.get('div[data-testid="gang-tags-box"]').should(
        'contain.text',
        TAGS_TEXT
      );
      cy.get('div[data-testid="gang-tags-box"]').should(
        'contain.text',
        'savage'
      );
      cy.get('div[data-testid="gang-tags-box"]').should(
        'contain.text',
        'vulnerable: breakdown'
      );
      cy.contains(GANG_MOVES).should('be.visible');

      cy.get('svg[aria-label="Edit"]').click();
    });
    cy.url().should('contain', `/character-creation/${game1.id}?step=6`);
    cy.contains("DOG'S GANG").should('be.visible');

    cy.get('svg[aria-label="Close"]').click();
    cy.url().should('contain', `/player-game/${game1.id}`);
  });

  it('should roll a Gang move', () => {
    cy.get('div[data-testid="Gang-box"]').scrollIntoView();
    cy.get('div[data-testid="Gang-box"]').within(() => {
      cy.contains(GANG_MOVES).click();
      cy.contains(decapitalize(SEIZE_BY_FORCE_NAME)).should('be.visible');
      cy.contains(decapitalize(SEIZE_BY_FORCE_NAME)).click();
    });

    cy.checkRollMove(
      'Dog',
      SEIZE_BY_FORCE_NAME,
      'When you have a gang, you can sucker someone, go aggro on them, or make a battle move, using your gang as a weapon.',
      StatType.hard
    );
  });

  it("should show the Chopper's bike and navvigate to edit vehicle page", () => {
    cy.get('div[data-testid="Vehicles-box"]').scrollIntoView();
    cy.get('div[data-testid="Vehicles-box"]').within(() => {
      cy.contains('Honda (bike)').should('be.visible');
      cy.contains('Tags: fast, responsive, lazy').should('be.visible');
      cy.get('div[data-testid="speed-box"]').should('contain.text', SPEED_TEXT);
      cy.get('div[data-testid="speed-box"]').should('contain.text', '0');
      cy.get('div[data-testid="handling-box"]').should(
        'contain.text',
        HANDLING_TEXT
      );
      cy.get('div[data-testid="handling-box"]').should('contain.text', '1');
      cy.get('div[data-testid="armor-box"]').should('contain.text', ARMOR_TEXT);
      cy.get('div[data-testid="armor-box"]').should('contain.text', '0');
      cy.get('div[data-testid="massive-box"]').should(
        'contain.text',
        MASSIVE_TEXT
      );
      cy.get('div[data-testid="massive-box"]').should('contain.text', '0');

      cy.get('svg[aria-label="Edit"]').click();
    });
    cy.url().should('contain', `/character-creation/${game1.id}?step=8`);
    cy.contains('Vehicle 1').should('be.visible');

    cy.get('svg[aria-label="Close"]').click();
    cy.url().should('contain', `/player-game/${game1.id}`);
  });

  it(`should show message for the ${CHOPPER_SPECIAL_NAME} character move`, () => {
    const moveDescSnippet =
      'If you and another character have sex, they immediately change their sheet to say Hx+3 with you.';
    cy.get('div[data-testid="moves-box"]').scrollIntoView();
    cy.contains(decapitalize(CHOPPER_SPECIAL_NAME)).click();
    cy.contains(moveDescSnippet).should('be.visible');
    cy.get('input[aria-label="target-character-input"]').click();
    cy.contains('button', APPLY_TEXT).should('be.disabled');
    cy.get('div[role="menubar"]').within(() => {
      cy.contains('button', 'Doc').should('be.visible');
      cy.contains('button', 'Scarlet').should('be.visible');
      cy.contains('button', 'Smith').should('be.visible');
      cy.contains('button', 'Phoenix').should('be.visible'); // -1 Hx
      cy.contains('button', 'Phoenix').click();
    });
    cy.contains('button', APPLY_TEXT).should('be.disabled');
    cy.get('label[for="+1"]').click();
    cy.contains('button', APPLY_TEXT).should('not.be.disabled');
    cy.contains('button', APPLY_TEXT).click();
    cy.contains('button', APPLY_TEXT).should('not.exist');
    const messageTitle = `DOG: ${CHOPPER_SPECIAL_NAME}`;
    cy.checkMoveMessage(
      messageTitle,
      "Dog and Phoenix shagged, and now Phoenix's Hx with Dog is 3, and Dog's Hx with Phoenix has increased by 1."
    );
    cy.get('div[data-testid="Hx-box"]').scrollIntoView();
    cy.get('h2[aria-label="phoenix-value"]').should('contain.text', '0');
  });

  it(`should show message for the ${PACK_ALPHA_NAME} character move`, () => {
    cy.checkRollMove(
      'Dog',
      PACK_ALPHA_NAME,
      'when you try to impose your will on your gang, roll+hard.',
      StatType.hard
    );
  });

  it(`should show message for the ${FUCKING_THIEVES_NAME} character move`, () => {
    cy.checkRollMove(
      'Dog',
      FUCKING_THIEVES_NAME,
      'when you have your gang search their pockets and saddlebags for something, roll+hard.',
      StatType.hard
    );
  });
});
