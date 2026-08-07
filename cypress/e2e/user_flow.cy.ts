describe('ASTRO360 OMNI Cypress User Flow & Navigation Spec', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders main dashboard heading correctly', () => {
    cy.contains('h1, h2, h3', /Cosmic|ASTRO360/i).should('be.visible');
  });

  it('allows navigating to Shubh Muhurta Time Engine', () => {
    cy.contains('button', /Shubh Muhurta/i).click();
    cy.contains(/Electional Astrology/i).should('be.visible');
  });

  it('allows switching tabs in Sacred Soundboard', () => {
    cy.contains('button', /Sacred Mantra/i).click();
    cy.contains(/Vedic Gayatris/i).should('be.visible');
  });
});
