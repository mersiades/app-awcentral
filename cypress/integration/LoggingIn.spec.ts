import dave from '../fixtures/users/dave.json';
describe('Logging in as existing user', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/neonkingkong.au.auth0.com/u/login?state*').as(
      'getLoginPage'
    );
    cy.visit('/');
  });

  it('should show LandingPage and navigate to LoginPage', () => {
    cy.get('div[data-testid="landing-page-layout"]').should('exist');
    cy.contains('LOG IN').click();
    cy.wait('@getLoginPage');
    cy.url().should('contain', 'neonkingkong.au.auth0.com');
  });
});
