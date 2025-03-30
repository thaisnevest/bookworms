import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

Given("I'm on the group page", () => {
  cy.visit('http://localhost:3000/Login')
  cy.get('input[name="emailORusername"]').type('gvnna')
  cy.get('input[name="password"]').type('123123kk')
  cy.get('button').click()
  cy.get('img[alt="WormBig"]', { timeout: 10000 }).should('exist')
  cy.get('[data-sidebar="menu-item"]').eq(1).click()
})

When("I select a user from the filter dropdown", () => {
  cy.get('[data-testid="posts-container"]').should('exist')
  cy.contains('[data-testid="posts-container"]', 'by', {timeout:150000}).should('exist')
  cy.get('[data-testid="filter"] button[role="combobox"]').click();
  cy.get('[data-testid="filter"] button[data-state="open"]').should('exist');
  cy.get('[role="option"]').contains('gio', { timeout: 10000 })
  .should('be.visible')
  .click();
}
)

Then("I should see only posts from that user", () => {
  cy.get('[data-testid="posts-container"]').should('exist');
  
  // Verifica se TODOS os buttons dentro do container têm "by gio"
  cy.get('[data-testid="posts-container"] button').each(($button) => {
    cy.wrap($button).should('contain.text', 'by gio');
  });
});
