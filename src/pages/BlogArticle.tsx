import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Link2, Facebook, Linkedin } from "lucide-react";
import { NavbarV2 } from "@/components/v2/layout/NavbarV2";
import LegalBand from "@/components/LegalBand";
import { FooterV2 } from "@/components/v2/layout/FooterV2";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSanityPost, useSanityPosts } from "@/hooks/useSanityPosts";
import { useEffect, useState, useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PortableText } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import { Helmet } from "react-helmet-async";
import { extractFaqFromBody, buildFaqJsonLd } from "@/lib/extractFaqFromBody";

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-serif text-2xl md:text-3xl text-v2-ink mt-12 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-xl md:text-2xl text-v2-ink mt-8 mb-3">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="my-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-v2-golden pl-6 italic text-v2-ink/80 my-8 text-lg">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-v2-ink">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-v2-golden hover:text-v2-golden underline transition-colors"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 space-y-2 my-6">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-2 my-6">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?.url) return null;
      return (
        <figure className="my-8">
          <img
            src={value.asset.url}
            alt={value.alt || ""}
            className="w-full rounded-xl"
            loading="lazy"
          />
          {value.alt && (
            <figcaption className="text-center text-v2-ink-mute text-sm mt-3 font-sans">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

const BlogArticle = () => {
  const { slug } = useParams();
  const { t, lang } = useLanguage();
  const { data: post, isLoading } = useSanityPost(slug || "");
  const { data: allPosts } = useSanityPosts();
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const faqItems = useMemo(() => extractFaqFromBody(post?.body), [post?.body]);
  const faqJsonLd = useMemo(() => buildFaqJsonLd(faqItems), [faqItems]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success(lang === "pt" ? "Link copiado!" : "Link copied!");
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribing(true);
    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email: email.trim(), source: "blog-article" });
      if (error) throw error;
      toast.success(lang === "pt" ? "Subscrito com sucesso!" : "Subscribed successfully!");
      setEmail("");
    } catch {
      toast.error(lang === "pt" ? "Erro ao subscrever." : "Failed to subscribe.");
    } finally {
      setSubscribing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-v2-paper">
        <NavbarV2 />
        <main className="pt-32 pb-20 px-6">
          <div className="max-w-3xl mx-auto animate-pulse space-y-4">
            <div className="h-8 bg-v2-paper-deep rounded w-1/3" />
            <div className="h-12 bg-v2-paper-deep rounded w-2/3" />
            <div className="h-64 bg-v2-paper-deep rounded w-full mt-8" />
          </div>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-v2-paper">
        <NavbarV2 />
        <main className="pt-32 pb-20 px-6 text-center">
          <h1 className="font-serif text-4xl text-v2-ink mb-4">{t("notfound.title")}</h1>
          <Link to="/blog" className="text-v2-golden hover:text-v2-golden transition-colors">
            ← {t("blog.back")}
          </Link>
        </main>
        <LegalBand />
        <FooterV2 />
      </div>
    );
  }

  const title = post.title;
  const excerpt = post.excerpt;
  const coverUrl = post.mainImage?.asset?.url;
  const date = new Date(post.publishedAt).toLocaleDateString(lang === "pt" ? "pt-PT" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const relatedPosts = allPosts?.filter((p) => p.slug.current !== post.slug.current).slice(0, 3) ?? [];

  // SEO overrides per slug — custom meta titles and descriptions for high-impression queries
  const seoOverrides: Record<string, { title: string; description: string }> = {
    "nervo-vago-como-ativar-mulher": {
      title: "Nervo Vago: O Que Ninguém Te Explica Sobre os Teus Sintomas",
      description: "O nervo vago regula digestão, sono e inflamação. Quando falha, os exames dão normais mas o corpo não pára de dar sinais. Descobre o que está por trás.",
    },
    "pequenos-almocos-proteicos": {
      title: "Pequenos-Almoços Proteicos Que Cortam a Fome Até ao Almoço",
      description: "Fome às 10h mesmo depois de comer? Falta proteína ao pequeno-almoço. Refeições com 25-30g de proteína que activam saciedade. Simples e sem meal prep.",
    },
    "pequeno-almoco-30g-proteina": {
      title: "Pequeno-Almoço com 30g de Proteína — 5 Opções Rápidas",
      description: "30g de proteína ao pequeno-almoço reduz cravings e estabiliza energia até ao almoço. Cinco opções com ingredientes de supermercado. Sem batidos.",
    },
    "pequeno-almoco-rico-proteina": {
      title: "Pequeno-Almoço Rico em Proteína Para Quem Tem Fome a Sério",
      description: "Não é mais uma lista de granola e iogurte. Refeições com proteína real que activam saciedade. Para mulheres que precisam de energia estável até ao almoço.",
    },
  };

  const seo = slug && seoOverrides[slug]
    ? seoOverrides[slug]
    : { title: `${title} | Catarina Veiga`, description: excerpt || "" };

  return (
    <div className="min-h-screen bg-v2-paper">
      <NavbarV2 />

      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        {coverUrl && <meta property="og:image" content={coverUrl} />}
        <link rel="canonical" href={`https://www.catarinaveiga.com/blog/${slug}`} />
      </Helmet>

      {faqJsonLd && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        </Helmet>
      )}

      {/* Hero image */}
      {coverUrl && (
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[560px]">
          <img src={coverUrl} alt={post.mainImage?.alt || title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ivory via-ivory/50 to-transparent" />
        </div>
      )}

      <article className={`max-w-3xl mx-auto px-6 ${coverUrl ? "-mt-32 relative z-10" : "pt-32"}`}>
        {/* Header */}
        <div className="mb-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-v2-golden hover:text-v2-golden transition-colors mb-8 font-serif text-xl"
          >
            <ArrowLeft size={14} /> {t("blog.back")}
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <time className="text-v2-ink-mute text-sm font-sans">{date}</time>
            {post.category && (
              <>
                <span className="text-v2-ink-mute">·</span>
                <span className="text-v2-golden text-sm font-sans">{post.category}</span>
              </>
            )}
          </div>

          <h1 className="font-serif text-3xl md:text-5xl text-v2-ink mb-4 leading-tight">{title}</h1>
          {excerpt && <p className="text-v2-ink-mute text-lg font-light">{excerpt}</p>}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full border border-v2-paper-line text-xs font-sans text-v2-ink-mute"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Share bar */}
          <div className="flex items-center gap-3 mt-8 pt-6 border-t border-v2-paper-line">
            <span className="text-xs text-v2-ink-mute font-sans uppercase tracking-wider mr-2">
              {lang === "pt" ? "Partilhar" : "Share"}
            </span>
            <button
              onClick={handleCopyLink}
              className="w-9 h-9 rounded-full border border-v2-paper-line hover:border-v2-golden hover:bg-v2-paper-deep transition-all flex items-center justify-center"
              aria-label="Copy link"
            >
              <Link2 className="w-3.5 h-3.5" />
            </button>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-v2-paper-line hover:border-v2-golden hover:bg-v2-paper-deep transition-all flex items-center justify-center"
              aria-label="Share on Facebook"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-v2-paper-line hover:border-v2-golden hover:bg-v2-paper-deep transition-all flex items-center justify-center"
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Article body — Portable Text */}
        <div className="text-v2-ink-mute text-[16px] leading-relaxed mb-16">
          {post.body && <PortableText value={post.body} components={portableTextComponents} />}
        </div>

        {/* Newsletter CTA */}
        <div className="mb-16 rounded-2xl bg-v2-paper-deep p-8 md:p-12 text-center">
          <h3 className="font-serif text-2xl md:text-3xl text-v2-ink mb-3">
            {lang === "pt" ? "Gostaste deste artigo?" : "Enjoyed this article?"}
          </h3>
          <p className="text-v2-ink-mute text-sm mb-6">
            {lang === "pt"
              ? "Subscreve para receber os próximos artigos diretamente no teu email."
              : "Subscribe to receive new articles directly in your inbox."}
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={lang === "pt" ? "O teu email" : "Your email"}
              required
              className="flex-1 px-5 py-3 rounded-full border border-v2-paper-line bg-v2-paper font-sans text-sm text-v2-ink placeholder:text-v2-ink-mute focus:outline-none focus:ring-2 focus:ring-amber/40 transition-all"
            />
            <button
              type="submit"
              disabled={subscribing}
              className="px-8 py-3 rounded-full bg-foreground text-v2-paper font-sans text-sm font-medium hover:bg-foreground/90 transition-all disabled:opacity-50"
            >
              {lang === "pt" ? "Subscrever" : "Subscribe"}
            </button>
          </form>
        </div>
      </article>

      {/* Related articles */}
      {relatedPosts.length > 0 && (
        <section className="bg-v2-paper-deep py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-3xl text-v2-ink mb-8">
              {lang === "pt" ? "Também te pode interessar" : "You might also like"}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp._id}
                  to={`/blog/${rp.slug.current}`}
                  className="group relative block rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]"
                  style={{ boxShadow: "0 4px 20px -4px hsl(30 17% 9% / 0.08)" }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-v2-paper rounded-2xl">
                    {rp.mainImage?.asset?.url ? (
                      <img
                        src={rp.mainImage.asset.url}
                        alt={rp.mainImage.alt || rp.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-v2-paper" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                      <div className="flex justify-end">
                        <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-sans text-white border border-white/30">
                          {new Date(rp.publishedAt).toLocaleDateString(lang === "pt" ? "pt-PT" : "en-GB", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-end justify-between gap-4">
                        <h3 className="text-white text-lg md:text-xl font-serif leading-snug flex-1">
                          {rp.title}
                        </h3>
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shrink-0 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <LegalBand />
      <FooterV2 />
    </div>
  );
};

export default BlogArticle;
