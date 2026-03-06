import '../../src/cypress.d.ts'

declare global {
  namespace Cypress {
    interface Chainable {
      mockApiCalls(): Chainable<void>
    }
  }
}

Cypress.Commands.add('mockApiCalls', () => {
  cy.intercept('POST', '/api/auth/login', {
    statusCode: 200,
    body: {
      success: true,
      token: 'mock-token-12345',
      user: {
        id: 1,
        email: 'user@example.com',
        username: 'testuser',
        role: 'mesero'
      }
    }
  }).as('loginRequest')

  cy.intercept('POST', '/api/auth/register', {
    statusCode: 201,
    body: {
      success: true,
      message: 'Usuario registrado correctamente',
      user: {
        id: 1,
        email: 'test@example.com',
        username: 'testuser'
      }
    }
  }).as('registerRequest')

  cy.intercept('GET', '/api/auth/me', {
    statusCode: 200,
    body: {
      id: 1,
      email: 'user@example.com',
      username: 'testuser',
      role: 'mesero'
    }
  }).as('getMe')

  cy.intercept('POST', '/api/auth/logout', {
    statusCode: 200,
    body: { success: true }
  }).as('logoutRequest')

  cy.intercept('GET', '/api/menu', {
    statusCode: 200,
    body: []
  }).as('getMenu')

  cy.intercept('GET', '/api/orders*', {
    statusCode: 200,
    body: []
  }).as('getOrders')

  cy.intercept('POST', '/api/orders', {
    statusCode: 201,
    body: { success: true, orderId: 1 }
  }).as('createOrder')
})

beforeEach(() => {
  cy.mockApiCalls()
})
