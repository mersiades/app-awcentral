import {
  ADD_TEXT,
  FINISH_TEXT,
  NO_MC_AS_PLAYER_TEXT,
} from '../../src/config/constants';
import game4 from '../fixtures/games/game4';
import game5 from '../fixtures/games/game5';
import dave from '../fixtures/users/dave';

describe('Creating a Game as MC', () => {
  // Importing these objects are coming out as undefined for some reason,
  // so re-creating here
  const emailJohn = 'john@email.com';
  const emailMaya = 'maya@email.com';
  const emailAhmad = 'ahmad@email.com';

  beforeEach(() => {
    cy.kcLogout();
    cy.kcLogin('dave');
    cy.visit('/');
  });

  context('with 3 players, no comms app or url', () => {
    it('should create game, add 2 invitations and navigate to McPage', () => {
      cy.contains('CREATE GAME').click();
      cy.contains('CREATE GAME').should('exist');
      cy.contains('Create a game with you as the MC').should('exist');
      cy.contains('button', 'SUBMIT').should('be.disabled');
      cy.get('input').type(game4.name);
      cy.contains('button', 'SUBMIT').should('not.be.disabled');
      cy.contains('button', 'SUBMIT').click();
      cy.url().should('contain', 'create-game');
      cy.get('div[data-testid="name-box"]')
        .should('include.text', 'Name')
        .should('include.text', game4.name);
      cy.contains('LATER').click();
      cy.contains('INVITE PLAYERS').should('exist');
      cy.get('input').type(emailJohn);
      cy.contains('ADD').click();
      // Check the copiable invitation has correct text
      cy.get('textarea').then((textarea) => {
        expect(textarea[0].value).to.contain(
          'Hi. Please join our Apocalypse World game on AW Central.'
        );
        expect(textarea[0].value).to.contain('join-game');
        expect(textarea[0].value).to.contain(emailJohn);
        expect(textarea[0].value).to.contain(game4.name);
      });
      cy.get('div[data-testid="invitations-box"]')
        .should('include.text', 'Invitations')
        .should('include.text', emailJohn);

      cy.contains('INVITE ANOTHER').click();
      cy.get('input').type(emailMaya);
      cy.contains('ADD').click();
      // Check the copiable invitation has correct text
      cy.get('textarea').then((textarea) => {
        expect(textarea[0].value).to.contain(emailMaya);
      });
      cy.get('div[data-testid="invitations-box"]')
        .should('include.text', 'Invitations')
        .should('include.text', emailJohn)
        .should('include.text', emailMaya);

      cy.contains('INVITE ANOTHER').click();
      cy.get('input').type(emailAhmad);
      cy.contains('ADD').click();
      // Check the copiable invitation has correct text
      cy.get('textarea').then((textarea) => {
        expect(textarea[0].value).to.contain(emailAhmad);
      });
      cy.get('div[data-testid="invitations-box"]')
        .should('include.text', 'Invitations')
        .should('include.text', emailJohn)
        .should('include.text', emailMaya)
        .should('include.text', emailAhmad);

      cy.contains('FINISH').click();
      cy.url().should('contain', 'mc-game');
      cy.contains(game4.name).should('exist');
      cy.contains('Players').should('exist');
      cy.contains('No players yet').should('exist');
      cy.get('div[data-testid="invitations-box"]')
        .should('include.text', emailJohn)
        .should('include.text', emailMaya)
        .should('include.text', emailAhmad);
    });
  });

  context('with 1 player, comms app and url', () => {
    it('should create game, add 1 invitations, comms app and url, and navigate to McPage', () => {
      cy.contains('CREATE GAME').click();
      cy.get('input').type(game5.name);
      cy.contains('SUBMIT').click();
      cy.get('input[aria-label="comms-app-input"]').click();
      cy.contains('Zoom').click();
      cy.get('button[data-testid="set-app-button"]').click();
      cy.get('div[data-testid="channel-box"]')
        .should('contain', 'Channel')
        .should('contain', game5.commsApp);
      cy.get('textarea[aria-label="comms-url-input"]').type(game5.commsUrl);
      cy.get('button[data-testid="set-url-button"]').click();
      cy.get('div[data-testid="channel-box"]').should('contain', 'Channel');
      cy.get('div[data-testid="channel-box"]').should(
        'contain',
        game5.commsApp
      );
      cy.get('div[data-testid="channel-box"]').should(
        'contain',
        game5.commsUrl
      );

      // Check MC can't invite themselves as a player
      cy.get('input').type('dave@email.com');
      cy.contains(ADD_TEXT).click();
      cy.contains(NO_MC_AS_PLAYER_TEXT).should('be.visible');
      cy.contains(ADD_TEXT).should('be.disabled');
      cy.get('input').type('{selectall}');
      cy.contains(ADD_TEXT).should('not.be.disabled');
      cy.get('input').type('{backspace}');

      // Check can invite a player
      cy.get('input').type(emailJohn);
      cy.contains(ADD_TEXT).click();
      cy.contains(FINISH_TEXT).click();
      cy.url().should('contain', 'mc-game');
      cy.contains(game5.name).should('exist');
    });
  });
});

export default {};
