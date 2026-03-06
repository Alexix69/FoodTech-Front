// Cypress E2E Support - Mocks for API calls
// Allows E2E tests to run without backend

beforeEach(() => {
  // Mock login
  cy.intercept('POST', '/api/auth/login', {
    statusCode: 200,
    body: { success: true, token: 'mock-token', user: { id: 1, email: 'user@example.com', role: 'mesero' } }
  }).as('login')

  // Mock register
  cy.intercept('POST', '/api/auth/register', {
    statusCode: 201,
    body: { success: true, user: { id: 1 } }
  })

  // Mock auth check
  cy.intercept('GET', '/api/auth/me', {
    statusCode: 200,
    body: { id: 1, email: 'user@example.com', role: 'mesero' }
  })

  // Mock logout
  cy.intercept('POST', '/api/auth/logout', { statusCode: 200, body: { success: true } })

  // Mock menu
  cy.intercept('GET', '/api/menu', { statusCode: 200, body: [] })

  // Mock orders
  cy.intercept('GET', '/api/orders*', { statusCode: 200, body: [] })
  cy.intercept('POST', '/api/orders', { statusCode: 201, body: { success: true, orderId: 1 } })
})
