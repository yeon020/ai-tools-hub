"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { getToolSuggestions } from "@/data/tools";
import type { Tool } from "@/lib/types";
import ToolLogo from "@/components/tools/ToolLogo";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";

export default function HeroSection() {
  const router = useRouter();
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Tool[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.trim()) {
      const results = getToolSuggestions(query, 6);
      setSuggestions(results);
      setOpen(results.length > 0);
    } else {
      setSuggestions([]);
      setOpen(false);
    }
    setActiveIdx(-1);
  }, [query]);

  /* Outside click → close */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setActiveIdx(-1);
  }, []);

  const handleSelect = useCallback((slug: string) => {
    router.push(`/tool/${slug}`);
    close();
    setQuery("");
  }, [router, close]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeIdx >= 0 && suggestions[activeIdx]) {
      handleSelect(suggestions[activeIdx].slug);
    } else if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      close();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, -1));
    } else if (e.key === "Escape") {
      close();
      inputRef.current?.blur();
    }
  };

  return (
    /* overflow-hidden removed — it clips the absolute dropdown */
    <section className="relative py-20 sm:py-28">
      {/* Ambient glow — overflow-hidden scoped to this inner div only */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-violet-600/8 blur-[140px]" />
        <div className="absolute top-32 left-1/4 h-[300px] w-[400px] rounded-full bg-indigo-600/6 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/8 px-4 py-1.5 text-sm text-violet-400">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{t.hero.badge}</span>
        </div>

        {/* Heading */}
        <h1 className="mb-5 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.1]">
          {t.hero.title1}
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            {t.hero.title2}
          </span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-zinc-400 leading-relaxed sm:text-xl">
          {t.hero.description}
        </p>

        {/* Search — wrapper is relative anchor for the absolute dropdown */}
        <div ref={wrapperRef} className="relative mx-auto mb-10 max-w-2xl">
          <form onSubmit={handleSearch}>
            <div className="relative flex items-center">
              <Search className="pointer-events-none absolute left-5 h-5 w-5 text-zinc-500" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => query && suggestions.length > 0 && setOpen(true)}
                onKeyDown={handleKeyDown}
                placeholder="ChatGPT, Cursor, Midjourney..."
                className="h-14 w-full rounded-2xl border border-white/[0.10] bg-white/[0.05] pl-14 pr-36 text-base text-white placeholder:text-zinc-500 focus:border-violet-500/40 focus:outline-none focus:ring-2 focus:ring-violet-500/30 transition-all duration-200"
                autoComplete="off"
                spellCheck={false}
              />
              <Button type="submit" variant="gradient" className="absolute right-2 h-10 gap-2 px-5">
                {t.hero.searchButton}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Backdrop — fixed so it NEVER affects document flow or layout */}
          {open && (
            <div
              className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-[2px]"
              onClick={close}
              aria-hidden="true"
            />
          )}

          {/* Dropdown — absolute, completely out of document flow */}
          {open && suggestions.length > 0 && (
            <div className="absolute top-[calc(100%+8px)] left-0 right-0 z-[9999] rounded-xl border border-white/[0.12] bg-[#0f0f0f] shadow-[0_24px_60px_rgba(0,0,0,0.8)] overflow-hidden max-h-[400px] overflow-y-auto search-scrollbar">
              {suggestions.map((tool, idx) => (
                <button
                  key={tool.id}
                  onClick={() => handleSelect(tool.slug)}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors border-b border-white/[0.05] last:border-0 group ${
                    activeIdx === idx ? "bg-violet-500/[0.08]" : "hover:bg-white/[0.05]"
                  }`}
                >
                  <ToolLogo tool={tool} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{tool.name}</p>
                    <p className="text-xs text-zinc-500 truncate">{tool.company} · {tool.category}</p>
                  </div>
                  {tool.free_plan && (
                    <span className="text-[10px] font-medium text-emerald-400 border border-emerald-500/20 bg-emerald-500/[0.08] px-1.5 py-0.5 rounded-full shrink-0">
                      Free
                    </span>
                  )}
                  <ArrowRight className={`h-3.5 w-3.5 shrink-0 transition-colors ${activeIdx === idx ? "text-violet-400" : "text-zinc-700 group-hover:text-zinc-500"}`} />
                </button>
              ))}
              {/* See all results footer */}
              <button
                onClick={() => { router.push(`/search?q=${encodeURIComponent(query.trim())}`); close(); }}
                className="flex w-full items-center justify-center gap-1.5 py-2.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors border-t border-white/[0.06] bg-white/[0.01]"
              >
                &ldquo;{query}&rdquo; 전체 결과 보기
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
          <span className="text-zinc-600">{t.hero.popularLabel}</span>
          {["ChatGPT", "Claude", "Cursor", "Midjourney", "Perplexity"].map((term) => (
            <Link
              key={term}
              href={`/search?q=${term}`}
              className="rounded-full border border-white/[0.08] px-3 py-1 text-zinc-400 hover:border-violet-500/40 hover:text-violet-400 transition-all duration-150"
            >
              {term}
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-3 gap-6 mx-auto max-w-sm">
          {t.hero.stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-zinc-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
