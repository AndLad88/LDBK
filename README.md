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

- `site` – företagsnamn, beskrivning (för sökmotorer) och domän (`https://ldbk.se`)
- `contactCard` – uppgifterna som sparas i telefonen när kontakt-QR-koden skannas
- `social` – Instagram- och LinkedIn-adresserna som `ldbk.se/instagram` och `ldbk.se/linkedin` vidarebefordrar till

All platshållartext är markerad med **`[PLATSHÅLLARE]`**.

## Visitkort och QR-koder

| QR-kod    | Innehåll                                                                    |
| --------- | --------------------------------------------------------------------------- |
| Website   | Öppnar `https://ldbk.se`                                                    |
| Contact   | Ett vCard – telefonen erbjuder att spara kontakten direkt, även utan internet |
| LinkedIn  | Öppnar `https://ldbk.se/linkedin`, som vidarebefordrar till LinkedIn          |
| Instagram | Öppnar `https://ldbk.se/instagram`, som vidarebefordrar till Instagram        |
| Call      | Ringer upp telefonnumret (bara på webbsidan)                                  |
| Email     | Skapar ett mejl till e-postadressen (bara på webbsidan)                       |
| SMS       | Skapar ett sms till telefonnumret (bara på webbsidan)                         |

- **Ladda ner QR-koderna** som SVG (vektor, bäst för tryck): `/qr/website`, `/qr/contact`, `/qr/linkedin`, `/qr/instagram`, `/qr/call`, `/qr/email` och `/qr/sms`.
- **Skriv ut visitkortet:** skriv ut startsidan från webbläsaren – varje sida blir exakt 85 × 55 mm (välj "Spara som PDF" för att få en fil till tryckeriet).
- Website-, LinkedIn- och Instagram-koderna fungerar först när sidan är publicerad på `ldbk.se`.
- Kontaktkoden innehåller uppgifterna direkt. Ändras kontaktuppgifterna måste korten tryckas om.

## Projektstruktur

```
src/
├── app/
│   ├── page.tsx        # Landningssidan
│   ├── layout.tsx      # Gemensam layout + metadata
│   ├── not-found.tsx   # 404-sida
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
