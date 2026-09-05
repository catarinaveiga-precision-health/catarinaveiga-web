#!/usr/bin/env python3
"""Publica o artigo da conversão T4→T3 no Sanity.
Uso: SANITY_TOKEN=sk... python3 scripts/publicar-post-t4t3.py
Sobe o diagrama como asset (mainImage/hero + og:image) e cria o post
com createOrReplace (idempotente).
"""
import json
import os
import secrets
import sys
import urllib.request

PROJECT = "3zvde3ro"
DATASET = "production"
TOKEN = os.environ.get("SANITY_TOKEN")
if not TOKEN:
    sys.exit("Falta SANITY_TOKEN no ambiente.")

AUTHOR_REF = "b98c3ecc-4471-42d8-b609-e58601dd5d10"
POST_ID = "post-conversao-t4-t3-2026"
SLUG = "conversao-t4-t3-tsh-normal-cansada"
TITLE = "TSH normal, energia no chão: onde a conversão de T4 em T3 falha na perimenopausa"
EXCERPT = ("O TSH normal não mede a hormona que te dá energia. Entende a conversão de T4 em T3, "
           "porque falha na perimenopausa e o que pedir nas análises.")
IMAGE_PATH = os.path.expanduser("~/Desktop/diagrama-conversao-t4-t3.png")

def k():
    return secrets.token_hex(6)

def span(text, marks=None):
    return {"_key": k(), "_type": "span", "text": text, "marks": marks or []}

def block(children, style="normal", mark_defs=None, list_item=None, level=None):
    b = {"_key": k(), "_type": "block", "style": style,
         "children": children, "markDefs": mark_defs or []}
    if list_item:
        b["listItem"] = list_item
        b["level"] = level or 1
    return b

def p(text):
    return block([span(text)])

def h2(text):
    return block([span(text)], style="h2")

def bold_start(bold, rest):
    return block([span(bold, ["strong"]), span(rest)])

def link_par(pre, link_text, href, post):
    key = k()
    return block(
        [span(pre), span(link_text, [key]), span(post)],
        mark_defs=[{"_key": key, "_type": "link", "href": href}],
    )

body = []
body.append(p("Fizeste análises porque andas exausta. O resultado chegou, o médico disse \"a tiroide está ótima\", e tu voltaste para casa com a mesma exaustão e uma frase nova para te culpares: se está tudo normal, o problema devo ser eu."))
body.append(p("Há uma explicação possível que raramente cabe numa consulta de dez minutos. Começa numa distinção simples: o TSH, o valor que decide se a tua tiroide \"está bem\", não mede a hormona que te dá energia. Mede outra coisa."))
body.append(bold_start("A versão curta: ", "um TSH normal não garante energia normal. O TSH mede o comando do cérebro à tiroide, não a T3 ativa que chega às células. A conversão de T4 em T3 depende de selénio, zinco, ferro e energia disponível, e é travada pelo stress prolongado e pela restrição calórica. A perimenopausa mexe em tudo isto ao mesmo tempo."))

body.append(h2("O que o TSH mede, e o que não mede"))
body.append(p("O TSH não é uma hormona da tiroide. É o sinal que a hipófise, no cérebro, envia à tiroide a pedir produção. Quando o TSH está normal, isso diz-te que o circuito de comando entre o cérebro e a glândula está a funcionar."))
body.append(p("Não te diz o que acontece depois. E o depois é onde vive a tua energia."))
body.append(p("A tiroide produz sobretudo T4. O T4 é a forma de armazenamento: circula no sangue em grande quantidade, mas tem pouca atividade própria. Para fazer o trabalho, o corpo tem de o converter em T3, a forma ativa, que entra nas células e define o ritmo a que produzem energia. Cerca de 80% do T3 não sai da tiroide: é fabricado fora dela, nos tecidos, por conversão do T4."))
body.append(p("É por isto que existe um cenário que a leitura convencional das análises apanha mal: TSH normal, T4 normal, e ainda assim células com pouca T3 para trabalhar. O comando está bem dado, o armazém está cheio, e a chave da ignição não roda."))

