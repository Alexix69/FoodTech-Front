/// <reference types="cypress" />

// Skeleton de pruebas E2E para Registro (Cypress + TypeScript)
describe('Registro E2E', () => {
  it('Registro exitoso', () => {
    cy.visit('/register')
    cy.get('input[name="email"]').type('nuevo'+Date.now()+"@example.com")
    cy.get('input[name="username"]').type('nuevoUsuario')
    cy.get('input[name="password"]').type('Password123!')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/home')
  })

  it('Registro con email inválido', () => {
    cy.visit('/register')
    cy.get('input[name="email"]').type('not-an-email')
    cy.get('button[type="submit"]').click()
    cy.contains('Formato de correo').should('exist')
  })

  it('Registro con password débil', () => {
    cy.visit('/register')
    cy.get('input[name="email"]').type('prueba@example.com')
    cy.get('input[name="password"]').type('123')
    cy.get('button[type="submit"]').click()
    cy.contains('contraseña').should('exist')
  })

  it('Registro con email duplicado', () => {
    cy.visit('/register')
    cy.get('input[name="email"]').type('existing@example.com')
    cy.get('input[name="username"]').type('usuario')
    cy.get('input[name="password"]').type('Password123!')
    cy.get('button[type="submit"]').click()
    cy.contains('ya existe').should('exist')
  })

  it('Toggle login/registro', () => {
    cy.visit('/login')
    cy.contains('Regístrate').click()
    cy.url().should('include', '/register')
  })
})
