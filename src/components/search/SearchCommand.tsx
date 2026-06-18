"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, Hash } from "lucide-react";
import { searchTools, getFeaturedTools } from "@/data/tools";
import { localizeTool } from "@/lib/localize";
import { useLanguage } from "@/lib/i18n";
import type { Tool } from "@/lib/types";
import ToolLogo from "@/components/tools/ToolLogo";

/* ─── Category pill ─────────────────────────────────── */
const CATEGORY_COLOR: Record<string, string> = {
  chat:         "text-blue-400 bg-blue-500/10 border-blue-500/20",
  coding:       "text-violet-400 bg-violet-500/10 border-violet-500/20",
  image:        "text-pink-400 bg-pink-500/10 border-pink-500/20",
  video:        "text-orange-400 bg-orange-500/10 border-orange-500/20",
  voice:        "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  productivity: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  design:       "text-amber-400 bg-amber-500/10 border-amber-500/20",
};

function CategoryPill({ category }: { category: string }) {
  const cls = CATEGORY_COLOR[category] ?? "text-zinc-400 bg-zinc-500/10 border-zinc-500/20";
  return (
    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${cls}`}>
      {category}
    </span>
  );
}

/* ─── Result row ─────────────────────────────────────── */
function ToolRow({
  tool, active, onClick, lang,
}: {
  tool: Tool; active: boolean; onClick: () => void; lang: "en" | "ko";
}) {
  const lTool = localizeTool(tool, lang);
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors border-b border-white/[0.04] last:border-0 group ${
        active ? "bg-violet-500/[0.08] border-b-violet-500/10" : "hover:bg-white/[0.04]"
      }`}
    >
      <ToolLogo tool={tool} size="sm" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white leading-tight">{tool.name}</p>
        <p className="text-[11px] text-zinc-500 truncate mt-0.5">{lTool.localDescription}</p>
      </div>
      <div className="shrink-0 flex items-center gap-1.5">
        {tool.free_plan && (
          <span className="text-[10px] font-medium text-emerald-400 border border-emerald-500/20 bg-emerald-500/[0.08] px-1.5 py-0.5 rounded-full">
            {lang === "ko" ? "무료" : "Free"}
          </span>
        )}
        <CategoryPill category={tool.category} />
      </div>
      <ArrowRight className={`h-3.5 w-3.5 shrink-0 transition-colors ${active ? "text-violet-400" : "text-zinc-700 group-hover:text-zinc-500"}`} />
    </button>
  );
}

