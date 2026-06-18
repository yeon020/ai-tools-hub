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
    // Chat & General AI
    { comparison: "chatgpt-vs-perplexity" },
    { comparison: "chatgpt-vs-deepseek" },
    { comparison: "chatgpt-vs-microsoft-copilot" },
    { comparison: "claude-vs-deepseek" },
    { comparison: "claude-vs-gemini" },
    { comparison: "claude-vs-perplexity" },
    { comparison: "gemini-vs-perplexity" },
    { comparison: "deepseek-vs-gemini" },
    { comparison: "chatgpt-vs-notion-ai" },
    // Coding
    { comparison: "cursor-vs-github-copilot" },
    { comparison: "cursor-vs-cline" },
    { comparison: "cursor-vs-bolt" },
    { comparison: "github-copilot-vs-cline" },
    { comparison: "bolt-vs-lovable" },
    { comparison: "bolt-vs-v0" },
    { comparison: "windsurf-vs-github-copilot" },
    // Image
    { comparison: "midjourney-vs-leonardo-ai" },
    { comparison: "midjourney-vs-ideogram" },
    { comparison: "midjourney-vs-stable-diffusion" },
    { comparison: "leonardo-ai-vs-ideogram" },
    // Video
    { comparison: "heygen-vs-synthesia" },
    { comparison: "runway-vs-pika" },
    { comparison: "runway-vs-kling-ai" },
    { comparison: "pika-vs-kling-ai" },
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
