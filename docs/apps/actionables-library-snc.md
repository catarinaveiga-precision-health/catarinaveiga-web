# Biblioteca de Actionables · Regulação do Sistema Nervoso (v1)

> Extraídos do seed clínico `aletheia-snc-mode-seed.sql`.
> Estruturados em categorias independentes — cada actionable é atómico,
> atribuível individualmente a uma utilizadora, e mensurável por threshold binário.

---

## Estrutura

Cada actionable tem:
- **`id`** — único, kebab-case, prefixo `snc-`
- **`category`** — uma das 4 categorias abaixo
- **`tier`** — `easy` · `medium` · `hard`
- **`threshold`** — regra clara de "feito sim/não"
- **`why`** — porquê em 1-2 frases (voz clínica da Catarina)
- **`source`** — referência ao seed + autor científico/protocolo

---

## 4 Categorias

| # | Categoria | Actionables |
|---|---|---|
| 1 | **Reset matinal · activação parassimpática** | 6 |
| 2 | **Activação directa do vago · ao longo do dia** | 7 |
| 3 | **Pausas diurnas · prevenção de exaustão simpática** | 6 |
| 4 | **Ritual nocturno · transição para descanso profundo** | 6 |

**Total: 25 actionables atómicos.**

---

## 1 · Reset matinal · activação parassimpática

### `snc-nsdr-morning-10`
**NSDR ou Yoga Nidra de 10 minutos ao acordar.**
- **category:** Reset matinal · activação parassimpática
- **tier:** easy
- **threshold:** 10 minutos de NSDR ou Yoga Nidra até 1 hora após acordar
- **why:** Dá ao sistema nervoso uma primeira âncora de segurança antes da activação do dia. É útil quando há hiperalerta logo ao acordar ou tendência para começar o dia em aceleração.
- **source:** seed `aletheia-snc-mode-seed.sql` ponto 1 · Huberman Lab NSDR Protocol · Ally Boothroyd Yoga Nidra

### `snc-nsdr-morning-20`
**NSDR ou Yoga Nidra de 20 minutos ao acordar.**
- **category:** Reset matinal · activação parassimpática
- **tier:** medium
- **threshold:** 20 minutos de NSDR ou Yoga Nidra até 1 hora após acordar
- **why:** Prolonga a janela de recuperação autonómica e ajuda a reduzir reactividade antes de exposição a estímulos externos. É uma opção para dias em que o corpo acorda cansado, tenso ou em alerta.
- **source:** seed `aletheia-snc-mode-seed.sql` ponto 1 · Huberman Lab NSDR Protocol · Ally Boothroyd Yoga Nidra

### `snc-yoga-nidra-audio`
**Yoga Nidra guiado antes de trabalho, mensagens ou redes sociais.**
- **category:** Reset matinal · activação parassimpática
- **tier:** easy
- **threshold:** ouvir uma prática guiada de Yoga Nidra com duração mínima de 10 minutos antes de iniciar trabalho, mensagens ou redes sociais
- **why:** A prática guiada reduz a carga de decisão e torna a regulação mais acessível em dias de baixa capacidade executiva. Mantém o foco na descida autonómica sem exigir planeamento.
- **source:** seed `aletheia-snc-mode-seed.sql` ponto 1 · Ally Boothroyd Yoga Nidra · tradição Yoga Nidra/Iyengar

### `snc-dry-brushing-3`
**Dry brushing matinal de 3 minutos.**
- **category:** Reset matinal · activação parassimpática
- **tier:** easy
- **threshold:** 3 minutos de dry brushing antes do banho, com movimentos das extremidades para o coração
- **why:** A estimulação táctil rítmica ajuda a trazer o corpo para presença e pode apoiar activação linfática leve. É uma entrada simples pela via sensorial quando a mente está dispersa.
- **source:** seed `aletheia-snc-mode-seed.sql` ponto 4 · Polyvagal Theory, Stephen Porges · prática somática sensorial [ref a confirmar]

### `snc-dry-brushing-5`
**Dry brushing matinal completo de 5 minutos.**
- **category:** Reset matinal · activação parassimpática
- **tier:** medium
- **threshold:** 5 minutos de dry brushing antes do banho, cobrindo pernas, braços, tronco e costas acessíveis
- **why:** A repetição firme e previsível oferece input sensorial organizado ao sistema nervoso. É uma forma curta de acordar o corpo sem recorrer a estímulos agressivos.
- **source:** seed `aletheia-snc-mode-seed.sql` ponto 4 · Polyvagal Theory, Stephen Porges · prática somática sensorial [ref a confirmar]

