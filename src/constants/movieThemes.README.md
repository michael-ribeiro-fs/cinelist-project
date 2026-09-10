# 🎬 Sistema de Temas de Filmes (Movie Themes)

Este documento descreve o sistema modular de temas utilizado pelo componente `<MovieCarousel />` e pelos hooks de busca de filmes. O objetivo é permitir **baixo acoplamento**: adicionar ou remover temas sem tocar em lógica de API ou componentes.

---

## 📌 Visão Geral

Cada tema é registrado em um único arquivo central (`src/constants/movieThemes.ts`) e consumido por:

- **`useMoviesByTheme(themeKey, page?, limit?)`** – hook que retorna os filmes do tema.
- **`<MovieCarousel theme="..." />`** – componente que renderiza o carrossel.
- **`movieCarousel.ts`** (locales) – traduções do título do tema em 8 idiomas.

Fluxo simplificado:

```
movieThemes.ts  →  tmdbService.getMoviesByTheme  →  useMoviesByTheme  →  <MovieCarousel />
```

---

## 📋 Lista de Temas Disponíveis

### 🔥 Listas Gerais

| Chave           | Descrição          | Fonte TMDB             |
| --------------- | ------------------ | ---------------------- |
| `popular`       | Populares          | `/movie/popular`       |
| `upcoming`      | Lançamentos        | `/movie/upcoming`      |
| `nowPlaying`    | Em cartaz          | `/movie/now_playing`   |
| `topRated`      | Melhores avaliados | `/movie/top_rated`     |
| `trending`      | Em alta (semanal)  | `/trending/movie/week` |
| `trendingToday` | Em alta (diário)   | `/trending/movie/day`  |

### 🎭 Gêneros

| Chave         | Gênero (PT-BR)    | ID TMDB |
| ------------- | ----------------- | ------- |
| `action`      | Ação              | 28      |
| `adventure`   | Aventura          | 12      |
| `animation`   | Animação          | 16      |
| `comedy`      | Comédia           | 35      |
| `crime`       | Crime             | 80      |
| `documentary` | Documentário      | 99      |
| `drama`       | Drama             | 18      |
| `family`      | Família           | 10751   |
| `fantasy`     | Fantasia          | 14      |
| `history`     | História          | 36      |
| `horror`      | Terror            | 27      |
| `music`       | Música            | 10402   |
| `mystery`     | Mistério          | 9648    |
| `romance`     | Romance           | 10749   |
| `sciFi`       | Ficção Científica | 878     |
| `thriller`    | Suspense          | 53      |
| `war`         | Guerra            | 10752   |
| `western`     | Faroeste          | 37      |

