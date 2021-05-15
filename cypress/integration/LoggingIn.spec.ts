import dave from '../fixtures/users/dave.json';
describe('Logging in as existing user', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should prevent logging in with bad password', () => {
    cy.get('#username').type(dave.username);
    cy.get('#password').type('wrong-password');
    cy.get('input[name="login"]').click();
    cy.contains('Invalid username or password.').should('exist');
  });

  it('should prevent logging in with bad username', () => {
    cy.get('#username').type('wrong-username');
    cy.get('#password').type(dave.password);
    cy.get('input[name="login"]').click();
    cy.contains('Invalid username or password.').should('exist');
  });
  it('should log an existing user in and then log out', () => {
    cy.get('#username').type(dave.username);
    cy.get('#password').type(dave.password);
    cy.get('input[name="login"]').click();
    cy.contains(`Welcome, ${dave.username}`).should('exist');
    cy.contains('LOG OUT').click();
    cy.get('#kc-header-wrapper').should('include.text', 'AW Central');
  });
});
