# Assignment 3: UI Design Artifacts and Implementation Guide (frontend_react_spa)

## Overview

This document delivers wireframe-level UI mockups, interaction flows, accessibility checklist, user testing plan, implementation guidance mapped to the current React components and tests, user documentation outline, and test traceability. It is tailored to the existing Single Page Application under modular-authentication-and-management-system-189400-189409/frontend_react_spa and adheres to the Ocean Professional style theme.

- Target app: React SPA (Create React App) with current components: App (theme toggle), RoutesPlaceholder, ErrorBoundary, DataWidget
- Current tests: app.test.js, routing.test.js, data-handling.test.js, error-boundary.test.js, a11y-home.test.js
- Environment variables (from .env list provided): REACT_APP_API_BASE, REACT_APP_BACKEND_URL, REACT_APP_FRONTEND_URL, REACT_APP_WS_URL, REACT_APP_NODE_ENV, REACT_APP_NEXT_TELEMETRY_DISABLED, REACT_APP_ENABLE_SOURCE_MAPS, REACT_APP_PORT, REACT_APP_TRUST_PROXY, REACT_APP_LOG_LEVEL, REACT_APP_HEALTHCHECK_PATH, REACT_APP_FEATURE_FLAGS, REACT_APP_EXPERIMENTS_ENABLED
- Style guide: Ocean Professional (primary #2563EB, secondary/success #F59E0B, error #EF4444, background #f9fafb, surface #ffffff, text #111827)

## 1) UI Mockups (Wireframe/Low-Fidelity Annotated)

Notes on style application:
- Typography: Sans-serif (system UI), headings bold with #111827, body text #111827 with 90% opacity for secondary text.
- Colors: Primary accents #2563EB (buttons, active states), Secondary/Success #F59E0B (notifications badge, positive toasts), Error #EF4444 (errors).
- Surfaces: background #f9fafb, cards/surfaces #ffffff with subtle shadow and 8px radius.
- Layout: Responsive sidebar (collapsible), top app bar with global search field and notifications icon, main content, auth modal.

Global layout regions:
- Top App Bar: App title/logo (left), search input, notification bell (with badge), user avatar/menu (right)
- Sidebar: Sections (Home, Dashboard, Entities, Admin) collapsible on narrow viewports
- Main: Route-driven content
- Modal: Auth modal overlays when needed

### 1.1 Home

ASCII wireframe:
```
+----------------------------------------------------------------------------------+
| [Logo] AppName                        [Search...........] [🔔•3] [User ⌄]        |
+--------+--------------------------------------------------------------------------+
| ▣ Home |                                                                      ↑  |
| ▣ Dash |              Welcome to AppName                                       |  |
| ▣ Ents |  [Get Started] [View Dashboard]                                       |  |
| ▣ Admin|  Quick links: Recent items | Notifications | Help                     |  |
|        |                                                                      ↓  |
+--------+--------------------------------------------------------------------------+
```
Annotations:
- Hierarchy: Title and CTAs centered in main panel. Sidebar highlights Home.
- Color cues: Primary buttons in #2563EB, secondary links in #2563EB text with underline on hover.
- Responsive: Sidebar collapses to icon-only; CTAs stack vertically.

### 1.2 Login (Auth Modal)

ASCII wireframe:
```
[Dimmed App]
+-----------------------------------+
| Sign In                           |
|                                   |
| Email [________________________]  |
| Password [____________________]   |
| [ ] Remember me                   |
| [ Sign in ]      [ Use SSO ]      |
| Forgot password?                  |
+-----------------------------------+
```
Annotations:
- Auth modal overlays current route; focus is trapped within the modal.
- Buttons: Primary Sign in (#2563EB), Secondary SSO (#F59E0B border or ghost).
- Error messages shown inline below fields in #EF4444.

### 1.3 Dashboard (Role-aware placeholders)

ASCII wireframe:
```
+----------------------------------------------------------------------------------+
| [Logo] AppName   [Search...] [🔔•2] [User ⌄]                                     |
+--------+--------------------------------------------------------------------------+
| ▣ Home |  Dashboard                                                              |
| ▣ Dash |  [My Tasks]  [Recent Activity]  [System Status]                         |
| ▣ Ents |  - Widget cards (3 columns, responsive)                                 |
| ▣ Admin|  Role-aware tiles:                                                      |
|        |   - If Admin: "Admin Overview" tile appears                             |
|        |   - If User: "My Entities" tile                                         |
+--------+--------------------------------------------------------------------------+
```
Annotations:
- Uses DataWidget cards to demo API data (status, counts).
- Placeholder role gates: Show admin tiles conditionally (future RBAC).

### 1.4 Notifications Center

ASCII wireframe:
```
+----------------------------------------------------------------------------------+
| [Logo] ... [Search...] [🔔•5] [User ⌄]                                            |
+--------+--------------------------------------------------------------------------+
| ...    |  Notifications Center                                                    |
|        |  Filters: [All v] [Unread] [System] [Mentions] [Clear all]               |
|        |  List:                                                                   
|        |  - [Unread] Title — summary... [time] [Mark read]                        |
|        |  - [Read ] Title — summary... [time] [Restore]                           |
|        |  Empty state: "You're all caught up!"                                    |
+--------+--------------------------------------------------------------------------+
```
Annotations:
- Live region used for incoming toasts.
- List items accessible with buttons for actions; states indicated by icons and aria-pressed.

### 1.5 Admin Dashboard (Overview table)

ASCII wireframe:
```
+----------------------------------------------------------------------------------+
| ...                                                                              |
+--------+--------------------------------------------------------------------------+
| ...    |  Admin Dashboard                                                         |
|        |  System Overview                                                         |
|        |  [Users] [Roles] [Audit] [Settings]                                      |
|        |  Table:                                                                  |
|        |  | Entity   | Count | Status | Actions |                                 |
|        |  | Users    |  152  |  OK    | [View]  |                                 |
|        |  | Roles    |   8   |  OK    | [View]  |                                 |
|        |  Pagination ◀ 1 2 3 ▶                                                   |
+--------+--------------------------------------------------------------------------+
```
Annotations:
- Table header with column scope; row actions via buttons.
- Sticky header on scroll; keyboard-accessible pagination.

### 1.6 Global Search Overlay

ASCII wireframe:
```
[Dimmed App]
+-------------------------------------------+
| 🔎 Search all... [____________________]   |
|                                           |
| Results:                                  |
| - Entities (3)                            |
|    • Customer: Jane Doe                   |
|    • Order: 12345                         |
| - Admin (1)                               |
|    • Role: Editor                         |
| [View all results]                        |
+-------------------------------------------+
```
Annotations:
- Invoked via keyboard shortcut (e.g., / or Ctrl+K).
- Results grouped by type with arrow-key navigation and Enter to go to detail.

### 1.7 Generic Entity CRUD Form

ASCII wireframe:
```
+----------------------------------------------------------------------------------+
| ...                                                                              |
+--------+--------------------------------------------------------------------------+
| ...    |  Create Entity                                                          |
|        |  Name * [________________________]                                      |
|        |  Type * [Select v]                                                      |
|        |  Description [____________________]                                     |
|        |  Status  ( ) Active  ( ) Disabled                                      |
|        |  [ Save ]    [ Cancel ]                                                 |
|        |  Validation errors shown under fields                                   |
+--------+--------------------------------------------------------------------------+
```
Annotations:
- Required fields marked with asterisks and aria-required.
- Validation hints appear in red with aria-describedby linking.

## 2) Interaction Flows (Diagram Descriptions + Steps)

Conventions: Include loading, error, and empty states; align with current DataWidget and ErrorBoundary behaviors.

### 2.1 Sign-in (SSO/local placeholder)

Flow:
1. User selects Sign in (from Home or top bar user menu).
2. Auth modal opens; focus moves to Email field; background inert.
3. User enters credentials and clicks Sign in.
4. Show loading state on button (aria-busy on form).
5. Success: Modal closes, route changes to Dashboard; focus moves to main heading.
6. Failure: Error message appears under Password; announce via aria-live=assertive.

Error/Empty states:
- Invalid credentials → inline error
- Network failure → banner alert role=alert
- SSO unavailable → disable SSO button with tooltip

### 2.2 Navigate to Dashboard

Flow:
1. From Home, click “View Dashboard” CTA or select Dashboard in sidebar.
2. Sidebar highlights Dashboard; main heading “Dashboard” is focused programmatically.
3. Widgets request data (DataWidget). Show Loading… indicators.
4. On success, render data; on failure, show error alert with retry.

Loading/Errors:
- DataWidget shows aria-busy then either data JSON or role=alert Error message.

### 2.3 Create Entity (Form validation)

Flow:
1. From Entities list, click “Create”.
2. Form loads; initial focus on “Name”.
3. Client validation on blur/submit for required fields.
4. Submit → loading state; POST to mock API.
5. Success → toast “Entity created”; redirect to detail; focus on <h1>.
6. Failure → inline field errors; banner alert for server error.

Empty/Error states:
- Empty select options show helper text.
- Server 400 returns field-level messages.
- Network down shows retry CTA.

### 2.4 Search to Detail View

Flow:
1. Trigger global search overlay (keyboard or click).
2. Type query; show loading spinner while fetching mock results.
3. Results grouped; arrow keys select; Enter navigates.
4. On navigate, overlay closes; detail page loads with loading skeleton.
5. Error: overlay shows error banner; detail route catches via ErrorBoundary fallback if component throws.

## 3) Accessibility Features & Checklist

Mapping to style tokens and components:

- Color contrast: Ensure text on background (#111827 on #ffffff/#f9fafb) meets WCAG AA. Primary button (#2563EB) on white with white text needs 4.5:1; keep button text #ffffff and ensure button background stays #2563EB with sufficient shade. Error text #EF4444 on white for icons; for text, consider darker shade or place on subtle surface with contrast ratio verified.
- Focus management: On route change, move focus to main <h1>. Trap focus in modals. Return focus to invoker on close.
- Keyboard order: Top bar (logo → search → notifications → user), then sidebar, then main content. Skip link goes to main.
- ARIA roles/landmarks: header, nav, main, aside (if used), footer; role=dialog for modal with aria-modal=true and labelledby.
- Skip-to-content: Visible on focus link at top.
- Forms: Each input has label; errors with aria-describedby; required fields with aria-required.
- Live regions: Toasts and notifications updates via aria-live=polite; error banners assertive.
- Prefers-reduced-motion: Respect in CSS by disabling non-essential animations (e.g., App-logo).

Prioritized checklist and acceptance criteria:

1. Keyboard operability
   - Criteria: All interactive elements focusable with Tab/Shift+Tab; Enter/Space activate; visible focus ring.
   - Acceptance: Manual keyboard traversal on Home, Login, Dashboard passes without traps.

2. Focus management on routing
   - Criteria: After route/render change, focus is programmatically set to main heading.
   - Acceptance: Automated test asserts document.activeElement is the <h1> of the new route.

3. Modal accessibility
   - Criteria: role=dialog, aria-modal, labelledby; focus trapped; ESC closes; restore focus to invoker.
   - Acceptance: Manual test plus integration test for focus behavior.

4. Color contrast
   - Criteria: AA for text and interactive controls; emergency check via axe shows no contrast violations on Home.
   - Acceptance: jest-axe test passes (already included for Home).

5. Forms semantics
   - Criteria: Inputs have labels; errors described and announced; required fields indicated.
   - Acceptance: Form submission test asserts aria-invalid, associated error text, and announcement.

6. Skip link
   - Criteria: Skip to main content link present and visible on focus.
   - Acceptance: Keyboard test triggers link and verifies focus on main.

7. Reduced motion
   - Criteria: Honors prefers-reduced-motion; removes logo spin.
   - Acceptance: CSS contains media query; visual QA.

## 4) User Testing Plan

- Participants: 5–7 internal users across roles (1–2 admin-like, 3–5 standard). Accessibility: include at least one keyboard-only user and one screen reader user if possible.
- Scenarios/Tasks:
  1) Sign in with email/password; observe loading; handle an incorrect password then success.
  2) Find a record: use global search to locate "Order 12345" and open details.
  3) Create an entity: open create form, complete required fields, submit; handle validation errors, confirm success.
  4) Review notifications: open Notifications Center, filter Unread, mark one as read.