> 📖 Referência oficial dos IDs: [TMDB – Genre IDs](https://developer.themoviedb.org/reference/genre-movie-list)

---

## 💡 Como Usar

### Uso básico

```tsx
import MovieCarousel from '../components/MovieCarousel/MovieCarousel';

<MovieCarousel theme="popular" />
<MovieCarousel theme="horror" />
<MovieCarousel theme="sciFi" />
```

### Com limite de filmes

```tsx
<MovieCarousel theme="documentary" limit={10} />
```

### Com título customizado (sobrescreve a tradução)

```tsx
<MovieCarousel theme="romance" title="Romances clássicos" />
```

### Passando filmes manualmente (ignora a API)

```tsx
<MovieCarousel theme="popular" movies={meusFilmes} />
```

---

## 🛠️ Como Criar um Novo Tema

Adicionar um tema é **muito simples** e envolve apenas 3 passos.

### Passo 1 — Registrar o tema

Abra `src/constants/movieThemes.ts` e adicione a nova chave em `MOVIE_THEMES`.

**Exemplo:** criar um tema chamado `anime` (usando o gênero Animação como aproximação).

```ts
export const MOVIE_THEMES = {
  // ... temas existentes

  anime: { key: 'anime', source: { kind: 'genre', genreId: 16 } },
} as const satisfies Record<string, MovieTheme>;
```

**Exemplo 2:** criar um tema que combina múltiplos gêneros (Ação + Aventura).

```ts
actionAdventure: {
  key: 'actionAdventure',
  source: { kind: 'genre', genreId: 28 },
},
```

> ⚠️ **Observação:** se quiser combinar múltiplos gêneros no mesmo carrossel, será necessário estender o tipo `MovieThemeSource` para aceitar um array `genreIds`. Atualmente, o sistema suporta apenas um gênero por tema.

### Passo 2 — Adicionar a tradução

Abra `src/locales/movieCarousel/movieCarousel.ts` e adicione a chave em **todos os 8 idiomas** dentro do objeto `themes`.

```ts
export const movieCarousel = {
  pt: {
    // ...
    themes: {
      // ... outros temas
      anime: 'Animes',
    },
  },
  en: {
    // ...
    themes: {
      // ... outros temas
      anime: 'Anime',
    },
  },
  // ... repetir para es, fr, zh, ar, ru, hi
};
```

> 🌍 **Idiomas suportados:** `pt`, `en`, `es`, `fr`, `zh`, `ar`, `ru`, `hi`.

### Passo 3 — Usar na Home

Abra `src/pages/Home.tsx` e adicione o carrossel:

```tsx
<MovieCarousel theme="anime" />
```

Pronto! O título será automaticamente traduzido e os filmes buscados da API.

---

## 🧩 Estrutura Interna do Tema

Cada tema é composto por:

```ts
interface MovieTheme {
  key: string; // Identificador único (usado em <MovieCarousel theme="..." />)
  source: MovieThemeSource; // Define de onde os filmes vêm
}
```

O `MovieThemeSource` é uma **union type** que mapeia cada tipo de busca para sua respectiva configuração:

```ts
export type MovieThemeSource =
  | { kind: 'popular' }
  | { kind: 'upcoming' }
  | { kind: 'nowPlaying' }
  | { kind: 'topRated' }
  | { kind: 'trending'; timeWindow: 'day' | 'week' }
  | { kind: 'genre'; genreId: number };
```

Isso garante **tipagem forte** e evita erros em tempo de execução.

---

## 🔄 Fluxo de Dados (Resumo)

```
<MovieCarousel theme="horror" />
        │
        ▼
useMoviesByTheme('horror')
        │
        ▼
MOVIE_THEMES['horror']  →  { kind: 'genre', genreId: 27 }
        │
        ▼
getMoviesByTheme(theme)
        │
        ▼
/api/discover/movie?with_genres=27
        │
        ▼
mapTMDBMovieListToMovies()  →  Movie[]
        │
        ▼
<MovieCarousel /> renderiza
```

---

## ✅ Boas Práticas

- 🎯 **Sempre adicione a tradução** em todos os 8 idiomas – mesmo que seja apenas um placeholder.
- 🧱 **Mantenha o registro de temas em ordem alfabética** (exceto listas gerais).
- 🚫 **Não edite a lógica do `MovieCarousel`** para casos específicos de tema – use as props.
- 📝 **Documente temas experimentais** com um comentário acima da chave no registro.
- 🔍 **Consulte a lista oficial de gêneros** da TMDB antes de criar um novo tema de gênero.

---

## 🆘 Dúvidas Frequentes

**1. Posso criar um tema que combine múltiplos gêneros?**
Sim, mas exige pequena refatoração em `MovieThemeSource`. Seria algo como `{ kind: 'genres'; genreIds: number[] }`.

**2. O que acontece se eu não adicionar a tradução de um tema?**
O componente exibe o título padrão (`defaultTitle`) ou uma string de fallback (`"Filmes recomendados"`).

**3. Posso reutilizar o mesmo tema em vários carrosséis?**
Sim! Vários `<MovieCarousel theme="popular" />` funcionam normalmente e compartilham cache do React Query.

**4. Como testar um tema novo sem esperar a tradução?**
Basta passar a prop `title` manualmente: `<MovieCarousel theme="anime" title="Teste" />`.

---

## 📚 Referências

- [TMDB API – Descobrir filmes](https://developer.themoviedb.org/reference/discover-movie)
- [TMDB API – Gêneros](https://developer.themoviedb.org/reference/genre-movie-list)
- [TMDB API – Trending](https://developer.themoviedb.org/reference/trending-movies)
- [React Query – Documentação](https://tanstack.com/query/latest)

---

**Última atualização:** ao adicionar um novo tema, mantenha este documento sincronizado com o registro.
