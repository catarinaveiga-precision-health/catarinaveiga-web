/**
 * v2 motion principles · Catarina Veiga
 * Regra: se a animação chama atenção, está errada.
 */

export const motionTokens = {
  fast: 0.18,
  base: 0.28,
  slow: 0.4,
  fadeY: 8,
  ease: [0.32, 0.72, 0, 1] as const,
} as const;

export const fadeUp = {
  initial: { opacity: 0, y: motionTokens.fadeY },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: motionTokens.slow, ease: motionTokens.ease },
};

export const fadeUpDelayed = (delay: number) => ({
  ...fadeUp,
  transition: { ...fadeUp.transition, delay },
});
