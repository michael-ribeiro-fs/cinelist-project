# 📘 CineList — Technical Documentation

> Compact reference for the project's stack, conventions, structure and quality standards.

---

## 1. Project Identity

| Item                         | Value                                                                                |
| ---------------------------- | ------------------------------------------------------------------------------------ |
| **Project name**             | CineList                                                                             |
| **Type**                     | Front-end SPA (movie discovery platform)                                             |
| **Status**                   | 🚧 Active development (not deployed)                                                 |
| **Design reference**         | [Figma – Cinema City Template](https://www.figma.com/design/etb83LzsWiRE2ynv4kTy4b/) |
| **Repository**               | https://github.com/michael-ribeiro-fs/cinelist-project                               |
| **Language of the codebase** | English (code, comments, commits)                                                    |
| **Language of UI**           | 8 locales (pt, en, es, fr, zh, ar, ru, hi)                                           |

---

## 2. Stack & Versions

| Category            | Technology         | Version      | Purpose               |
| ------------------- | ------------------ | ------------ | --------------------- |
| **Runtime**         | Node.js            | `>=22` (LTS) | Build & dev server    |
| **Package manager** | npm                | `>=10`       | Dependency management |
| **Language**        | TypeScript         | `~6.x`       | Type-safe JavaScript  |
| **UI library**      | React              | `19.x`       | Component model       |
| **Build tool**      | Vite               | `8.x`        | Dev server & bundler  |
| **Routing**         | React Router DOM   | `7.x`        | Client-side routing   |
| **Data fetching**   | TanStack Query     | `5.x`        | Server state, cache   |
| **HTTP client**     | Axios              | `1.x`        | API requests          |
| **Styling**         | CSS + BEM + Tokens | —            | Modular styling       |
| **Linting**         | ESLint             | `10.x`       | Static analysis       |
| **Formatting**      | Prettier           | `3.x`        | Code formatting       |
| **API**             | TMDB v3            | —            | Movie data source     |

> ⚠️ **Node.js 22+ is required** — the project uses Vite 8 and ESLint 10, which depend on Node 22 features (`util.styleText`).
>
> 🔎 Verify local versions:
>
> ```bash
> node -v && npm -v
> npx tsc --version
> npm ls react vite @tanstack/react-query axios
> ```

---

## 3. Naming Conventions

### 3.1 Files & Folders

| Type                 | Convention                      | Example                           |
| -------------------- | ------------------------------- | --------------------------------- |
| **Components**       | `PascalCase` (folder + file)    | `MovieCarousel/MovieCarousel.tsx` |
| **Component styles** | Same name as component          | `MovieCarousel.css`               |
| **Hooks**            | `camelCase`, prefix `use`       | `useCarousel.ts`, `useMovies.ts`  |
| **Contexts**         | `PascalCase`, suffix `Context`  | `LanguageContext.tsx`             |
| **Providers**        | `PascalCase`, suffix `Provider` | `QueryProvider.tsx`               |
| **Services**         | `camelCase`, suffix `Service`   | `tmdbService.ts`                  |
| **Mappers**          | `camelCase`, suffix `Mapper`    | `movieMapper.ts`                  |
| **Constants**        | `camelCase`                     | `movieThemes.ts`, `languages.ts`  |
| **Types (shared)**   | `camelCase`                     | `movie.ts`, `language.ts`         |
| **Utils**            | `camelCase`                     | `logger.ts`, `env.ts`             |
| **Locales**          | `camelCase` (folder + file)     | `locales/header/header.ts`        |
| **Pages**            | `PascalCase`                    | `Home.tsx`, `Actor.tsx`           |
| **Data files**       | `camelCase`                     | `curatedLists.ts`                 |
| **Markdown docs**    | `kebab-case` or `camelCase`     | `movieThemes.README.md`           |

### 3.2 Code Identifiers

| Type                         | Convention                   | Example                                 |
| ---------------------------- | ---------------------------- | --------------------------------------- |
| **Variables / functions**    | `camelCase`                  | `handleNextClick`, `scrollAmount`       |
| **Constants (module-level)** | `SCREAMING_SNAKE_CASE`       | `AUTOPLAY_INTERVAL`, `TMDB_LOCALE`      |
| **Types / Interfaces**       | `PascalCase`                 | `Movie`, `MovieTheme`, `Translations`   |
| **Type aliases (union)**     | `PascalCase`                 | `LanguageCode`, `MovieThemeKey`         |
| **Booleans**                 | Prefix `is`, `has`, `should` | `isLoading`, `hasError`, `shouldRender` |
| **Event handlers**           | Prefix `handle`              | `handleSubmit`, `handleFilterChange`    |
| **React components**         | `PascalCase`                 | `MovieCarousel`, `FeaturedMovie`        |

### 3.3 CSS (BEM + Design Tokens)

| Type              | Convention                  | Example                                    |
| ----------------- | --------------------------- | ------------------------------------------ |
| **Block**         | `.block`                    | `.movie-carousel`                          |
| **Element**       | `.block__element`           | `.movie-carousel__title`                   |
| **Modifier**      | `.block__element--modifier` | `.movie-carousel__indicator--active`       |
| **Design tokens** | `--category-variant`        | `--color-primary`, `--sp-4`, `--radius-md` |

---

## 4. Folder Structure

```
cinelist-project/
├── public/                     # Static assets (favicon, icons)
├── src/
│   ├── assets/
│   │   ├── fonts/              # Poppins (woff2)
│   │   └── images/             # PNG/SVG used by components
│   ├── components/             # UI blocks (each with .tsx + .css)
│   │   ├── ActorHero/
│   │   ├── FeaturedMovie/
│   │   ├── Footer/
│   │   ├── Header/
│   │   ├── Hero/
│   │   ├── HeroControls/
│   │   ├── Layout/
│   │   ├── MovieCarousel/
│   │   ├── MovieSearch/
│   │   ├── PageContainer/
│   │   └── RegisterBlock/
│   ├── config/
│   │   └── env.ts              # Typed environment variables
│   ├── constants/
│   │   ├── languages.ts        # Supported languages
│   │   ├── movieThemes.ts      # Theme registry (single source of truth)
│   │   ├── movieThemes.README.md
│   │   └── tmdbLanguage.ts     # Locale mapping for TMDB
│   ├── context/
│   │   ├── LanguageContext.tsx    # Provider (component only)
│   │   ├── languageContextBase.ts # Context + types (no component)
│   │   └── useLanguage.ts         # Custom hook
│   ├── data/
│   │   ├── curatedLists.ts     # Hand-picked movie lists
│   │   └── movies.ts           # Fallback mock data
│   ├── hooks/
│   │   ├── queries/
│   │   │   └── useMovies.ts    # TanStack Query hooks
│   │   └── useCarousel.ts      # Carousel state logic
│   ├── locales/                # Translations by feature block
│   │   ├── featuredMovie/
│   │   ├── footer/
│   │   ├── header/
│   │   ├── hero/
│   │   ├── movieCarousel/
│   │   ├── movieSearch/
│   │   ├── pages/
│   │   └── register/
│   ├── pages/                  # Route-level components
│   ├── providers/
│   │   ├── QueryProvider.tsx   # TanStack Query provider
│   │   └── queryClient.ts      # QueryClient instance
│   ├── services/
│   │   ├── api/
│   │   │   ├── apiClient.ts    # Axios instance + interceptors
│   │   │   ├── endpoints.ts    # Endpoint constants
│   │   │   ├── tmdbService.ts  # Business logic for TMDB
│   │   │   └── types/
│   │   │       └── tmdb.types.ts
│   │   └── mappers/
│   │       └── movieMapper.ts  # TMDB → domain model
│   ├── styles/
│   │   └── tokens.css          # Design tokens (CSS variables)
│   ├── types/
│   │   ├── language.ts
│   │   └── movie.ts
│   ├── utils/
│   │   └── logger.ts           # Conditional logger (dev only)
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .env                        # 🔒 Not committed
├── .env.example                # ✅ Committed template
├── .nvmrc                      # ✅ Pins Node.js version
├── eslint.config.js            # ESLint flat config
├── .prettierrc                 # Prettier config
├── .prettierignore             # Prettier ignores
├── doc.md                      # This file
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## 5. Best Practices

### 5.1 TypeScript

| Rule                                                 | Description                             |
| ---------------------------------------------------- | --------------------------------------- |
| ✅ Use `type` imports                                | `import type { Movie } from '...'`      |
| ✅ No `any`                                          | Use `unknown` + type guards or generics |
| ✅ Strict mode                                       | `"strict": true` in `tsconfig`          |
| ✅ Prefer `interface` for objects, `type` for unions | Convention                              |
| ✅ Avoid type assertions (`as`)                      | Only when necessary and documented      |
| ✅ Type props explicitly                             | `type Props = { ... }`                  |
| ✅ Use `satisfies` for literal objects               | E.g., `MOVIE_THEMES`, `CURATED_LISTS`   |

### 5.2 React

| Rule                                            | Description                             |
| ----------------------------------------------- | --------------------------------------- |
| ✅ Hooks called before early returns            | Never conditionally call hooks          |
| ✅ One component per file                       | Except small sub-components             |
| ✅ Extract logic to custom hooks                | E.g., `useCarousel`, `useMoviesByTheme` |
| ✅ Use `useCallback`/`useMemo` only when needed | Avoid premature optimization            |
| ✅ Keys in lists must be stable                 | Use `movie.id`, not index               |
| ✅ Accessibility first                          | `aria-*`, semantic HTML, keyboard nav   |
| ✅ Lazy-load images                             | `loading="lazy"`                        |

### 5.3 CSS

| Rule                  | Description                    |
| --------------------- | ------------------------------ |
| ✅ BEM methodology    | `.block__element--modifier`    |
| ✅ Design Tokens only | No hardcoded colors/spacing    |
| ✅ Mobile-first       | Media queries with `max-width` |
| ✅ No inline styles   | Except for dynamic values      |
| ✅ Scoped styles      | One CSS file per component     |

### 5.4 API & Data

| Rule                                 | Description                                     |
| ------------------------------------ | ----------------------------------------------- |
| ✅ Layered architecture              | Components → Hooks → Services → HTTP Client     |
| ✅ Single source of truth for themes | `movieThemes.ts`                                |
| ✅ Mappers transform API → domain    | Never use raw API types in components           |
| ✅ Locale-aware cache keys           | Include locale in every query key               |
| ✅ Graceful fallbacks                | Return null / empty array, never throw silently |
| ✅ Avoid overfetching                | Use `limit` and `page` params                   |

### 5.5 Git & Commits

| Rule                    | Description                                     |
| ----------------------- | ----------------------------------------------- |
| ✅ Conventional Commits | `feat:`, `fix:`, `refactor:`, `docs:`, `chore:` |
| ✅ Atomic commits       | One logical change per commit                   |
| ✅ English messages     | Consistent, clear, imperative                   |
| ✅ Feature branches     | `feat/`, `fix/`, `refactor/`                    |
| ✅ PR descriptions      | Explain _what_ and _why_, not _how_             |

### 5.6 Security

| Rule                             | Description                   |
| -------------------------------- | ----------------------------- |
| 🔒 `.env` never committed        | Always in `.gitignore`        |
| 🔒 Secrets only in `.env`        | Never in code                 |
| 🔒 `.env.example` committed      | With placeholder values       |
| 🔒 Validate env vars at startup  | In `config/env.ts`            |
| ✅ Pin Node version via `.nvmrc` | Ensures all devs use Node 22+ |

### 5.7 Code Quality

| Rule                              | Description                |
| --------------------------------- | -------------------------- |
| ✅ ESLint must pass               | No warnings in CI          |
| ✅ Prettier must format           | No unformatted files       |
| ✅ No `console.log` in production | Use `logger` utility       |
| ✅ No commented-out code          | Delete it (Git remembers)  |
| ✅ No unused imports/variables    | Clean imports              |
| ✅ Prefer named exports           | Except for pages (default) |

---

## 6. ESLint & Formatting

### 6.1 Scripts

| Command                | Purpose                                     |
| ---------------------- | ------------------------------------------- |
| `npm run lint`         | Run ESLint on the project                   |
| `npm run lint:fix`     | Auto-fix ESLint issues                      |
| `npm run format`       | Format with Prettier                        |
| `npm run format:check` | Verify formatting without changing files    |
| `npm run typecheck`    | Type-check without emitting                 |
| `npm run verify`       | Run lint + format:check + typecheck + build |

> 💡 Scripts in `package.json`:
>
> ```json
> {
>   "scripts": {
>     "dev": "vite --open",
>     "build": "tsc -b && vite build",
>     "preview": "vite preview",
>     "lint": "eslint .",
>     "lint:fix": "eslint . --fix",
>     "format": "prettier --write \"src/**/*.{ts,tsx,css,md}\"",
>     "format:check": "prettier --check \"src/**/*.{ts,tsx,css,md}\"",
>     "typecheck": "tsc --noEmit",
>     "verify": "npm run lint && npm run format:check && npm run typecheck && npm run build"
>   }
> }
> ```

### 6.2 ESLint Config

The project uses ESLint **flat config** (`eslint.config.js`), compatible with ESLint 10+.

```js
// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist', 'node_modules', 'coverage']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      prettier, // must be last to disable conflicting rules
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
]);
```

### 6.3 Prettier Config

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "always"
}
```