- Success criteria: Task completion without assistance; correct end state achieved; no critical usability errors.
- Metrics: Task success (binary), time-on-task, error rate, SUS score post-test, qualitative notes.
- Test script:
  - Intro, consent, think-aloud.
  - Warm-up: navigate Home to Dashboard.
  - Run tasks in order above.
  - Post-task rating; final SUS and debrief.
- Data capture:
  - Screen recording; event logs (if available via console).
  - Moderator notes mapped to task steps and issues; tally of errors.

## 5) Implementation Guidance (Working Interface)

This section maps each screen/flow to React components and routes already stubbed, with incremental, testable steps. Initial approach uses current RoutesPlaceholder; future step may introduce react-router while preserving tests.

### 5.1 Component & Route Mapping

- App: Shell with theme toggle (already present); augment with header/nav landmarks, skip link, and top app bar.
- RoutesPlaceholder: Extend to render route views:
  - home: Home page with CTA buttons
  - login: Auth modal content (conditionally rendered)
  - dashboard: Dashboard with DataWidget-based cards
  - notifications: Notifications Center placeholder
  - admin: Admin Dashboard overview table placeholder
  - search: Global Search overlay (modal-like)
  - entity-form: CRUD form placeholder
- ErrorBoundary: Wrap main route content
- DataWidget: Use for “System Status” and similar widgets; mock URLs via REACT_APP_API_BASE or passed prop