### `snc-morning-reset-combo`
**Dry brushing + NSDR na primeira hora do dia.**
- **category:** Reset matinal · activação parassimpática
- **tier:** hard
- **threshold:** 3 minutos de dry brushing e 10 minutos de NSDR até 1 hora após acordar
- **why:** Combina entrada corporal activa com descida autonómica guiada. É indicado quando a manhã precisa de estrutura clara antes de decisões, ecrãs ou trabalho clínico.
- **source:** seed `aletheia-snc-mode-seed.sql` pontos 1 e 4 · Huberman Lab NSDR Protocol · Polyvagal Theory, Stephen Porges

---

## 2 · Activação directa do vago · ao longo do dia

### `snc-478-before-lunch`
**Respiração 4-7-8 antes do almoço.**
- **category:** Activação directa do vago · ao longo do dia
- **tier:** easy
- **threshold:** 4 ciclos de respiração 4-7-8 antes do almoço
- **why:** A expiração longa favorece travagem parassimpática e prepara o corpo para digerir em vez de continuar em modo de desempenho. É uma intervenção curta, sem equipamento e fácil de repetir.
- **source:** seed `aletheia-snc-mode-seed.sql` ponto 2 · Dr Andrew Weil 4-7-8 Breathing · Polyvagal Theory, Stephen Porges

### `snc-478-before-dinner`
**Respiração 4-7-8 antes do jantar.**
- **category:** Activação directa do vago · ao longo do dia
- **tier:** easy
- **threshold:** 4 ciclos de respiração 4-7-8 antes do jantar
- **why:** Ajuda a separar o ritmo do dia da refeição da noite. Esta pausa reduz a probabilidade de comer em estado de tensão simpática acumulada.
- **source:** seed `aletheia-snc-mode-seed.sql` ponto 2 · Dr Andrew Weil 4-7-8 Breathing · Polyvagal Theory, Stephen Porges

### `snc-478-bedtime`
**Respiração 4-7-8 ao deitar.**
- **category:** Activação directa do vago · ao longo do dia
- **tier:** medium
- **threshold:** 6 ciclos de respiração 4-7-8 ao deitar
- **why:** A repetição ao deitar cria uma deixa fisiológica de encerramento. É especialmente útil quando a mente fica activa apesar do corpo estar cansado.
- **source:** seed `aletheia-snc-mode-seed.sql` ponto 2 · Dr Andrew Weil 4-7-8 Breathing · Huberman Lab respiração e downregulation

### `snc-vagus-gargle`
**Gargarejo com água morna.**
- **category:** Activação directa do vago · ao longo do dia
- **tier:** easy
- **threshold:** gargarejar com água morna durante 30 segundos uma vez no dia
- **why:** Estimula musculatura faríngea associada a vias vagais e aumenta percepção corporal. É uma forma prática de activar o ramo ventral sem precisar de contexto especial.
- **source:** seed `aletheia-snc-mode-seed.sql` ponto 3 · Polyvagal Theory, Stephen Porges

### `snc-vagus-humming`
**Cantar ou zumbir durante 60 segundos.**
- **category:** Activação directa do vago · ao longo do dia
- **tier:** easy
- **threshold:** cantar ou zumbir durante 60 segundos uma vez no dia
- **why:** A produção vocal sustentada favorece activação vagal e regula a expiração sem esforço cognitivo elevado. É útil em transições, antes de consulta ou depois de uma situação exigente.
- **source:** seed `aletheia-snc-mode-seed.sql` ponto 3 · Polyvagal Theory, Stephen Porges

### `snc-vagus-cold-splash`
**Água fria na face.**
- **category:** Activação directa do vago · ao longo do dia
- **tier:** medium
- **threshold:** aplicar água fria na face durante 20 segundos uma vez no dia
- **why:** O estímulo frio facial pode baixar activação fisiológica quando usado de forma breve e controlada. Não é para forçar resistência; é para criar uma interrupção autonómica segura.
- **source:** seed `aletheia-snc-mode-seed.sql` ponto 3 · Polyvagal Theory, Stephen Porges · reflexo de mergulho mamífero [ref a confirmar]

### `snc-long-exhale-90`
**Expiração longa durante 90 segundos.**
- **category:** Activação directa do vago · ao longo do dia
- **tier:** easy
- **threshold:** 90 segundos de expiração longa, mantendo a expiração mais longa do que a inspiração
- **why:** A expiração prolongada é uma via simples para reduzir aceleração interna. Funciona bem quando não há espaço para uma prática formal.
- **source:** seed `aletheia-snc-mode-seed.sql` ponto 3 · Huberman Lab respiração e sistema nervoso autónomo · Polyvagal Theory, Stephen Porges

---

## 3 · Pausas diurnas · prevenção de exaustão simpática

