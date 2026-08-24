import { useState } from "react";
import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { FadeUp } from "../motion/FadeUp";

/* Vídeo de apresentação: a conversa dos osteotalks sobre ritmo circadiano,
   o único dos três vídeos do schema que está em português e dirigido a
   quem não é profissional de saúde.

   Facade pattern: até ao clique só carrega a thumbnail (~20 KB); o iframe
   do YouTube (~600 KB de JS) só entra quando a visitante decide ver.
   youtube-nocookie para não plantar cookies antes de qualquer consentimento. */

const VIDEO_ID = "8O_Xs66lKF4";
const VIDEO_TITLE =
  "O papel do ritmo circadiano na saúde · osteotalks com Catarina Veiga";

export const VideoIntro = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <Section bg="paper">
      <Container size="prose">
        <FadeUp className="text-center">
          <Eyebrow>Quem está do outro lado</Eyebrow>
          <h2 className="mt-6 font-serif text-h2-v2 text-v2-ink leading-[1.15] tracking-[-0.01em]">
            Ouve-me antes de marcares.
          </h2>
          <p className="mt-8 font-sans text-body-lg-v2 text-v2-ink-mute leading-[1.55] max-w-[52ch] mx-auto">
            Uma conversa sobre ritmo circadiano e sono, em português. É a
            forma mais rápida de saberes se a minha maneira de explicar te
            serve.
          </p>
        </FadeUp>

        <FadeUp delay={0.1} className="mt-12">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-v2-ink shadow-[0_28px_60px_-24px_rgba(22,53,44,0.55)]">
            {playing ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
                title={VIDEO_TITLE}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`Reproduzir: ${VIDEO_TITLE}`}
                className="group absolute inset-0 w-full h-full cursor-pointer"
              >
                <img
                  src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                  onError={(e) => {
                    e.currentTarget.src = `https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`;
                  }}
                  alt="Catarina Veiga em conversa nos osteotalks sobre ritmo circadiano e sono"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="w-20 h-20 rounded-full bg-white/95 shadow-[0_16px_40px_-10px_rgba(31,36,34,0.5)] flex items-center justify-center transition-transform group-hover:scale-105">
                    <svg
                      width="22"
                      height="26"
                      viewBox="0 0 22 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-1"
                    >
                      <path d="M0 0L22 13L0 26V0Z" fill="#1F2422" />
                    </svg>
                  </span>
                </span>
              </button>
            )}
          </div>
          <p className="mt-5 text-center font-sans text-mono-v2 uppercase tracking-[0.12em] text-v2-ink-mute/80">
            osteotalks · o papel do ritmo circadiano na saúde
          </p>
        </FadeUp>
      </Container>
    </Section>
  );
};
