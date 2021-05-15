import moment from 'moment';
describe('Registering as a new user', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('Register').click();
  });

  it('should navigate back to log in', () => {
    cy.contains('Back to Login').click();
    cy.get('#kc-header-wrapper').should('include.text', 'AW Central');
  });

  it('should show invalid email message, no blank username message', () => {
    cy.get('#email').type('invalid-email');
    cy.get('#password').type('password');
    cy.get('#password-confirm').type('password');
    cy.get('#kc-form-buttons').click();
    cy.get('.kc-feedback-text')
      .should('include.text', 'Please specify username.')
      .should('include.text', 'Invalid email address.');
  });
  it('should register a new user and log in to MainMenu', () => {
    const timestamp = moment.now().toString();
    const uniqueEmail = `${timestamp}@email.com`;
    const uniqueUsername = `${timestamp}_user`;
    cy.get('#username').type(uniqueUsername);
    cy.get('#email').type(uniqueEmail);
    cy.get('#password').type('password');
    cy.get('#password-confirm').type('password');
    cy.get('#kc-form-buttons').click();
    cy.contains(`Welcome, ${uniqueUsername}`).should('exist');
  });
});