### 5.2 Step-by-step Plan

Phase 1 (MVP):
1. Layout and landmarks:
   - Add header (role=banner), nav (sidebar), main (role=main), skip link in App.
   - Ensure focus management on route changes in RoutesPlaceholder (use useEffect to focus <h1>).
2. RoutesPlaceholder expansion:
   - Add routes: notifications, admin, entity-form, search overlay toggle via prop or internal state.
   - Maintain existing tests by keeping current routes unchanged and adding new ones.
3. Home and Dashboard content:
   - Home: CTAs and basic layout.
   - Dashboard: Use <DataWidget url="/api/status" /> for System Status; add loading/empty placeholder cards.
4. Accessibility:
   - Add prefers-reduced-motion guard to CSS (disable logo spin).
   - Implement skip link and visible focus styles.
5. Error handling:
   - Wrap routes in <ErrorBoundary> with a default fallback.

Phase 2 (Core features):
6. Auth modal:
   - Create Login dialog markup within RoutesPlaceholder when route="login".
   - Add client-side validation and keyboard trap behavior (non-invasive; no external deps).
7. Notifications Center:
   - Placeholder list with mock entries; live region for toast simulation.
8. Admin table:
   - Simple table with headers (scope=col), rows, and pagination controls.

Phase 3 (Nice-to-have):
9. Global Search overlay:
   - Overlay with input and grouped results; keyboard navigation.
