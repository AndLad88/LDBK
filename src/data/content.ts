/**
 * Allt redigerbart innehåll för webbplatsen samlas här.
 * Ändra texter, tjänster, projekt och kontaktuppgifter i den här filen –
 * komponenterna behöver inte röras.
 *
 * Text markerad med [PLATSHÅLLARE] ska bytas ut mot riktigt innehåll.
 */

export const site = {
  name: "LDBK",
  // TODO: Byt till den riktiga domänen innan driftsättning.
  url: "https://www.ldbk.se",
  slogan: "Vi bygger med precision.",
  description:
    "[PLATSHÅLLARE] LDBK erbjuder projektledning, byggledning, konstruktion och renovering – från första skiss till färdig byggnad.",
};

export const contact = {
  // [PLATSHÅLLARE] Byt ut mot riktiga kontaktuppgifter.
  address: {
    street: "Exempelgatan 1",
    postalCode: "111 22",
    city: "Stockholm",
  },
  phone: "08-123 45 67",
  // Telefonnumret i internationellt format för tel:-länkar.
  phoneHref: "+4681234567",
  email: "info@ldbk.se",
  orgNumber: "556000-0000",
  openingHours: "Mån–fre 08.00–17.00",
};

export const navigation = [
  { label: "Tjänster", href: "/tjanster" },
  { label: "Projekt", href: "/projekt" },
  { label: "Om oss", href: "/om-oss" },
  { label: "Kontakt", href: "/kontakt" },
] as const;

export type Service = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  points: string[];
};

export const services: Service[] = [
  {
    slug: "projektledning",
    title: "Projektledning",
    summary:
      "[PLATSHÅLLARE] Vi håller ihop hela byggprocessen – tid, budget och kvalitet.",
    description:
      "[PLATSHÅLLARE] Som projektledare representerar vi beställaren genom hela projektet. Vi planerar, upphandlar och följer upp så att projektet levereras i tid, inom budget och med rätt kvalitet.",
    points: ["Tidplanering", "Upphandling", "Kostnadsstyrning", "Riskhantering"],
  },
  {
    slug: "byggledning",
    title: "Byggledning",
    summary:
      "[PLATSHÅLLARE] Närvarande ledning på plats som säkerställer utförandet.",
    description:
      "[PLATSHÅLLARE] Vår byggledning finns på plats och ser till att arbetet utförs enligt handlingar, avtal och gällande regelverk. Vi samordnar entreprenörer och håller beställaren informerad.",
    points: ["Samordning", "Kvalitetskontroll", "Byggmöten", "Arbetsmiljö"],
  },
  {
    slug: "konstruktion",
    title: "Konstruktion",
    summary:
      "[PLATSHÅLLARE] Hållbara och genomtänkta konstruktionslösningar.",
    description:
      "[PLATSHÅLLARE] Vi tar fram konstruktionshandlingar och beräkningar för nybyggnation, tillbyggnad och ombyggnad – med fokus på säkerhet, beständighet och resurseffektivitet.",
    points: ["Bärande konstruktioner", "Beräkningar", "Bygghandlingar", "Tekniska utredningar"],
  },
  {
    slug: "renovering",
    title: "Renovering",
    summary:
      "[PLATSHÅLLARE] Varsam förnyelse av befintliga byggnader.",
    description:
      "[PLATSHÅLLARE] Vi planerar och genomför renoveringar av bostäder, kontor och fastigheter. Med respekt för byggnadens karaktär skapar vi funktionella och tidlösa miljöer.",
    points: ["Stambyten", "Fasadrenovering", "Invändig ombyggnad", "Energieffektivisering"],
  },
];

