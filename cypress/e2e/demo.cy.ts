describe('Demo Test', () => {
  it('lets test', () => {
    cy.visit('/');
    cy.findAllByRole('button', { name: 'Get started' }).should('have.length', 2);
  });
});
