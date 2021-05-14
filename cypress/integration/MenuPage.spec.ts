import game_withMcOnly from '../fixtures/queries/game/game_withMCOnly';
import game_withMC_1Player from '../fixtures/queries/game/game_withMC_1Player';
import gameRolesByUserId_0GameRoles from '../fixtures/queries/gameRolesByUserId/gameRolesByUserId_0GameRoles';
import gameRolesByUserId_1McGameRole from '../fixtures/queries/gameRolesByUserId/gameRolesByUserId_1McGameRole';
import gameRolesByUserId_1McGameRole_1PlayerGameRole from '../fixtures/queries/gameRolesByUserId/gameRolesByUserId_1McGameRole_1PlayerGameRole';
import gamesForInvitee_0Invites from '../fixtures/queries/gamesForInvitee/gamesForInvitee_0Invites';
import gamesForInvitee_1Invite1 from '../fixtures/queries/gamesForInvitee/gamesForInvitee_1Invite';
import mockMcContentQueryResponse from '../fixtures/queries/mcContent/mcContent_completeResponse';

describe('Testing MenuPage', () => {
  beforeEach(() => {
    cy.readFile('./introspection.schema.graphql').then((schema) => {
      cy.mockNetwork({
        schema,
        mocks: {
          Query: () => ({
            mcContent: () => mockMcContentQueryResponse,
          }),
        },
      });
    });
    cy.kcLogout();
    cy.kcLogin('dave');
    cy.visit('/');
  });

  context('with 0 games, 0 invitations', () => {
    beforeEach(() => {
      cy.mockNetworkAdd({
        Query: () => ({
          gameRolesByUserId: () => gameRolesByUserId_0GameRoles,
          gamesForInvitee: () => gamesForInvitee_0Invites,
        }),
      });
    });
    it.skip('should NOT render RETURN TO GAME', () => {
      cy.contains('RETURN').should('not.exist');
    });

    it.skip('should log out', () => {
      cy.contains('LOG OUT').click();
      cy.url().should('include', 'auth/realms/awc-realm/protocol/openid-connect/auth');
    });
    it.skip('should show no invitations', () => {
      cy.contains('JOIN GAME').click();
      cy.contains('No invitations yet').should('exist');
    });

    it.skip('should initialize a game as MC and navigate to CreateGamePage', () => {
      const mockGameName = 'mock-game-name';
      cy.contains('CREATE GAME').click();

      cy.focused().should('have.attr', 'name', 'name').type(mockGameName).should('have.value', mockGameName);

      cy.contains('SUBMIT').click();

      cy.url().should('contain', 'create-game');
    });
  });

  context('with 1 MC game, 0 invitations', () => {
    beforeEach(() => {
      cy.mockNetworkAdd({
        Query: () => ({
          gameRolesByUserId: () => gameRolesByUserId_1McGameRole,
          game: () => game_withMcOnly,
        }),
      });
    });

    it.skip('should navigate to game as MC', () => {
      cy.contains('RETURN TO GAME').click();
      cy.contains(gameRolesByUserId_1McGameRole[0].gameName).should('exist');
      cy.contains('li', gameRolesByUserId_1McGameRole[0].gameName).click();
      cy.url().should('contain', `mc-game/${game_withMcOnly.id}`);
    });
  });

  context('with 1 MC game, 1 player game, 0 invitations', () => {
    beforeEach(() => {
      cy.mockNetworkAdd({
        Query: () => ({
          gameRolesByUserId: () => gameRolesByUserId_1McGameRole_1PlayerGameRole,
          game: () => game_withMC_1Player,
        }),
      });
    });

    it.skip('should navigate to game as Player', () => {
      cy.contains('RETURN TO GAME').click();
      cy.contains(gameRolesByUserId_1McGameRole_1PlayerGameRole[0].gameName).should('exist');
      cy.contains(gameRolesByUserId_1McGameRole_1PlayerGameRole[1].gameName).should('exist');
      cy.contains('li', gameRolesByUserId_1McGameRole_1PlayerGameRole[1].gameName).click();
      cy.url().should('contain', `character-creation/${game_withMC_1Player.id}`);
    });
  });

  context('with 0 game, 1 invitation', () => {
    beforeEach(() => {
      cy.mockNetworkAdd({
        Query: () => ({
          gameRolesByUserId: () => gameRolesByUserId_0GameRoles,
          gamesForInvitee: () => gamesForInvitee_1Invite1,
          game: () => game_withMC_1Player,
        }),
      });
    });

    it.skip('should accept invitation and join game', () => {
      cy.contains('JOIN GAME').click();
      cy.contains('JOIN').click();
      cy.url().should('contain', `character-creation/${game_withMC_1Player.id}`);
    });
  });
});
