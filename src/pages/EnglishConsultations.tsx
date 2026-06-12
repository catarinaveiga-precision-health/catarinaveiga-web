import { Helmet } from "react-helmet-async";
import { useFadeUp } from "@/hooks/useFadeUp";
import { Separator } from "@/components/ui/separator";
import { NavbarV2 } from "@/components/v2/layout/NavbarV2";
import { FooterV2 } from "@/components/v2/layout/FooterV2";
import catarinaHero from "@/assets/catarina-hero.jpg";
import catarinaPortrait from "@/assets/catarina-sobre-portrait.jpg";
import notesImage from "@/assets/en-consult-notes.jpg";
import deskImage from "@/assets/en-consult-desk.jpg";

const BOOKING_URL = "https://catarinaveigaagendamento.as.me/";

const BookButton = ({ label = "Book a consultation", light = false }: { label?: string; light?: boolean }) => (
  <a
    href={BOOKING_URL}
    target="_blank"
    rel="noopener noreferrer"
    className={
      light
        ? "inline-block bg-v2-paper text-v2-ink font-sans text-sm tracking-[0.14em] uppercase px-10 py-4 hover:bg-transparent hover:text-v2-paper border border-v2-paper transition-colors"
        : "inline-block bg-v2-golden text-white font-sans text-sm tracking-[0.14em] uppercase px-10 py-4 hover:bg-v2-golden-deep transition-colors"
    }
  >
    {label}
  </a>
);

const SectionDivider = () => (
  <div className="max-w-5xl mx-auto px-6">
    <Separator className="bg-v2-paper-deep" />
  </div>
);

/* ── HERO ── */
const Hero = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-v2-paper section-padding pt-32">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="fade-up inline-block label-uppercase text-v2-golden text-xs mb-6">
            Fatigue · Perimenopause · Sleep · Anxiety · Persistent symptoms
          </span>
          <h1 className="fade-up font-serif text-4xl md:text-5xl text-v2-ink mb-6 leading-tight font-light">
            You've been told everything looks normal.
            <br />
            <span className="italic text-v2-sage">So why don't you feel normal?</span>
          </h1>
          <p className="fade-up text-v2-ink-mute mb-4 max-w-[520px]">
            Many women spend years looking for answers. Their symptoms are real. Yet they are
            repeatedly told that everything looks normal.
          </p>
          <p className="fade-up text-v2-ink mb-4 max-w-[520px]">
            Fatigue. Poor sleep. Anxiety. Brain fog. Weight changes. Digestive symptoms.
          </p>
          <p className="fade-up font-serif italic text-xl text-v2-sage mb-8">
            If this sounds familiar, you are not alone.
          </p>
          <div className="fade-up">
            <BookButton />
            <p className="text-sm text-v2-ink-mute mt-4">
              After booking, you will receive a short intake questionnaire by email.
            </p>
            <p className="text-sm text-v2-ink-mute mt-3">
              Online consultations worldwide · In-person in Parede, Cascais
              <br />
              Consultations in English and Portuguese
            </p>
          </div>
        </div>
        <div className="fade-up">
          <img
            src={catarinaHero}
            alt="Catarina Veiga, women's health practitioner"
            className="w-full aspect-[4/5] object-cover border border-v2-paper-line"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
};

/* ── CONCERNS ── */
const SYMPTOMS = [
  "Fatigue",
  "Poor sleep",
  "Anxiety",
  "Brain fog",
  "Perimenopause symptoms",
  "Digestive complaints",
  "Weight gain",
  "Low resilience to stress",
];

