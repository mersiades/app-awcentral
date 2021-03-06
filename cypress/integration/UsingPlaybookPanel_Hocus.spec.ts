import { StatType } from '../../src/@types/enums';
import {
  APPLY_TEXT,
  FRENZY_NAME,
  HOCUS_SPECIAL_NAME,
  FORTUNES_NAME,
} from '../../src/config/constants';
import { decapitalize } from '../../src/helpers/decapitalize';
import game1 from '../fixtures/games/game1';
describe('Using the PlaybookPanel as a Hocus', () => {
  beforeEach(() => {
    cy.kcLogout();
    cy.kcLogin('wilmer');
    cy.visit(`/player-game/${game1.id}`);
    cy.get('button[data-testid="cancel-button"]').click();
    cy.openPlaybookPanel();
  });

  it('should show character name', () => {
    cy.contains('Vision the Hocus').should('be.visible');
  });

  it('should render FollowersBox correctly and navigate to edit Followers page', () => {
    const description =
      'Your cult is about 10 followers. When you travel, they travel with you.';
    cy.get('div[data-testid="Followers-box"]').scrollIntoView();
    cy.get('div[data-testid="Followers-box"]').within(() => {
      cy.get('div[data-testid="description-tags-box"]').should(
        'contain',
        description
      );
      cy.get('div[data-testid="fortune-box"]').should('contain', 'fortune+2');
      cy.get('div[data-testid="surplus-tags-box"]').should(
        'contain',
        '1-barter'
      );
      cy.get('div[data-testid="want-tags-box"]').should(
        'contain',
        'hungry, judgement'
      );

      cy.get('div[data-testid="barter-box"]').within(() => {
        cy.get('h2[aria-label="barter-value"]').should('contain', '2');
        cy.get('div[data-testid="increase-caret"]').click();
        cy.get('h2[aria-label="barter-value"]').should('contain', '3');
        cy.get('div[data-testid="decrease-caret"]').click();
        cy.get('h2[aria-label="barter-value"]').should('contain', '2');
      });

      cy.get('div[data-testid="followers-box"]').within(() => {
        cy.get('h2[aria-label="followers-value"]').should('contain', '10');
        cy.get('div[data-testid="increase-caret"]').click();
        cy.get('h2[aria-label="followers-value"]').should('contain', '11');
        cy.get('div[data-testid="decrease-caret"]').click();
        cy.get('h2[aria-label="followers-value"]').should('contain', '10');
      });

      cy.get('svg[aria-label="Edit"]').click();
    });
    cy.url().should('contain', `/character-creation/${game1.id}?step=6`);
    cy.contains("VISION'S FOLLOWERS").should('be.visible');

    cy.get('svg[aria-label="Close"]').click();
    cy.url().should('contain', `/player-game/${game1.id}`);
  });

  it(`should show message for the ${FRENZY_NAME} character move`, () => {
    cy.checkRollMove(
      'Vision',
      FRENZY_NAME,
      'When you speak the truth to a mob, roll+weird.',
      StatType.weird
    );
  });

  it(`should show message for the ${HOCUS_SPECIAL_NAME} character move and add a hold`, () => {
    const moveDescSnippet =
      'If you and another character have sex, you each get 1 hold.';
    cy.get('div[data-testid="moves-box"]').scrollIntoView();
    cy.contains(decapitalize(HOCUS_SPECIAL_NAME)).click();
    cy.contains(moveDescSnippet).should('be.visible');
    cy.get('input[aria-label="target-character-input"]').click();
    cy.contains('button', APPLY_TEXT).should('be.disabled');
    cy.get('div[role="menubar"]').within(() => {
      cy.contains('button', 'Doc').should('be.visible');
      cy.contains('button', 'Scarlet').should('be.visible');
      cy.contains('button', 'Smith').should('be.visible');
      cy.contains('button', 'Phoenix').should('be.visible');
      cy.contains('button', 'Phoenix').click();
    });
    cy.contains('button', APPLY_TEXT).should('not.be.disabled');
    cy.contains('button', APPLY_TEXT).click();
    cy.contains('button', APPLY_TEXT).should('not.exist');
    const messageTitle = `VISION: ${HOCUS_SPECIAL_NAME}`;
    cy.checkMoveMessage(
      messageTitle,
      'Vision and Phoenix had sex. They have both gained 1 hold'
    );
    cy.get('div[data-testid="hold-circle"]').should('have.length', 1);
  });

  it(`should show message for the ${FORTUNES_NAME} character move`, () => {
    cy.get('div[data-testid="moves-box"]').scrollIntoView();
    cy.contains(decapitalize(FORTUNES_NAME)).click();
    const messageTitle = `VISION: ${FORTUNES_NAME}`;
    const moveDescSnippet = "The followers' barter for the session is now";
    cy.checkMoveMessage(messageTitle, moveDescSnippet);
    cy.contains('FORTUNE').should('be.visible');
  });
});
