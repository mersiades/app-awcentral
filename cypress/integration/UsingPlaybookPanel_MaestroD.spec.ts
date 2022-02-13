import { StatType } from '../../src/@types/enums';
import { decapitalize } from '../../src/helpers/decapitalize';
import game1 from '../fixtures/games/game1';
import {
  MAESTROD_SPECIAL_NAME,
  JUST_GIVE_MOTIVE_NAME,
  ROLL_TEXT,
} from '../../src/config/constants';

describe('Using the PlaybookPanel as a Maestro D', () => {
  beforeEach(() => {
    cy.login('ivette@email.com');
    cy.visit('/');
    cy.returnToGame(game1.name);
    cy.get('button[data-testid="cancel-button"]').click();
    cy.openPlaybookPanel();
  });

  it('should show character name', () => {
    cy.contains("Emmy the Maestro D'").should('be.visible');
  });

  it('should render EstablishmentBox correctly and navigate to edit Establishment page', () => {
    cy.get('div[data-testid="Establishment-box"]').scrollIntoView();
    cy.get('div[data-testid="Establishment-box"]').within(() => {
      cy.get('div[aria-label="Cast & crew box"]').should('contain', 'crewey 1');
      cy.get('div[aria-label="Cast & crew box"]').should(
        'contain',
        'cool dude'
      );
      cy.get('div[data-testid="attractions-box"]').should(
        'contain',
        'Main: luxury food'
      );
      cy.get('div[data-testid="attractions-box"]').should(
        'contain',
        'Side: music, spectacle'
      );
      cy.get('div[data-testid="atmosphere-box"]').should(
        'contain',
        'bustle, velvet, fantasy'
      );
      cy.get('div[data-testid="regulars-box"]').should(
        'contain',
        'Lamprey is your best regular'
      );
      cy.get('div[data-testid="regulars-box"]').should(
        'contain',
        'Toyota is your worst regular'
      );
      cy.get('div[data-testid="interested npcs-box"]').should(
        'contain',
        'Been wants in on it'
      );
      cy.get('div[data-testid="interested npcs-box"]').should(
        'contain',
        'You owe Rolfball for it'
      );
      cy.get('div[data-testid="interested npcs-box"]').should(
        'contain',
        'Gams wants it gone'
      );
      cy.get('div[data-testid="security-box"]').should(
        'contain',
        'plywood & chickenwire (1-armor)'
      );
      cy.get('div[data-testid="security-box"]').should(
        'contain',
        'a bouncer who knows his biz (2-harm 1-armor)'
      );

      cy.get('svg[aria-label="Edit"]').click();
    });
    cy.url().should('contain', `/character-creation/${game1.id}?step=6`);
    cy.contains("EMMY'S ESTABLISHMENT").should('be.visible');

    cy.get('svg[aria-label="Close"]').click();
    cy.url().should('contain', `/player-game/${game1.id}`);
  });

  it(`should show message for the ${MAESTROD_SPECIAL_NAME} character move`, () => {
    cy.checkPrintMove(
      'Emmy',
      MAESTROD_SPECIAL_NAME,
      'If you hook up another character up - with sex, with food,'
    );
  });

  it(`should show message for the ${JUST_GIVE_MOTIVE_NAME} character move `, () => {
    const moveDescSnippet =
      'name somebody who might conceivably eat, drink, or otherwise';
    cy.get('div[data-testid="moves-box"]').scrollIntoView();
    cy.contains(decapitalize(JUST_GIVE_MOTIVE_NAME)).click();
    cy.contains(moveDescSnippet).should('be.visible');
    cy.get('input[aria-label="target-character-input"]').should('not.exist');
    cy.contains('button', ROLL_TEXT).should('not.be.disabled');
    cy.get('label[for="PC"]').click();
    cy.contains('button', ROLL_TEXT).should('be.disabled');
    cy.get('input[aria-label="target-character-input"]').should('be.visible');
    cy.get('input[aria-label="target-character-input"]').click();

    cy.get('div[role="menubar"]').within(() => {
      cy.contains('button', 'Doc').should('be.visible');
      cy.contains('button', 'Scarlet').should('be.visible');
      cy.contains('button', 'Smith').should('be.visible');
      cy.contains('button', 'Phoenix').scrollIntoView();
      cy.contains('button', 'Phoenix').should('be.visible');
      cy.contains('button', 'Phoenix').click();
    });
    cy.contains('button', ROLL_TEXT).should('not.be.disabled');
    cy.contains('button', ROLL_TEXT).click();
    cy.contains('button', ROLL_TEXT).should('not.exist');
    const messageTitle = `EMMY: ${JUST_GIVE_MOTIVE_NAME}`;
    cy.checkMoveMessage(messageTitle, moveDescSnippet, StatType.hx);
  });
});