const Concerns = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-v2-paper-deep section-padding">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="fade-up inline-block label-uppercase text-v2-golden text-xs mb-6">
            Common concerns
          </span>
          <h2 className="fade-up font-serif text-3xl md:text-4xl text-v2-ink mb-6 font-light">
            Perhaps it isn't "just stress"
          </h2>
          <p className="fade-up text-v2-ink-mute mb-2">Many women arrive after years of searching for answers.</p>
          <p className="fade-up text-v2-ink-mute mb-2">They have seen multiple practitioners.</p>
          <p className="fade-up text-v2-ink-mute mb-2">
            Their blood tests often fall within conventional laboratory ranges.
          </p>
          <p className="fade-up text-v2-ink-mute mb-6">Yet they still feel unwell.</p>
          <ul className="fade-up grid grid-cols-2 gap-x-8">
            {SYMPTOMS.map((s) => (
              <li key={s} className="py-2 border-b border-v2-paper-line text-v2-ink text-[15px]">
                <span className="text-v2-golden mr-3 text-[9px] align-[2px]">◆</span>
                {s}
              </li>
            ))}
          </ul>
          <div className="fade-up mt-9">
            <BookButton />
            <p className="text-sm text-v2-ink-mute mt-4">
              Online worldwide · In-person in Parede, Cascais
            </p>
          </div>
        </div>
        <div className="fade-up">
          <img
            src={notesImage}
            alt="Woman working at a table, reviewing notes"
            className="w-full aspect-[4/3] object-cover border border-v2-paper-line"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

/* ── APPROACH ── */
const LENSES = [
  "Your symptoms",
  "Your history",
  "Your lifestyle",
  "Your laboratory results",
  "Your hormonal and metabolic context",
];

const Approach = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} id="approach" className="bg-v2-paper section-padding">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="fade-up order-2 md:order-1">
          <img
            src={deskImage}
            alt="Desk with papers, tea and notebook by a window"
            className="w-full aspect-[4/3] object-cover border border-v2-paper-line"
            loading="lazy"
          />
        </div>
        <div className="order-1 md:order-2">
          <span className="fade-up inline-block label-uppercase text-v2-golden text-xs mb-6">
            The approach
          </span>
          <h2 className="fade-up font-serif text-3xl md:text-4xl text-v2-ink mb-6 font-light">
            A more integrated way of looking at symptoms
          </h2>
          <p className="fade-up text-v2-ink-mute mb-6">
            Instead of focusing on a single symptom, I look at the wider picture.
          </p>
          <ol className="fade-up mb-6">
            {LENSES.map((l, i) => (
              <li
                key={l}
                className="font-serif text-xl text-v2-ink py-3 border-b border-v2-paper-line first:border-t"
              >
                <span className="font-sans text-xs tracking-[0.2em] text-v2-golden mr-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {l}
              </li>
            ))}
          </ol>
          <p className="fade-up text-v2-ink-mute mb-1">The goal is not simply to label symptoms.</p>
          <p className="fade-up text-v2-ink-mute">The goal is to understand patterns.</p>
        </div>
      </div>
    </section>
  );
};

/* ── FOCUS AREAS ── */
const AREAS = [
  { title: "Perimenopause and menopause", note: "When your body suddenly feels unfamiliar." },
  { title: "Persistent fatigue", note: "You wake up tired, even after a full night's sleep." },
  { title: "Anxiety and sleep disruption", note: "When your mind won't switch off." },
  { title: "Digestive symptoms", note: "When food becomes unpredictable." },
  { title: "Weight and metabolic health", note: "When your body no longer responds the way it used to." },
  { title: "Autoimmune-related concerns", note: "When symptoms seem disconnected but keep appearing." },
];

