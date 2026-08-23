import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { FadeUp } from "../motion/FadeUp";

const colunas = ["Consulta de rotina", "Análises online", "Esta consulta"];

const linhas: { criterio: string; celulas: string[] }[] = [
  {
    criterio: "Tempo contigo",
    celulas: ["15 minutos", "nenhum", "90 minutos"],
  },
  {
    criterio: "Como lê os valores",
    celulas: [
      "um a um, contra o intervalo de referência",
      "automático, sem contexto",
      "cruzados entre si, com intervalos funcionais",
    ],
  },
  {
    criterio: "Usa as análises antigas",
    celulas: ["raramente", "não", "sim, são as mais úteis"],
  },
  {
    criterio: "Diagnóstico e receita",
    celulas: ["sim", "não", "não, encaminho"],
  },
  {
    criterio: "Plano escrito no fim",
    celulas: ["não", "um relatório automático", "sim, e fica contigo"],
  },
];

export const Comparison = () => (
  <Section bg="paper-deep">
    <Container size="default">
      <FadeUp>
        <Eyebrow>O que muda</Eyebrow>
        <h2 className="mt-6 font-serif text-h2-v2 text-v2-ink leading-[1.15] tracking-[-0.01em] max-w-[22ch]">
          Já tentaste as outras duas.
        </h2>
        <p className="mt-8 font-sans text-body-lg-v2 text-v2-ink-mute leading-[1.55] max-w-[52ch]">
          Não é que estejam erradas. Respondem a perguntas diferentes da que
          te trouxe aqui.
        </p>
      </FadeUp>

      <FadeUp delay={0.1} className="mt-14">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse bg-v2-paper">
            <caption className="sr-only">
              Comparação entre a consulta de rotina, os serviços de análises
              online e a consulta inicial de medicina funcional integrativa
            </caption>
            <thead>
              <tr>
                <th scope="col" className="w-[22%]">
                  <span className="sr-only">Critério</span>
                </th>
                {colunas.map((c, i) => (
                  <th
                    key={c}
                    scope="col"
                    className={[
                      "px-5 py-5 text-left align-bottom font-sans text-[11px] uppercase tracking-[0.14em] font-normal",
                      i === 2
                        ? "bg-v2-sage text-v2-paper"
                        : "text-v2-ink-mute",
                    ].join(" ")}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {linhas.map(({ criterio, celulas }) => (
                <tr key={criterio} className="border-t border-v2-paper-line">
                  <th
                    scope="row"
                    className="px-5 py-6 text-left align-top font-sans text-body-sm-v2 font-normal text-v2-ink"
                  >
                    {criterio}
                  </th>
                  {celulas.map((cel, i) => (
                    <td
                      key={i}
                      className={[
                        "px-5 py-6 align-top font-sans text-body-sm-v2 leading-[1.6]",
                        i === 2
                          ? "bg-v2-sage/[0.14] text-v2-ink font-medium"
                          : "text-v2-ink-mute",
                      ].join(" ")}
                    >
                      {cel}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FadeUp>
    </Container>
  </Section>
);
