import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ExternalLink, Star, CheckCircle2, XCircle, ArrowRight, Building2, Tag
} from "lucide-react";
import { SAMPLE_TOOLS, getToolBySlug, getRelatedTools } from "@/data/tools";
import { getToolFAQs } from "@/data/faqs";
import ToolLogo from "@/components/tools/ToolLogo";
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
function BoolCell({ v }: { v: boolean }) {
  return v
    ? <CheckCircle2 className="h-4 w-4 text-emerald-400" />
    : <XCircle className="h-4 w-4 text-zinc-600" />;
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-zinc-700"}`}
        />
      ))}
    </div>
  );
}

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
  const faqs = getToolFAQs(tool);
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

  const FEATURE_TABLE = [
    { label: "가격", value: tool.pricing },
    { label: "무료 플랜", bool: tool.free_plan },
    { label: "API 지원", bool: tool.api_support },
    { label: "웹 검색", bool: tool.web_search },
    { label: "파일 업로드", bool: tool.file_upload },
    { label: "이미지 생성", bool: tool.image_generation },
    { label: "음성 기능", bool: tool.voice_support },
    { label: "코딩 지원", bool: tool.coding_support },
    { label: "모바일 앱", bool: tool.mobile_app },
    { label: "컨텍스트 길이", value: tool.context_window },
    { label: "추천 대상", value: tool.recommended_for },
    { label: "출시일", value: tool.release_date },
    { label: "회사", value: tool.company },
  ] as Array<{ label: string; value?: string; bool?: boolean }>;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Main ──────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Hero card */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <div className="flex items-start gap-5">
                <ToolLogo tool={tool} size="xl" />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h1 className="text-2xl font-bold text-white">{tool.name}</h1>
                    {tool.free_plan && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        무료 플랜
                      </span>
                    )}
                    {tool.featured && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                        추천
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-sm text-zinc-500 flex items-center gap-1">
                      <Building2 className="h-3.5 w-3.5" />
                      {tool.company}
                    </span>
                    <span className="text-sm text-zinc-500 flex items-center gap-1">
                      <Tag className="h-3.5 w-3.5" />
                      {tool.category}
                    </span>
                    {tool.rating && (
                      <span className="flex items-center gap-1.5">
                        <Stars rating={tool.rating} />
                        <span className="text-sm text-zinc-400">{tool.rating}</span>
                        <span className="text-xs text-zinc-600">({tool.review_count?.toLocaleString()})</span>
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{tool.description}</p>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-3 mt-5 pt-5 border-t border-white/[0.06]">
                <a
                  href={tool.affiliate_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors"
                >
                  무료로 시작하기 <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={tool.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/[0.12] text-zinc-300 hover:text-white hover:border-white/20 text-sm font-medium transition-colors"
                >
                  공식 사이트 <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Description */}
            {tool.long_description && (
              <section>
                <h2 className="text-lg font-semibold text-white mb-3">{tool.name}이란?</h2>
                <p className="text-sm text-zinc-400 leading-relaxed">{tool.long_description}</p>
              </section>
            )}

            {/* Features checklist */}
            <section>
              <h2 className="text-lg font-semibold text-white mb-4">주요 기능</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {tool.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-zinc-400">
                    <CheckCircle2 className="h-4 w-4 text-violet-400 shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </section>

            {/* Full spec table */}
            <section>
              <h2 className="text-lg font-semibold text-white mb-4">상세 스펙</h2>
              <div className="rounded-xl border border-white/[0.08] overflow-hidden">
                {FEATURE_TABLE.map((row, idx) => (
                  <div
                    key={row.label}
                    className={`flex items-center justify-between px-4 py-3 text-sm ${idx % 2 === 0 ? "bg-white/[0.02]" : ""}`}
                  >
                    <span className="text-zinc-500 w-36 shrink-0">{row.label}</span>
                    {row.bool !== undefined
                      ? <BoolCell v={row.bool} />
                      : <span className="text-zinc-300 text-right">{row.value}</span>
                    }
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-lg font-semibold text-white mb-4">자주 묻는 질문</h2>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="group rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-hidden"
                  >
                    <summary className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer text-sm font-medium text-white list-none hover:bg-white/[0.03] transition-colors">
                      {faq.question}
                      <span className="text-zinc-500 shrink-0 group-open:rotate-45 transition-transform text-lg leading-none">+</span>
                    </summary>
                    <div className="px-5 pb-4 text-sm text-zinc-400 leading-relaxed border-t border-white/[0.06] pt-4">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* Related Comparisons */}
            {comparisons.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-white mb-4">관련 비교</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {comparisons.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="flex items-center justify-between px-4 py-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] hover:border-violet-500/30 transition-all group"
                    >
                      <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">
                        {c.label}
                      </span>
                      <ArrowRight className="h-4 w-4 text-zinc-600 group-hover:text-violet-400 transition-colors" />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Related Tools */}
            {related.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-white mb-4">관련 AI 툴</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {related.map((rt) => (
                    <Link
                      key={rt.id}
                      href={`/tool/${rt.slug}`}
                      className="flex items-start gap-3 p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] hover:border-violet-500/30 transition-all"
                    >
                      <ToolLogo tool={rt} size="sm" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white">{rt.name}</span>
                          {rt.free_plan && (
                            <span className="text-[10px] text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded-full">
                              무료
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-500 line-clamp-2 mt-0.5">{rt.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ── Sidebar ──────────────────────────────────── */}
          <div className="space-y-5">

            {/* Pricing */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
              <h3 className="text-sm font-semibold text-white mb-3">가격 정보</h3>
              <p className="text-sm text-zinc-400 mb-4">{tool.pricing}</p>
              <a
                href={tool.affiliate_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors"
              >
                무료로 시작하기
              </a>
              <a
                href={tool.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-1.5 w-full text-center px-4 py-2.5 rounded-xl border border-white/[0.10] text-zinc-400 hover:text-white text-sm transition-colors"
              >
                공식 사이트 방문 <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Tool info */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
              <h3 className="text-sm font-semibold text-white mb-3">툴 정보</h3>
              <div className="space-y-2.5 text-xs">
                {[
                  { label: "회사", value: tool.company },
                  { label: "카테고리", value: tool.category },
                  { label: "출시일", value: tool.release_date },
                  { label: "업데이트", value: tool.updated_at.slice(0, 10) },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between">
                    <span className="text-zinc-500">{item.label}</span>
                    <span className="text-zinc-300">{item.value}</span>
                  </div>
                ))}
                {tool.rating && (
                  <div className="flex justify-between items-center pt-1 border-t border-white/[0.06]">
                    <span className="text-zinc-500">평점</span>
                    <span className="flex items-center gap-1.5">
                      <Stars rating={tool.rating} />
                      <span className="text-zinc-300">{tool.rating}/5</span>
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick spec */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
              <h3 className="text-sm font-semibold text-white mb-3">빠른 확인</h3>
              <div className="space-y-2">
                {[
                  { label: "무료 플랜", v: tool.free_plan },
                  { label: "API 지원", v: tool.api_support },
                  { label: "웹 검색", v: tool.web_search },
                  { label: "파일 업로드", v: tool.file_upload },
                  { label: "이미지 생성", v: tool.image_generation },
                  { label: "음성 기능", v: tool.voice_support },
                  { label: "코딩 지원", v: tool.coding_support },
                  { label: "모바일 앱", v: tool.mobile_app },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">{item.label}</span>
                    <BoolCell v={item.v} />
                  </div>
                ))}
              </div>
            </div>

            {/* Compare sidebar */}
            {comparisons.length > 0 && (
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
                <h3 className="text-sm font-semibold text-white mb-3">{tool.name} 비교하기</h3>
                <div className="space-y-1">
                  {comparisons.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="flex items-center justify-between text-xs text-zinc-400 hover:text-white py-1.5 border-b border-white/[0.05] last:border-0 transition-colors"
                    >
                      <span>{c.label}</span>
                      <ArrowRight className="h-3 w-3 shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
