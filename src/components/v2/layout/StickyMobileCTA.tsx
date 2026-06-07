import { useEffect, useState } from "react";
import { ButtonV2 } from "../ui/ButtonV2";

export const StickyMobileCTA = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-4 inset-x-4 z-40 transition-[opacity,transform] duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ButtonV2
        as="a"
        href="https://catarinaveigaagendamento.as.me/"
        size="lg"
        className="w-full"
      >
        Marcar consulta inicial · €120
      </ButtonV2>
    </div>
  );
};
