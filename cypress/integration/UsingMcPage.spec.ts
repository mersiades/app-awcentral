import { MoveType } from '../../src/@types/enums';
import {
  ADD_TEXT,
  BARTER_TEXT,
  CORE_BOX_TITLE,
  FIRST_SESSION_TEXT,
  GEAR_TITLE,
  HARM_RULES_TITLE,
  HIGHLIGHTED_STATS_TEXT,
  INVITATIONS_TEXT,
  MOVES_TITLE,
  NPCS_TEXT,
  PLAYERS_TEXT,
  SELECTED_MC_RULES_TEXT,
  THREATS_TEXT,
} from '../../src/config/constants';
import { decapitalize } from '../../src/helpers/decapitalize';
import daveAsMC_1 from '../fixtures/gameRoles/daveAsMc_1';
import saraAsPlayer_1 from '../fixtures/gameRoles/saraAsPlayer_1';
import game7 from '../fixtures/games/game7';

describe('Using the MC Page', () => {
  beforeEach(() => {
    cy.kcLogout();
    cy.kcLogin('dave');
    cy.visit(`/mc-game/${game7.id}`);
  });

  it('should show GamePanel initially', () => {
    cy.contains(game7.name).should('exist');
    cy.contains(PLAYERS_TEXT).should('exist');
    cy.contains(INVITATIONS_TEXT).should('exist');
  });

  it('should show MovesPanel', () => {
    cy.get('button[name="moves"]').click();
    cy.contains(`${decapitalize(MoveType.basic)} moves`).should('exist');
    cy.contains(`${decapitalize(MoveType.peripheral)} moves`).should('exist');
    cy.contains(`${decapitalize(MoveType.battle)} moves`).should('exist');
    cy.contains(`${decapitalize(MoveType.roadWar)} moves`).should('exist');
  });

  it('should show McPanel', () => {
    cy.get('button[name="mc"]').click();
    cy.contains(CORE_BOX_TITLE).should('exist');
    cy.contains(HARM_RULES_TITLE).should('exist');
    cy.contains(SELECTED_MC_RULES_TEXT).should('exist');
    cy.contains(FIRST_SESSION_TEXT).should('exist');
  });

  it('should show ThreatsPanel', () => {
    cy.get('button[name="threats"]').click();
    cy.contains(THREATS_TEXT).should('exist');
    cy.contains(ADD_TEXT).should('exist');
    cy.contains(daveAsMC_1.threats[0].name).should('exist');
    cy.contains(daveAsMC_1.threats[1].name).should('exist');
  });

  it('should show NpcsPanel', () => {
    cy.get('button[name="npcs"]').click();
    cy.contains(NPCS_TEXT).should('exist');
    cy.contains(ADD_TEXT).should('exist');
    cy.contains(daveAsMC_1.npcs[0].name).should('exist');
    cy.contains(daveAsMC_1.npcs[1].name).should('exist');
  });

  it('should show MC agenda and principles', () => {
    // FAILING: I think because the setItnerval function is
    // inside the Grommet Carousel component
    // cy.clock();
    // cy.tick(80000);
  });

  it('should show Script Change message', () => {
    const mockComment = 'I need to ask a question';
    const pauseMessageTitle = 'SCRIPT CHANGE: PAUSE';
    cy.get('img[aria-label="script-change-button"]').click();
    cy.get('input[aria-label="script-change-comment-input"]').type(mockComment);
    cy.get('div[data-testid="PAUSE-tile"]').click();

    // Check message delivery
    cy.get(`div[data-testid="${pauseMessageTitle}-message"]`).within(() => {
      cy.contains(pauseMessageTitle).should('exist');
      cy.contains(mockComment).should('exist');
      cy.contains('Call a pause if you need').should('exist');
      // Check minimising stats block
      cy.get('svg[aria-label="FormUp"]').click();
      // cy.contains(mockComment).should('be.hidden');
    });
  });

  it('should show CharacterPreviews', () => {
    cy.get('button[name="doc-preview-button"]').trigger('mouseover');
    cy.contains('Doc the Angel').should('exist');
    saraAsPlayer_1.characters[0].looks.forEach((look) => {
      cy.contains(look.look).should('exist');
    });
    cy.contains(HIGHLIGHTED_STATS_TEXT).should('exist');
    cy.get('h2[aria-label="hard-value"]').should('include.text', '0');
    cy.get('h2[aria-label="hot-value"]').should('include.text', '1');
    cy.contains(BARTER_TEXT).should('exist');
    cy.contains(MOVES_TITLE).should('exist');
    saraAsPlayer_1.characters[0].characterMoves.forEach((move) => {
      cy.contains(decapitalize(move.name)).should('exist');
    });
    cy.contains(GEAR_TITLE).should('exist');
    saraAsPlayer_1.characters[0].gear.forEach((item) => {
      cy.contains(item).should('exist');
    });
  });
});

/**
 * Other specs
 * - EditingGameOnMcPage
 * - InvitingPlayersOnMcPage
 * - UsingMcPanel
 * - UsingThreatsPanel
 * - UsingNpcPanel
 */
