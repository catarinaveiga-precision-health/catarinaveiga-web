#!/usr/bin/env python3
"""
Retira dos artigos do blog no Sanity os avisos "não substitui / educativo /
não constitui aconselhamento" (18/11/2026), como no resto do site.

Mantém as frases que dizem quando ir ao médico (sangue nas fezes, sonolência
marcada, suspeita de alterações hormonais): são orientação clínica, não aviso.
O bloco do HOMA-IR ("Não substitui, deriva dela") é conteúdo e não se toca.

Uso (no terminal, a partir da pasta do site):
  python3 scripts/remover-avisos-blog-2026-11.py              # só mostra o que muda
  SANITY_TOKEN=... python3 scripts/remover-avisos-blog-2026-11.py --aplicar

Sem --aplicar não escreve nada. O token nunca é guardado em ficheiro.
É idempotente: só altera um bloco se ainda tiver o texto antigo.
"""
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request

PROJETO = "3zvde3ro"
DATASET = "production"
VERSAO = "v2024-01-01"
APLICAR = "--aplicar" in sys.argv
TOKEN = "".join(os.environ.get("SANITY_TOKEN", "").split())

# documento -> bloco -> (texto antigo esperado, texto novo | None para apagar o bloco)
ALTERACOES = {
    "2232fcb2-6a7b-4a30-82c7-2d75458681cf": {  # glicemia-normal-resistencia-insulina
        "ac40059edec8": (
            "Nota: este artigo tem fins informativos e não substitui avaliação clínica individual. "
            "Não constitui promessa de resultado nem recomendação de suspensão de terapêutica prescrita.",
            None,
        ),
    },
    "23f4ec62-9ad0-41f6-9527-00bf9f43c51e": {  # jejum-intermitente-perimenopausa
        "4b3aa1994606": (
            "Este artigo não substitui aconselhamento médico. Se suspeita de alterações hormonais ou "
            "tiroideias, consulte o seu médico para avaliação adequada.",
            "Se suspeita de alterações hormonais ou tiroideias, consulte o seu médico para avaliação adequada.",
        ),
    },
    "70a97556-69fe-4a40-b136-d38e914f863d": {  # laxante-natural-imediato
        "da16ee958797": (
            "Este artigo não substitui aconselhamento médico. Se a obstipação é persistente, com sangue "
            "nas fezes, perda de peso inexplicada ou dor abdominal, consulte o seu médico.",
            "Se a obstipação é persistente, com sangue nas fezes, perda de peso inexplicada ou dor "
            "abdominal, consulte o seu médico.",
        ),
    },
    "df1d725f-2395-4c53-a823-6ccebcdafa56": {  # ferritina-baixa (assinatura)
        "225bc82955c8": (
            "Catarina Veiga é Functional Medicine Practitioner (Regenerus Labs, Nordic Laboratories), "
            "com 21 anos de prática clínica em saúde da mulher e cédulas profissionais da ACSS "
            "n.º C-006754 e 0500786 (Lei n.º 71/2013). Este artigo tem carácter educativo.",
            "Catarina Veiga é Functional Medicine Practitioner (Regenerus Labs, Nordic Laboratories), "
            "com 21 anos de prática clínica em saúde da mulher e cédulas profissionais da ACSS "
            "n.º C-006754 e 0500786 (Lei n.º 71/2013).",
        ),
    },
    "f1ff9cef-dc63-4d31-9041-8281e8f55b6d": {  # biomarcadores-analises-normais-mulher
        "f2581deb2ec9": (
            "A interpretação funcional não substitui a avaliação clínica. Mas pode ser o ponto de "
            "partida para perceber o que está a ser ignorado.",
            "A interpretação funcional pode ser o ponto de partida para perceber o que está a ser ignorado.",
        ),
    },
    "post-cansaco-em-setembro-2026": {  # cansaco-em-setembro
        "4f9074da64bf": (
            "Este texto tem finalidade informativa e não constitui aconselhamento médico, diagnóstico ou "
            "indicação terapêutica individual. Se tens sonolência diurna marcada, sono não reparador "
            "persistente, ou sintomas que te preocupam, fala com a tua médica assistente.",
            "Se tens sonolência diurna marcada, sono não reparador persistente, ou sintomas que te "
            "preocupam, fala com a tua médica assistente.",
        ),
    },
    "post-conversao-t4-t3-2026": {  # conversao-t4-t3-tsh-normal-cansada
        "09c58904c0f5": (
            "Este artigo é educativo e não substitui avaliação clínica. Leva estas perguntas ao teu "
            "médico, é ele quem avalia e prescreve.",
            "Leva estas perguntas ao teu médico.",
        ),
    },
}


def api(path, data=None, token=None):
    host = "api" if token else "apicdn"
    url = f"https://{PROJETO}.{host}.sanity.io/{VERSAO}/data/{path}"
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    body = json.dumps(data).encode() if data is not None else None
    req = urllib.request.Request(url, data=body, headers=headers, method="POST" if body else "GET")
    try:
        return json.load(urllib.request.urlopen(req, timeout=30))
    except urllib.error.HTTPError as e:
        sys.exit(f"Erro {e.code} do Sanity: {e.read().decode()[:300]}")


def texto(bloco):
    return "".join(c.get("text", "") for c in bloco.get("children", []))


def main():
    if APLICAR and not TOKEN:
        sys.exit("Falta o SANITY_TOKEN (token Editor do projeto 3zvde3ro).")
    ids = list(ALTERACOES)
    q = '*[_id in $ids]{_id, "slug": slug.current, body}'
    url = f"query/{DATASET}?query={urllib.parse.quote(q)}&$ids={urllib.parse.quote(json.dumps(ids))}"
    docs = {d["_id"]: d for d in api(url, token=TOKEN or None)["result"]}

    mutacoes, n = [], 0
    for doc_id, blocos in ALTERACOES.items():
        doc = docs.get(doc_id)
        if not doc:
            print(f"! {doc_id}: não encontrado")
            continue
        corpo = {b.get("_key"): b for b in doc.get("body") or []}
        for chave, (antigo, novo) in blocos.items():
            b = corpo.get(chave)
            if b is None:
                print(f"= {doc['slug']} {chave}: bloco já não existe (já aplicado?)")
                continue
            atual = texto(b)
            if atual == novo:
                print(f"= {doc['slug']} {chave}: já está alterado")
                continue
            if atual != antigo:
                print(f"! {doc['slug']} {chave}: o texto mudou desde a verificação, não toco:\n    {atual}")
                continue
            n += 1
            sel = f'body[_key=="{chave}"]'
            if novo is None:
                print(f"- {doc['slug']}: apaga o bloco\n    {antigo}")
                mutacoes.append({"patch": {"id": doc_id, "unset": [sel]}})
            else:
                print(f"~ {doc['slug']}:\n    antes:  {antigo}\n    depois: {novo}")
                span = {"_type": "span", "_key": f"{chave}s0", "text": novo, "marks": []}
                mutacoes.append({"patch": {"id": doc_id, "set": {f"{sel}.children": [span], f"{sel}.markDefs": []}}})

    print(f"\n{n} alteração(ões) em {len({m['patch']['id'] for m in mutacoes})} artigo(s).")
    if not APLICAR:
        print("Nada foi escrito. Para aplicar: SANITY_TOKEN=... python3 scripts/remover-avisos-blog-2026-11.py --aplicar")
        return
    if mutacoes:
        r = api(f"mutate/{DATASET}?returnIds=true", {"mutations": mutacoes}, token=TOKEN)
        print("Aplicado. Transação:", r.get("transactionId"))


if __name__ == "__main__":
    main()
