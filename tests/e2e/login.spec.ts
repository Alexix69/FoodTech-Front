/// <reference types="cypress" />

// Skeleton de pruebas E2E para Login (Cypress + TypeScript)
describe('Login E2E', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('Login exitoso con credenciales válidas', () => {
    cy.get('input[name="email"]').clear().type('testuser@example.com');
    cy.get('input[name="password"]').clear().type('Password123!');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/home');
    // Verificar token en localStorage si aplica
    cy.window().then((win) => {
      const token = win.localStorage.getItem('authToken') || '';
      expect(token).to.not.be.null;
    });
  });

  it('Login con email inválido muestra error', () => {
    cy.get('input[name="email"]').clear().type('not-an-email');
    cy.get('input[name="password"]').clear().type('Password123!');
    cy.get('button[type="submit"]').click();
    cy.contains('Formato de correo').should('exist');
  });

  it('Login con password demasiado corto', () => {
    cy.get('input[name="email"]').clear().type('user@example.com');
    cy.get('input[name="password"]').clear().type('123');
    cy.get('button[type="submit"]').click();
    cy.contains('La contraseña').should('exist');
  });

  it('Login con rememberMe persiste sesión entre recargas', () => {
    cy.get('input[name="email"]').clear().type('testuser@example.com');
    cy.get('input[name="password"]').clear().type('Password123!');
    cy.get('input[name="remember"]').check();
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/home');
    cy.reload();
    cy.url().should('include', '/home');
    cy.window().then((win) => {
      const token = win.localStorage.getItem('authToken');
      expect(token).to.exist;
    });
  });

  it('Login con espacios en email/password se limpia y autentica', () => {
    cy.get('input[name="email"]').clear().type(' testuser@example.com ');
    cy.get('input[name="password"]').clear().type(' Password123! ');
    cy.get('input[name="email"]').should('have.value', 'testuser@example.com');
    cy.get('input[name="password"]').should('have.value', 'Password123!');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/home');
  });
});
