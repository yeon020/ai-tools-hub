"use client";

import Link from "next/link";
import { ExternalLink, Star, CheckCircle2, XCircle, ArrowRight, Building2, Tag } from "lucide-react";
import ToolLogo from "@/components/tools/ToolLogo";
import { useLanguage } from "@/lib/i18n";
import type { Tool } from "@/lib/types";
import { localizeTool } from "@/lib/localize";
import { getToolFAQs } from "@/data/faqs";

interface FAQ { question: string; answer: string; }
interface Comparison { href: string; label: string; }

function BoolCell({ v }: { v: boolean }) {
  return v
    ? <CheckCircle2 className="h-4 w-4 text-emerald-400" />
    : <XCircle className="h-4 w-4 text-zinc-600" />;
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`h-3.5 w-3.5 ${i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-zinc-700"}`} />
      ))}
    </div>
  );
}

interface Props {
  tool: Tool;
  related: Tool[];
  comparisons: Comparison[];
}

export default function ToolPageContent({ tool, related, comparisons }: Props) {
  const { t, lang } = useLanguage();
  const sl = t.tool.specLabels;
  const lTool = localizeTool(tool, lang);
  const faqs = getToolFAQs(tool, lang);

  const FEATURE_TABLE = [
    { label: sl.price,          value: lTool.localPricing },
    { label: sl.freePlan,       bool: tool.free_plan },
    { label: sl.apiSupport,     bool: tool.api_support },
    { label: sl.webSearch,      bool: tool.web_search },
    { label: sl.fileUpload,     bool: tool.file_upload },
    { label: sl.imageGen,       bool: tool.image_generation },
    { label: sl.voice,          bool: tool.voice_support },
    { label: sl.coding,         bool: tool.coding_support },
    { label: sl.mobileApp,      bool: tool.mobile_app },
    { label: sl.contextWindow,  value: tool.context_window },
    { label: sl.recommendedFor, value: lTool.localRecommendedFor },
    { label: sl.releaseDate,    value: tool.release_date },
    { label: sl.company,        value: tool.company },
  ] as Array<{ label: string; value?: string; bool?: boolean }>;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Main */}
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
                      {t.tool.freePlan}
                    </span>
                  )}
                  {tool.featured && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                      {t.tool.featured}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="text-sm text-zinc-500 flex items-center gap-1">
                    <Building2 className="h-3.5 w-3.5" />{tool.company}
                  </span>
                  <span className="text-sm text-zinc-500 flex items-center gap-1">
                    <Tag className="h-3.5 w-3.5" />{lTool.localCategory}
                  </span>
                  {tool.rating && (
                    <span className="flex items-center gap-1.5">
                      <Stars rating={tool.rating} />
                      <span className="text-sm text-zinc-400">{tool.rating}</span>
                      <span className="text-xs text-zinc-600">({tool.review_count?.toLocaleString()})</span>
                    </span>
                  )}
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{lTool.localDescription}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-5 pt-5 border-t border-white/[0.06]">
              <a href={tool.affiliate_url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors">
                {t.tool.startFree} <ArrowRight className="h-4 w-4" />
              </a>
              <a href={tool.website_url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/[0.12] text-zinc-300 hover:text-white hover:border-white/20 text-sm font-medium transition-colors">
                {t.tool.officialSite} <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {lTool.localLongDescription && (
            <section>
              <h2 className="text-lg font-semibold text-white mb-3">{tool.name}{t.tool.whatIs}</h2>
              <p className="text-sm text-zinc-400 leading-relaxed">{lTool.localLongDescription}</p>
            </section>
          )}

          <section>
            <h2 className="text-lg font-semibold text-white mb-4">{t.tool.keyFeatures}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {lTool.localFeatures.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-zinc-400">
                  <CheckCircle2 className="h-4 w-4 text-violet-400 shrink-0" />{f}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-4">{t.tool.specs}</h2>
            <div className="rounded-xl border border-white/[0.08] overflow-hidden">
              {FEATURE_TABLE.map((row, idx) => (
                <div key={row.label} className={`flex items-center justify-between px-4 py-3 text-sm ${idx % 2 === 0 ? "bg-white/[0.02]" : ""}`}>
                  <span className="text-zinc-500 w-36 shrink-0">{row.label}</span>
                  {row.bool !== undefined
                    ? <BoolCell v={row.bool} />
                    : <span className="text-zinc-300 text-right">{row.value}</span>
                  }
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-4">{t.tool.faq}</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details key={i} className="group rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
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

          {comparisons.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-white mb-4">{t.tool.relatedComparisons}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {comparisons.map((c) => (
                  <Link key={c.href} href={c.href}
                    className="flex items-center justify-between px-4 py-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] hover:border-violet-500/30 transition-all group">
                    <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">{c.label}</span>
                    <ArrowRight className="h-4 w-4 text-zinc-600 group-hover:text-violet-400 transition-colors" />
                  </Link>
                ))}
              </div>
            </section>
          )}

          {related.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-white mb-4">{t.tool.relatedTools}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((rt) => (
                  <Link key={rt.id} href={`/tool/${rt.slug}`}
                    className="flex items-start gap-3 p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] hover:border-violet-500/30 transition-all">
                    <ToolLogo tool={rt} size="sm" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">{rt.name}</span>
                        {rt.free_plan && (
                          <span className="text-[10px] text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded-full">
                            {t.tool.free}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-500 line-clamp-2 mt-0.5">{localizeTool(rt, lang).localDescription}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
            <h3 className="text-sm font-semibold text-white mb-3">{t.tool.pricing}</h3>
            <p className="text-sm text-zinc-400 mb-4">{tool.pricing}</p>
            <a href={tool.affiliate_url} target="_blank" rel="noopener noreferrer"
              className="block w-full text-center px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors">
              {t.tool.startFree}
            </a>
            <a href={tool.website_url} target="_blank" rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-1.5 w-full text-center px-4 py-2.5 rounded-xl border border-white/[0.10] text-zinc-400 hover:text-white text-sm transition-colors">
              {t.tool.officialSite} <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
            <h3 className="text-sm font-semibold text-white mb-3">{t.tool.toolInfo}</h3>
            <div className="space-y-2.5 text-xs">
              {[
                { label: sl.company,     value: tool.company },
                { label: sl.category,    value: lTool.localCategory },
                { label: sl.releaseDate, value: tool.release_date },
                { label: sl.updatedAt,   value: tool.updated_at.slice(0, 10) },
              ].map((item) => (
                <div key={item.label} className="flex justify-between">
                  <span className="text-zinc-500">{item.label}</span>
                  <span className="text-zinc-300">{item.value}</span>
                </div>
              ))}
              {tool.rating && (
                <div className="flex justify-between items-center pt-1 border-t border-white/[0.06]">
                  <span className="text-zinc-500">{sl.rating}</span>
                  <span className="flex items-center gap-1.5">
                    <Stars rating={tool.rating} />
                    <span className="text-zinc-300">{tool.rating}/5</span>
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
            <h3 className="text-sm font-semibold text-white mb-3">{t.tool.quickCheck}</h3>
            <div className="space-y-2">
              {[
                { label: sl.freePlan,   v: tool.free_plan },
                { label: sl.apiSupport, v: tool.api_support },
                { label: sl.webSearch,  v: tool.web_search },
                { label: sl.fileUpload, v: tool.file_upload },
                { label: sl.imageGen,   v: tool.image_generation },
                { label: sl.voice,      v: tool.voice_support },
                { label: sl.coding,     v: tool.coding_support },
                { label: sl.mobileApp,  v: tool.mobile_app },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500">{item.label}</span>
                  <BoolCell v={item.v} />
                </div>
              ))}
            </div>
          </div>

          {comparisons.length > 0 && (
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
              <h3 className="text-sm font-semibold text-white mb-3">{tool.name} {t.tool.compareWith}</h3>
              <div className="space-y-1">
                {comparisons.map((c) => (
                  <Link key={c.href} href={c.href}
                    className="flex items-center justify-between text-xs text-zinc-400 hover:text-white py-1.5 border-b border-white/[0.05] last:border-0 transition-colors">
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
  );
}
