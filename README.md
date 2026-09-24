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

Webbplatsen är ett digitalt visitkort på en helsida, med texterna på engelska: överst "LDBK" med taglinen under, och under det QR-koder vars etiketter också är klickbara länkar. Vid utskrift blir sidan i stället ett tryckbart visitkort i liggande format (85 × 55 mm): framsidan med "LDBK" och baksidan med QR-koderna.

Allt innehåll finns i **`src/data/content.ts`**:

- `site` – företagsnamn och domän (`https://ldbk.se`)
- `contactCard` – uppgifterna som sparas i telefonen när kontakt-QR-koden skannas
- `billing` – faktureringsuppgifter (org.nr, VAT, bankgiro, IBAN m.m.). Tomma fält döljs.
- `social.content` – adressen (t.ex. Instagram) som `ldbk.se/content` vidarebefordrar till

All platshållartext är markerad med **`[PLATSHÅLLARE]`**.

## Språk

Uppe till höger finns en språkväljare (rullgardinsmeny): **English, Deutsch, Français, Español, Italiano, Svenska**.

- Alla texter på alla språk finns i **`src/lib/i18n.ts`** – ändra eller lägg till översättningar där.
- Valt språk sparas i cookien `lang`. Vid första besöket används webbläsarens språk, annars engelska.
- Adresserna är desamma på alla språk, så QR-koderna fungerar oavsett språk.
- Vill du lägga till ett språk: lägg till koden i `src/lib/i18n-config.ts` och en ordlista i `i18n.ts`.

## Visitkort och QR-koder

| QR-kod    | Innehåll                                                                    |
| --------- | --------------------------------------------------------------------------- |
| Website   | Öppnar `https://ldbk.se`                                                    |
| Projects  | Öppnar `https://ldbk.se/projects` – en platshållarsida tills projekten finns (bara på webbsidan) |
| Contact   | Öppnar `https://ldbk.se/contact` – ring, mejla, sms eller spara kontakten (`/contact.vcf`) |
| About     | Öppnar `https://ldbk.se/about` – en platshållarsida tills texten finns          |
| Content   | Öppnar `https://ldbk.se/content`, som vidarebefordrar till Instagram          |
| Billing   | Öppnar `https://ldbk.se/billing` – faktureringsuppgifter med kopieringsknappar (bara på webbsidan) |

- **Färger:** varje QR-kod har en egen färg på webbsidan (`color` i `src/lib/qr.ts`). Det tryckta visitkortet använder svarta koder.
- **Ladda ner QR-koderna** som SVG (vektor, bäst för tryck): `/qr/website`, `/qr/projects`, `/qr/contact`, `/qr/about`, `/qr/content` och `/qr/billing`.
- **Skriv ut visitkortet:** skriv ut startsidan från webbläsaren – varje sida blir exakt 85 × 55 mm (välj "Spara som PDF" för att få en fil till tryckeriet).
- Website-, About-, Contact-, Projects- och Content-koderna fungerar först när sidan är publicerad på `ldbk.se`.
- Kontaktkoden pekar på kontaktsidan, så kontaktuppgifterna kan ändras i `content.ts` utan att korten trycks om.
- Alla QR-koder har samma storlek (version 3, 29 × 29 rutor) så att de ser likadana ut.

## Projektstruktur

```
src/
├── app/
│   ├── page.tsx        # Landningssidan
│   ├── layout.tsx      # Gemensam layout + metadata
│   ├── not-found.tsx   # 404-sida
│   ├── projects/       # Platshållarsida för projekt
│   ├── about/          # Platshållarsida för Om oss
│   ├── contact/        # Ring, mejla, sms och spara kontakt
│   ├── billing/        # Faktureringsuppgifter
│   ├── qr/[type]/      # Nedladdningsbara QR-koder (SVG)
│   ├── contact.vcf/    # Kontaktfil (etiketten "Contact")
│   ├── globals.css     # Designsystem (Tailwind-tema: typsnitt, färger)
│   ├── sitemap.ts      # Genererar /sitemap.xml
│   └── robots.ts       # Genererar /robots.txt
├── data/content.ts     # Allt redigerbart innehåll
└── lib/qr.ts           # Skapar QR-koder och vCard
```

### Designsystem

Projektet använder Tailwind CSS v4, där temat konfigureras direkt i CSS i stället för i en `tailwind.config.js`. Typsnittet (enhetens systemtypsnitt, all text i fet stil), färger och skarpa hörn definieras i `@theme`-blocket i `src/app/globals.css`.

## Driftsättning på Vercel

1. Lägg projektet i ett Git-repo (GitHub, GitLab eller Bitbucket) och pusha.
2. Logga in på [vercel.com](https://vercel.com) och välj **Add New → Project**.
3. Importera repot. Vercel känner automatiskt igen Next.js – inga inställningar behöver ändras.
4. Klicka **Deploy**.
5. Koppla din domän under **Settings → Domains**.

Varje ny push till huvudgrenen driftsätts sedan automatiskt, och andra grenar får egna förhandsversioner.

> Koppla domänen `ldbk.se` (utan www) i Vercel, eftersom QR-koderna pekar dit. Lägg gärna till `www.ldbk.se` som omdirigering till `ldbk.se`.
