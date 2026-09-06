import { supabase } from "@/integrations/supabase/client";

export interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string | null;
  category?: string;
  tags?: string[];
  mainImage?: {
    asset: { url: string };
    alt?: string;
  };
  excerpt?: string | null;
  body?: any[];
  author?: { name: string };
}

export const sanityQuery = async <T = any>(
  query: string,
  params?: Record<string, string>
): Promise<T> => {
  const { data, error } = await supabase.functions.invoke("sanity-query", {
    body: { query, params },
  });

  if (error) throw error;
  if (data?.error) throw new Error(data.error);
  return data.result;
};

// GROQ queries
export const ALL_POSTS_QUERY = `*[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  category,
  tags,
  mainImage { asset->{ url }, alt },
  excerpt,
  "author": author->{ name }
}`;

export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
  _id,
  title,
  slug,
  publishedAt,
  category,
  tags,
  mainImage { asset->{ url }, alt },
  excerpt,
  body[]{ ..., _type == "image" => { ..., asset->{ url } } },
  "author": author->{ name }
}`;

export const CATEGORIES_QUERY = `array::unique(*[_type == "post" && defined(category) && !(_id in path("drafts.**"))].category)`;
