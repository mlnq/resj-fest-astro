# Rejs Fest 26

Strona wydarzenia zbudowana w oparciu o `Astro`, `React 19` i `Tailwind CSS 4`. Projekt łączy statyczne trasy Astro z interaktywnymi sekcjami renderowanymi po stronie klienta.

## Stack

- `Astro 6`
- `React 19`
- `@astrojs/react`
- `Tailwind CSS 4` przez `@tailwindcss/vite`
- `motion` do animacji
- `Radix UI` dla wybranych komponentów interfejsu
- `yet-another-react-lightbox` dla galerii

## Uruchomienie lokalne

Wymagania:

- `Node.js >= 22.12.0`
- `npm`

Instalacja i start:

```sh
npm install
npm run dev
```

Domyślnie aplikacja uruchamia się pod adresem `http://localhost:4321`.

## Dostępne komendy

| Komenda | Działanie |
| --- | --- |
| `npm run dev` | Start lokalnego serwera developerskiego |
| `npm run build` | Build produkcyjny Astro |
| `npm run preview` | Podgląd buildu lokalnie |
| `npm run astro -- --help` | Pomoc dla CLI Astro |

## Struktura projektu

```text
/
├── public/                 # favicon i publiczne assety
├── src/
│   ├── app/
│   │   ├── components/     # komponenty React dla landing page i galerii
│   │   ├── pages/          # główne widoki React
│   │   └── utils/          # helpery, np. do assetów
│   ├── assets/
│   │   └── imports/        # fonty, SVG, PNG, JPG
│   ├── layouts/            # layout Astro
│   ├── pages/              # routing Astro
│   └── styles/             # style globalne i fonty
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Routing

Astro obsługuje routing na podstawie plików w `src/pages`. W projekcie są obecnie między innymi:

- `/` - strona główna
- `/program`
- `/galeria`
- `/faq`
- `/informacje`
- `/organizatorzy-i-partnerzy`
- `/regulamin`
- `/polityka-prywatnosci`

Większość tych widoków korzysta z layoutu Astro i renderuje właściwe sekcje React przez `client:load`.

## Architektura

- `src/pages/*.astro` odpowiada za trasy, metadane strony i osadzenie widoków.
- `src/app/pages/HomePage.tsx` składa stronę główną z sekcji landing page.
- `src/app/components/landing/*` zawiera sekcje i komponenty UI strony głównej.
- `src/app/pages/GalleryPage.tsx` oraz `src/app/components/gallery/*` obsługują galerię.
- `src/styles/*` przechowuje style globalne, motyw i fonty.

## Assety i branding

Projekt korzysta z lokalnych assetów osadzonych w `src/assets/imports`, w tym:

- logo i ilustracji SVG,
- zdjęć do sekcji hero i galerii,
- własnego fontu `RejsFest.ttf`.

## Build produkcyjny

```sh
npm run build
```

Wynik buildu trafia do katalogu `dist/`.

## Uwagi

- Projekt nie ma obecnie wydzielonych testów automatycznych ani osobnego skryptu lintowania w `package.json`.
- Jeśli dodajesz nową podstronę, najprościej zacząć od nowego pliku `.astro` w `src/pages` i podpiąć do niego odpowiedni komponent React lub czysty widok Astro.
