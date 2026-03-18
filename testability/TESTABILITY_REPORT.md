# Testability Report

## 1. Changes Applied
- Added stable data-testid attributes to key inputs, buttons, toggles, filters, and state containers.
- Added an observable DOM message for WaiterView alerts while preserving browser alerts.
- Documented auth token storage and demo token usage in code comments.
- Documented register response handling limitation in code comments.

## 2. data-testid Added (by module)

### LoginView
- login-form
- email-input
- username-input
- password-input
- remember-me-checkbox
- demo-mode-checkbox
- submit-btn
- toggle-mode-btn
- error-message

### Navigation + Logout
- nav-mesero
- nav-barra
- nav-cocina-caliente
- nav-cocina-fria
- logout-btn

### CategoryFilter (Waiter)
- category-filter-all
- category-filter-drink
- category-filter-hot-dish
- category-filter-cold-dish

### TaskStatusFilter (Kitchen)
- task-status-filter-all
- task-status-filter-pending
- task-status-filter-in-preparation
- task-status-filter-completed

### Completed Orders
- completed-orders-toggle
- completed-orders-overlay
- completed-orders-modal
- completed-orders-close-btn
- completed-orders-loading
- completed-orders-error
- completed-orders-empty
- completed-orders-list
- completed-order-card-{id}
- customer-name-input-{id}
- customer-name-error-{id}
- invoice-btn-{id}
- completed-orders-toast

### WaiterView (Alerts)
- order-feedback (with data-feedback-type: info|success|error)

### Station Views
- hot-kitchen-error
- hot-kitchen-loading
- bar-error
- bar-loading
- cold-kitchen-error
- cold-kitchen-loading

## 3. Known Issues (Documented, Not Changed)
- authService.register() does not validate response.ok. This can mask backend errors and cause non-deterministic register outcomes. Documented to avoid behavior change.

## 4. Remaining Automation Risks
- Real login and register flows depend on backend data and availability.
- Browser alerts still require automation handling (switchTo().alert()) even though a DOM message is now present.
- Dynamic content (orders, tasks) depends on API state and timing.

## 5. Recommendations
- Consider adding dedicated test endpoints or seeded test data for auth and orders.
- Replace alert() with a non-blocking UI component in the future (if UX changes are allowed).
- Add data-testid to any new interactive elements as they are introduced.
