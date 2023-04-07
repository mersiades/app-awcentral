import { StatType } from '../../src/@types/enums';
import { decapitalize } from '../../src/helpers/decapitalize';
import game1 from '../fixtures/games/game1';
import {
  APPLY_TEXT,
  GUNLUGGER_SPECIAL_NAME,
  FUCK_THIS_SHIT_NAME,
} from '../../src/config/constants';
import {
  aliasMutation,
  generateWaitAlias, ONM_PERFORM_GUNLUGGER_SPECIAL, ONM_PERFORM_STAT_ROLL,
  ONQ_ALL_MOVES,
  setupQueryAliases,
  visitHomePage, waitMutationWithGame
} from '../utils/graphql-test-utils';

describe('Using the PlaybookPanel as a Gunlugger', () => {
  beforeEach(() => {
    cy.login('marama@email.com');
    cy.intercept('POST', `${Cypress.env('GRAPHQL_HOST')}/graphql`, (req)=> {
      setupQueryAliases(req)
      aliasMutation(req,ONM_PERFORM_GUNLUGGER_SPECIAL)
    })
    visitHomePage()
    cy.returnToGame(game1.name);
    cy.wait(generateWaitAlias(ONQ_ALL_MOVES))
    cy.get('button[data-testid="cancel-button"]').click();
    cy.openPlaybookPanel();
  });

  it('should show character name', () => {
    cy.contains('Batty the Gunlugger').should('be.visible');
  });

  it('should render WeaponsBox correctly and navigate to edit Weapons page', () => {
    cy.get('div[data-testid="Weapons-box"]').scrollIntoView();
    cy.get('div[data-testid="Weapons-box"]').within(() => {
      cy.contains('li', 'silenced sniper rifle').should('be.visible');
      cy.contains('li', 'hunting rifle').should('be.visible');
      cy.contains('li', 'shotgun').should('be.visible');
      cy.contains('li', '9mm').should('be.visible');

      cy.get('svg[aria-label="Edit"]').click();
    });
    cy.url().should('contain', `/character-creation/${game1.id}?step=6`);
    cy.contains("BATTY'S WEAPONS").should('be.visible');

    cy.get('svg[aria-label="Close"]').click();
    cy.url().should('contain', `/player-game/${game1.id}`);
  });

  it(`should show message for the ${GUNLUGGER_SPECIAL_NAME} character move`, () => {
    const moveDescSnippet =
      'If you and another character have sex, you take +1 forward.';
    cy.get('div[data-testid="moves-box"]').scrollIntoView();
    cy.contains(decapitalize(GUNLUGGER_SPECIAL_NAME)).click();
    cy.contains(moveDescSnippet).should('be.visible');
    cy.get('input[aria-label="target-character-input"]').click();
    cy.contains('button', APPLY_TEXT).should('be.disabled');
    cy.get('div[role="listbox"]').within(() => {
      cy.contains('button', 'Doc').should('be.visible');
      cy.contains('button', 'Scarlet').should('be.visible');
      cy.contains('button', 'Smith').should('be.visible');
      cy.contains('button', 'Phoenix').should('be.visible');
      cy.contains('button', 'Phoenix').click();
    });
    cy.contains('button', APPLY_TEXT).should('be.disabled');
    cy.get('label[for="Yes"]').click();
    cy.contains('button', APPLY_TEXT).should('not.be.disabled');
    cy.contains('button', APPLY_TEXT).click();
    waitMutationWithGame(ONM_PERFORM_GUNLUGGER_SPECIAL)
    cy.contains('button', APPLY_TEXT).should('not.exist');
    const messageTitle = `BATTY: ${GUNLUGGER_SPECIAL_NAME}`;
    cy.checkMoveMessage(
      messageTitle,
      'Batty and Phoenix had sex. Batty has gained +1forward'
    );
    cy.get('div[aria-label="+1forward token"]').should('be.visible');
  });

  it(`should show message for the ${FUCK_THIS_SHIT_NAME} character move and increase experience`, () => {
    cy.checkRollMove(
      'Batty',
      FUCK_THIS_SHIT_NAME,
      'name your escape route and roll+hard.',
      StatType.hard
    );

    checkExperienceNumber(1, 4);
  });
});

const checkExperienceNumber = (
  expectedFilled: number,
  expectedUnfilled: number
) => {
  cy.get('div[data-testid="filled-circle"]', { timeout: 8000 }).should(
    'have.length',
    expectedFilled
  );
  cy.get('div[data-testid="unfilled-circle"]', { timeout: 8000 }).should(
    'have.length',
    expectedUnfilled
  );
};