---

## 7. Environment Variables

| Variable                   | Required | Description                                |
| -------------------------- | -------- | ------------------------------------------ |
| `VITE_TMDB_API_KEY`        | ✅       | TMDB API key (v3 auth, 32 chars)           |
| `VITE_TMDB_ACCESS_TOKEN`   | ✅       | TMDB JWT token (reserved)                  |
| `VITE_TMDB_BASE_URL`       | ✅       | `https://api.themoviedb.org/3`             |
| `VITE_TMDB_IMAGE_URL`      | ✅       | `https://image.tmdb.org/t/p/w500`          |
| `VITE_TMDB_IMAGE_ORIGINAL` | ⚪       | `https://image.tmdb.org/t/p/original`      |
| `VITE_USE_API`             | ✅       | `true` to fetch from API, `false` for mock |

> ⚠️ All variables must be prefixed with `VITE_` to be exposed to the client.

---

## 8. Useful Commands

| Command                | Description                                 |
| ---------------------- | ------------------------------------------- |
| `npm run dev`          | Start dev server (port 3000)                |
| `npm run build`        | Build for production                        |
| `npm run preview`      | Preview production build locally            |
| `npm run lint`         | Run ESLint                                  |
| `npm run lint:fix`     | Auto-fix lint issues                        |
| `npm run format`       | Format all files                            |
| `npm run format:check` | Check formatting without changes            |
| `npm run typecheck`    | Type-check without emitting files           |
| `npm run verify`       | Run lint + format:check + typecheck + build |

> 💡 `npm run verify` is the pre-commit gate — if it passes, the code is ready to commit.

---

## 9. Quality Checklist

Before every commit or PR:

- [ ] No `console.log` (use `logger` if needed)
- [ ] No `any` types
- [ ] No unused imports or variables
- [ ] All files formatted (`npm run format`)
- [ ] ESLint passes (`npm run lint`)
- [ ] TypeScript compiles without errors (`npm run typecheck`)
- [ ] Build succeeds (`npm run build`)
- [ ] No hardcoded colors/spacing in CSS
- [ ] All new strings are i18n-ready
- [ ] Accessibility attributes present
- [ ] Commit message follows Conventional Commits
- [ ] `.nvmrc` still points to the correct Node version

---

## 10. References

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TanStack Query](https://tanstack.com/query)
- [TMDB API](https://developer.themoviedb.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [BEM Methodology](https://getbem.com/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Node.js LTS Releases](https://nodejs.org/en/about/previous-releases)

---

**Last updated:** aligned with the current stack (Node 22, Vite 8, ESLint 10, TypeScript 6).
