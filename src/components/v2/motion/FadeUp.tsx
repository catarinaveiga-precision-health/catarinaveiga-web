import { motion, type HTMLMotionProps } from "framer-motion";
import { fadeUp } from "./principles";

type Props = HTMLMotionProps<"div"> & {
  as?: "div" | "section" | "article" | "header" | "footer";
  delay?: number;
};

export const FadeUp = ({ as = "div", delay, children, ...rest }: Props) => {
  const Cmp = motion[as] as typeof motion.div;
  const transition = delay
    ? { ...fadeUp.transition, delay }
    : fadeUp.transition;

  return (
    <Cmp
      initial={fadeUp.initial}
      whileInView={fadeUp.whileInView}
      viewport={fadeUp.viewport}
      transition={transition}
      {...rest}
    >
      {children}
    </Cmp>
  );
};
