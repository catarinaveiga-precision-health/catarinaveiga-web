import { useLanguage } from "@/contexts/LanguageContext";

const LegalBand = () => {
  const { t } = useLanguage();
  return (
    <section className="bg-v2-moss py-6 px-6">
      {/* Aviso so para visitantes: e desenhado pelo React no browser (nao entra
          no HTML pre-renderizado nem no llms.txt, que e o que os bots de IA
          leem) e data-nosnippet tira-o dos snippets e resumos de IA do Google. */}
      <p data-nosnippet="" className="text-center text-v2-paper/60 text-xs max-w-4xl mx-auto leading-relaxed mb-4">
        {t("legal.text")}
      </p>
      <div className="flex justify-center">
        <a
          href="https://www.livroreclamacoes.pt/Inicio/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-v2-paper/40 hover:text-v2-paper/70 text-[11px] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
          {t("legal.complaints")}
        </a>
      </div>
    </section>
  );
};

export default LegalBand;