const FocusAreas = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-v2-paper-deep section-padding">
      <div className="max-w-5xl mx-auto">
        <span className="fade-up inline-block label-uppercase text-v2-golden text-xs mb-6">
          Areas of focus
        </span>
        <h2 className="fade-up font-serif text-3xl md:text-4xl text-v2-ink mb-10 font-light">
          Women I commonly work with
        </h2>
        <div className="fade-up grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-v2-paper-line border border-v2-paper-line">
          {AREAS.map((a, i) => (
            <div key={a.title} className="bg-v2-paper p-9">
              <span className="block font-sans text-xs tracking-[0.2em] text-v2-golden mb-4">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-2xl text-v2-ink font-light leading-snug">{a.title}</h3>
              <p className="text-v2-ink-mute italic text-[15px] mt-3">{a.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── ABOUT ── */
const About = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-v2-paper section-padding">
      <div className="max-w-5xl mx-auto grid md:grid-cols-[0.85fr_1.15fr] gap-12 items-center">
        <div className="fade-up">
          <img
            src={catarinaPortrait}
            alt="Catarina Veiga, professional portrait"
            className="w-full aspect-[3/4] object-cover border border-v2-paper-line"
            loading="lazy"
          />
        </div>
        <div>
          <span className="fade-up inline-block label-uppercase text-v2-golden text-xs mb-6">About</span>
          <h2 className="fade-up font-serif text-3xl md:text-4xl text-v2-ink mb-6 font-light">
            Meet Catarina Veiga
          </h2>
          <p className="fade-up text-v2-ink-mute mb-4">
            For nearly two decades I have worked with women experiencing complex, persistent health
            concerns.
          </p>
          <p className="fade-up text-v2-ink-mute mb-4">
            Many arrive feeling frustrated because they have been told that everything is normal while
            continuing to struggle with symptoms.
          </p>
          <p className="fade-up text-v2-ink-mute mb-4">
            My work combines a functional perspective with a personalised and practical approach.
          </p>
          <p className="fade-up text-v2-ink-mute mb-6">
            I offer consultations in both English and Portuguese.
          </p>
          <p className="fade-up font-serif italic text-xl text-v2-sage">Catarina Veiga</p>
        </div>
      </div>
    </section>
  );
};

/* ── TESTIMONIAL ── */
const Testimonial = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-v2-paper py-20">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <blockquote className="fade-up">
          <p className="font-serif italic text-2xl md:text-3xl text-v2-ink leading-relaxed mb-5">
            "What I needed most was someone who could help me understand what was happening to my
            body."
          </p>
          <cite className="not-italic font-sans text-xs tracking-[0.18em] uppercase text-v2-golden">
            Client, Portugal
          </cite>
        </blockquote>
      </div>
    </section>
  );
};

/* ── CONSULTATIONS ── */
const Consultations = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} id="consultations" className="bg-v2-paper-deep section-padding">
      <div className="max-w-5xl mx-auto">
        <span className="fade-up inline-block label-uppercase text-v2-golden text-xs mb-6">
          Working together
        </span>
        <h2 className="fade-up font-serif text-3xl md:text-4xl text-v2-ink mb-10 font-light">
          Consultation options
        </h2>
        <div className="fade-up grid md:grid-cols-2 gap-px bg-v2-paper-line border border-v2-paper-line mb-10">
          <div className="bg-v2-paper p-10">
            <h3 className="font-serif text-2xl text-v2-ink font-light mb-1">Initial Consultation</h3>
            <span className="block font-sans text-xs tracking-[0.16em] uppercase text-v2-golden mb-4">
              60–90 minutes
            </span>
            <p className="font-serif text-3xl text-v2-ink mb-4">€120</p>
            <p className="text-v2-ink-mute text-[15px]">
              Comprehensive review of symptoms, history and available laboratory data.
            </p>
            <p className="text-v2-ink-mute text-sm mt-4">
              Online worldwide or in-person in Parede, Cascais
            </p>
          </div>
          <div className="bg-v2-paper p-10">
            <h3 className="font-serif text-2xl text-v2-ink font-light mb-1">Follow-Up Consultation</h3>
            <span className="block font-sans text-xs tracking-[0.16em] uppercase text-v2-golden mb-4">
              Ongoing care
            </span>
            <p className="text-v2-ink-mute text-[15px]">Progress review and ongoing support.</p>
          </div>
        </div>
        <div className="fade-up">
          <BookButton label="Book Consultation" />
          <p className="text-sm text-v2-ink-mute mt-4">
            After booking, you will receive a short intake questionnaire by email.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ── FAQ ── */
