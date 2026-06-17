import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getToolBySlug } from "@/data/tools";
import CompareTable from "@/components/compare/CompareTable";
import CompareSelector from "@/components/compare/CompareSelector";
import { POPULAR_COMPARISONS } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  params: Promise<{ comparison: string }>;
}

export async function generateStaticParams() {
  const pairs = [
    ...POPULAR_COMPARISONS.map((c) => ({ comparison: `${c.toolA}-vs-${c.toolB}` })),
    // Extra combos for SEO
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
  const slugA = comparison.slice(0, idx);
  const slugB = comparison.slice(idx + 4);
  const toolA = getToolBySlug(slugA);
  const toolB = getToolBySlug(slugB);
  if (!toolA || !toolB) return {};

  const year = new Date().getFullYear();
  const title = `${toolA.name} vs ${toolB.name} Comparison (${year})`;
  const description = `Compare ${toolA.name} and ${toolB.name} pricing, features, free plan, API support, and more. Find out which AI tool is right for you.`;

  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
    alternates: { canonical: `/compare/${comparison}` },
  };
}

export default async function ComparePage({ params }: Props) {
  const { comparison } = await params;
  const idx = comparison.lastIndexOf("-vs-");
  if (idx === -1) notFound();

  const slugA = comparison.slice(0, idx);
  const slugB = comparison.slice(idx + 4);
  const toolA = getToolBySlug(slugA);
  const toolB = getToolBySlug(slugB);

  if (!toolA || !toolB) notFound();

  const year = new Date().getFullYear();
  const otherComparisons = POPULAR_COMPARISONS.filter(
    (c) => !(c.toolA === slugA && c.toolB === slugB) && !(c.toolA === slugB && c.toolB === slugA)
  );

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${toolA.name} vs ${toolB.name}`,
    description: `${toolA.name}과 ${toolB.name} 비교`,
    url: `https://aihub.kr/compare/${comparison}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-zinc-600 mb-8">
          <Link href="/" className="hover:text-white transition-colors">홈</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-zinc-400">비교</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-zinc-400">{toolA.name} vs {toolB.name}</span>
        </nav>

        {/* Page header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            {toolA.name}{" "}
            <span className="text-zinc-600">vs</span>{" "}
            {toolB.name}
          </h1>
          <p className="text-zinc-500 text-sm">
            {year}년 최신 가격, 기능, 무료 플랜 비교
          </p>
        </div>

        {/* Real-time selector */}
        <CompareSelector toolA={toolA} toolB={toolB} />

        {/* Compare Table */}
        <CompareTable toolA={toolA} toolB={toolB} />

        {/* Other comparisons */}
        {otherComparisons.length > 0 && (
          <div className="mt-12 pt-10 border-t border-white/[0.06]">
            <h2 className="text-base font-semibold text-white mb-4">다른 비교 보기</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {otherComparisons.map((comp) => (
                <Link
                  key={`${comp.toolA}-vs-${comp.toolB}`}
                  href={`/compare/${comp.toolA}-vs-${comp.toolB}`}
                >
                  <Card className="hover:border-white/[0.15] hover:bg-white/[0.04] cursor-pointer transition-all duration-200">
                    <CardContent className="p-3 text-center">
                      <p className="text-xs font-medium text-zinc-300">
                        {comp.labelA} vs {comp.labelB}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
