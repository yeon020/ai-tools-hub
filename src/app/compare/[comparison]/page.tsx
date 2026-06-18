import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getToolBySlug } from "@/data/tools";
import { POPULAR_COMPARISONS } from "@/lib/utils";
import ComparePageContent from "@/components/compare/ComparePageContent";

interface Props {
  params: Promise<{ comparison: string }>;
}

export async function generateStaticParams() {
  const pairs = [
    ...POPULAR_COMPARISONS.map((c) => ({ comparison: `${c.toolA}-vs-${c.toolB}` })),
    { comparison: "chatgpt-vs-perplexity" },
    { comparison: "cursor-vs-github-copilot" },
    { comparison: "midjourney-vs-leonardo-ai" },
    { comparison: "chatgpt-vs-deepseek" },
    { comparison: "claude-vs-deepseek" },
    { comparison: "chatgpt-vs-microsoft-copilot" },
    { comparison: "bolt-vs-lovable" },
    { comparison: "bolt-vs-v0" },
    { comparison: "cursor-vs-cline" },
    { comparison: "heygen-vs-synthesia" },
    { comparison: "runway-vs-pika" },
    { comparison: "deepseek-vs-gemini" },
  ];
  return pairs;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { comparison } = await params;
  const idx = comparison.lastIndexOf("-vs-");
  if (idx === -1) return {};
  const toolA = getToolBySlug(comparison.slice(0, idx));
  const toolB = getToolBySlug(comparison.slice(idx + 4));
  if (!toolA || !toolB) return {};

  const year = new Date().getFullYear();
  const title = `${toolA.name} vs ${toolB.name} (${year}) — Pricing, Features & Free Plan`;
  const description = `Compare ${toolA.name} and ${toolB.name} side-by-side. See pricing, features, free plan availability, API support, and more. Find out which AI tool is right for you in ${year}.`;

  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
    alternates: {
      canonical: `/compare/${comparison}`,
      languages: {
        "en": `/compare/${comparison}`,
        "ko": `/compare/${comparison}`,
      },
    },
  };
}

export default async function ComparePage({ params }: Props) {
  const { comparison } = await params;
  const idx = comparison.lastIndexOf("-vs-");
  if (idx === -1) notFound();

  const toolA = getToolBySlug(comparison.slice(0, idx));
  const toolB = getToolBySlug(comparison.slice(idx + 4));
  if (!toolA || !toolB) notFound();

  const year = new Date().getFullYear();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${toolA.name} vs ${toolB.name} Comparison (${year})`,
    description: `Compare ${toolA.name} and ${toolB.name} pricing, features, and free plan availability.`,
    url: `https://ai-tools-hub-silk.vercel.app/compare/${comparison}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ComparePageContent toolA={toolA} toolB={toolB} comparison={comparison} />
    </>
  );
}