const FAQS = [
  {
    q: "Do I need to live in Portugal?",
    a: ["No. Online consultations are available internationally."],
  },
  {
    q: "Do I need blood tests?",
    a: ["Not necessarily. Existing results can often provide useful context."],
  },
  {
    q: "Do you prescribe medication?",
    a: [
      "No.",
      "Consultations do not replace medical care and should not be considered a medical diagnosis or treatment.",
    ],
  },
  {
    q: "Can consultations be held in English?",
    a: ["Yes. Consultations are available in English and Portuguese."],
  },
];

const Faq = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-v2-paper section-padding">
      <div className="max-w-3xl mx-auto">
        <span className="fade-up inline-block label-uppercase text-v2-golden text-xs mb-6">
          Common questions
        </span>
        <h2 className="fade-up font-serif text-3xl md:text-4xl text-v2-ink mb-8 font-light">
          Frequently Asked Questions
        </h2>
        <div className="fade-up">
          {FAQS.map((f) => (
            <details key={f.q} className="group border-b border-v2-paper-line first:border-t">
              <summary className="font-serif text-xl text-v2-ink py-5 pr-10 cursor-pointer list-none relative">
                {f.q}
                <span className="absolute right-1 top-1/2 -translate-y-1/2 font-sans text-xl font-light text-v2-golden transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="pb-6 text-v2-ink-mute max-w-[58ch]">
                {f.a.map((p) => (
                  <p key={p} className="mb-2 last:mb-0">
                    {p}
                  </p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── FINAL CTA ── */
const FinalCta = () => {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="bg-v2-moss py-24 text-center">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="fade-up font-serif text-4xl md:text-5xl text-v2-paper mb-6 font-light">
          You know your body.
        </h2>
        <p className="fade-up text-v2-paper/85 mb-10">
          If something feels wrong, even when everything appears normal, it may be time to look at the
          picture differently.
        </p>
        <div className="fade-up">
          <BookButton light />
          <p className="text-sm text-v2-paper/70 mt-6">
            After booking, you will receive a short intake questionnaire by email.
            <br />
            Online worldwide · In-person in Parede, Cascais
          </p>
        </div>
      </div>
    </section>
  );
};

/* ── PAGE ── */
const EnglishConsultations = () => (
  <>
    <Helmet>
      <title>Women's Health &amp; Perimenopause Support in Portugal | Catarina Veiga</title>
      <meta
        name="description"
        content="English-speaking consultations for women experiencing fatigue, poor sleep, anxiety, perimenopause symptoms and persistent health concerns. Online and in Cascais, Portugal."
      />
      <link rel="canonical" href="https://www.catarinaveiga.com/english-consultations" />
      <meta property="og:title" content="Women's Health &amp; Perimenopause Support in Portugal | Catarina Veiga" />
      <meta
        property="og:description"
        content="English-speaking consultations for women experiencing fatigue, poor sleep, anxiety, perimenopause symptoms and persistent health concerns. Online and in Cascais, Portugal."
      />
      <meta property="og:url" content="https://www.catarinaveiga.com/english-consultations" />
      <meta property="og:type" content="website" />
    </Helmet>
    <NavbarV2 />
    <main>
      <Hero />
      <Concerns />
      <Approach />
      <FocusAreas />
      <SectionDivider />
      <About />
      <Testimonial />
      <Consultations />
      <Faq />
      <FinalCta />
    </main>
    <section className="bg-v2-paper py-10 text-center">
      <p className="text-sm text-v2-ink-mute max-w-[64ch] mx-auto px-6">
        Consultations do not replace medical care and should not be considered a medical diagnosis or
        treatment.
      </p>
    </section>
    <FooterV2 />
  </>
);

export default EnglishConsultations;
