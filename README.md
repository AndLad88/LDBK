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

Nästan allt innehåll finns i **`src/data/content.ts`**:

- `site` – företagsnamn, slogan, beskrivning och **domän** (används för SEO, sitemap och Open Graph)
- `contact` – adress, telefon, e-post, org.nr och öppettider
- `navigation` – menylänkar
- `services` – tjänster (rubrik, sammanfattning, beskrivning, punktlista)
- `projects` – referensprojekt (namn, ort, år, kategori, bild). `featured: true` visar projektet på startsidan
- `home` och `about` – texter för startsidan och Om oss-sidan

All platshållartext är markerad med **`[PLATSHÅLLARE]`**. Sök efter det ordet i projektet för att hitta allt som ska bytas ut.

### Bilder

Bilderna ligger i `public/images/`. Byt ut filerna (gärna med samma namn) eller lägg till nya och uppdatera sökvägen i `content.ts`. Glöm inte att uppdatera `imageAlt` med en beskrivande alt-text.

### Logotyp

Loggan är just nu en textlogga ("LDBK") i `src/components/Header.tsx` och `src/components/SiteNav.tsx` (mobilmenyn). Se `TODO` i filerna.

## Projektstruktur

```
src/
├── app/
│   ├── page.tsx            # Startsida
│   ├── tjanster/           # Tjänster
│   ├── projekt/            # Projekt
│   ├── om-oss/             # Om oss
│   ├── kontakt/            # Kontakt
│   ├── api/contact/        # API-route för kontaktformuläret
│   ├── layout.tsx          # Gemensam layout + standard-metadata
│   ├── globals.css         # Designsystem (Tailwind-tema: typsnitt, färger)
│   ├── sitemap.ts          # Genererar /sitemap.xml
│   └── robots.ts           # Genererar /robots.txt
├── components/             # Återanvändbara komponenter
├── data/content.ts         # Allt redigerbart innehåll
└── lib/                    # Validering och metadata-hjälpare
```

### Designsystem

Projektet använder Tailwind CSS v4, där temat konfigureras direkt i CSS i stället för i en `tailwind.config.js`. Typsnittet (`"Helvetica Neue", Helvetica, Arial, sans-serif`), färger och skarpa hörn definieras i `@theme`-blocket i `src/app/globals.css`.

## Kontaktformuläret

Formuläret validerar på klientsidan och skickar sedan till `/api/contact`, som validerar igen med samma regler (`src/lib/contact.ts`) och loggar meddelandet i serverloggen.

**Att göra:** koppla in en e-posttjänst så att meddelandena skickas som mejl. Se `TODO` i `src/app/api/contact/route.ts` – där finns ett färdigt exempel för [Resend](https://resend.com). API-nyckeln läggs som miljövariabel (`RESEND_API_KEY`) i `.env.local` lokalt och under *Settings → Environment Variables* i Vercel.

## Driftsättning på Vercel

1. Lägg projektet i ett Git-repo (GitHub, GitLab eller Bitbucket) och pusha.
2. Logga in på [vercel.com](https://vercel.com) och välj **Add New → Project**.
3. Importera repot. Vercel känner automatiskt igen Next.js – inga inställningar behöver ändras.
4. Lägg till eventuella miljövariabler (t.ex. `RESEND_API_KEY`) och klicka **Deploy**.
5. Koppla din domän under **Settings → Domains**.

Varje ny push till huvudgrenen driftsätts sedan automatiskt, och andra grenar får egna förhandsversioner.

> Innan lansering: uppdatera `site.url` i `src/data/content.ts` till den riktiga domänen, så att sitemap, canonical-länkar och Open Graph blir rätt.
