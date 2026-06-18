import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SAMPLE_TOOLS, getToolBySlug, getRelatedTools } from "@/data/tools";
import { getToolFAQs } from "@/data/faqs";
import ToolPageContent from "@/components/tools/ToolPageContent";
import type { Tool } from "@/lib/types";

/* ─── Static generation ──────────────────────────────── */
export function generateStaticParams() {
  return SAMPLE_TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: "Tool Not Found" };
  const title = `${tool.name} 리뷰 & 가격 | AIHub`;
  const description = `${tool.name}의 기능, 가격(${tool.pricing}), 무료 플랜 여부, 사용자 평점 등 모든 정보. ${tool.description}`;
  return {
    title,
    description,
    openGraph: { title, description, url: `https://aihub.kr/tool/${tool.slug}` },
    twitter: { card: "summary_large_image", title, description },
    alternates: { canonical: `https://aihub.kr/tool/${tool.slug}` },
  };
}

/* ─── Helpers ────────────────────────────────────────── */
function relatedComparisons(tool: Tool) {
  const alts = tool.alternatives.slice(0, 4);
  return alts.map((altSlug) => {
    const label = altSlug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return {
      href: `/compare/${tool.slug}-vs-${altSlug}`,
      label: `${tool.name} vs ${label}`,
    };
  });
}

/* ─── Page ───────────────────────────────────────────── */
export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const related = getRelatedTools(tool, 4);
  const faqs = getToolFAQs(tool, "en");
  const comparisons = relatedComparisons(tool);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: tool.name,
        description: tool.description,
        applicationCategory: "AI Tool",
        operatingSystem: "Web, Mobile",
        url: tool.website_url,
        offers: {
          "@type": "Offer",
          ...(tool.free_plan ? { price: "0" } : {}),
          priceCurrency: "USD",
          description: tool.pricing,
        },
        ...(tool.rating
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: tool.rating,
                reviewCount: tool.review_count,
                bestRating: 5,
                worstRating: 1,
              },
            }
          : {}),
        author: { "@type": "Organization", name: tool.company },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolPageContent tool={tool} related={related} comparisons={comparisons} />
    </>
  );
}