body.append(h2("A conversão: uma reação química com requisitos"))
body.append(p("A transformação de T4 em T3 é feita por enzimas chamadas desiodases. E as desiodases têm uma particularidade que explica muita coisa: são selenoproteínas, ou seja, o selénio faz parte da sua estrutura. Sem selénio suficiente, a enzima que converte a tua hormona de reserva em hormona ativa trabalha em défice."))
body.append(p("O selénio não está sozinho. Há mais três peças documentadas:"))
key_fer = k()
body.append({"_key": k(), "_type": "block", "style": "normal", "listItem": "bullet", "level": 1,
             "children": [span("Ferro. ", ["strong"]),
                          span("As reservas baixas de ferro comprometem a enzima que fabrica as hormonas tiroideias (a TPO, que depende de ferro para funcionar) e estão associadas a conversão periférica menos eficiente. Se leste o meu artigo sobre "),
                          span("ferritina baixa com análises \"normais\"", [key_fer]),
                          span(", já viste esta personagem: é a mesma mulher, com o mesmo cansaço, vista de outro ângulo.")],
             "markDefs": [{"_key": key_fer, "_type": "link", "href": "https://catarinaveiga.com/ferritina-baixa-sintomas"}]})
body.append({"_key": k(), "_type": "block", "style": "normal", "listItem": "bullet", "level": 1,
             "children": [span("Zinco. ", ["strong"]), span("Participa na atividade das desiodases e na ligação do T3 aos seus recetores.")], "markDefs": []})
body.append({"_key": k(), "_type": "block", "style": "normal", "listItem": "bullet", "level": 1,
             "children": [span("Energia disponível. ", ["strong"]), span("Dietas muito restritivas e perda de peso rápida baixam a conversão de T4 em T3. É um mecanismo de poupança: o corpo interpreta a restrição como escassez e desliga aquecedores.")], "markDefs": []})

body.append(h2("O desvio: T3 reverso"))
body.append(p("Há ainda um pormenor elegante e cruel. O corpo não converte T4 apenas em T3. Pode convertê-lo em T3 reverso (rT3), uma molécula quase igual, mas inativa: encaixa sem ligar o motor."))
body.append(p("Em períodos de stress fisiológico prolongado, doença ou restrição calórica, o organismo aumenta deliberadamente esse desvio. Menos T3 ativo, mais rT3. Para a evolução, isto é proteção: abrandar o metabolismo em tempos difíceis. Para a mulher que acorda exausta há um ano, é o motivo por que \"está tudo normal\" e nada muda."))

body.append(h2("Porquê na perimenopausa"))
body.append(p("Nenhum destes mecanismos é exclusivo da perimenopausa. Mas é nesta fase que eles se juntam. O padrão que vejo em consulta é quase sempre a soma:"))
body.append({"_key": k(), "_type": "block", "style": "normal", "listItem": "number", "level": 1,
             "children": [span("O ferro desce. ", ["strong"]), span("Os ciclos da perimenopausa são frequentemente mais abundantes e mais irregulares. Mais perda, menos reservas, ferritina a escorregar para valores que o laboratório aceita e a função não.")], "markDefs": []})
body.append({"_key": k(), "_type": "block", "style": "normal", "listItem": "number", "level": 1,
             "children": [span("O cortisol sobe. ", ["strong"]), span("Sono fragmentado, carga mental, filhos e pais ao mesmo tempo, e as próprias oscilações hormonais: o stress fisiológico crónico é o principal promotor do desvio para rT3.")], "markDefs": []})
body.append({"_key": k(), "_type": "block", "style": "normal", "listItem": "number", "level": 1,
             "children": [span("As dietas aparecem. ", ["strong"]), span("É a idade em que muitas mulheres cortam calorias agressivamente para travar o peso que mudou de comportamento, e a restrição prolongada baixa ainda mais a conversão.")], "markDefs": []})
