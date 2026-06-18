import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getToolsByCategory } from "@/data/tools";
import { CATEGORIES, getCategoryInfo } from "@/lib/utils";
import type { Category } from "@/lib/types";
import CategoryPageContent from "@/components/category/CategoryPageContent";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const info = getCategoryInfo(category as Category);
  if (!info) return {};

  const year = new Date().getFullYear();
  const title = `Best ${info.label} AI Tools (${year}) — AIHub`;
  const description = `${info.description}. Compare the best ${info.label} AI tools in ${year} — pricing, features, and free plans.`;

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { card: "summary_large_image", title, description },
    alternates: {
      canonical: `/category/${category}`,
      languages: { en: `/category/${category}`, ko: `/category/${category}` },
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const info = getCategoryInfo(category as Category);
  if (!info) notFound();

  const tools = getToolsByCategory(category);
  const otherCategories = CATEGORIES.filter((c) => c.slug !== category);

  return (
    <CategoryPageContent
      info={info}
      tools={tools}
      otherCategories={otherCategories}
    />
  );
}
