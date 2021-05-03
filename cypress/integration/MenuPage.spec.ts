import react from 'react';
describe('My First Test', () => {
  it('finds the content "type"', () => {
    cy.kcLogout();
    cy.kcLogin('dave');
    cy.visit('/');
  });
});