body.append(p("Três forças, todas na mesma direção: menos T3 a chegar às células. E nenhuma delas aparece no TSH."))

body.append(h2("Como se lê isto nas análises"))
body.append(p("Se te reconheces neste padrão, a conversa com o teu médico fica mais fácil com os valores certos em cima da mesa. O painel que permite ver a conversão tem três peças, e idealmente pede-se as três no mesmo dia:"))
body.append({"_key": k(), "_type": "block", "style": "normal", "listItem": "bullet", "level": 1,
             "children": [span("TSH", ["strong"]), span(": o sinal de comando")], "markDefs": []})
body.append({"_key": k(), "_type": "block", "style": "normal", "listItem": "bullet", "level": 1,
             "children": [span("T4 livre", ["strong"]), span(": a reserva disponível")], "markDefs": []})
body.append({"_key": k(), "_type": "block", "style": "normal", "listItem": "bullet", "level": 1,
             "children": [span("T3 livre", ["strong"]), span(": a hormona ativa, a que raramente é pedida")], "markDefs": []})
body.append(p("Com o T4 livre e o T3 livre lado a lado, consegue-se olhar para a relação entre os dois. Na leitura funcional, um T3 livre encostado ao fundo do intervalo com um T4 livre confortável é a assinatura clássica de conversão fraca: o armazém cheio e a fábrica parada. Marcadores como a ferritina e, quando faz sentido, o T3 reverso e os anticorpos tiroideus completam o quadro."))
body.append(link_par("Se quiseres um ponto de partida antes da consulta, a minha ", "autoavaliação gratuita", "https://catarinaveiga.com/avaliacao", " inclui o painel tiroideu completo e mostra-te que análises ainda te faltam para esta leitura."))

body.append(h2("O que não fazer: suplementar às cegas"))
body.append(p("A tentação de ler isto e comprar selénio é compreensível e é um erro. Por três razões:"))
body.append({"_key": k(), "_type": "block", "style": "normal", "listItem": "number", "level": 1,
             "children": [span("O selénio tem uma janela estreita: a diferença entre a dose útil e o excesso é pequena, e o excesso prejudica, incluindo queda de cabelo e unhas quebradiças, precisamente o que estarias a tentar tratar.")], "markDefs": []})
body.append({"_key": k(), "_type": "block", "style": "normal", "listItem": "number", "level": 1,
             "children": [span("Se o travão da tua conversão for o ferro, o cortisol ou a restrição calórica, o selénio não resolve nada.")], "markDefs": []})
body.append({"_key": k(), "_type": "block", "style": "normal", "listItem": "number", "level": 1,
             "children": [span("Suplementar antes de medir apaga as pistas: quando finalmente fizeres as análises certas, já não se vê o ponto de partida.")], "markDefs": []})
body.append(link_par("Primeiro mede-se. Depois interpreta-se em contexto, com a tua história, o teu ciclo, o teu sono e a tua alimentação. Só então se decide o que corrigir e por que ordem. É este trabalho que se faz numa ", "consulta de leitura integrada", "https://catarinaveiga.com/consulta-inicial", ". Tratar um número é fácil. Devolver energia dá mais trabalho."))

body.append(h2("Em resumo"))
for t in [
    "O TSH mede o comando, não a energia. Podes ter TSH e T4 normais e pouca T3 ativa nas células.",
    "A conversão de T4 em T3 depende de enzimas que precisam de selénio, e é travada por ferro baixo, stress prolongado e restrição calórica.",
    "A perimenopausa junta as três coisas ao mesmo tempo. Não é coincidência que seja a fase em que tantas mulheres ouvem \"está tudo normal\".",
    "O painel que mostra a conversão é TSH + T4 livre + T3 livre no mesmo dia, com ferritina ao lado.",
    "Não suplementes antes de medir. A ordem importa.",
]:
    body.append({"_key": k(), "_type": "block", "style": "normal", "listItem": "bullet", "level": 1,
                 "children": [span(t)], "markDefs": []})