10. Generic Entity CRUD form:
   - Controlled inputs with inline validation, form submit simulation, and success toast.
11. Role-aware placeholders:
   - Prop or simple state to toggle admin features’ visibility.

### 5.3 Component Inventory with Props/State Contracts

- App
  - Props: none
  - State: theme: 'light' | 'dark'; ui: { showSearchOverlay: boolean }
- RoutesPlaceholder
  - Props: route: 'home'|'login'|'dashboard'|'notifications'|'admin'|'entity-form'|'search'
  - Behavior: focuses <h1> on mount/update; conditionally renders modal overlays.
- ErrorBoundary
  - Props: fallback?: ReactNode
- DataWidget
  - Props: url?: string
  - States: { loading: boolean; data: any; error: string|null }
- LoginModal (inline or separate component)
  - Props: onClose: () => void; onSubmit: (creds) => Promise<void>
  - State: { email, password, loading, error }
- NotificationsList
  - Props: items: Array<{ id, title, summary, read, time }>
  - State: filter: 'all'|'unread'|'system'|'mentions'
- AdminTable
  - Props: rows: Array<{ entity, count, status }>
  - State: pagination: { page, pageSize }
- EntityForm
  - Props: mode: 'create'|'edit'; initial?: Entity
  - State: field values; errors; submitting

