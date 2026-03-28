# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server
npm run build      # Production build
npm run lint       # ESLint (run before every commit)
npm run preview    # Preview production build locally
```

There is no test runner configured. Lint is the only automated check enforced in CI.

Before running the project, copy the environment file:
```bash
cp .env.example .env
```

The only required env variable is `VITE_API_URL` (defaults to `http://localhost:5000/api` if unset). Set `VITE_SKIP_SESSION_CHECK=true` to suppress noisy 401 errors during local dev when the backend is unavailable.

## Architecture

### Entry & Providers

`src/main.jsx` bootstraps the app. On startup it runs a cookie-based session restore: `POST /auth/refresh` → `GET /users/current`, setting the access token in Redux memory only (never persisted). The Redux `<Provider>` wraps everything; `<CartProvider>` is scoped inside `RootLayout` (not at the root), so it is only available on routes that use `RootLayout`.

### Routing

All routes are defined in `src/routes/RouterConfig.jsx`. Every page is lazy-loaded via `React.lazy`. The `RootLayout` route wraps all public/protected pages and renders `<Header>`, `<TopFooter>`, `<BottomFooter>`, and a `<Suspense>` fallback. Two guard components exist:
- `PrivateRoute` — redirects unauthenticated users away
- `RestrictedRoute` — redirects authenticated users away (used for `/login`, `/register`)

### State Management

Redux Toolkit (`src/store/`) with five slices:
| Slice | Responsibility |
|-------|---------------|
| `auth` | In-memory JWT token + user object |
| `products` | Product list, filters, loading state |
| `cart` | Server-side cart slice (separate from local cart) |
| `collections` | Collection page data |
| `wishList` | Wishlist items |

**Cart is split in two**: `CartContext` (`src/context/CartContext.jsx`) manages a `localStorage`-persisted guest cart with cross-tab sync. The Redux `cartSlice` is used for server-side cart operations. Components that render cart UI use `useCart()` from the context.

### API Layer

`src/api/axiosInstance.js` is the single Axios instance. It:
- Reads `VITE_API_URL` for the base URL
- Attaches the in-memory Bearer token from Redux on each request
- Handles 401s with a refresh-coalescing queue (only one `/auth/refresh` in flight at a time; all concurrent 401s are queued and retried after refresh)

Service files (`productService.js`, `cartService.js`, `collectionService.js`) wrap the instance and are re-exported from `src/api/index.js`.

### Styling

Tailwind CSS v4 with a custom theme defined in `src/index.css` under `@theme`. Key design tokens:
- `--color-main: #023e8a` (primary blue)
- `--color-white-back: #f7faff` (page background)
- `--color-black: #010409`

Component-scoped CSS files live alongside their component and use `@reference "../../index.css"` to access theme tokens inside `@layer` blocks. Do not use hardcoded hex values that duplicate these tokens.

### Scroll Animations

`src/hooks/useIntersectionObserver.js` is a shared hook for reveal-on-scroll effects. It accepts a `ref`, a CSS `selector`, and a `className` to add on intersection. Components use `.card-reveal` as the initial invisible state and `animate-fadeInUp` as the triggered class. Always include `prefers-reduced-motion` handling in any CSS that uses `opacity: 0` as a starting state — without it, cards remain permanently invisible for users with reduced motion enabled.

### Component Conventions

- Components with sub-components use a folder: `ComponentName/ComponentName.jsx` with an `index.js` re-export
- Static data (arrays, config) is extracted to a sibling `data.js` or named data file, not defined inline inside the component
- Private sub-components (used only by one parent) stay in the same file as their parent, unexported
- `src/components/index.js` and `src/api/index.js` serve as barrel exports

### Security

`src/utils/sanitize.js` wraps DOMPurify — use it for any HTML rendered from API responses. The project has `eslint-plugin-security` enabled; do not suppress its warnings without a documented reason.

## Important Constraints

- **Do not install new packages** without first discussing in an issue. This is an open-source community project with many contributors; undiscussed dependencies will be rejected in PR review.
- Do not commit `node_modules`, `package-lock.json`, or `.env`.
- All PRs target `main` and must pass the lint CI check.
