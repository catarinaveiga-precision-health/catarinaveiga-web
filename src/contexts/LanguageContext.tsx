import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "pt" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};

const translations: Record<string, Record<Language, string>> = {
  // Navbar
  "nav.abordagem": { pt: "Abordagem", en: "Approach" },
  "nav.servicos": { pt: "Serviços", en: "Services" },
  "nav.programa3m": { pt: "Programa Fundação", en: "Foundation Program" },
  "nav.equipa": { pt: "Equipa", en: "Team" },
  "nav.blog": { pt: "Blog", en: "Blog" },
  "nav.contacto": { pt: "Contacto", en: "Contact" },
  "nav.subtitle": { pt: "Medicina Tradicional Chinesa · Saúde Hormonal Feminina", en: "Traditional Chinese Medicine · Women’s Hormonal Health" },
  "nav.cta": { pt: "Agendar Consulta", en: "Book Consultation" },
  "nav.home": { pt: "Início", en: "Home" },
  "nav.funcional": { pt: "Método", en: "Method" },
  "nav.programa": { pt: "Programa", en: "Program" },
  "nav.biblioteca": { pt: "Biblioteca", en: "Library" },
  "nav.sobre": { pt: "Sobre", en: "About" },
  "nav.avaliacao": { pt: "Interpretar Análises", en: "Interpret Your Lab Results" },

  // Hero
  "hero.label": { pt: "Online \u00b7 Consultas em Portugu\u00eas e Ingl\u00eas", en: "Online \u00b7 Consultations in Portuguese and English" },
  "hero.title1": { pt: "Os teus exames est\u00e3o normais.", en: "Your labs are normal." },
  "hero.title2": { pt: "O teu corpo n\u00e3o.", en: "Your body isn\u2019t." },
  "hero.desc": { pt: "Investigo as causas que os exames convencionais n\u00e3o detectam. Para mulheres que sabem que algo est\u00e1 errado.", en: "I investigate the causes that conventional labs don\u2019t detect. For women who know something is wrong." },
  "hero.cta": { pt: "Marcar Consulta Inicial \u2014 \u20ac120", en: "Book Initial Consultation \u2014 \u20ac120" },
  "hero.cta2": { pt: "Candidatar-me ao Programa", en: "Apply to the Program" },
  "hero.stat1num": { pt: "20+", en: "20+" },
  "hero.stat1label": { pt: "Anos", en: "Years" },
  "hero.stat2num": { pt: "PT \u00b7 EN", en: "PT \u00b7 EN" },
  "hero.stat2label": { pt: "Portugal + Internacional", en: "Portugal + International" },
  "hero.stat3num": { pt: "Online", en: "Online" },
  "hero.stat3label": { pt: "Portugal e internacional", en: "Portugal and international" },

  // TrustBand
  "trustband.desc": { pt: "Forma\u00e7\u00e3o cont\u00ednua e colabora\u00e7\u00e3o em Portugal e Reino Unido em sa\u00fade da mulher e leitura funcional aplicada.", en: "Continuous training and collaboration in Portugal and the UK in women's health and applied functional reading." },

  // Marquee
  "marquee.0": { pt: "Medicina Tradicional Chinesa", en: "Traditional Chinese Medicine" },
  "marquee.1": { pt: "Sa\u00fade Hormonal", en: "Hormonal Health" },
  "marquee.2": { pt: "Tir\u00f3ide", en: "Thyroid" },
  "marquee.3": { pt: "Perimenopausa", en: "Perimenopause" },
  "marquee.4": { pt: "Fadiga Cr\u00f3nica", en: "Chronic Fatigue" },
  "marquee.5": { pt: "Sa\u00fade Intestinal", en: "Gut Health" },
  "marquee.6": { pt: "Autoimunidade", en: "Autoimmunity" },
  "marquee.7": { pt: "Endometriose", en: "Endometriosis" },

  // Manifesto
  "manifesto.label": { pt: "A minha filosofia", en: "My philosophy" },
  "manifesto.quote1": { pt: "\u201COs teus exames s\u00e3o normais.\u201D", en: "\u201CYour tests are normal.\u201D" },
  "manifesto.quote2": { pt: "Mas tu sabes que n\u00e3o te sentes normal.", en: "But you know you don\u2019t feel normal." },
  "manifesto.p1": { pt: "A medicina convencional usa intervalos de refer\u00eancia definidos para popula\u00e7\u00f5es gerais. A leitura funcional acrescenta intervalos mais estreitos \u2014 mais pr\u00f3ximos do que o corpo precisa para funcionar de forma \u00f3ptima. \u00c9 uma camada complementar de leitura, n\u00e3o um substituto da interpreta\u00e7\u00e3o cl\u00ednica.", en: "Conventional medicine uses reference ranges defined for general populations. Functional reading adds narrower intervals \u2014 closer to what the body needs to function optimally. It is a complementary reading layer, not a substitute for clinical interpretation." },
  "manifesto.p2": { pt: "A diferença entre \u201Cnormal\u201D e \u201Córptimo\u201D pode ser a explicação para anos de sintomas sem resposta. O meu trabalho começa exactamente aí.", en: "The difference between \u201Cnormal\u201D and \u201Coptimal\u201D can explain years of unanswered symptoms. My work begins exactly there." },

  // Pillars
  "pillars.label": { pt: "Abordagem", en: "Approach" },
  "pillars.title": { pt: "Como trabalho", en: "How I work" },
  "pillars.1.title": { pt: "Investiga\u00e7\u00e3o Profunda", en: "Deep Investigation" },
  "pillars.1.desc": { pt: "An\u00e1lises com crit\u00e9rios funcionais avan\u00e7ados. Olhamos para o quadro completo, n\u00e3o apenas para valores isolados.", en: "Analysis with advanced functional criteria. We look at the full picture, not just isolated values." },
  "pillars.2.title": { pt: "Protocolo Personalizado", en: "Personalised Protocol" },
  "pillars.2.desc": { pt: "Nutri\u00e7\u00e3o, suplementa\u00e7\u00e3o e estilo de vida constru\u00eddos para a tua fisiologia espec\u00edfica.", en: "Nutrition, supplementation, and lifestyle built for your specific physiology." },
  "pillars.3.title": { pt: "Monitoriza\u00e7\u00e3o Cont\u00ednua", en: "Continuous Monitoring" },
  "pillars.3.desc": { pt: "Reavalia\u00e7\u00e3o constante guiada por dados. O protocolo ajusta-se \u00e0 medida que o teu corpo responde.", en: "Constant reassessment guided by data. The protocol adjusts as your body responds." },
  "pillars.4.title": { pt: "Autonomia Informada", en: "Informed Autonomy" },
  "pillars.4.desc": { pt: "Literacia em sa\u00fade como parte do acompanhamento. Entendes o que est\u00e1 a acontecer e porqu\u00ea.", en: "Health literacy as part of the follow-up. You understand what\u2019s happening and why." },

  // Symptoms
  "symptoms.label": { pt: "Para quem \u00e9", en: "Who is it for" },
  "symptoms.title": { pt: "Reconheces-te nisto?", en: "Do you recognise yourself?" },
  "symptoms.1": { pt: "Tens fadiga persistente mesmo dormindo \"o suficiente\"", en: "You have persistent fatigue even though you sleep \"enough\"" },
  "symptoms.2": { pt: "Os teus exames saem \"normais\" mas continuas sem respostas", en: "Your tests come back \"normal\" but you still have no answers" },
  "symptoms.3": { pt: "Tens sintomas que variam com o ciclo \u2014 PMS, ansiedade pr\u00e9-menstrual, energia baixa", en: "You have symptoms that vary with your cycle \u2014 PMS, premenstrual anxiety, low energy" },
  "symptoms.4": { pt: "Lutas com incha\u00e7o, refluxo ou digest\u00e3o irregular sem causa \u00f3bvia", en: "You struggle with bloating, reflux, or irregular digestion with no obvious cause" },
  "symptoms.5": { pt: "Sentes nevoeiro mental, irritabilidade ou dificuldade em lidar com stress", en: "You feel brain fog, irritability, or difficulty coping with stress" },
  "symptoms.6": { pt: "J\u00e1 experimentaste v\u00e1rias abordagens sem resultados duradouros", en: "You\u2019ve tried various approaches without lasting results" },
  "symptoms.7": { pt: "Queres entender a causa raiz em vez de s\u00f3 mascarar sintomas", en: "You want to understand the root cause instead of just masking symptoms" },
  "symptoms.quote": { pt: "\u201CSe te identificas com dois ou mais destes pontos, h\u00e1 provavelmente causas por investigar.\u201D", en: "\u201CIf you identify with two or more of these points, there are probably causes to investigate.\u201D" },
  "symptoms.link": { pt: "Descobre o que pode estar por tr\u00e1s dos teus sintomas", en: "Discover what may be behind your symptoms" },

  // Testimonials
  "testimonials.label": { pt: "O que dizem", en: "What they say" },
  "testimonials.title": { pt: "Experi\u00eancias reais", en: "Real experiences" },
  "testimonials.1.quote": { pt: "Durante quatro anos fui assistida por m\u00e9dicos de diversas especialidades sem resposta. Com a Catarina, em alguns meses, recuperei n\u00edveis de energia que j\u00e1 me permitem um funcionamento normal no meu dia a dia.", en: "For four years I was seen by doctors of various specialities without answers. With Catarina, in a few months, I recovered energy levels that allow me to function normally in my daily life." },
  "testimonials.2.quote": { pt: "Antes de iniciar o acompanhamento sofria com problemas digestivos recorrentes. Com as altera\u00e7\u00f5es terap\u00eauticas notei uma melhoria significativa. Sinto-me leve e mais confort\u00e1vel ap\u00f3s as refei\u00e7\u00f5es.", en: "Before starting the follow-up I suffered from recurring digestive problems. With the therapeutic changes I noticed a significant improvement. I feel lighter and more comfortable after meals." },
  "testimonials.3.quote": { pt: "Experimentei melhorias significativas na minha sa\u00fade. Sinto-me verdadeiramente grata por ter encontrado algu\u00e9m t\u00e3o comprometida em ajudar a alcan\u00e7ar resultados reais e duradouros.", en: "I experienced significant improvements in my health. I feel truly grateful for having found someone so committed to helping achieve real and lasting results." },

  // Services
  "services.label": { pt: "Servi\u00e7os", en: "Services" },
  "services.title": { pt: "Como posso trabalhar contigo", en: "How I can work with you" },
  "services.subtitle": { pt: "Acompanhamento exclusivamente online \u00b7 Portugal e internacional \u00b7 Portugu\u00eas e Ingl\u00eas", en: "Online-only follow-up \u00b7 Portugal and international \u00b7 Portuguese and English" },
  "services.card1.duration": { pt: "90 Minutos", en: "90 Minutes" },
   "services.card1.title": { pt: "Investigação Profunda", en: "Deep Investigation" },
   "services.card1.desc": { pt: "90 minutos dedicados a perceber o que os outros não viram.\n\nAnamnese clínica completa, revisão das análises existentes e mapeamento de sintomas por sistemas.\n\nNo final, recebes um relatório escrito com as hipóteses clínicas prioritárias e o plano de investigação seguinte.", en: "90 minutes dedicated to understanding what others missed.\n\nComplete clinical history, review of existing analyses and symptom mapping by systems.\n\nAt the end, you receive a written report with the priority clinical hypotheses and the next investigation plan." },
  "services.card1.price": { pt: "Investimento: 120\u20ac", en: "Investment: \u20ac120" },
  "services.card1.cta": { pt: "Agendar", en: "Book" },
  "services.card1.note": { pt: "Esta consulta \u00e9 independente e n\u00e3o implica compromisso com programas posteriores.", en: "This consultation is independent and does not imply commitment to subsequent programs." },
  "services.card2.label": { pt: "Programa Signature", en: "Signature Program" },
  "services.card2.title": { pt: "Programa Fundação", en: "Foundation Program" },
  "services.card2.desc": { pt: "Acompanhamento intensivo de 3 meses com protocolo personalizado, consultas estruturadas e reavalia\u00e7\u00e3o final.", en: "3-month intensive follow-up with personalised protocol, structured consultations, and final reassessment." },
  "services.card2.note": { pt: "Programa personalizado ap\u00f3s avalia\u00e7\u00e3o cl\u00ednica inicial.", en: "Personalised program after initial clinical assessment." },
  "services.card2.cta": { pt: "Saber mais", en: "Learn more" },
  "services.card3.label": { pt: "Assessment Completo", en: "Complete Assessment" },
  "services.card3.title": { pt: "Avalia\u00e7\u00e3o de Sa\u00fade", en: "Health Assessment" },
  "services.card3.desc": { pt: "Relat\u00f3rio funcional completo com an\u00e1lises avan\u00e7adas e recomenda\u00e7\u00f5es personalizadas.", en: "Complete functional report with advanced analyses and personalised recommendations." },
  "services.card3.note": { pt: "Investimento sob consulta.", en: "Investment upon consultation." },
  "services.card3.cta": { pt: "Saber mais", en: "Learn more" },

  // Program3M
  "program3m.badge": { pt: "Programa Signature", en: "Signature Program" },
  "program3m.title": { pt: "Programa Fundação", en: "Foundation Program" },
  "program3m.desc": { pt: "Tr\u00eas meses de acompanhamento real. Um protocolo constru\u00eddo \u00e0 tua medida, com a profundidade que o teu corpo merece.", en: "Three months of real follow-up. A protocol built to your measure, with the depth your body deserves." },
  "program3m.desc2": { pt: "Se fizer sentido ap\u00f3s a consulta inicial, proponho um plano estruturado para os teus sintomas espec\u00edficos. A decis\u00e3o \u00e9 sempre tua, depois de saberes exactamente o que envolve.", en: "If it makes sense after the initial consultation, I propose a structured plan for your specific symptoms. The decision is always yours, after knowing exactly what it involves." },
  "program3m.why": { pt: "Porque 3 meses?", en: "Why 3 months?" },
  "program3m.why.p1": { pt: "O corpo n\u00e3o muda em 30 dias. O sistema hormonal precisa de pelo menos 6 a 8 semanas para responder a interven\u00e7\u00f5es. A neuroplasticidade \u2014 a capacidade de criar novos padr\u00f5es de comportamento e resposta \u2014 exige repeti\u00e7\u00e3o consistente ao longo do tempo.", en: "The body doesn\u2019t change in 30 days. The hormonal system needs at least 6 to 8 weeks to respond to interventions. Neuroplasticity \u2014 the ability to create new patterns of behaviour and response \u2014 requires consistent repetition over time." },
  "program3m.why.p2": { pt: "Tr\u00eas meses \u00e9 o m\u00ednimo para resultados mensur\u00e1veis, compar\u00e1veis e sustent\u00e1veis. N\u00e3o \u00e9 um n\u00famero arbitr\u00e1rio. \u00c9 fisiologia.", en: "Three months is the minimum for measurable, comparable, and sustainable results. It\u2019s not an arbitrary number. It\u2019s physiology." },
  "program3m.f1.title": { pt: "Consultas estruturadas", en: "Structured consultations" },
  "program3m.f1.desc": { pt: "Sess\u00f5es de revis\u00e3o em momentos-chave do protocolo", en: "Review sessions at key protocol moments" },
  "program3m.f2.title": { pt: "An\u00e1lises com crit\u00e9rios funcionais avan\u00e7ados", en: "Advanced functional criteria analyses" },
  "program3m.f2.desc": { pt: "Marcadores al\u00e9m do padr\u00e3o convencional", en: "Markers beyond the conventional standard" },
  "program3m.f3.title": { pt: "Protocolo personalizado", en: "Personalised protocol" },
  "program3m.f3.desc": { pt: "Nutri\u00e7\u00e3o, suplementa\u00e7\u00e3o e estilo de vida \u00e0 medida", en: "Nutrition, supplementation, and lifestyle tailored to you" },
  "program3m.f4.title": { pt: "Suporte Maya", en: "Maya Support" },
  "program3m.f4.desc": { pt: "Agente AI de nutri\u00e7\u00e3o funcional para apoio educativo entre consultas", en: "AI functional nutrition agent for educational support between consultations" },
  "program3m.f5.title": { pt: "Reavalia\u00e7\u00e3o final", en: "Final reassessment" },
  "program3m.f5.desc": { pt: "An\u00e1lise comparativa completa dos 3 meses", en: "Complete comparative analysis of the 3 months" },
  "program3m.f6.title": { pt: "Materiais educativos", en: "Educational materials" },
  "program3m.f6.desc": { pt: "Recursos e guias para autonomia em sa\u00fade", en: "Resources and guides for health autonomy" },
  "program3m.cta": { pt: "Candidatar-me", en: "Apply" },

  // Specializations
  "specs.label": { pt: "Especialidades", en: "Specialisations" },
  "specs.title": { pt: "O que investigo e trato", en: "What I investigate and treat" },
  "specs.0": { pt: "Sa\u00fade Hormonal", en: "Hormonal Health" },
  "specs.1": { pt: "Perimenopausa", en: "Perimenopause" },
  "specs.2": { pt: "Tir\u00f3ide", en: "Thyroid" },
  "specs.3": { pt: "Fadiga Cr\u00f3nica", en: "Chronic Fatigue" },
  "specs.4": { pt: "Autoimunidade", en: "Autoimmunity" },
  "specs.5": { pt: "Sa\u00fade Intestinal", en: "Gut Health" },

  // Process
  "process.label": { pt: "Processo", en: "Process" },
  "process.title": { pt: "O teu percurso", en: "Your journey" },
  "process.1.title": { pt: "Contacto inicial", en: "Initial contact" },
  "process.1.desc": { pt: "Conversamos sobre as tuas necessidades", en: "We discuss your needs" },
  "process.2.title": { pt: "Consulta inicial", en: "Initial consultation" },
  "process.2.desc": { pt: "Avalia\u00e7\u00e3o cl\u00ednica completa (90 min) via Zoom", en: "Complete clinical assessment (90 min) via Zoom" },
  "process.3.title": { pt: "An\u00e1lises", en: "Analyses" },
  "process.3.desc": { pt: "Investiga\u00e7\u00e3o laboratorial funcional personalizada", en: "Personalised functional laboratory investigation" },
  "process.4.title": { pt: "Protocolo", en: "Protocol" },
  "process.4.desc": { pt: "Plano personalizado baseado em dados e hist\u00f3ria cl\u00ednica", en: "Personalised plan based on data and clinical history" },
  "process.5.title": { pt: "Acompanhamento", en: "Follow-up" },
  "process.5.desc": { pt: "Monitoriza\u00e7\u00e3o e ajustes cont\u00ednuos ao longo do tempo", en: "Monitoring and continuous adjustments over time" },

  // ClinicalAssessment
  "assessment.label": { pt: "Avalia\u00e7\u00e3o inicial", en: "Initial assessment" },
  "assessment.title1": { pt: "Comece por compreender", en: "Start by understanding" },
  "assessment.title2": { pt: "a sua situa\u00e7\u00e3o cl\u00ednica.", en: "your clinical situation." },
  "assessment.desc": { pt: "Question\u00e1rio estruturado que permite compreender a sua situa\u00e7\u00e3o e orientar os pr\u00f3ximos passos.", en: "Structured questionnaire to understand your situation and guide next steps." },
  "assessment.cta": { pt: "Avalia\u00e7\u00e3o cl\u00ednica inicial gratuita", en: "Free initial clinical assessment" },
  "assessment.note": { pt: "Sem compromisso.", en: "No commitment." },

  // Team
  "team.label": { pt: "Equipa", en: "Team" },
  "team.title": { pt: "As pessoas por trás do acompanhamento", en: "The people behind the follow-up" },
  "team.catarina.role": { pt: "Medicina Tradicional Chinesa · Saúde Hormonal Feminina", en: "Traditional Chinese Medicine · Women's Hormonal Health" },
  "team.catarina.desc": { pt: "Avaliação integrativa, interpretação funcional avançada e coordenação de todo o acompanhamento.\nMais de 20 anos de experiência clínica focada na saúde da mulher.", en: "Integrative assessment, advanced functional interpretation, and coordination of all follow-up.\nOver 20 years of clinical experience focused on women's health." },
  "team.patricia.role": { pt: "Médica · Responsável pelos atos médicos", en: "Physician · Responsible for medical acts" },
  "team.patricia.desc": { pt: "Inscrita na Ordem dos Médicos. Prática clínica em várias instituições. Responsável pela componente médica do acompanhamento: avaliação clínica, prescrição, pedidos de análises, diagnóstico clínico, interpretação clínica de exames e encaminhamentos.", en: "Registered with the Portuguese Medical Council. Clinical practice in several institutions. Responsible for the medical component of follow-up: clinical assessment, prescriptions, ordering tests, clinical diagnosis, clinical interpretation of exams, and referrals." },
  "team.maya.role": { pt: "Agente AI · Apoio educativo entre consultas", en: "AI Agent · Educational support between consultations" },
  "team.maya.desc": { pt: "Apoio educativo e organizacional entre consultas. Ajuda a compreender o plano e a manter consistência no dia a dia.", en: "Educational and organisational support between consultations. Helps you understand the plan and stay consistent day to day." },
  "team.maya.note": { pt: "A Maya não substitui avaliação clínica, diagnóstico ou tratamento.", en: "Maya does not replace clinical assessment, diagnosis, or treatment." },
  "team.admin.title": { pt: "Coordenação & Apoio ao Cliente", en: "Coordination & Client Support" },
  "team.admin.role": { pt: "Equipa Administrativa", en: "Administrative Team" },
  "team.admin.desc": { pt: "Gestão de marcações, logística e comunicação. Garante uma experiência fluida e facilita a ligação entre cliente e equipa clínica.", en: "Booking management, logistics, and communication. Ensures a smooth experience and facilitates the connection between client and clinical team." },
  "team.admin.whatsapp": { pt: "WhatsApp da clínica: +351 937 046 132", en: "Clinic WhatsApp: +351 937 046 132" },

  // About
  "about.label": { pt: "Sobre", en: "About" },
  "about.role": { pt: "Especialista em Medicina Tradicional Chinesa \u00b7 Sa\u00fade Hormonal Feminina", en: "Specialist in Traditional Chinese Medicine \u00b7 Women\u2019s Hormonal Health" },
  "about.p1": { pt: "Acompanho mulheres em perimenopausa com sintomas reais e exames maioritariamente normais. Vinte anos de pr\u00e1tica cl\u00ednica em MTC. C\u00e9dula provis\u00f3ria da ACSS ao abrigo da Lei n.\u00ba 71/2013, em valida\u00e7\u00e3o de cr\u00e9ditos.", en: "I work with women in perimenopause with real symptoms and largely normal lab results. Twenty years of clinical practice in TCM. Provisional ACSS license under Law 71/2013." },
  "about.p2": { pt: "Entre 2020 e 2024 integrei a equipa da Omnos.me \u2014 hoje Regenerus Labs, um dos maiores laborat\u00f3rios europeus de testes funcionais. Quatro anos no Departamento de Microbioma e \u00e0 frente da Educa\u00e7\u00e3o para a Sa\u00fade.", en: "Between 2020 and 2024 I joined the team at Omnos.me \u2014 today Regenerus Labs, one of the largest European functional testing laboratories. Four years in the Microbiome Department and leading Health Education." },
  "about.p3": { pt: "Em 2024 fui oradora no Longevity Med Summit, com a apresenta\u00e7\u00e3o \u201cOestrogen-Related Conditions and Gut Microbiota\u201d.", en: "In 2024 I was a speaker at the Longevity Med Summit, with the presentation \u201cOestrogen-Related Conditions and Gut Microbiota\u201d." },
  "about.p4": { pt: "Colaboro com a Dra. Patrícia Salvador, médica inscrita na Ordem dos Médicos, responsável pela componente médica do acompanhamento. Trabalho em telemedicina, em Portugal e no estrangeiro.", en: "I collaborate with Dr. Patrícia Salvador, physician registered with the Portuguese Medical Council, responsible for the medical component of follow-up. I work in telemedicine, in Portugal and abroad." },

  // FAQ
  "faq.title": { pt: "Perguntas frequentes", en: "Frequently asked questions" },
  "faq.1.q": { pt: "As consultas s\u00e3o online?", en: "Are consultations online?" },
  "faq.1.a": { pt: "Sim. Todo o acompanhamento \u00e9 realizado online via Zoom. Trabalho com clientes de Portugal e internacionalmente, sem limita\u00e7\u00f5es geogr\u00e1ficas.", en: "Yes. All follow-up is done online via Zoom. I work with clients from Portugal and internationally, without geographic limitations." },
  "faq.2.q": { pt: "Posso fazer a consulta em ingl\u00eas?", en: "Can I have the consultation in English?" },
  "faq.2.a": { pt: "Sim. As consultas est\u00e3o dispon\u00edveis em Portugu\u00eas e Ingl\u00eas. Toda a documenta\u00e7\u00e3o pode ser fornecida no idioma da tua prefer\u00eancia.", en: "Yes. Consultations are available in Portuguese and English. All documentation can be provided in your preferred language." },
  "faq.3.q": { pt: "Porque é que o Programa Fundação dura 3 meses?", en: "Why does the Foundation Program last 3 months?" },
  "faq.3.a": { pt: "O corpo precisa de tempo para responder. O sistema hormonal demora 6 a 8 semanas a reagir a interven\u00e7\u00f5es. A neuroplasticidade exige repeti\u00e7\u00e3o consistente. Tr\u00eas meses \u00e9 o m\u00ednimo para resultados mensur\u00e1veis e sustent\u00e1veis. N\u00e3o \u00e9 um n\u00famero arbitr\u00e1rio. \u00c9 fisiologia.", en: "The body needs time to respond. The hormonal system takes 6 to 8 weeks to react to interventions. Neuroplasticity requires consistent repetition. Three months is the minimum for measurable and sustainable results. It\u2019s not an arbitrary number. It\u2019s physiology." },
  "faq.4.q": { pt: "A Medicina Tradicional Chinesa substitui o m\u00e9dico convencional?", en: "Does Traditional Chinese Medicine replace conventional doctors?" },
  "faq.4.a": { pt: "N\u00e3o. \u00c9 complementar. Quando necess\u00e1rio, \u00e9 recomendada consulta m\u00e9dica com a Dra. Patr\u00edcia Salvador para avalia\u00e7\u00e3o convencional, medica\u00e7\u00e3o ou referencia\u00e7\u00e3o. A componente m\u00e9dica do acompanhamento \u00e9 da responsabilidade dela.", en: "No. It\u2019s complementary. When necessary, a medical consultation with Dr. Patr\u00edcia Salvador is recommended for conventional assessment, medication, or referral. The medical component of follow-up is her responsibility." },
  "faq.5.q": { pt: "A Maya substitui um profissional de sa\u00fade?", en: "Does Maya replace a health professional?" },
  "faq.5.a": { pt: "N\u00e3o. A Maya \u00e9 um sistema de apoio educativo entre consultas. N\u00e3o substitui avalia\u00e7\u00e3o cl\u00ednica, diagn\u00f3stico ou tratamento m\u00e9dico.", en: "No. Maya is an educational support system between consultations. It does not replace clinical assessment, diagnosis, or medical treatment." },
  "faq.6.q": { pt: "Os meus dados de sa\u00fade est\u00e3o protegidos?", en: "Is my health data protected?" },
  "faq.6.a": { pt: "Sim. Toda a informa\u00e7\u00e3o partilhada \u00e9 tratada com total confidencialidade, em conformidade com o RGPD. Os dados n\u00e3o s\u00e3o partilhados com terceiros sem consentimento expl\u00edcito.", en: "Yes. All shared information is treated with full confidentiality, in compliance with GDPR. Data is not shared with third parties without explicit consent." },
  "faq.7.q": { pt: "Como funciona o Programa de 3 meses e qual o investimento?", en: "How does the 3-month Program work and what\u2019s the investment?" },
  "faq.7.a": { pt: "O Programa Fundação é proposto quando, após a consulta inicial, faz sentido clínico um acompanhamento mais prolongado. O investimento e estrutura são discutidos na consulta inicial, em função dos objectivos e complexidade do caso.", en: "The Foundation Program is proposed when, after the initial consultation, a longer follow-up makes clinical sense. The investment and structure are discussed in the initial consultation, based on objectives and case complexity." },
  "faq.8.q": { pt: "O que devo trazer para a primeira consulta?", en: "What should I bring to the first consultation?" },
  "faq.8.a": { pt: "Exames laboratoriais dos \u00faltimos 2 a 3 anos, lista de medicamentos e suplementos actuais. Ser\u00e1 enviado um question\u00e1rio estruturado antes da consulta.", en: "Lab tests from the last 2 to 3 years, list of current medications and supplements. A structured questionnaire will be sent before the consultation." },

  // Blog
  "blog.label": { pt: "Educa\u00e7\u00e3o em Sa\u00fade", en: "Health Education" },
  "blog.title": { pt: "Artigos", en: "Articles" },
  "blog.1.cat": { pt: "Análises Clínicas", en: "Clinical Analysis" },
  "blog.1.title": { pt: "Exames normais não significam saúde", en: "Normal labs don't mean health" },
  "blog.1.intro": { pt: "Valores de referência ≠ valores ideais. Saiba porque exames 'normais' podem esconder desequilíbrios funcionais.", en: "Reference ranges ≠ optimal values. Why 'normal' labs can hide functional imbalances." },
  "blog.2.cat": { pt: "Tir\u00f3ide", en: "Thyroid" },
  "blog.2.title": { pt: "Tir\u00f3ide sub-\u00f3ptima: quando os valores 'normais' n\u00e3o chegam", en: "Sub-optimal thyroid: when 'normal' values aren\u2019t enough" },
  "blog.2.intro": { pt: "O intervalo de refer\u00eancia da TSH foi definido com base numa popula\u00e7\u00e3o geral que inclui pessoas j\u00e1 com disfun\u00e7\u00e3o tiroideia. Muitas mulheres com sintomas claros de hipotiroidismo t\u00eam valores dentro do 'normal' \u2014 e continuam sem tratamento.", en: "The TSH reference range was defined based on a general population that includes people already with thyroid dysfunction. Many women with clear hypothyroid symptoms have values within 'normal' \u2014 and remain untreated." },
  "blog.3.cat": { pt: "Perimenopausa", en: "Perimenopause" },
  "blog.3.title": { pt: "Perimenopausa: o que ningu\u00e9m te explica sobre os primeiros sinais", en: "Perimenopause: what nobody tells you about the first signs" },
  "blog.3.intro": { pt: "A perimenopausa pode come\u00e7ar anos antes da \u00faltima menstrua\u00e7\u00e3o. Ansiedade nova, sono fragmentado, ciclos irregulares, aumento de peso sem explica\u00e7\u00e3o \u2014 estes s\u00e3o frequentemente os primeiros sinais, n\u00e3o os afrontamentos.", en: "Perimenopause can start years before the last period. New anxiety, fragmented sleep, irregular cycles, unexplained weight gain \u2014 these are often the first signs, not hot flashes." },
  "blog.readmore": { pt: "Ler mais", en: "Read more" },
  "blog.viewall": { pt: "Ver todos os artigos", en: "View all articles" },

  // Contact
  "contact.label": { pt: "Contacto", en: "Contact" },
  "contact.title": { pt: "Vamos conversar", en: "Let\u2019s talk" },
  "contact.desc": { pt: "Entra em contacto para agendar a tua consulta ou para qualquer quest\u00e3o sobre o acompanhamento.", en: "Get in touch to book your consultation or for any questions about the follow-up." },
  "contact.online": { pt: "Online \u00b7 Portugal e internacional", en: "Online \u00b7 Portugal and international" },
  "contact.langs": { pt: "Consultas em Portugu\u00eas e Ingl\u00eas", en: "Consultations in Portuguese and English" },

  // CTAFinal
  "ctafinal.label": { pt: "Pronto/a para come\u00e7ar?", en: "Ready to start?" },
  "ctafinal.title1": { pt: "Pronta para perceber o que est\u00e1", en: "Ready to understand what\u2019s" },
  "ctafinal.title2": { pt: "por tr\u00e1s dos teus sintomas?", en: "behind your symptoms?" },
  "ctafinal.cta": { pt: "Agendar consulta inicial", en: "Book initial consultation" },
  "ctafinal.cta2": { pt: "Candidatar-me ao Programa", en: "Apply to the Program" },
  "ctafinal.sublink": { pt: "Ou marcar consulta avulsa \u2014 \u20ac120", en: "Or book a single consultation \u2014 \u20ac120" },

  // Footer
  "footer.desc": { pt: "Medicina Tradicional Chinesa com leitura funcional integrada. Foco em sa\u00fade hormonal feminina e perimenopausa. Telemedicina em Portugal e estrangeiro.", en: "Traditional Chinese Medicine with integrated functional reading. Focus on women\u2019s hormonal health and perimenopause. Telemedicine in Portugal and abroad." },
  "footer.online": { pt: "Online \u00b7 Portugu\u00eas e Ingl\u00eas", en: "Online \u00b7 Portuguese and English" },
  "footer.nav": { pt: "Navega\u00e7\u00e3o", en: "Navigation" },
  "footer.contact": { pt: "Contacto", en: "Contact" },
  "footer.social": { pt: "Redes Sociais", en: "Social Media" },
  "footer.newsletter": { pt: "Newsletter", en: "Newsletter" },
  "footer.subscribe": { pt: "Subscrever", en: "Subscribe" },
  "footer.copyright": { pt: "© 2026 Catarina Veiga · Todos os direitos reservados", en: "© 2026 Catarina Veiga · All rights reserved" },
  "footer.legal": { pt: "Aviso Legal", en: "Legal Notice" },
  "footer.privacy": { pt: "Pol\u00edtica de Privacidade", en: "Privacy Policy" },
  "footer.terms": { pt: "Termos de Servi\u00e7o", en: "Terms of Service" },
  "footer.disclaimer": { pt: "Informa\u00e7\u00e3o educativa. N\u00e3o substitui avalia\u00e7\u00e3o m\u00e9dica profissional.", en: "Educational information. Does not replace professional medical assessment." },
  "footer.consultations": { pt: "Consultas em Portugu\u00eas e Ingl\u00eas", en: "Consultations in Portuguese and English" },
  "footer.international": { pt: "Online \u00b7 Portugal e internacional", en: "Online \u00b7 Portugal and international" },

  // LegalBand
  "legal.text": { pt: "Esta pr\u00e1tica n\u00e3o substitui acompanhamento m\u00e9dico convencional nem inclui atos m\u00e9dicos reservados. Informa\u00e7\u00e3o de car\u00e1cter educativo. N\u00e3o substitui avalia\u00e7\u00e3o m\u00e9dica, diagn\u00f3stico ou tratamento. Consulte sempre um profissional de sa\u00fade qualificado.", en: "This practice does not replace conventional medical care nor include reserved medical acts. Educational information. Does not replace medical assessment, diagnosis, or treatment. Always consult a qualified health professional." },
  "legal.complaints": { pt: "Livro de Reclama\u00e7\u00f5es", en: "Complaints Book" },

  // MobileCTA
  "mobilecta.text": { pt: "Agendar consulta inicial", en: "Book initial consultation" },

  // 404
  "notfound.title": { pt: "Página não encontrada", en: "Page not found" },
  "notfound.desc": { pt: "A página que procuras não existe ou foi movida.", en: "The page you're looking for doesn't exist or has been moved." },
  "notfound.back": { pt: "← Voltar à página inicial", en: "← Back to homepage" },

  // Newsletter feedback
  "footer.success": { pt: "Obrigada! Subscreveste a newsletter com sucesso.", en: "Thank you! You've successfully subscribed to the newsletter." },
  "footer.error": { pt: "Erro ao subscrever. Tenta novamente.", en: "Error subscribing. Please try again." },
  "footer.already_subscribed": { pt: "Este email já está subscrito.", en: "This email is already subscribed." },

  // Blog article
  "blog.back": { pt: "Voltar aos artigos", en: "Back to articles" },
  "blog.1.body": {
    pt: "## Valores de referência vs valores ideais na medicina funcional\n\nÉ uma das situações mais comuns na minha prática clínica.\n\nA pessoa chega cansada, com sintomas há meses ou anos — **fadiga, queda de cabelo, ansiedade, dificuldade em emagrecer, alterações intestinais, dores, alterações do humor** — e diz-me:\n\n> \"Os meus exames estão normais.\"\n\nE estão. Dentro dos **valores de referência**.\n\n## O problema dos valores de referência\n\nOs valores de referência são **intervalos estatísticos** calculados a partir da média de uma população alargada — que inclui pessoas saudáveis, doentes, medicadas, com inflamação silenciosa, défices nutricionais...\n\n**Em termos simples:**\n\n- Identificam **doença instalada**\n- **NÃO avaliam funcionamento ótimo**\n- **NÃO detectam desequilíbrios precoces**\n\n> Estar \"normal\" significa apenas: estatisticamente, não está fora da curva\n\n## Valores ideais = funcionamento humano normal\n\n**Exemplos práticos que vejo todos os dias:**\n\n**Tiroide:** TSH referência: 0,5–5,0 mUI/L. TSH ideal: 0,5–2,5 mUI/L. Paciente com TSH 3,8: fadiga, intolerância ao frio, dificuldade em emagrecer = \"normal\" pela referência.\n\n**Vitamina D:** Referência: 20–50 ng/mL. Ideal: 50–80 ng/mL. 20–30 ng/mL não protege imunidade nem saúde óssea.\n\n**Insulina:** Glicemia normal por anos, mas insulina já elevada = resistência precoce à insulina.\n\n## Na medicina funcional avaliamos:\n\n- **Valores ideais** (não referência)\n- **Contexto** (sexo, idade, ciclo de vida)\n- **Sintomas** vs laboratorial\n- **Padrões integrados** (não marcadores isolados)\n\n## Exames normais + sintomas persistentes?\n\n**Se quer uma avaliação completa, personalizada e baseada em ciência atual, pode marcar consulta.**\n\nPorque exames normais não significam, necessariamente, saúde.",
    en: "## Reference values vs optimal values in functional medicine\n\nIt's one of the most common situations in my clinical practice.\n\nThe person arrives tired, with symptoms for months or years — **fatigue, hair loss, anxiety, difficulty losing weight, gut issues, pain, mood changes** — and tells me:\n\n> \"My labs are normal.\"\n\nAnd they are. Within **reference values**.\n\n## The problem with reference ranges\n\nReference values are **statistical ranges** calculated from the average of a broad population — including healthy, sick, medicated people, with silent inflammation, nutritional deficiencies...\n\n**In simple terms:**\n\n- They identify **established disease**\n- They do **NOT assess optimal function**\n- They do **NOT detect early imbalances**\n\n> Being \"normal\" only means: statistically, you're not an outlier\n\n## Optimal values = normal human function\n\n**Practical examples I see every day:**\n\n**Thyroid:** TSH reference: 0.5–5.0 mIU/L. TSH optimal: 0.5–2.5 mIU/L. Patient with TSH 3.8: fatigue, cold intolerance, difficulty losing weight = \"normal\" by reference.\n\n**Vitamin D:** Reference: 20–50 ng/mL. Optimal: 50–80 ng/mL. 20–30 ng/mL doesn't protect immunity or bone health.\n\n**Insulin:** Normal blood glucose for years, but insulin already elevated = early insulin resistance.\n\n## In functional medicine we assess:\n\n- **Optimal values** (not reference)\n- **Context** (sex, age, life stage)\n- **Symptoms** vs lab results\n- **Integrated patterns** (not isolated markers)\n\n## Normal labs + persistent symptoms?\n\n**If you want a complete, personalised assessment based on current science, you can book a consultation.**\n\nBecause normal labs don't necessarily mean health."
  },
  "blog.2.body": {
    pt: "O intervalo de referência da TSH foi definido com base numa população geral que inclui pessoas já com disfunção tiroideia. Muitas mulheres com sintomas claros de hipotiroidismo têm valores dentro do \"normal\" — e continuam sem tratamento.\n\nA tiróide é uma das glândulas mais importantes do corpo. Regula o metabolismo, a energia, o humor, o peso, a temperatura corporal, a digestão e até a fertilidade. Quando não funciona de forma óptima, o impacto é sistémico.\n\nO que é uma tiróide \"sub-óptima\"? É quando os valores laboratoriais estão dentro dos intervalos convencionais, mas o corpo mostra sinais claros de que a função tiroideia não é suficiente. Os sintomas mais comuns incluem:\n\n• Fadiga persistente, especialmente de manhã\n• Dificuldade em perder peso, mesmo com dieta e exercício\n• Queda de cabelo ou cabelo seco e quebradiço\n• Pele seca e unhas frágeis\n• Sensação de frio constante\n• Nevoeiro mental e dificuldade de concentração\n• Obstipação crónica\n• Ciclos menstruais irregulares ou pesados\n\nNa medicina funcional, não olhamos apenas para a TSH. Analisamos o quadro completo: T3 livre, T4 livre, anticorpos anti-TPO e anti-tiroglobulina, e a relação entre estes valores. Muitas vezes, a TSH pode estar \"normal\" enquanto o T3 livre está sub-óptimo — e é o T3 que realmente actua nas células.\n\nSe te reconheces nestes sintomas e os teus exames de tiróide são \"normais\", pode haver mais para investigar.",
    en: "The TSH reference range was defined based on a general population that includes people already with thyroid dysfunction. Many women with clear hypothyroid symptoms have values within \"normal\" — and remain untreated.\n\nThe thyroid is one of the body's most important glands. It regulates metabolism, energy, mood, weight, body temperature, digestion, and even fertility. When it doesn't function optimally, the impact is systemic.\n\nWhat is a \"sub-optimal\" thyroid? It's when laboratory values are within conventional ranges, but the body shows clear signs that thyroid function isn't sufficient. The most common symptoms include:\n\n• Persistent fatigue, especially in the morning\n• Difficulty losing weight, even with diet and exercise\n• Hair loss or dry, brittle hair\n• Dry skin and fragile nails\n• Constant feeling of cold\n• Brain fog and difficulty concentrating\n• Chronic constipation\n• Irregular or heavy menstrual cycles\n\nIn functional medicine, we don't just look at TSH. We analyse the complete picture: free T3, free T4, anti-TPO and anti-thyroglobulin antibodies, and the relationship between these values. Often, TSH can be \"normal\" while free T3 is sub-optimal — and it's T3 that actually acts on cells.\n\nIf you recognise yourself in these symptoms and your thyroid tests are \"normal\", there may be more to investigate."
  },
  "blog.3.body": {
    pt: "A perimenopausa pode começar anos antes da última menstruação. Ansiedade nova, sono fragmentado, ciclos irregulares, aumento de peso sem explicação — estes são frequentemente os primeiros sinais, não os afrontamentos.\n\nA maioria das mulheres associa a menopausa aos afrontamentos e à cessação da menstruação. Mas a transição hormonal começa muito antes — frequentemente entre os 38 e os 45 anos — e os primeiros sinais são subtis e facilmente confundidos com stress, ansiedade ou \"envelhecimento normal\".\n\nOs primeiros sinais da perimenopausa:\n\n• Ansiedade nova ou agravada, especialmente na segunda metade do ciclo\n• Sono fragmentado — acordar às 3-4h da manhã sem razão aparente\n• Ciclos que começam a encurtar ou a alongar\n• Fluxo menstrual mais pesado ou irregular\n• Aumento de peso, especialmente na zona abdominal\n• Irritabilidade ou oscilações de humor mais intensas\n• Diminuição da libido\n• Nevoeiro mental e dificuldade de concentração\n\nO que está a acontecer hormonalmente? Na perimenopausa, a progesterona é geralmente a primeira hormona a diminuir, enquanto o estrogénio pode flutuar — por vezes até aumentar em relação à progesterona. Esta dominância estrogénica relativa explica muitos dos sintomas.\n\nA avaliação funcional na perimenopausa inclui um painel hormonal completo — não apenas FSH e estradiol, mas também progesterona, testosterona, DHEA-S e cortisol — idealmente medidos em momentos específicos do ciclo.\n\nSe tens entre 38 e 50 anos e algo mudou no teu corpo que não consegues explicar, a perimenopausa pode ser a peça que falta no puzzle.",
    en: "Perimenopause can start years before the last period. New anxiety, fragmented sleep, irregular cycles, unexplained weight gain — these are often the first signs, not hot flashes.\n\nMost women associate menopause with hot flashes and the cessation of menstruation. But the hormonal transition begins much earlier — often between ages 38 and 45 — and the first signs are subtle and easily confused with stress, anxiety, or \"normal ageing\".\n\nThe first signs of perimenopause:\n\n• New or worsened anxiety, especially in the second half of the cycle\n• Fragmented sleep — waking at 3-4am for no apparent reason\n• Cycles that start to shorten or lengthen\n• Heavier or irregular menstrual flow\n• Weight gain, especially around the abdomen\n• More intense irritability or mood swings\n• Decreased libido\n• Brain fog and difficulty concentrating\n\nWhat's happening hormonally? In perimenopause, progesterone is usually the first hormone to decline, while oestrogen can fluctuate — sometimes even increasing relative to progesterone. This relative oestrogen dominance explains many of the symptoms.\n\nFunctional assessment in perimenopause includes a complete hormonal panel — not just FSH and oestradiol, but also progesterone, testosterone, DHEA-S, and cortisol — ideally measured at specific points in the cycle.\n\nIf you're between 38 and 50 and something has changed in your body that you can't explain, perimenopause may be the missing piece of the puzzle."
  },

  // Aviso Legal page
  "legal_page.label": { pt: "Aviso Legal", en: "Legal Notice" },
  "legal_page.title": { pt: "Aviso Legal", en: "Legal Notice" },
  "legal_page.h2_1": { pt: "Identificação", en: "Identification" },
  "legal_page.p1": { pt: "Este website é propriedade de Catarina Veiga, especialista em Medicina Tradicional Chinesa, com sede em Portugal. A actividade é exercida no âmbito da Medicina Tradicional Chinesa ao abrigo da Lei n.º 71/2013, com consultas em telemedicina. Os atos médicos do acompanhamento são da responsabilidade da Dra. Patrícia Salvador, médica inscrita na Ordem dos Médicos.", en: "This website is owned by Catarina Veiga, specialist in Traditional Chinese Medicine, based in Portugal. The activity is carried out within the scope of Traditional Chinese Medicine under Portuguese Law 71/2013, with telemedicine consultations. The medical acts of follow-up are the responsibility of Dr. Patrícia Salvador, physician registered with the Portuguese Medical Council." },
  "legal_page.h2_2": { pt: "Natureza da informação", en: "Nature of information" },
  "legal_page.p2": { pt: "A informação disponibilizada neste website e nas redes sociais associadas tem carácter meramente educativo e informativo. Não substitui, em caso algum, avaliação médica, diagnóstico ou tratamento. Nenhuma informação aqui apresentada constitui uma relação profissional-cliente até que seja estabelecida formalmente através de consulta.", en: "The information provided on this website and associated social media is purely educational and informative. It does not, under any circumstances, replace medical assessment, diagnosis, or treatment. No information presented here constitutes a professional-client relationship until formally established through consultation." },
  "legal_page.h2_3": { pt: "Resultados", en: "Results" },
  "legal_page.p3": { pt: "Os resultados descritos em testemunhos ou conteúdos educativos são individuais e não garantem resultados semelhantes para outros clientes. Cada caso é único e os resultados dependem de múltiplos factores, incluindo a adesão ao plano proposto.", en: "Results described in testimonials or educational content are individual and do not guarantee similar results for other clients. Each case is unique and results depend on multiple factors, including adherence to the proposed plan." },
  "legal_page.h2_4": { pt: "Propriedade intelectual", en: "Intellectual property" },
  "legal_page.p4": { pt: "Todo o conteúdo deste website — incluindo textos, imagens, logótipos e design — é propriedade de Catarina Veiga e está protegido pela legislação portuguesa e europeia de direitos de autor. A reprodução total ou parcial sem autorização prévia é proibida.", en: "All content on this website — including texts, images, logos, and design — is the property of Catarina Veiga and is protected by Portuguese and European copyright legislation. Total or partial reproduction without prior authorisation is prohibited." },
  "legal_page.h2_5": { pt: "Legislação aplicável", en: "Applicable legislation" },
  "legal_page.p5": { pt: "Este website e os serviços prestados regem-se pela legislação portuguesa. Para resolução de litígios, é competente o foro da comarca de Lisboa, salvo disposição legal em contrário.", en: "This website and the services provided are governed by Portuguese law. For the resolution of disputes, the courts of Lisbon are competent, unless otherwise provided by law." },

  // Política de Privacidade page
  "privacy.label": { pt: "Privacidade", en: "Privacy" },
  "privacy.title": { pt: "Política de Privacidade", en: "Privacy Policy" },
  "privacy.intro": { pt: "A Catarina Veiga — Medicina Funcional Integrativa compromete-se a proteger a privacidade dos seus utilizadores e clientes, em conformidade com o Regulamento Geral de Protecção de Dados (RGPD) — Regulamento (UE) 2016/679.", en: "Catarina Veiga — Integrative Functional Medicine is committed to protecting the privacy of its users and clients, in compliance with the General Data Protection Regulation (GDPR) — Regulation (EU) 2016/679." },
  "privacy.h2_1": { pt: "Responsável pelo tratamento", en: "Data controller" },
  "privacy.p1": { pt: "O responsável pelo tratamento dos dados pessoais é Catarina Veiga, com contacto através de info@catarinaveiga.com.", en: "The data controller is Catarina Veiga, contactable at info@catarinaveiga.com." },
  "privacy.h2_2": { pt: "Dados recolhidos", en: "Data collected" },
  "privacy.p2": { pt: "Recolhemos os seguintes dados: nome e email (através do formulário de newsletter), dados de saúde e história clínica (através de consulta, com consentimento informado), e dados de navegação (cookies analíticos, se aplicável). Os dados de saúde são considerados dados sensíveis ao abrigo do RGPD e são tratados com medidas de segurança reforçadas.", en: "We collect the following data: name and email (through the newsletter form), health data and clinical history (through consultation, with informed consent), and browsing data (analytical cookies, if applicable). Health data is considered sensitive data under the GDPR and is processed with enhanced security measures." },
  "privacy.h2_3": { pt: "Finalidade do tratamento", en: "Purpose of processing" },
  "privacy.p3": { pt: "Os dados pessoais são tratados para: envio de newsletter e conteúdo educativo, prestação de serviços de acompanhamento em Medicina Tradicional Chinesa, comunicação relacionada com consultas e agendamentos, e cumprimento de obrigações legais.", en: "Personal data is processed for: sending newsletters and educational content, providing Traditional Chinese Medicine follow-up services, communication related to consultations and bookings, and compliance with legal obligations." },
  "privacy.h2_4": { pt: "Base legal", en: "Legal basis" },
  "privacy.p4": { pt: "O tratamento dos dados baseia-se em: consentimento explícito (newsletter e dados de saúde), execução de contrato (prestação de serviços), e interesse legítimo (melhoria do website e serviços).", en: "Data processing is based on: explicit consent (newsletter and health data), contract performance (service provision), and legitimate interest (website and service improvement)." },
  "privacy.h2_5": { pt: "Direitos do titular", en: "Data subject rights" },
  "privacy.p5": { pt: "Nos termos do RGPD, tens direito de acesso, rectificação, apagamento, limitação do tratamento, portabilidade e oposição. Para exercer os teus direitos, contacta info@catarinaveiga.com. Tens também o direito de apresentar reclamação à CNPD (Comissão Nacional de Protecção de Dados).", en: "Under the GDPR, you have the right of access, rectification, erasure, restriction of processing, portability, and objection. To exercise your rights, contact info@catarinaveiga.com. You also have the right to lodge a complaint with the CNPD (Portuguese Data Protection Authority)." },
  "privacy.h2_6": { pt: "Conservação dos dados", en: "Data retention" },
  "privacy.p6": { pt: "Os dados pessoais são conservados pelo período necessário à finalidade do tratamento ou pelo prazo legalmente exigido. Os dados de newsletter são mantidos até ao pedido de cancelamento. Os dados clínicos são mantidos pelo período legalmente exigido para registos de saúde.", en: "Personal data is retained for the period necessary for the purpose of processing or for the legally required period. Newsletter data is kept until cancellation is requested. Clinical data is kept for the legally required period for health records." },

  // Termos de Utilização page
  "terms.label": { pt: "Termos", en: "Terms" },
  "terms.title": { pt: "Termos de Utilização", en: "Terms of Use" },
  "terms.intro": { pt: "Ao utilizar este website, aceitas os presentes termos e condições. Se não concordares, não deves utilizar este website.", en: "By using this website, you accept these terms and conditions. If you do not agree, you should not use this website." },
  "terms.h2_1": { pt: "Utilização do website", en: "Website usage" },
  "terms.p1": { pt: "Este website é disponibilizado para fins informativos e educativos. O conteúdo não constitui aconselhamento médico, diagnóstico ou tratamento. Não deves tomar decisões de saúde baseadas exclusivamente na informação aqui apresentada sem consultar um profissional de saúde qualificado.", en: "This website is provided for informational and educational purposes. The content does not constitute medical advice, diagnosis, or treatment. You should not make health decisions based solely on the information presented here without consulting a qualified health professional." },
  "terms.h2_2": { pt: "Serviços", en: "Services" },
  "terms.p2": { pt: "Os serviços de acompanhamento em Medicina Tradicional Chinesa são prestados em telemedicina, mediante agendamento prévio. A relação profissional-cliente é estabelecida formalmente na primeira consulta. Os atos médicos (prescrição, análises, diagnóstico) são da responsabilidade da Dra. Patrícia Salvador, médica inscrita na Ordem dos Médicos. Os valores e condições dos serviços são comunicados antes do início do acompanhamento.", en: "Traditional Chinese Medicine follow-up services are provided via telemedicine, by prior appointment. The professional-client relationship is formally established at the first consultation. Medical acts (prescriptions, tests, diagnosis) are the responsibility of Dr. Patrícia Salvador, physician registered with the Portuguese Medical Council. Service fees and conditions are communicated before the start of follow-up." },
  "terms.h2_3": { pt: "Cancelamentos e reagendamentos", en: "Cancellations and rescheduling" },
  "terms.p3": { pt: "Cancelamentos ou reagendamentos devem ser comunicados com pelo menos 24 horas de antecedência. Cancelamentos com menos de 24 horas podem estar sujeitos a cobrança parcial ou total do valor da consulta.", en: "Cancellations or rescheduling must be communicated at least 24 hours in advance. Cancellations with less than 24 hours' notice may be subject to partial or full charge of the consultation fee." },
  "terms.h2_4": { pt: "Limitação de responsabilidade", en: "Limitation of liability" },
  "terms.p4": { pt: "Catarina Veiga não se responsabiliza por decisões tomadas com base na informação disponibilizada neste website. Os resultados do acompanhamento dependem de múltiplos factores individuais e não são garantidos.", en: "Catarina Veiga is not responsible for decisions made based on the information provided on this website. Follow-up results depend on multiple individual factors and are not guaranteed." },
  "terms.h2_5": { pt: "Alterações aos termos", en: "Changes to terms" },
  "terms.p5": { pt: "Estes termos podem ser actualizados a qualquer momento. A utilização continuada do website após alterações constitui aceitação dos novos termos. Última actualização: Março 2026.", en: "These terms may be updated at any time. Continued use of the website after changes constitutes acceptance of the new terms. Last updated: March 2026." },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("pt");

  const t = (key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[lang] || entry.pt;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