### `snc-conscious-pause-morning`
**Pausa consciente antes das 12h.**
- **category:** Pausas diurnas · prevenção de exaustão simpática
- **tier:** easy
- **threshold:** 1 pausa consciente de 3 minutos antes das 12h, sem ecrã e sem tarefa paralela
- **why:** A pausa antes da exaustão reduz acumulação simpática ao longo do dia. O objectivo é interromper cedo, não esperar pelo colapso.
- **source:** seed `aletheia-snc-mode-seed.sql` ponto 6 · Huberman Lab stress modulation · Polyvagal Theory, Stephen Porges

### `snc-conscious-pause-afternoon`
**Pausa consciente entre as 12h e as 18h.**
- **category:** Pausas diurnas · prevenção de exaustão simpática
- **tier:** easy
- **threshold:** 1 pausa consciente de 3 minutos entre as 12h e as 18h, sem ecrã e sem tarefa paralela
- **why:** A tarde costuma acumular decisões, ruído e tensão corporal. Uma pausa curta ajuda a prevenir o padrão de empurrar até ficar sem margem.
- **source:** seed `aletheia-snc-mode-seed.sql` ponto 6 · Huberman Lab stress modulation · Polyvagal Theory, Stephen Porges

### `snc-conscious-pause-evening`
**Pausa consciente antes do jantar.**
- **category:** Pausas diurnas · prevenção de exaustão simpática
- **tier:** easy
- **threshold:** 1 pausa consciente de 3 minutos entre as 18h e o jantar, sem ecrã e sem tarefa paralela
- **why:** Esta pausa cria uma transição entre produção e recuperação. Ajuda a não levar a activação do dia directamente para a refeição e para a noite.
- **source:** seed `aletheia-snc-mode-seed.sql` ponto 6 · Huberman Lab stress modulation · Polyvagal Theory, Stephen Porges

### `snc-three-conscious-pauses`
**Três pausas conscientes no mesmo dia.**
- **category:** Pausas diurnas · prevenção de exaustão simpática
- **tier:** medium
- **threshold:** 3 pausas conscientes de 3 minutos no mesmo dia, sem ecrã e sem tarefa paralela
- **why:** A repetição distribuída treina o sistema nervoso a regressar ao corpo antes de entrar em sobrecarga. É mais eficaz quando acontece preventivamente.
- **source:** seed `aletheia-snc-mode-seed.sql` ponto 6 · Huberman Lab stress modulation · Polyvagal Theory, Stephen Porges

### `snc-box-breathing-pause`
**Respiração em caixa durante uma pausa.**
- **category:** Pausas diurnas · prevenção de exaustão simpática
- **tier:** medium
- **threshold:** 3 minutos de respiração em caixa com ciclos de 4-4-4-4
- **why:** A contagem simples dá estrutura quando a atenção está fragmentada. É uma pausa útil para estabilizar sem precisar de meditação longa.
- **source:** seed `aletheia-snc-mode-seed.sql` ponto 6 · protocolos de respiração lenta e regulação autonómica [ref a confirmar] · Huberman Lab stress modulation

### `snc-walking-meditation-5`
**Caminhada sem telemóvel.**
- **category:** Pausas diurnas · prevenção de exaustão simpática
- **tier:** medium
- **threshold:** caminhar 5 minutos sem telemóvel, mantendo atenção no contacto dos pés com o chão
- **why:** Movimento lento com atenção somática ajuda quando ficar imóvel aumenta inquietação. É uma alternativa prática para pessoas que regulam melhor em movimento.
- **source:** seed `aletheia-snc-mode-seed.sql` ponto 6 · mindfulness-based stress reduction, Jon Kabat-Zinn [ref a confirmar] · Polyvagal Theory, Stephen Porges

---

## 4 · Ritual nocturno · transição para descanso profundo

### `snc-evening-stretch-15`
**Alongamento suave antes de dormir.**
- **category:** Ritual nocturno · transição para descanso profundo
- **tier:** easy
- **threshold:** 15 minutos de alongamento entre 30 e 60 minutos antes de dormir
- **why:** O alongamento lento baixa actividade muscular residual e sinaliza que o corpo já não precisa de continuar em modo de resposta. Deve ser suave, sem objectivo de performance.
- **source:** seed `aletheia-snc-mode-seed.sql` ponto 5 · Huberman Lab sleep toolkit · Yoga/Iyengar restorative practice [ref a confirmar]

### `snc-evening-nsdr-15`
**NSDR ou Yoga Nidra antes de dormir.**
- **category:** Ritual nocturno · transição para descanso profundo
- **tier:** easy
- **threshold:** 15 minutos de NSDR ou Yoga Nidra entre 30 e 60 minutos antes de dormir
- **why:** Ajuda a desligar a activação cognitiva sem exigir esforço. É uma opção especialmente útil quando o corpo está cansado mas o sistema nervoso ainda não desceu.
- **source:** seed `aletheia-snc-mode-seed.sql` ponto 5 · Huberman Lab NSDR Protocol · Ally Boothroyd Yoga Nidra

