/// <reference types="cypress" />
beforeEach(() => {
  cy.visit(Cypress.env('baseUrl'))
})

it('Upload de arquivos', () => {
  const filePath = 'teste.txt'
  cy.fixture(filePath)
    .then(_ => {
      cy.get('[data-cy="cnab"]')
        .attachFile('teste.txt')
        .then(file => {
          return file[0].value
        })
        .should('contains', '.txt')

    })
    
    cy.get('[data-cy="list"]').should('not.exist')
    cy.get('[data-cy="submit-list"]').click()
    cy.get('[data-cy="list"]')
      .should('exist')
      .and('be.visible')
    
})
