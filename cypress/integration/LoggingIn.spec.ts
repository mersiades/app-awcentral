import dave from '../fixtures/users/dave.json';
describe('Logging in as existing user', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should prevent logging in with bad password', () => {
    cy.get('#username').type(dave.username);
    cy.get('#password').type('wrong-password');
    cy.get('input[name="login"]').click();
    expect(cy.contains('Invalid username or password.')).to.exist;
  });

  it('should prevent logging in with bad username', () => {
    cy.get('#username').type('wrong-username');
    cy.get('#password').type(dave.password);
    cy.get('input[name="login"]').click();
    expect(cy.contains('Invalid username or password.')).to.exist;
  });
  it('should log an existing user in', () => {
    cy.get('#username').type(dave.username);
    cy.get('#password').type(dave.password);
    cy.get('input[name="login"]').click();
    expect(cy.contains(`Welcome, ${dave.username}`)).to.exist;
  });
});

export default {};
