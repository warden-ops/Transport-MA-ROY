import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CallButton } from "@/components/CallButton";
import { CtaLink } from "@/components/CtaLink";
import type { AppLocale } from "@/i18n/routing";
import { pageMeta } from "@/lib/metadata";

const FAQ_KEYS = ["1", "2", "3", "4", "5"] as const;

export async function generateMetadata() {
  return pageMeta("sherbrooke");
}

export default async function SherbrookePage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("sherbrooke");

  const formats = [
    { title: t("size20Title"), body: t("size20Body"), mark: "20'" },
    { title: t("size40Title"), body: t("size40Body"), mark: "40'" },
    { title: t("sideTitle"), body: t("sideBody"), mark: "40'" },
    { title: t("reeferTitle"), body: t("reeferBody"), mark: "40'" },
  ];

  const uses = [
    { title: t("useStorageTitle"), body: t("useStorageBody") },
    { title: t("useSiteTitle"), body: t("useSiteBody") },
    { title: t("useFarmTitle"), body: t("useFarmBody") },
    { title: t("useShopTitle"), body: t("useShopBody") },
  ];

  const faqs = FAQ_KEYS.map((key) => ({
    question: t(`q${key}`),
    answer: t(`a${key}`),
  }));

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="site-grid grid gap-10 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-8">
          <h1 className="text-[clamp(2.4rem,5.4vw,4.2rem)] uppercase">{t("title")}</h1>
          <p className="mt-4 text-sm text-steel">{t("formerName")}</p>
        </div>
        <p className="measure text-dust md:col-span-4 md:self-end">{t("lead")}</p>
      </section>

      <div className="relative h-[42vw] min-h-56 max-h-[460px]">
        <Image
          src="/media/hero-conteneur-40-pieds-vert-ovl-sans-logo-1284.webp"
          alt={t("photoAlt")}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      <section className="site-grid py-16 md:py-24">
        <h2 className="text-[clamp(2rem,4vw,3.2rem)] uppercase">{t("formatsTitle")}</h2>
        <p className="measure mt-4 text-dust">{t("formatsLead")}</p>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {formats.map((item) => (
            <article key={item.title} className="border-t-2 border-corten pt-4">
              <p className="stencil text-5xl text-corten">{item.mark}</p>
              <h3 className="mt-3 font-display text-2xl uppercase">{item.title}</h3>
              <p className="mt-3 text-dust">{item.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-12 max-w-3xl border-t border-line pt-8">
          <h2 className="font-display text-3xl uppercase">{t("conditionTitle")}</h2>
          <p className="measure mt-4 text-dust">{t("conditionBody")}</p>
        </div>
      </section>

      <section className="border-t border-line bg-ink-soft">
        <div className="site-grid grid gap-8 py-16 md:grid-cols-12 md:py-24">
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] uppercase md:col-span-5">
            {t("deliveryTitle")}
          </h2>
          <p className="measure text-dust md:col-span-7 md:self-end">{t("deliveryBody")}</p>
        </div>
      </section>

      <section className="site-grid py-16 md:py-24">
        <h2 className="text-[clamp(2rem,4vw,3.2rem)] uppercase">{t("usesTitle")}</h2>
        <p className="measure mt-4 text-dust">{t("usesLead")}</p>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {uses.map((item) => (
            <div key={item.title}>
              <h3 className="font-display text-2xl uppercase">{item.title}</h3>
              <p className="mt-3 text-dust">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-ink-soft">
        <div className="site-grid py-16 md:py-24">
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] uppercase">{t("faqTitle")}</h2>
          <div className="mt-10 flex flex-col gap-8">
            {faqs.map((faq) => (
              <div key={faq.question} className="border-t border-line pt-6">
                <h3 className="font-display text-2xl uppercase">{faq.question}</h3>
                <p className="measure mt-3 text-dust">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0f0e0c] text-white">
        <div className="site-grid py-16 md:py-24">
          <h2 className="max-w-[22ch] text-[clamp(2.2rem,5vw,4rem)] uppercase">{t("ctaTitle")}</h2>
          <p className="measure mt-5 text-white/80">{t("ctaBody")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaLink href="/contact#devis" variant="light">
              {t("ctaButton")}
            </CtaLink>
            <CallButton variant="light" />
          </div>
        </div>
      </section>
    </>
  );
}
