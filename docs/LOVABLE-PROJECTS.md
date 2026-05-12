# Lovable Projects — Cross-Check (12 Maio 2026)

## 3 projetos Lovable detetados

### 1. Catarina Veiga (original)
- **URL subdomain**: `catarinaveiga.lovable.app`
- **Criado**: 24 Feb 2026, 07:51
- **Métricas**: 218 messages, 133 AI edits, 293.90 credits usados
- **Provavelmente**: o projeto que está agarrado a `catarinaveiga.com` (produção)
- **Estado do copy**: site antigo com "Os teus exames estão normais. O teu corpo não."
   como H1 do hero, sub-headline "Descobre o que os teus exames não estão a dizer",
   sem secção "O meu trabalho", sem frase de tensão. Pré-reposicionamento MTC.

### 2. Catarina Veiga - revised
- **URL subdomain**: `catarinaveiga-com.lovable.app`
- **Criado**: 12 Mai 2026, 14:36 (hoje)
- **Métricas**: 8 messages, 5 AI edits, 17 credits usados
- **Estado do copy**: desconhecido — criado hoje mas ainda não verificado o que tem

### 3. veiga-clinic-suite
- **URL subdomain**: `veiga-clinic-suite.lovable.app`
- **Estado do copy** (visto às ~23h00 hoje):
  - Eyebrow: "Medicina Tradicional Chinesa · Saúde da Mulher" (errado, falta ACSS)
  - H1: "Os teus exames estão normais. O teu corpo não." (errado, devia ser
    "Uma leitura mais profunda do corpo feminino na perimenopausa.")
  - Sub: "Trabalho com mulheres..." (errado, devia ser "Acompanho mulheres...")
  - Secção 5: "Faço a leitura. O médico faz o resto." (errado, devia ser
    "A medicina faz o resto.")
  - FAQ: 5 perguntas defensivas ("És médica?", "Substituis o meu médico?",
    "Tratas hipotiroidismo, endometriose ou SOP?") — devia ser as 5 calmas
    ("O que acontece na primeira consulta?", etc.)

## Estado Canónico (Repo GitHub + localhost:8080)

O verdadeiro estado mais avançado está em `origin/main` no GitHub. 11 commits hoje:
1. Reposicionamento: MTC + saúde hormonal feminina
2. Remove linguagem de outcomes e tags antigas
3. Dra. Patrícia nomeada em todas as referências médicas
4. Team card Patrícia: alinhar com copy validado
5. Team card Patrícia: remover descrição, manter só função
6. Homepage: reescrita com wireframe de conversão (10 secções)
7. Mobile-first: respiração vertical e ritmo proporcional ao viewport
8. O Método step 2: "sistema da MTC" → "sistema de leitura de padrões funcionais"
9. FAQ completo em /sobre — 5 perguntas com respostas
10. FAQ: arquitetura emocional, não tribunal
11. Build: code-split do bundle + vercel.json pronto para deploy

## Decisão Tomorrow

**Para publicar amanhã**, opções:

### A. Forçar Lovable a refletir o estado do GitHub
- Verificar se o projeto `catarinaveiga` (original) tem botão "Sync from GitHub"
  ou "Pull from main"
- Se sim, sincronizar e Publish
- Se não, re-colar prompts manualmente (slow, várias horas)

### B. Bypass Lovable, conectar Vercel diretamente
- Importar `Catarina1979/catarinaveiga` no Vercel
- Configurar env vars (VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY,
  SANITY_PROJECT_ID, SANITY_TOKEN)
- DNS Cloudflare: remover registo A para 185.158.133.1 (Lovable),
  adicionar A `@` → 76.76.21.21 (Vercel) e CNAME `www` → `cname.vercel-dns.com`
- Desligar proxy do Cloudflare ("Proxied" off) para evitar conflito SSL
- Mover domínio para fora do Lovable

### Recomendação
B é definitivo e profissional. A é band-aid que vai ter de ser desfeito eventualmente.

## Component dead code no repo

Componentes que já não são usados em /:

- Manifesto (foi removido da homepage no commit do reposicionamento)
- Symptoms
- ClinicalPatterns
- GoogleReviews
- Specializations
- Process
- Team (component, não confundir com /equipa)
- Contact
- Services
- Program3M
- RecognizeThis
- TrustBand
- Marquee (Cima, não confundir com CredentialsBand)
- Testimonials

Pillars ainda usado em /metodo
About ainda usado em /recursos
Blog ainda usado em /blog* pages
CTAFinal foi substituído por CTAFinalSection inline no novo Index.tsx

Estes componentes podem ser apagados num passe de limpeza separado, depois de
confirmar que nada externo (Lovable preview, /metodo, etc.) os usa.
