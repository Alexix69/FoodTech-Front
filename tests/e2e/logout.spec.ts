/// <reference types="cypress" />

// Skeleton de pruebas E2E para Logout (Cypress + TypeScript)
describe('Logout E2E', () => {
  // Helper sencillo para login rápido
  const login = () => {
    cy.visit('/login')
    cy.get('input[name="email"]').clear().type('testuser@example.com')
    cy.get('input[name="password"]').clear().type('Password123!')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/home')
  }

  it('Logout exitoso', () => {
    login()
    cy.contains('Cerrar Sesión').click()
    cy.url().should('include', '/login')
  })

  it('Logout tras expiración de sesión', () => {
    login()
    // Simular expiración de sesión borrando token
    cy.window().then((win) => {
      win.localStorage.removeItem('authToken')
    })
    cy.reload()
    cy.contains('Cerrar Sesión').click({ force: true })
    cy.url().should('include', '/login')
  })

  it('Logout desde no autenticado redirige a login', () => {
    cy.visit('/home')
    cy.contains('Cerrar Sesión').click({ force: true })
    cy.url().should('include', '/login')
  })

  it('Logout redirige a login tras logout', () => {
    login()
    cy.contains('Cerrar Sesión').click()
    cy.url().should('include', '/login')
  })
})