body.append(h2("Perguntas frequentes"))
FAQ = [
    ("Posso ter sintomas de tiroide com o TSH normal?",
     "Sim. O TSH mede o sinal de comando entre o cérebro e a tiroide, não a quantidade de T3 ativa que chega às células. Podes ter TSH e T4 normais e ainda assim pouca T3, porque a conversão de T4 em T3 acontece sobretudo fora da tiroide e pode estar comprometida."),
    ("Que análises mostram a conversão de T4 em T3?",
     "TSH, T4 livre e T3 livre pedidos no mesmo dia, com a ferritina ao lado. Um T3 livre encostado ao fundo do intervalo com um T4 livre confortável é a assinatura clássica de conversão fraca."),
    ("O que trava a conversão de T4 em T3?",
     "Défice de selénio, zinco ou ferro, stress fisiológico prolongado e restrição calórica agressiva. Na perimenopausa, estas três forças aparecem frequentemente ao mesmo tempo."),
    ("Devo tomar selénio para melhorar a conversão?",
     "Não sem medir primeiro. O selénio tem uma janela estreita entre a dose útil e o excesso, e se o travão for o ferro, o cortisol ou a restrição calórica, o selénio não resolve nada."),
]
for q, a in FAQ:
    body.append(block([span(q)], style="h3"))
    body.append(p(a))

body.append(block([span("Este artigo é educativo e não substitui avaliação clínica. Leva estas perguntas ao teu médico, é ele quem avalia e prescreve.", ["em"])]))

body.append(h2("Fontes"))
for t in [
    "Bianco AC, et al. Paradigms of Dynamic Control of Thyroid Hormone Signaling. Endocrine Reviews, 2019. PMID: 31033998",
    "Zimmermann MB, Köhrle J. The Impact of Iron and Selenium Deficiencies on Iodine and Thyroid Metabolism. Thyroid, 2002. PMID: 12487769",
    "Vaucher P, et al. Effect of iron supplementation on fatigue in nonanemic menstruating women with low ferritin. CMAJ, 2012. PMID: 22777991",
    "NIH Office of Dietary Supplements: Selenium, Health Professional Fact Sheet.",
]:
    body.append({"_key": k(), "_type": "block", "style": "normal", "listItem": "bullet", "level": 1,
                 "children": [span(t)], "markDefs": []})

# 1) upload do diagrama
with open(IMAGE_PATH, "rb") as f:
    img = f.read()
req = urllib.request.Request(
    f"https://{PROJECT}.api.sanity.io/v2024-01-01/assets/images/{DATASET}?filename=diagrama-conversao-t4-t3.png",
    data=img, method="POST",
    headers={"Authorization": f"Bearer {TOKEN}", "Content-Type": "image/png"})
asset = json.load(urllib.request.urlopen(req))["document"]
print("asset:", asset["_id"])

doc = {
    "_id": POST_ID,
    "_type": "post",
    "title": TITLE,
    "slug": {"_type": "slug", "current": SLUG},
    "publishedAt": "2026-09-05T17:00:00Z",
    "author": {"_type": "reference", "_ref": AUTHOR_REF},
    "excerpt": EXCERPT,
    "mainImage": {"_type": "image", "asset": {"_type": "reference", "_ref": asset["_id"]},
                   "alt": "Diagrama da conversão de T4 em T3: TSH, T4, desiodases com selénio, zinco e ferro, T3 livre e o desvio para rT3"},
    "body": body,
}

mut = {"mutations": [{"createOrReplace": doc}]}
req = urllib.request.Request(
    f"https://{PROJECT}.api.sanity.io/v2024-01-01/data/mutate/{DATASET}",
    data=json.dumps(mut).encode(), method="POST",
    headers={"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"})
print(json.load(urllib.request.urlopen(req)))
print(f"OK: https://catarinaveiga.com/blog/{SLUG} (apos rebuild)")
