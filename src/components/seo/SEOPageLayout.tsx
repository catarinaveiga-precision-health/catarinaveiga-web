import { Helmet } from "react-helmet-async";
import { NavbarV2 } from "@/components/v2/layout/NavbarV2";
import { FooterV2 } from "@/components/v2/layout/FooterV2";
import LegalBand from "@/components/LegalBand";
import MobileCTA from "@/components/MobileCTA";
import { ArticleLeadMagnetCTA } from "@/components/v2/leadmagnet/ArticleLeadMagnetCTA";

interface SEOPageLayoutProps {
  title: string;
  description: string;
  canonical: string;
  structuredData: Record<string, unknown>;
  children: React.ReactNode;
  hideLeadMagnet?: boolean;
}

const SEOPageLayout = ({ title, description, canonical, structuredData, children, hideLeadMagnet }: SEOPageLayoutProps) => (
  <>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="article" />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
    <NavbarV2 />
    <main>{children}</main>
    {!hideLeadMagnet && (
      <div className="max-w-3xl mx-auto px-6">
        <ArticleLeadMagnetCTA />
      </div>
    )}
    <LegalBand />
    <FooterV2 />
    <MobileCTA />
  </>
);

export default SEOPageLayout;