### 5.4 Mock API Data and State

- Use in-component mock promises or a simple util to simulate network latency, success, and error cases.
- Respect environment variable REACT_APP_API_BASE when constructing URLs for DataWidget and search.

### 5.5 Error Handling and Tests

- Continue to test DataWidget success/error/network paths (already present).
- Introduce tests for:
  - Focus on route headings after change
  - Modal accessibility structure
  - Form validation errors and aria attributes
  - Keyboard traversal order and skip link

## 6) User Documentation (Outline + Draft)

### Quick Start

- Navigation Overview
  - Use the sidebar to switch between Home, Dashboard, Entities, and Admin. The top app bar provides global search and notifications.
- Signing in
  - Click the user menu and select Sign in. Enter your email and password. For SSO, use the SSO button if enabled by your organization.
- Using Search
  - Open the global search with the search field or press Ctrl+K. Type your query and use arrow keys to navigate results; press Enter to open.
- Creating and Editing Items
  - From Entities, select Create to open a form. Required fields are marked with an asterisk. Errors will be shown under the related field.
- Notifications Center
  - Click the bell icon to view notifications. Use filters to view unread or system notifications. Mark items as read or restore as needed.

### Troubleshooting

- I can’t sign in
  - Check your credentials. If SSO is unavailable, try local sign in. If errors persist, contact support with the error message shown.
- Data is not loading
  - Reload the page or click retry. If the issue persists, check your network connection.
- I can’t find a record
  - Try more general search terms. Use filters or navigate via Entities.
- Accessibility Tips
  - Keyboard users: Use Tab/Shift+Tab to move through controls. Use Enter/Space to activate. Use the “Skip to content” link to jump to main content.
  - Screen readers: Headings reflect page structure; forms include labels and error descriptions; notifications are announced via live region.

## 7) Test Results Plan & Traceability

Current automated tests and linked acceptance criteria:

- app.test.js
  - Verifies theme toggle buttons; linked to UI theme controls.
- routing.test.js
  - Confirms routing placeholder renders Home/Login/Dashboard; linked to route headings and basic navigation acceptance.
- data-handling.test.js
  - Verifies DataWidget loading/success/error; linked to dashboard widgets acceptance and error states.
- error-boundary.test.js
  - Validates fallback UI; linked to error boundary acceptance.
- a11y-home.test.js (jest-axe)
  - Ensures no basic a11y violations on Home; linked to color contrast and semantics.

Additional tests to implement:

- Routing focus management
  - Test: After rendering each route in RoutesPlaceholder, the <h1> is focused; pass/fail criteria based on activeElement.
- Modal a11y structure
  - Test: Login modal has role=dialog, aria-modal, labelledby, traps focus, closes with ESC and returns focus.
- Form validation and a11y
  - Test: Submitting empty required fields sets aria-invalid, shows error messages, links via aria-describedby, and announces errors.
