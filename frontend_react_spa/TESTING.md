# Testing Guide

This project uses Jest and React Testing Library (via Create React App) for unit and integration tests. Accessibility checks are done with `jest-axe`.

## Install dependencies

npm install

## Run tests (CI mode)

# Non-interactive, single run
CI=true npm test -- --watchAll=false

## Watch mode (local development)

npm run test:watch

## Coverage report

npm run test:coverage

Coverage results are printed in the console and saved to the `coverage/` directory.

## Test locations

All tests live under `__tests__/`:
- app.test.js: App rendering and theme toggle
- routing.test.js: Route placeholders rendering
- data-handling.test.js: Data fetching widget with success/error states
- error-boundary.test.js: Error boundary fallback behavior
- a11y-home.test.js: Accessibility check with `jest-axe` on the Home route

## Notes

- Tests do not rely on external services. Fetch calls are mocked.
- If you later add `react-router`, you can replace the `RoutesPlaceholder` with actual routes and adjust tests accordingly.
