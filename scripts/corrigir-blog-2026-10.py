#!/usr/bin/env python3
"""
Correções aos artigos do blog no Sanity (14/10/2026).

  1. Artigo da ferritina: intervalo funcional 70 a 120 ng/mL (estava 50-70),
     tabela alinhada com /ferritina-baixa-sintomas, Lara Briden é naturopata
     (estava "Dra. ... ginecologista"), assinatura sem "em articulação com o
     acompanhamento médico" nem "não diagnostica nem prescreve".
  2. Assinaturas: Functional Medicine Practitioner, 21 anos, cédulas da ACSS
     por número (estava "23 anos ... medicina tradicional chinesa", "20 anos").
  3. Travessões: " — " passa a vírgula no corpo e a dois pontos nos títulos.

Uso (no terminal, a partir da pasta do site):
  python3 scripts/corrigir-blog-2026-10.py              # só mostra o que muda
  SANITY_TOKEN=... python3 scripts/corrigir-blog-2026-10.py --aplicar

Sem --aplicar não escreve nada. O token nunca é guardado em ficheiro.
É idempotente: correr duas vezes não muda nada da segunda.
"""
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request

PROJETO = "3zvde3ro"
DATASET = "production"
VERSAO = "v2024-01-01"
APLICAR = "--aplicar" in sys.argv
TOKEN = "".join(os.environ.get("SANITY_TOKEN", "").split())

ASSINATURA_FERRITINA = (
    "Catarina Veiga é Functional Medicine Practitioner (Regenerus Labs, Nordic Laboratories), "
    "com 21 anos de prática clínica em saúde da mulher e cédulas profissionais da ACSS "
    "n.º C-006754 e 0500786 (Lei n.º 71/2013). Este artigo tem carácter educativo."
)
ASSINATURA_GLICEMIA_RESTO = (
    " Catarina Veiga, Functional Medicine Practitioner (Regenerus Labs, Nordic Laboratories). "
    "21 anos de prática clínica com foco em saúde da mulher, desequilíbrios hormonais, tiroide, "
    "fadiga crónica e perimenopausa. Cédulas profissionais da ACSS n.º C-006754 e 0500786 "
    "(Lei n.º 71/2013)."
)

# Blocos inteiros a substituir: _key -> texto novo (bloco de um só span)
BLOCOS_TEXTO = {
    "ferritina-baixa": {
        "48d1193d8f55": (
            "Os teus exames voltaram dentro dos valores de referência. A médica disse que está tudo bem. "
            "Mas o cansaço não passa, o cabelo continua a cair, e há dias em que não consegues pensar com "
            "clareza. Conheço esta história: vejo-a no consultório há mais de vinte anos."
        ),
        "d9b712b16c91": "abaixo de 15 ng/mL",
        "c41f838c363b": "reservas esgotadas",
        "558521e88c01": "reservas insuficientes",
        "1a52de85525a": "défice funcional comum",
        "441f859f7165": "Abaixo do funcional",
        "7093f8aae84d": "muitas mulheres já têm sintomas",
        "0ef626bc2ac9": "Ferritina funcional (mulher)",
        "b6a6f14379e6": "70 a 120 ng/mL",
        "0d04c43e07e9": "intervalo funcional",
        "80ce5278d711": (
            "O intervalo funcional que uso vai de 70 a 120 ng/mL. O piso de 70 vem de Rushton (2002): "
            "abaixo disso deixa de haver garantia de ferro nas reservas da medula. O teto de 120 vem da "
            "minha prática clínica."
        ),
        "225bc82955c8": ASSINATURA_FERRITINA,
    },
}

# Substituições dentro de spans: slug -> [(antes, depois)]
TROCAS = {
    "ferritina-baixa": [
        ("A Dra. Lara Briden, ginecologista e autora de ", "Lara Briden, naturopata e autora de "),
        ("abaixo do funcional (50-70 ng/mL)", "abaixo do funcional (70 a 120 ng/mL)"),
    ],
    "colesterol-alto-mulher-causas-hormonais": [
        ("Lipoproteína(a): Lp(a)", "Lipoproteína(a), ou Lp(a)"),
    ],
    "nervo-vago-como-ativar-mulher": [
        ("Sim: directamente.", "Sim, directamente."),
    ],
    "analises-normais-sintomas-persistentes": [
        ("estão a dizer: com os intervalos certos.", "estão a dizer, com os intervalos certos."),
    ],
    "jejum-intermitente-perimenopausa": [
        ("20 anos de prática clínica", "21 anos de prática clínica"),
        ("Em 20 anos de prática", "Em 21 anos de prática"),
    ],
}

# Assinatura do artigo da glicemia: bloco com 2 spans ("Autoria:" + resto)
ASSINATURA_POR_KEY = {"glicemia-normal-resistencia-insulina": {"1cbdc029bed8": ASSINATURA_GLICEMIA_RESTO}}


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
            sys.exit("\nUm artigo foi editado entretanto no Sanity (409). Corre outra vez. Nada foi alterado.")
        raise


def ler_posts():
    g = '*[_type=="post" && !(_id in path("drafts.**"))]'
    url = f"https://{PROJETO}.api.sanity.io/{VERSAO}/data/query/{DATASET}?query=" + urllib.parse.quote(g)
    return pedir(url)["result"]


TITULOS = {
    "biomarcadores-analises-normais-mulher": "Os 5 Biomarcadores que os Teus Exames Têm e o Teu Médico Não Interpretou",
}