/* ─── Main component ─────────────────────────────────── */
export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Tool[]>([]);
  const [activeIdx, setActiveIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { t, lang } = useLanguage();

  const popular = getFeaturedTools().slice(0, 5);

  /* Update results */
  useEffect(() => {
    if (query.trim()) {
      setResults(searchTools(query).slice(0, 8));
    } else {
      setResults([]);
    }
    setActiveIdx(-1);
  }, [query]);

  /* Global keyboard shortcut (⌘K / Ctrl+K) + mobile event */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    const onEvent = () => setOpen(true);
    document.addEventListener("keydown", onKey);
    document.addEventListener("aihub:opensearch", onEvent);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("aihub:opensearch", onEvent);
    };
  }, []);

  /* Focus input on open */
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
  }, [open]);

  /* Scroll active item into view */
  useEffect(() => {
    if (activeIdx < 0 || !scrollRef.current) return;
    const el = scrollRef.current.children[activeIdx + 1] as HTMLElement;
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  /* Prevent body scroll when open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setResults([]);
    setActiveIdx(-1);
  }, []);

  const navigate = useCallback((tool: Tool) => {
    router.push(`/tool/${tool.slug}`);
    close();
  }, [router, close]);

  const navigateSearch = useCallback(() => {
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    close();
  }, [query, router, close]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const total = results.length;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, total - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIdx >= 0 && results[activeIdx]) {
        navigate(results[activeIdx]);
      } else {
        navigateSearch();
      }
    } else if (e.key === "Escape") {
      close();
    }
  };

  return (
    <>
      {/* ── Trigger button ─────────────────────────────── */}
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 h-8 px-3 rounded-lg border border-white/[0.08] text-zinc-500 hover:text-white hover:border-white/[0.15] transition-all group"
        aria-label="Search"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="text-xs">{t.nav.search}</span>
        <span className="ml-1 hidden lg:flex items-center gap-px rounded border border-white/[0.06] px-1 py-0.5 text-[9px] text-zinc-700 group-hover:text-zinc-500 transition-colors font-mono">
          ⌘K
        </span>
      </button>

      {/* ── Mobile trigger ──────────────────────────────── */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden p-1.5 rounded-md text-zinc-500 hover:text-white transition-colors"
        aria-label="Search"
      >
        <Search className="h-4.5 w-4.5" />
      </button>

      {/* ── Modal overlay ──────────────────────────────── */}
      {open && (
        <div
          className="fixed inset-0 z-[200] flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label={lang === "ko" ? "AI 툴 검색" : "Search AI tools"}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={close}
          />

          {/* Panel — positioned below the header (~64px) */}
          <div className="relative w-full max-w-xl mx-auto mt-16 sm:mt-20 px-3 sm:px-0">
            <div className="rounded-2xl border border-white/[0.12] bg-[#0d0d0d] shadow-[0_32px_80px_rgba(0,0,0,0.85)] overflow-hidden">

              {/* ── Input row ──────────────────────────── */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.06]">
                <Search className="h-4 w-4 text-zinc-500 shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t.search.placeholder}
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-600 focus:outline-none min-w-0"
                  spellCheck={false}
                  autoComplete="off"
                />
                {query && (
                  <button
                    onClick={() => { setQuery(""); inputRef.current?.focus(); }}
                    className="shrink-0 text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors border border-white/[0.08] rounded px-1.5 py-0.5"
                  >
                    ✕
                  </button>
                )}
                <button
                  onClick={close}
                  className="shrink-0 hidden sm:block text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors border border-white/[0.08] rounded px-1.5 py-0.5"
                >
                  ESC
                </button>
              </div>

              {/* ── Scrollable results ──────────────────── */}
              <div
                ref={scrollRef}
                className="max-h-[min(400px,60vh)] overflow-y-auto overscroll-contain search-scrollbar"
              >
                {results.length > 0 ? (
                  <>
                    {/* "Search all results" shortcut */}
                    <button
                      onClick={navigateSearch}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors border-b border-white/[0.06] hover:bg-white/[0.04] group"
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-violet-500/20 bg-violet-500/10 shrink-0">
                        <Hash className="h-3.5 w-3.5 text-violet-400" />
                      </div>
                      <span className="text-zinc-400 group-hover:text-white transition-colors">
                        {lang === "ko"
                          ? <><strong className="text-white">"{query}"</strong> 전체 검색</>
                          : <>Search all results for <strong className="text-white">"{query}"</strong></>
                        }
                      </span>
                      <ArrowRight className="ml-auto h-3.5 w-3.5 text-zinc-700 group-hover:text-zinc-500 transition-colors" />
                    </button>

                    {/* Tool rows */}
                    {results.map((tool, idx) => (
                      <ToolRow
                        key={tool.id}
                        tool={tool}
                        active={activeIdx === idx}
                        onClick={() => navigate(tool)}
                        lang={lang}
                      />
                    ))}
                  </>
                ) : query.trim() ? (
                  /* No results */
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="text-3xl mb-3">🔍</div>
                    <p className="text-sm text-zinc-400 font-medium">
                      {lang === "ko" ? `"${query}"에 대한 결과 없음` : `No results for "${query}"`}
                    </p>
                    <p className="text-xs text-zinc-600 mt-1">
                      {lang === "ko" ? "다른 키워드로 검색해보세요" : "Try a different keyword"}
                    </p>
                  </div>
                ) : (
                  /* Empty — show popular tools */
                  <>
                    <p className="px-4 pt-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
                      {lang === "ko" ? "인기 AI 툴" : "Popular AI Tools"}
                    </p>
                    {popular.map((tool) => (
                      <ToolRow
                        key={tool.id}
                        tool={tool}
                        active={false}
                        onClick={() => navigate(tool)}
                        lang={lang}
                      />
                    ))}
                    <button
                      onClick={() => { router.push("/search"); close(); }}
                      className="flex w-full items-center justify-center gap-1.5 py-3 text-xs text-zinc-600 hover:text-zinc-400 transition-colors border-t border-white/[0.04]"
                    >
                      {lang === "ko" ? "전체 AI 툴 보기" : "Browse all AI tools"}
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </>
                )}
              </div>

              {/* ── Footer: keyboard hints ──────────────── */}
              <div className="flex items-center gap-4 px-4 py-2 border-t border-white/[0.06] bg-white/[0.01]">
                {[
                  { key: "↑↓", label: lang === "ko" ? "이동" : "navigate" },
                  { key: "↵",  label: lang === "ko" ? "선택" : "select" },
                  { key: "ESC",label: lang === "ko" ? "닫기" : "close" },
                ].map(({ key, label }) => (
                  <span key={key} className="flex items-center gap-1 text-[10px] text-zinc-700">
                    <kbd className="rounded border border-white/[0.08] bg-white/[0.03] px-1 py-px font-mono text-zinc-600">
                      {key}
                    </kbd>
                    {label}
                  </span>
                ))}
                <span className="ml-auto text-[10px] text-zinc-700">AIHub</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
