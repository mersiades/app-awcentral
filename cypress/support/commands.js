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
    cy.wait(1000);
  });
});
