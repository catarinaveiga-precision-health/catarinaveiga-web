#!/usr/bin/env python3
"""
Artigo /blog/acompanhamento-de-saude-funcional (15/10/2026).

  1. A secção "O Programa Fundação" (oferta retirada; /programa-fundacao já
     redireciona para /consulta-inicial) passa a "Como funciona comigo", com o
     que a página /consulta-inicial diz: 90 minutos online, questionário,
     análises antigas, leitura cruzada, plano escrito, segunda consulta de 60.
  2. "60 a 90 minutos" passa a "90 minutos" (é o que a consulta inicial tem).
  3. Assinatura igual à dos outros artigos corrigidos a 14/10.

Uso (no terminal, a partir da pasta do site):
  python3 scripts/corrigir-acompanhamento-2026-10.py              # só mostra o que muda
  SANITY_TOKEN="$(pbpaste)" python3 scripts/corrigir-acompanhamento-2026-10.py --aplicar

Sem --aplicar não escreve nada. O token nunca é guardado em ficheiro.
É idempotente: correr duas vezes não muda nada da segunda.
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
SLUG = "acompanhamento-de-saude-funcional"
APLICAR = "--aplicar" in sys.argv
TOKEN = "".join(os.environ.get("SANITY_TOKEN", "").split())

# _key -> texto novo (bloco de um só span)
BLOCOS_TEXTO = {
    "ef0efae16c7b": "Como funciona comigo",
    "ab32ce2086f1": (
        "Começa com uma consulta inicial de 90 minutos, online, para Portugal e estrangeiro. Antes, "
        "recebes um questionário por email e envias as análises que tiveres, mesmo as antigas. Se não "
        "tiveres nenhumas, começamos à mesma."
    ),
    "fd5cd8c3cdc2": (
        "Os teus valores são relidos com intervalos funcionais e cruzados entre si, e sais com um plano "
        "escrito: hipóteses, prioridades e próximos passos. Se faltar um painel que o laboratório de "
        "rotina não faz, como microbioma, hormonas ou ácidos orgânicos, pede-se através da Regenerus Labs "
        "ou da Nordic Laboratories, onde sou praticante registada."
    ),
    "23c0a0b8fd5d": (
        "Catarina Veiga é Functional Medicine Practitioner (Regenerus Labs, Nordic Laboratories), com 21 "
        "anos de prática clínica em saúde da mulher e cédulas profissionais da ACSS n.º C-006754 e 0500786 "
        "(Lei n.º 71/2013). Trabalha exclusivamente com mulheres, online, para Portugal e estrangeiro."
    ),
}

# Bloco novo a inserir depois de outro: (depois_de, _key novo, texto)
NOVOS = [
    (
        "fd5cd8c3cdc2",
        "c0a1f2e3d4b5",
        "A segunda consulta, de 60 minutos, serve para ver os resultados dos exames e como correu o mês. "
        "O plano vai-se adaptando a partir daí.",
    ),
]

# Substituições dentro de spans
TROCAS = [
    ("consulta inicial de 60 a 90 minutos", "consulta inicial de 90 minutos"),
    ("A consulta inicial dura 60 a 90 minutos.", "A consulta inicial dura 90 minutos."),
]


def pedir(url, dados=None):
    cab = {"Content-Type": "application/json"}
    if TOKEN:
        cab["Authorization"] = f"Bearer {TOKEN}"
    req = urllib.request.Request(url, data=json.dumps(dados).encode() if dados else None, headers=cab)
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        if e.code == 401:
            sys.exit(
                "\nO Sanity recusou o token (401). Causas habituais: o token não foi copiado inteiro, "
                f"ou foi criado noutro projeto (tem de ser o {PROJETO}). Nada foi alterado."
            )
        if e.code == 403:
            sys.exit("\nO token não tem permissão de escrita (403). Cria-o com a permissão Editor. Nada foi alterado.")
        if e.code == 409:
            sys.exit("\nO artigo foi editado entretanto no Sanity (409). Corre outra vez. Nada foi alterado.")
        raise


def texto(bloco):
    return "".join(c.get("text", "") for c in bloco.get("children", []))


def main():
    if APLICAR and not TOKEN:
        sys.exit('Falta o token: SANITY_TOKEN="$(pbpaste)" python3 scripts/corrigir-acompanhamento-2026-10.py --aplicar')
    g = f'*[_type=="post" && slug.current=="{SLUG}" && !(_id in path("drafts.**"))][0]'
    url = f"https://{PROJETO}.api.sanity.io/{VERSAO}/data/query/{DATASET}?query=" + urllib.parse.quote(g)
    post = pedir(url)["result"]
    body = json.loads(json.dumps(post.get("body") or []))
    alteracoes = []
    chaves = {b.get("_key") for b in body}

    for b in body:
        if b.get("_type") != "block":
            continue
        antes = texto(b)
        k = b.get("_key")
        if k in BLOCOS_TEXTO and antes != BLOCOS_TEXTO[k]:
            b["children"] = [dict(b["children"][0], text=BLOCOS_TEXTO[k], marks=[])]
        for velho, novo in TROCAS:
            for c in b.get("children", []):
                if velho in c.get("text", ""):
                    c["text"] = c["text"].replace(velho, novo)
        if texto(b) != antes:
            alteracoes.append((k, antes, texto(b)))

    for depois_de, chave, txt in NOVOS:
        if chave in chaves:
            continue
        i = next(n for n, b in enumerate(body) if b.get("_key") == depois_de)
        modelo = body[i]
        novo = {
            "_type": "block",
            "_key": chave,
            "style": "normal",
            "markDefs": [],
            "children": [{"_type": "span", "_key": chave + "s", "text": txt, "marks": []}],
        }
        if "children" in modelo and modelo["children"]:
            novo["children"][0] = dict(modelo["children"][0], _key=chave + "s", text=txt, marks=[])
        body.insert(i + 1, novo)
        alteracoes.append((chave + " (novo)", "", txt))

    restos = [texto(b) for b in body if "Fundação" in texto(b)]
    for k, a, d in alteracoes:
        print(f"[{k}]\n  antes:  {a}\n  depois: {d}\n")
    print(f"Total: {len(alteracoes)} alterações. Menções a 'Fundação' que ficam: {len(restos)}")
    if not alteracoes:
        return
    if not APLICAR:
        print('Nada foi escrito. Para aplicar: SANITY_TOKEN="$(pbpaste)" python3 scripts/corrigir-acompanhamento-2026-10.py --aplicar')
        return
    url = f"https://{PROJETO}.api.sanity.io/{VERSAO}/data/mutate/{DATASET}?returnIds=true"
    r = pedir(url, {"mutations": [{"patch": {"id": post["_id"], "ifRevisionID": post["_rev"], "set": {"body": body}}}]})
    print(f"Aplicado. Transação {r.get('transactionId')}, {len(r.get('results', []))} documento atualizado.")


if __name__ == "__main__":
    main()