### `snc-warm-light-after-dinner`
**Luz quente depois do jantar.**
- **category:** Ritual nocturno · transição para descanso profundo
- **tier:** easy
- **threshold:** usar apenas luz quente em casa desde o fim do jantar até dormir
- **why:** A luz à noite deve ajudar o corpo a perceber que o dia terminou. Reduzir estímulo luminoso intenso protege a transição natural para descanso.
- **source:** seed `aletheia-snc-mode-seed.sql` ponto 7 · Huberman Lab light exposure and sleep · cronobiologia circadiana

### `snc-no-intense-screens-after-21`
**Sem ecrãs intensos depois das 21h.**
- **category:** Ritual nocturno · transição para descanso profundo
- **tier:** medium
- **threshold:** não usar ecrãs intensos depois das 21h
- **why:** Ecrãs intensos mantêm o sistema nervoso orientado para alerta, informação e resposta. A regra cria uma fronteira concreta para reduzir activação nocturna.
- **source:** seed `aletheia-snc-mode-seed.sql` ponto 7 · Huberman Lab light exposure and sleep · cronobiologia circadiana

### `snc-amber-glasses-after-21`
**Óculos amber quando ecrã for inevitável.**
- **category:** Ritual nocturno · transição para descanso profundo
- **tier:** medium
- **threshold:** usar óculos amber sempre que for inevitável usar ecrã depois das 21h
- **why:** Não substitui higiene de luz, mas reduz fricção quando o corte total de ecrãs não é realista. É uma opção de contenção para noites com trabalho ou logística familiar.
- **source:** seed `aletheia-snc-mode-seed.sql` ponto 7 · Huberman Lab light exposure and sleep · estudos de bloqueio de luz azul [ref a confirmar]

### `snc-evening-ritual-combo`
**Ritual nocturno completo.**
- **category:** Ritual nocturno · transição para descanso profundo
- **tier:** hard
- **threshold:** cumprir luz quente após jantar, sem ecrãs intensos depois das 21h, e 15 minutos de alongamento ou NSDR antes de dormir
- **why:** Junta ambiente, comportamento e regulação corporal no mesmo ritual. É a versão completa para noites em que a recuperação precisa de ser protegida de forma deliberada.
- **source:** seed `aletheia-snc-mode-seed.sql` pontos 5 e 7 · Huberman Lab sleep toolkit · Ally Boothroyd Yoga Nidra

---

## Cobertura das 7 prioridades do seed

1. **NSDR ou Yoga Nidra matinal** — `snc-nsdr-morning-10`, `snc-nsdr-morning-20`, `snc-yoga-nidra-audio`, `snc-morning-reset-combo`
2. **Respiração 4-7-8 antes das refeições principais** — `snc-478-before-lunch`, `snc-478-before-dinner`, `snc-478-bedtime`
3. **Estimulação directa do vago** — `snc-vagus-gargle`, `snc-vagus-humming`, `snc-vagus-cold-splash`, `snc-long-exhale-90`
4. **Dry brushing matinal** — `snc-dry-brushing-3`, `snc-dry-brushing-5`, `snc-morning-reset-combo`
5. **15 min alongamento OU NSDR à noite** — `snc-evening-stretch-15`, `snc-evening-nsdr-15`, `snc-evening-ritual-combo`
6. **3 pausas conscientes durante o dia** — `snc-conscious-pause-morning`, `snc-conscious-pause-afternoon`, `snc-conscious-pause-evening`, `snc-three-conscious-pauses`, `snc-box-breathing-pause`, `snc-walking-meditation-5`
7. **Limitar estímulos nocturnos pós-jantar** — `snc-warm-light-after-dinner`, `snc-no-intense-screens-after-21`, `snc-amber-glasses-after-21`, `snc-evening-ritual-combo`

---

## Notas para revisão clínica

- A prioridade 6 gerou 6 actionables porque é a mais dependente de distribuição temporal e prevenção de exaustão simpática ao longo do dia.
- As referências de dry brushing, respiração em caixa, walking meditation, reflexo de mergulho e óculos amber devem ser confirmadas se forem usadas em material clínico externo.

## Questões abertas para Catarina

- Confirmar se o gargarejo deve ser sempre com água morna ou se pode ser registado sem água quando a paciente só faz activação vocal.
- Confirmar se "sem ecrãs intensos depois das 21h" deve adaptar-se a turnos, mães com rotina tardia, ou pacientes noutros fusos horários.
- Confirmar se a versão hard do ritual nocturno deve ser atribuída apenas após 7 dias de adesão às versões easy.
