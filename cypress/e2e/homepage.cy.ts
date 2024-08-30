describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('*');
  });

  it('should display the hero section', () => {
    cy.get('h2').should('contain', 'When feature flags');
    cy.get('h2').should('contain', 'meet NextJs');
    cy.get('p').should(
      'contain',
      `Flaggish is a feature flag manager for NextJs`,
    );

    cy.get('button').should('contain', 'npm i @flaggish/sdk');
    cy.contains('npm i @flaggish/sdk').click();
    cy.get('div').should('contain', 'Copied!');
  });

  it('should display the feature section', () => {
    cy.get('h3').should('contain', 'Features');
    cy.get('p').should('contain', 'Create and manage feature flags');
    cy.get('p').should(
      'contain',
      'Create flags for productions and development',
    );
    cy.get('p').should('contain', 'Typescript ready');
    cy.get('p').should(
      'contain',
      'Helper functions for server and client components',
    );

    cy.get('span').should('contain', '# server component');
    cy.get('span').should('contain', '# client component');
  });

  it('should display the pricing section', () => {
    cy.get('h2').should('contain', 'Pricing');
    cy.get('p').should(
      'contain',
      'Choose the plan that best suits your project',
    );

    cy.get('h3').should('contain', 'Free');
    cy.get('span').should('contain', '£0');
    cy.get('span').should('contain', '1 project');
    cy.get('span').should('contain', 'Unlimited flags');
    cy.get('span').should('contain', 'Create and manage flags');
    cy.get('span').should('contain', 'Production and development flags');

    cy.get('h3').should('contain', 'Pro');
    cy.get('span').should('contain', '£10');
    cy.get('span').should('contain', '/ per project');
    cy.get('span').should('contain', 'Multiple projects');
    cy.get('span').should('contain', 'Unlimited flags');
    cy.get('span').should('contain', 'Create and manage flags');
    cy.get('span').should('contain', 'Production and development flags');
  });

  it('should navigate to the correct pages', () => {
    cy.get('a[href*="pricing"]').eq(0).click();
    cy.url().should('contain', '/#pricing');

    cy.get('a[href*="features"]').eq(0).click();
    cy.url().should('contain', '/#features');
  });
});