def tirar_travessoes_titulo(t, slug=""):
    if slug in TITULOS:
        return TITULOS[slug]
    return trocar_travessoes(t, titulo=True)


LIGA_COM_VIRGULA = re.compile(r"^(e|mas|mesmo|ou|nem|sobretudo|especialmente|incluindo|apesar|embora|porque|que|não)\b", re.I)


def trocar_travessoes(t, titulo=False):
    """Regras: dois travessões numa frase = aparte (vírgulas, ou parênteses se o
    aparte tiver vírgulas); um travessão antes de e/mas/mesmo/não... = vírgula;
    os restantes (explicação ou enumeração) = dois pontos."""
    partes = re.split(r"\s*—\s*", t)
    if len(partes) == 1:
        return t
    out = partes[0]
    i = 1
    while i < len(partes):
        seg = partes[i]
        fecha = i + 1 < len(partes) and len(seg) < 140 and not re.search(r"[.!?]\s", seg) and not titulo
        if fecha:
            depois = partes[i + 1]
            if "," in seg:
                out += f" ({seg})"
                if LIGA_COM_VIRGULA.match(depois.strip()):
                    out += ","
                out += " " + depois if depois else ""
            else:
                out += f", {seg}, {depois}" if depois else f", {seg}"
            i += 2
        else:
            sep = ", " if (LIGA_COM_VIRGULA.match(seg.strip()) and not titulo) else ": "
            out += sep + seg
            i += 1
    return re.sub(r"\s+([,:)])", r"\1", out).replace(",,", ",")


def tirar_travessoes_bloco(bloco):
    """Aplica trocar_travessoes a cada span, com acerto de espaços entre spans."""
    filhos = bloco.get("children", [])
    mudou = False
    titulo = str(bloco.get("style", "")).startswith("h")
    for c in filhos:
        t = c.get("text", "")
        if "—" not in t:
            continue
        if t.strip() == "—":
            continue  # célula vazia de tabela: tratada por BLOCOS_TEXTO
        novo = trocar_travessoes(t, titulo)
        if novo != t:
            c["text"] = novo
            mudou = True
    for i in range(1, len(filhos)):
        a, b = filhos[i - 1], filhos[i]
        if b.get("text", "").startswith(", ") and a.get("text", "").endswith(" "):
            a["text"] = a["text"].rstrip()
    return mudou


def texto(bloco):
    return "".join(c.get("text", "") for c in bloco.get("children", []))


def corrigir(post):
    slug = post.get("slug", {}).get("current", "")
    alteracoes = []
    titulo = post.get("title", "")
    novo_titulo = tirar_travessoes_titulo(titulo, slug)
    if novo_titulo != titulo:
        alteracoes.append(("título", titulo, novo_titulo))
    body = json.loads(json.dumps(post.get("body") or []))
    for b in body:
        if b.get("_type") != "block":
            continue
        antes = texto(b)
        k = b.get("_key")
        if k in BLOCOS_TEXTO.get(slug, {}):
            novo = BLOCOS_TEXTO[slug][k]
            if antes != novo:
                b["children"] = [dict(b["children"][0], text=novo, marks=[])]
        if k in ASSINATURA_POR_KEY.get(slug, {}):
            resto = ASSINATURA_POR_KEY[slug][k]
            if len(b["children"]) >= 2 and b["children"][1].get("text") != resto:
                b["children"] = [b["children"][0], dict(b["children"][1], text=resto)]
        for velho, novo in TROCAS.get(slug, []):
            for c in b.get("children", []):
                if velho in c.get("text", ""):
                    c["text"] = c["text"].replace(velho, novo)
        tirar_travessoes_bloco(b)
        depois = texto(b)
        if depois != antes:
            alteracoes.append(("bloco " + k, antes, depois))
    return slug, novo_titulo, body, alteracoes


def main():
    if APLICAR and not TOKEN:
        sys.exit("Falta o token: SANITY_TOKEN=... python3 scripts/corrigir-blog-2026-10.py --aplicar")
    posts = ler_posts()
    total = 0
    mutacoes = []
    for post in posts:
        slug, titulo, body, alteracoes = corrigir(post)
        if not alteracoes:
            continue
        total += len(alteracoes)
        print(f"\n=== {slug}: {len(alteracoes)} alterações")
        for onde, a, d in alteracoes:
            if "—" in a and a.replace("—", "").strip() and len(alteracoes) > 8 and onde.startswith("bloco") and a.count("—") and d == re.sub(r"\s*—\s*", ", ", a):
                continue  # travessões simples: não lista um a um
            print(f"  [{onde}]\n    antes:  {a[:220]}\n    depois: {d[:220]}")
        mutacoes.append({"patch": {"id": post["_id"], "ifRevisionID": post["_rev"], "set": {"title": titulo, "body": body}}})
    print(f"\nTotal: {total} alterações em {len(mutacoes)} artigos.")
    if not APLICAR:
        print("Nada foi escrito. Para aplicar: SANITY_TOKEN=... python3 scripts/corrigir-blog-2026-10.py --aplicar")
        return
    url = f"https://{PROJETO}.api.sanity.io/{VERSAO}/data/mutate/{DATASET}?returnIds=true"
    r = pedir(url, {"mutations": mutacoes})
    print(f"Aplicado. Transação {r.get('transactionId')}, {len(r.get('results', []))} documentos atualizados.")


if __name__ == "__main__":
    main()
