# LDBK – företagshemsida

Webbplats för LDBK, byggd med **Next.js (App Router)**, **TypeScript** och **Tailwind CSS**.

## Kom igång

Kräver Node.js 20.9 eller senare.

```bash
npm install      # installera beroenden
npm run dev      # starta utvecklingsserver på http://localhost:3000
```

Övriga kommandon:

| Kommando        | Beskrivning                              |
| --------------- | ---------------------------------------- |
| `npm run build` | Bygger en produktionsversion             |
| `npm run start` | Startar produktionsversionen lokalt      |
| `npm run lint`  | Kör ESLint                               |

## Redigera innehåll

Webbplatsen är en enkel landningssida med logotypen "LDBK" centrerad och adress och telefonnummer längst ned.

Allt innehåll finns i **`src/data/content.ts`**:

- `site` – företagsnamn, beskrivning (för sökmotorer) och **domän** (används för sitemap och Open Graph)
- `contact` – adress och telefonnummer

All platshållartext är markerad med **`[PLATSHÅLLARE]`**.

Själva sidan finns i `src/app/page.tsx`. Loggan är just nu en textlogga – se `TODO` i filen för att byta till en riktig logotyp.

## Projektstruktur

```
src/
├── app/
│   ├── page.tsx        # Landningssidan
│   ├── layout.tsx      # Gemensam layout + metadata
│   ├── not-found.tsx   # 404-sida
│   ├── globals.css     # Designsystem (Tailwind-tema: typsnitt, färger)
│   ├── sitemap.ts      # Genererar /sitemap.xml
│   └── robots.ts       # Genererar /robots.txt
└── data/content.ts     # Allt redigerbart innehåll
```

### Designsystem

Projektet använder Tailwind CSS v4, där temat konfigureras direkt i CSS i stället för i en `tailwind.config.js`. Typsnittet (`"Helvetica Neue", Helvetica, Arial, sans-serif`), färger och skarpa hörn definieras i `@theme`-blocket i `src/app/globals.css`.

## Driftsättning på Vercel

1. Lägg projektet i ett Git-repo (GitHub, GitLab eller Bitbucket) och pusha.
2. Logga in på [vercel.com](https://vercel.com) och välj **Add New → Project**.
3. Importera repot. Vercel känner automatiskt igen Next.js – inga inställningar behöver ändras.
4. Klicka **Deploy**.
5. Koppla din domän under **Settings → Domains**.

Varje ny push till huvudgrenen driftsätts sedan automatiskt, och andra grenar får egna förhandsversioner.

> Innan lansering: uppdatera `site.url` i `src/data/content.ts` till den riktiga domänen, så att sitemap, canonical-länk och Open Graph blir rätt.
