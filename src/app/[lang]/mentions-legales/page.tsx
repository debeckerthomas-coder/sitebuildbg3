import type { Locale } from "@/dictionaries";

// ============================================================================
// Mentions Légales / Legal Notice — Dynamic FR/EN Page
// ============================================================================

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

const CONTENT = {
  fr: {
    title: "Mentions Légales & Avertissements",
    editor: {
      heading: "Éditeur",
      text: "Le site Faerûn Tactics (et BG3 Honor Companion) est édité par un passionné indépendant.",
    },
    hosting: {
      heading: "Hébergement",
      text: "Ce site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.",
    },
    ip: {
      heading: "Propriété Intellectuelle (Disclaimer)",
      text: "Ce site n'est pas affilié, soutenu ou sponsorisé par Larian Studios ou Wizards of the Coast. Baldur's Gate 3, Donjons & Dragons, ainsi que tous les noms, images et concepts associés sont la propriété de leurs créateurs respectifs. Ce site est un guide de fan à but éducatif.",
    },
    cookies: {
      heading: "Cookies & Données",
      text: "Ce site n'utilise aucun cookie de traçage publicitaire. Les seules données sauvegardées (comme la progression du walkthrough) le sont localement sur votre navigateur (LocalStorage) et ne quittent jamais votre appareil.",
    },
  },
  en: {
    title: "Legal Notice & Disclaimer",
    editor: {
      heading: "Publisher",
      text: "The Faerûn Tactics website (and BG3 Honor Companion) is published by an independent enthusiast.",
    },
    hosting: {
      heading: "Hosting",
      text: "This site is hosted by Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.",
    },
    ip: {
      heading: "Intellectual Property (Disclaimer)",
      text: "This site is not affiliated with, endorsed by, or sponsored by Larian Studios or Wizards of the Coast. Baldur's Gate 3, Dungeons & Dragons, and all associated names, images, and concepts are the property of their respective creators. This site is a fan guide for educational purposes.",
    },
    cookies: {
      heading: "Cookies & Privacy",
      text: "This site does not use any advertising tracking cookies. The only data saved (such as walkthrough progress) is stored locally in your browser (LocalStorage) and never leaves your device.",
    },
  },
} as const;

export default async function MentionsLegalesPage({ params }: PageProps) {
  const { lang } = await params;
  const c = CONTENT[lang] ?? CONTENT.fr;

  const sections = [c.editor, c.hosting, c.ip, c.cookies];

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-10 text-3xl font-bold text-[#fbbf24]">{c.title}</h1>

      {sections.map((section) => (
        <section key={section.heading} className="mb-8">
          <h2 className="mb-2 text-xl font-bold text-[#fbbf24]">
            {section.heading}
          </h2>
          <p className="leading-relaxed text-gray-300">{section.text}</p>
        </section>
      ))}
    </main>
  );
}