- Keyboard traversal order and skip link
  - Test: Simulate Tab sequence starting at document; ensure skip link is first and focusing main after activation.
- Search overlay keyboard navigation
  - Test: Arrow keys change selected result; Enter navigates; overlay closes and focus is set to new page <h1>.
- Axe checks for additional routes
  - Tests: a11y dashboard, notifications, admin.

Traceability matrix (abbreviated):

- A11Y-FOCUS-ROUTE → Routing focus test
- A11Y-MODAL → Modal a11y test
- FORM-VALIDATION → Form validation tests
- NAV-SKIPLINK → Skip link test
- SEARCH-KB → Search keyboard nav test
- WIDGET-ERROR → DataWidget tests (existing)

## 8) Deliverables Outline and Linkage to Implementation

- Working Interface
  - RoutesPlaceholder extended with new views
  - App augmented with layout landmarks, skip link, top bar
  - DataWidget integrated in Dashboard
  - ErrorBoundary wraps routes
- Design Docs (this file)
  - Wireframes, flows, checklists
- User Docs
  - Quick start and troubleshooting (draft included above)
- Test Results
  - Existing test runs; new test cases added per Section 7
- Accessibility Verification
  - jest-axe on Home and expanded routes; manual keyboard pass

## 9) Ocean Professional Application Notes (Color/Type)

- Primary #2563EB for:
  - Primary buttons, links, active states, focus ring outline-color
- Secondary/Success #F59E0B for:
  - Non-critical notices, badges, alternate call-to-action
- Error #EF4444 for:
  - Validation messages, error banners, destructive actions
- Background #f9fafb and Surface #ffffff:
  - Page background and card surfaces respectively
- Text #111827:
  - Headings and body text; secondary text use 75–85% opacity variants

## 10) Implementation Snippets (Documentation-only, for reference)

Note: Code changes will be implemented in the next step. Provided here as guidance for how to meet acceptance criteria.

Focus management for route headings:
```javascript
// In each route view component within RoutesPlaceholder
useEffect(() => {
  const h1 = document.querySelector('main h1');
  if (h1) h1.focus();
}, [route]);
```

Skip link markup:
```html
<a class="skip-link" href="#main">Skip to content</a>
<main id="main" tabindex="-1">...</main>
```

Modal semantics:
```html
<div role="dialog" aria-modal="true" aria-labelledby="login-title">
  <h2 id="login-title" tabIndex="-1">Sign In</h2>
  <!-- form -->
</div>
```

Prefers-reduced-motion (CSS):
```css
@media (prefers-reduced-motion: reduce) {
  .App-logo { animation: none !important; }
}
```

## 11) Phased Backlog

- MVP (Phase 1)
  - Add layout landmarks (header/nav/main), skip link, focus management
  - Expand RoutesPlaceholder for notifications, admin, entity-form, search overlay stub
  - Dashboard widgets using DataWidget
- Core (Phase 2)
  - Login modal with validation
  - Notifications Center list
  - Admin table
- Nice-to-have (Phase 3)
  - Global search overlay with keyboard navigation
  - Entity CRUD form with inline validation and success toast
  - Role-aware UI toggles

## Appendix: Interaction Flow Diagrams (textual)

- Sign-in: Home → Open Login → Submit → [Success → Dashboard] | [Error → Inline Error]
- Search: Any → Open Search → Type → Results → Select → Detail → [Error → Overlay Banner]
- Create Entity: Entities → Create → Validate → Submit → [Success → Detail + Toast] | [Error → Inline + Banner]
- Notifications: Top bar → Notifications Center → Filter → Mark read → [Empty state shown if none]

``` 
Sources: 
- frontend_react_spa/src/App.js
- frontend_react_spa/src/components/DataWidget.js
- frontend_react_spa/src/components/ErrorBoundary.js
- frontend_react_spa/src/routes/RoutesPlaceholder.js
- frontend_react_spa/TESTING.md
- frontend_react_spa/README.md
```
