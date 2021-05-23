// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-keycloak-commands';
import { PlaybookType } from '../../src/@types/enums';
import {
  ADD_TEXT,
  LOOKS_TITLE,
  NAME_TITLE,
  NEW_GAME_TEXT,
  NEXT_TEXT,
  PLAYBOOK_TITLE,
  SET_TEXT,
} from '../../src/config/constants';
import { decapitalize } from '../../src/helpers/decapitalize';

const query = `
mutation ResetDb {
  resetDb {
    id
    successMessage
    errorMessage
  }
}
`;

Cypress.Commands.add('getToken', () => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('KEYCLOAK_HOST')}/auth/realms/${Cypress.env('KEYCLOAK_REALM')}/protocol/openid-connect/token`,
    form: true,
    body: {
      client_id: 'cypress-awcentral',
      grant_type: 'password',
      client_secret: Cypress.env('KEYCLOAK_CLIENT_SECRET'),
      scope: 'openid',
      username: 'cypress-test',
      password: Cypress.env('KEYCLOAK_USER_PW'),
    },
  }).then((response) => {
    Cypress.env('access_token', response?.body.access_token);
  });
});

Cypress.Commands.add('resetDb', () => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('GRAPHQL_HOST')}/graphql`,
    body: { query },
    headers: {
      Authorization: `Bearer ${Cypress.env('access_token')}`,
    },
  }).then(({ body }) => {
    if (body.data.resetDb.errorMessage) {
      throw new Error(body.data.resetDb.errorMessage);
    }

    if (body.data.resetDb.successMessage) {
      console.info('Test database has been reset');
    }
    // cy.wait(1000);
  });
});

Cypress.Commands.add('moveThroughNewGameIntro', () => {
  // Check form content
  cy.contains(NEW_GAME_TEXT).should('exist');

  // Check CharacterCreationStepper
  cy.get('div[data-testid="playbook-box"]').should('contain', PLAYBOOK_TITLE).should('contain', '...');

  // Go to next
  cy.contains(NEXT_TEXT, { timeout: 20000 }).click();
});

Cypress.Commands.add('selectPlaybook', (playbookType: PlaybookType) => {
  // Check form content
  cy.get(`div[data-testid="${playbookType.toLowerCase()}-button"]`, { timeout: 20000 }).click();
  cy.contains(`SELECT ${decapitalize(playbookType)}`).click();
});

Cypress.Commands.add('setCharacterName', (name: string) => {
  // Check form content
  cy.get('input[aria-label="name-input"]').as('nameInput');

  // Check form functionality
  cy.contains(name).click();

  // Submit form
  cy.contains(SET_TEXT).click();
});

Cypress.Commands.add(
  'completeLooksForm',
  (nameUC: string, name: string, gender: string, clothes: string, face: string, eyes: string, body: string) => {
    // Check form content
    cy.contains(`WHAT DOES ${nameUC} LOOK LIKE?`).should('exist');

    // Check CharacterCreationStepper
    cy.get('div[data-testid="name-box"]').should('contain', NAME_TITLE).should('contain', name);

    // Check form functionality
    cy.contains(gender).click();
    cy.get('div[data-testid="looks-box"]').should('contain', LOOKS_TITLE).should('contain', gender);

    cy.contains(clothes).click();
    cy.get('div[data-testid="looks-box"]').should('contain', clothes);

    cy.contains(face).click();
    cy.get('div[data-testid="looks-box"]').should('contain', face);

    cy.contains(eyes).click();
    cy.get('div[data-testid="looks-box"]').should('contain', eyes);

    cy.contains(body).click();
    cy.get('div[data-testid="looks-box"]').should('contain', body);

    // Should automatically progress
  }
);

Cypress.Commands.add('setCharacterStat', (nameUC: string) => {
  // Check form content
  cy.contains(`WHAT ARE ${nameUC}'S STRENGTHS AND WEAKNESSES`).should('exist');

  // Check form functionality
  cy.get('div[data-testid="stats-option-box-1"]').click();

  // Submit form
  cy.contains(SET_TEXT).click();
});

Cypress.Commands.add('completeGearForm', (nameUC: string, clothes: string, items: string[]) => {
  // Check form content
  cy.contains(`WHAT IS ${nameUC}'S GEAR`).should('exist');
  cy.contains(ADD_TEXT).as('addButton');
  cy.get('ul[aria-label="interim-gear-list"]').as('interimGearList');
  cy.get('textarea[aria-label="item-input"]').as('itemInput');

  // Check form functionality
  cy.get('@itemInput').type(clothes);

  cy.get('@addButton').click();
  cy.get('@interimGearList').should('contain', clothes);

  items.forEach((item) => {
    cy.contains(item).click();
    cy.get('@addButton').click();
    cy.get('@interimGearList').should('contain', item);
  });

  // Submit form
  cy.contains(SET_TEXT).click();
});

Cypress.Commands.add('setVehicleOptions', (option1: string, option2: string, option3: string, targetBox: string) => {
  cy.get(`div[data-testid="${targetBox}-tags-box"]`).as(`${targetBox}Box`);
  cy.get(`div[data-testid="${option1}-option-pill"]`).as(`${option1}Option`);
  cy.get(`div[data-testid="${option2}-option-pill"]`).as(`${option2}Option`);
  cy.get(`div[data-testid="${option3}-option-pill"]`).as(`${option3}Option`);

  cy.get(`@${option1}Option`).click();
  cy.get(`@${targetBox}Box`).should('contain', option1);

  cy.get(`@${option2}Option`).click();
  cy.get(`@${targetBox}Box`).should('contain', option1);
  cy.get(`@${targetBox}Box`).should('contain', option2);

  cy.get(`@${option3}Option`).click();
  cy.get(`@${targetBox}Box`).should('contain', option1);
  cy.get(`@${targetBox}Box`).should('contain', option2);
  cy.get(`@${targetBox}Box`).should('not.contain', option3);

  cy.get(`@${option2}Option`).click();
  cy.get(`@${targetBox}Box`).should('contain', option1);
  cy.get(`@${targetBox}Box`).should('not.contain', option2);
  cy.get(`@${targetBox}Box`).should('not.contain', option3);

  cy.get(`@${option3}Option`).click();
  cy.get(`@${targetBox}Box`).should('contain', option1);
  cy.get(`@${targetBox}Box`).should('not.contain', option2);
  cy.get(`@${targetBox}Box`).should('contain', option3);
});

Cypress.Commands.add('deleteKeycloakUser', (email: string) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('KEYCLOAK_HOST')}/auth/admin/realms/${Cypress.env('KEYCLOAK_REALM')}/users?email=${email}`,
    headers: {
      Authorization: `Bearer ${Cypress.env('access_token')}`,
    },
  }).then(({ body }) => {
    const userId = body[0].id;
    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('KEYCLOAK_HOST')}/auth/admin/realms/${Cypress.env('KEYCLOAK_REALM')}/users/${userId}`,
      headers: {
        Authorization: `Bearer ${Cypress.env('access_token')}`,
      },
    });
  });
});

Cypress.Commands.add('openPlaybookPanel', () => {
  cy.get('div[role="tablist"]').within(() => {
    cy.contains('Playbook').click();
  });
});