export type Project = {
  slug: string;
  title: string;
  location: string;
  year: number;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "kvarteret-linden",
    title: "Kvarteret Linden",
    location: "Stockholm",
    year: 2025,
    category: "Projektledning",
    description:
      "[PLATSHÅLLARE] Nyproduktion av 48 bostadsrätter i fem våningar med gemensam innergård.",
    image: "/images/projekt-1.png",
    imageAlt: "Platshållarbild: flerbostadshus i gråskala",
    featured: true,
  },
  {
    slug: "hamnkontoret",
    title: "Hamnkontoret",
    location: "Göteborg",
    year: 2024,
    category: "Byggledning",
    description:
      "[PLATSHÅLLARE] Ombyggnad av tidigare lagerlokal till moderna kontor för 120 arbetsplatser.",
    image: "/images/projekt-2.png",
    imageAlt: "Platshållarbild: kontorsbyggnad i gråskala",
    featured: true,
  },
  {
    slug: "villa-ek",
    title: "Villa Ek",
    location: "Uppsala",
    year: 2024,
    category: "Konstruktion",
    description:
      "[PLATSHÅLLARE] Enbostadshus i massivträ med stora glaspartier och fribärande tak.",
    image: "/images/projekt-3.png",
    imageAlt: "Platshållarbild: villa i gråskala",
    featured: true,
  },
  {
    slug: "brf-solgarden",
    title: "Brf Solgården",
    location: "Västerås",
    year: 2023,
    category: "Renovering",
    description:
      "[PLATSHÅLLARE] Stambyte och fasadrenovering av 1960-talsfastighet med 72 lägenheter.",
    image: "/images/projekt-4.png",
    imageAlt: "Platshållarbild: bostadsfastighet i gråskala",
  },
  {
    slug: "skolan-norr",
    title: "Skolan Norr",
    location: "Umeå",
    year: 2023,
    category: "Projektledning",
    description:
      "[PLATSHÅLLARE] Tillbyggnad av grundskola med nya klassrum, matsal och idrottshall.",
    image: "/images/projekt-5.png",
    imageAlt: "Platshållarbild: skolbyggnad i gråskala",
  },
  {
    slug: "kajhuset",
    title: "Kajhuset",
    location: "Malmö",
    year: 2022,
    category: "Byggledning",
    description:
      "[PLATSHÅLLARE] Kombinerat bostads- och kommersiellt hus vid vattnet med butiker i bottenplan.",
    image: "/images/projekt-6.png",
    imageAlt: "Platshållarbild: byggnad vid kaj i gråskala",
  },
];

export const home = {
  hero: {
    title: "Vi bygger med precision.",
    lead: "[PLATSHÅLLARE] Projektledning, byggledning, konstruktion och renovering för beställare som ställer höga krav.",
    cta: "Kontakta oss",
    image: "/images/hero.png",
    imageAlt: "Platshållarbild: abstrakt stadssiluett i gråskala",
  },
  intro: {
    eyebrow: "Om LDBK",
    title: "Tydliga processer. Hållbara resultat.",
    text: "[PLATSHÅLLARE] LDBK är ett byggkonsultföretag som leder och genomför projekt från tidigt skede till färdig byggnad. Vi kombinerar teknisk kunskap med ett strukturerat arbetssätt och ett öga för detaljer.",
  },
  cta: {
    title: "Har du ett projekt på gång?",
    text: "[PLATSHÅLLARE] Berätta om dina planer så återkommer vi inom en arbetsdag.",
    button: "Kontakta oss",
  },
};

export const about = {
  title: "Om oss",
  lead: "[PLATSHÅLLARE] Vi tror på enkelhet, noggrannhet och ärlighet – i både byggnader och samarbeten.",
  image: "/images/om-oss.png",
  imageAlt: "Platshållarbild: byggnadsdetalj i gråskala",
  history: [
    "[PLATSHÅLLARE] LDBK grundades 2015 med en tydlig idé: att byggprojekt blir bättre när de leds med struktur, tydlig kommunikation och teknisk skärpa.",
    "[PLATSHÅLLARE] Sedan starten har vi medverkat i över 100 projekt – från villor och bostadsrättsföreningar till skolor och kommersiella fastigheter.",
  ],
  values: [
    {
      title: "Precision",
      text: "[PLATSHÅLLARE] Vi arbetar noggrant i varje skede och lämnar ingenting åt slumpen.",
    },
    {
      title: "Transparens",
      text: "[PLATSHÅLLARE] Öppen kommunikation om tid, kostnad och risker – hela vägen.",
    },
    {
      title: "Hållbarhet",
      text: "[PLATSHÅLLARE] Vi väljer lösningar som håller över tid, för människor och miljö.",
    },
  ],
  stats: [
    { value: "10+", label: "År i branschen" },
    { value: "100+", label: "Genomförda projekt" },
    { value: "12", label: "Medarbetare" },
  ],
  team: [
    { name: "Förnamn Efternamn", role: "VD & Projektledare" },
    { name: "Förnamn Efternamn", role: "Byggledare" },
    { name: "Förnamn Efternamn", role: "Konstruktör" },
    { name: "Förnamn Efternamn", role: "Projektingenjör" },
  ],
};
