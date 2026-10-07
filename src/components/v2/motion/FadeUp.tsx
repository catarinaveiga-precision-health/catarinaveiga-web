import { motion, type HTMLMotionProps } from "framer-motion";
import { fadeUp } from "./principles";

type Props = HTMLMotionProps<"div"> & {
  as?: "div" | "section" | "article" | "header" | "footer";
  delay?: number;
  /** Anima ao montar, sem esperar pelo observador de scroll. Para o que
      está acima da dobra: em telemóvel, o whileInView deixava o hero a
      opacidade 0 até ao primeiro scroll. */
  eager?: boolean;
};

export const FadeUp = ({ as = "div", delay, eager, children, ...rest }: Props) => {
  const Cmp = motion[as] as typeof motion.div;
  const transition = delay
    ? { ...fadeUp.transition, delay }
    : fadeUp.transition;

  return (
    <Cmp
      initial={fadeUp.initial}
      {...(eager
        ? { animate: fadeUp.whileInView }
        : { whileInView: fadeUp.whileInView, viewport: fadeUp.viewport })}
      transition={transition}
      {...rest}
    >
      {children}
    </Cmp>
  );
};
