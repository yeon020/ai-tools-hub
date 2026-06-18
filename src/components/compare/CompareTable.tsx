"use client";

import { CheckCircle2, XCircle, Star, Trophy, Zap, DollarSign, ArrowRight, ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { localizeTool } from "@/lib/localize";
import type { Tool } from "@/lib/types";
import ToolLogo from "@/components/tools/ToolLogo";

/* ─── Row config ─────────────────────────────────────────
   labelKey maps to t.tool.specLabels keys               */
const ROWS = [
  { key: "pricing",          labelKey: "price",          type: "text"    },
  { key: "free_plan",        labelKey: "freePlan",       type: "boolean" },
  { key: "api_support",      labelKey: "apiSupport",     type: "boolean" },
  { key: "web_search",       labelKey: "webSearch",      type: "boolean" },
  { key: "file_upload",      labelKey: "fileUpload",     type: "boolean" },
  { key: "image_generation", labelKey: "imageGen",       type: "boolean" },
  { key: "voice_support",    labelKey: "voice",          type: "boolean" },
  { key: "coding_support",   labelKey: "coding",         type: "boolean" },
  { key: "mobile_app",       labelKey: "mobileApp",      type: "boolean" },
  { key: "context_window",   labelKey: "contextWindow",  type: "text"    },
  { key: "recommended_for",  labelKey: "recommendedFor", type: "text"    },
  { key: "company",          labelKey: "company",        type: "text"    },
  { key: "release_date",     labelKey: "releaseDate",    type: "text"    },
  { key: "rating",           labelKey: "rating",         type: "rating"  },
] as const;

/* ─── Winner badge computation ──────────────────────── */
interface Badges { badgeA: string[]; badgeB: string[] }

function computeBadges(toolA: Tool, toolB: Tool, lang: "en" | "ko"): Badges {
  const badgeA: string[] = [];
  const badgeB: string[] = [];
  const ko = lang === "ko";

  // Highest rated
  if (toolA.rating && toolB.rating) {
    if (toolA.rating > toolB.rating)
      badgeA.push(ko ? "🏆 최고 평점" : "🏆 Highest Rated");
    else if (toolB.rating > toolA.rating)
      badgeB.push(ko ? "🏆 최고 평점" : "🏆 Highest Rated");
  }

  // Free plan advantage
  if (toolA.free_plan && !toolB.free_plan)
    badgeA.push(ko ? "💰 무료 플랜" : "💰 Best Value");
  else if (!toolA.free_plan && toolB.free_plan)
    badgeB.push(ko ? "💰 무료 플랜" : "💰 Best Value");

  // Feature breadth
  const score = (t: Tool) =>
    [t.api_support, t.web_search, t.file_upload, t.image_generation,
     t.voice_support, t.coding_support, t.mobile_app].filter(Boolean).length;
  const sA = score(toolA), sB = score(toolB);
  if (sA > sB + 1)
    badgeA.push(ko ? "⚡ 기능 풍부" : "⚡ Most Features");
  else if (sB > sA + 1)
    badgeB.push(ko ? "⚡ 기능 풍부" : "⚡ Most Features");

  return { badgeA, badgeB };
}

/* ─── Verdict computation ────────────────────────────── */
interface Verdict { chooseA: string[]; chooseB: string[] }

function computeVerdict(toolA: Tool, toolB: Tool, lang: "en" | "ko"): Verdict {
  const ko = lang === "ko";
  const chooseA: string[] = [];
  const chooseB: string[] = [];

  const add = (arr: string[], en: string, k: string) =>
    arr.push(ko ? k : en);

  // Free plan
  if (toolA.free_plan && !toolB.free_plan) {
    add(chooseA, "You want to start completely free", "무료로 시작하고 싶다면");
    add(chooseB, `You're ready to invest in premium features`, "프리미엄 기능에 투자할 준비가 됐다면");
  } else if (!toolA.free_plan && toolB.free_plan) {
    add(chooseA, `You're ready to invest in premium features`, "프리미엄 기능에 투자할 준비가 됐다면");
    add(chooseB, "You want to start completely free", "무료로 시작하고 싶다면");
  }

  // API support
  if (toolA.api_support && !toolB.api_support)
    add(chooseA, "You need API access for custom integrations", "API로 커스텀 통합이 필요하다면");
  else if (!toolA.api_support && toolB.api_support)
    add(chooseB, "You need API access for custom integrations", "API로 커스텀 통합이 필요하다면");

  // Web search
  if (toolA.web_search && !toolB.web_search)
    add(chooseA, "Real-time web information is important", "실시간 웹 정보가 필요하다면");
  else if (!toolA.web_search && toolB.web_search)
    add(chooseB, "Real-time web information is important", "실시간 웹 정보가 필요하다면");

  // Coding
  if (toolA.coding_support && !toolB.coding_support)
    add(chooseA, "Coding and development is your main use case", "코딩·개발이 주요 목적이라면");
  else if (!toolA.coding_support && toolB.coding_support)
    add(chooseB, "Coding and development is your main use case", "코딩·개발이 주요 목적이라면");

  // Image generation
  if (toolA.image_generation && !toolB.image_generation)
    add(chooseA, "Image generation is a priority", "이미지 생성 기능이 필요하다면");
  else if (!toolA.image_generation && toolB.image_generation)
    add(chooseB, "Image generation is a priority", "이미지 생성 기능이 필요하다면");

  // Voice
  if (toolA.voice_support && !toolB.voice_support)
    add(chooseA, "Voice interaction matters to you", "음성 기능이 중요하다면");
  else if (!toolA.voice_support && toolB.voice_support)
    add(chooseB, "Voice interaction matters to you", "음성 기능이 중요하다면");

  // Mobile
  if (toolA.mobile_app && !toolB.mobile_app)
    add(chooseA, "You need a mobile app", "모바일 앱이 필요하다면");
  else if (!toolA.mobile_app && toolB.mobile_app)
    add(chooseB, "You need a mobile app", "모바일 앱이 필요하다면");

  // Rating
  if (toolA.rating && toolB.rating) {
    if (toolA.rating >= toolB.rating + 0.3)
      add(chooseA, "Community ratings and reviews influence your choice", "사용자 평점을 중시한다면");
    else if (toolB.rating >= toolA.rating + 0.3)
      add(chooseB, "Community ratings and reviews influence your choice", "사용자 평점을 중시한다면");
  }

  // Always add recommended_for as the last bullet
  add(chooseA,
    `You fit the profile: ${toolA.recommended_for}`,
    `추천 대상: ${toolA.recommended_for}`);
  add(chooseB,
    `You fit the profile: ${toolB.recommended_for}`,
    `추천 대상: ${toolB.recommended_for}`);

  return {
    chooseA: chooseA.slice(0, 4),
    chooseB: chooseB.slice(0, 4),
  };
}

/* ─── Sub-components ─────────────────────────────────── */
function BoolCell({ v }: { v: boolean }) {
  return v
    ? <CheckCircle2 className="h-5 w-5 text-emerald-400 mx-auto" />
    : <XCircle className="h-5 w-5 text-zinc-700 mx-auto" />;
}

function RatingCell({ v }: { v: number | undefined }) {
  if (!v) return <span className="text-zinc-600 text-sm mx-auto block text-center">—</span>;
  return (
    <div className="flex items-center justify-center gap-1">
      <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
      <span className="text-sm font-semibold text-white">{v}</span>
    </div>
  );
}

function ToolHeader({
  tool, primary, badges,
}: {
  tool: Tool; primary?: boolean; badges: string[];
}) {
  const { t, lang } = useLanguage();
  const lTool = localizeTool(tool, lang);
  const tryFreeLabel = tool.free_plan
    ? (lang === "ko" ? "무료로 시작하기" : "Try Free")
    : (lang === "ko" ? "시작하기" : "Get Started");

  return (
    <div className={`flex flex-col items-center text-center p-6 rounded-xl border relative ${primary ? "border-violet-500/30 bg-violet-500/[0.04]" : "border-white/[0.08] bg-white/[0.02]"}`}>
      <ToolLogo tool={tool} size="lg" />
      <h3 className="mt-3 text-lg font-bold text-white">{tool.name}</h3>
      <p className="text-xs text-zinc-500 mt-0.5">{tool.company}</p>

      {/* Winner badges */}
      {badges.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1.5 mt-2">
          {badges.map((b) => (
            <span key={b} className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
              {b}
            </span>
          ))}
        </div>
      )}

      <p className="text-xs text-zinc-400 mt-3 line-clamp-2 leading-relaxed">{lTool.localDescription}</p>

      {/* CTA buttons */}
      <div className="w-full mt-4 space-y-2">
        <a href={tool.affiliate_url} target="_blank" rel="noopener noreferrer" className="block">
          <button className={`w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${primary ? "bg-violet-600 hover:bg-violet-500 text-white" : "bg-white/[0.06] hover:bg-white/[0.10] border border-white/[0.10] text-white"}`}>
            {tryFreeLabel} <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </a>
        <a href={tool.website_url} target="_blank" rel="noopener noreferrer" className="block">
          <button className="w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs text-zinc-500 hover:text-zinc-300 transition-colors border border-white/[0.06] hover:border-white/[0.12]">
            {lang === "ko" ? "공식 사이트" : "Official Site"} <ExternalLink className="h-3 w-3" />
          </button>
        </a>
      </div>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────── */
export default function CompareTable({ toolA, toolB }: { toolA: Tool; toolB: Tool }) {
  const { t, lang } = useLanguage();
  const sl = t.tool.specLabels;
  const { badgeA, badgeB } = computeBadges(toolA, toolB, lang);
  const verdict = computeVerdict(toolA, toolB, lang);
  const lToolA = localizeTool(toolA, lang);
  const lToolB = localizeTool(toolB, lang);

  const labelMap: Record<string, string> = {
    price:         sl.price,
    freePlan:      sl.freePlan,
    apiSupport:    sl.apiSupport,
    webSearch:     sl.webSearch,
    fileUpload:    sl.fileUpload,
    imageGen:      sl.imageGen,
    voice:         sl.voice,
    coding:        sl.coding,
    mobileApp:     sl.mobileApp,
    contextWindow: sl.contextWindow,
    recommendedFor:sl.recommendedFor,
    company:       sl.company,
    releaseDate:   sl.releaseDate,
    rating:        sl.rating,
  };

  return (
    <div className="space-y-8">
      {/* Tool headers */}
      <div className="grid grid-cols-3 gap-4 items-start">
        <div className="flex items-end pb-2">
          <span className="text-xs font-semibold text-zinc-600 uppercase tracking-wider">
            {lang === "ko" ? "비교 항목" : "Feature"}
          </span>
        </div>
        <ToolHeader tool={toolA} primary badges={badgeA} />
        <ToolHeader tool={toolB} badges={badgeB} />
      </div>

      {/* Feature table */}
      <div className="rounded-xl border border-white/[0.08] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06] bg-white/[0.02]">
              <th className="py-3 px-5 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider w-1/3">
                {lang === "ko" ? "항목" : "Specification"}
              </th>
              <th className="py-3 px-5 text-center text-sm font-semibold text-violet-300 w-1/3">{toolA.name}</th>
              <th className="py-3 px-5 text-center text-sm font-semibold text-white w-1/3">{toolB.name}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.05]">
            {ROWS.map((row) => {
              const valA = toolA[row.key as keyof Tool];
              const valB = toolB[row.key as keyof Tool];
              const label = labelMap[row.labelKey] ?? row.labelKey;

              // Highlight winner for text rows with meaningful difference
              const isBoolA = row.type === "boolean" && Boolean(valA) && !Boolean(valB);
              const isBoolB = row.type === "boolean" && Boolean(valB) && !Boolean(valA);

              return (
                <tr key={row.key} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-5 text-sm text-zinc-400 font-medium">{label}</td>
                  <td className={`py-3.5 px-5 text-center ${isBoolA ? "bg-emerald-500/[0.04]" : ""}`}>
                    {row.type === "boolean" ? (
                      <BoolCell v={Boolean(valA)} />
                    ) : row.type === "rating" ? (
                      <RatingCell v={valA as number | undefined} />
                    ) : (
                      <span className="text-xs text-zinc-300 font-mono">{String(valA ?? "—")}</span>
                    )}
                  </td>
                  <td className={`py-3.5 px-5 text-center ${isBoolB ? "bg-emerald-500/[0.04]" : ""}`}>
                    {row.type === "boolean" ? (
                      <BoolCell v={Boolean(valB)} />
                    ) : row.type === "rating" ? (
                      <RatingCell v={valB as number | undefined} />
                    ) : (
                      <span className="text-xs text-zinc-300 font-mono">{String(valB ?? "—")}</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {([
          { tool: toolA, lTool: lToolA, accent: true },
          { tool: toolB, lTool: lToolB, accent: false },
        ] as const).map(({ tool, lTool, accent }) => (
          <div key={tool.id} className={`rounded-xl border p-6 ${accent ? "border-violet-500/20 bg-violet-500/[0.03]" : "border-white/[0.08] bg-white/[0.02]"}`}>
            <h4 className="font-semibold text-white mb-4 flex items-center gap-2 text-sm">
              <ToolLogo tool={tool} size="sm" />
              {tool.name} {lang === "ko" ? "주요 기능" : "Key Features"}
            </h4>
            <ul className="space-y-2">
              {lTool.localFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-zinc-400">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Our Verdict */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-2">
          <Trophy className="h-4 w-4 text-amber-400" />
          <h2 className="text-base font-bold text-white">
            {lang === "ko" ? "최종 결론" : "Our Verdict"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]">
          {/* Choose A */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <ToolLogo tool={toolA} size="sm" />
              <p className="text-sm font-semibold text-violet-300">
                {lang === "ko" ? `${toolA.name}을(를) 선택하세요, 만약:` : `Choose ${toolA.name} if:`}
              </p>
            </div>
            <ul className="space-y-2.5">
              {verdict.chooseA.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                  <span className="text-violet-400 shrink-0 mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
            <a href={toolA.affiliate_url} target="_blank" rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors">
              {toolA.free_plan
                ? (lang === "ko" ? "무료로 시작하기" : "Try Free")
                : (lang === "ko" ? "시작하기" : "Get Started")}
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Choose B */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <ToolLogo tool={toolB} size="sm" />
              <p className="text-sm font-semibold text-zinc-200">
                {lang === "ko" ? `${toolB.name}을(를) 선택하세요, 만약:` : `Choose ${toolB.name} if:`}
              </p>
            </div>
            <ul className="space-y-2.5">
              {verdict.chooseB.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                  <span className="text-zinc-500 shrink-0 mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
            <a href={toolB.affiliate_url} target="_blank" rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-400 hover:text-white transition-colors">
              {toolB.free_plan
                ? (lang === "ko" ? "무료로 시작하기" : "Try Free")
                : (lang === "ko" ? "시작하기" : "Get Started")}
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
