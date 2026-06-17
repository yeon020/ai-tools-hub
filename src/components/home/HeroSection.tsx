"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { getToolSuggestions } from "@/data/tools";
import type { Tool } from "@/lib/types";
import ToolLogo from "@/components/tools/ToolLogo";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Tool[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const results = getToolSuggestions(query, 6);
    setSuggestions(results);
    setShowSuggestions(query.length > 0 && results.length > 0);
  }, [query]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSelect = (slug: string) => {
    router.push(`/tool/${slug}`);
    setShowSuggestions(false);
    setQuery("");
  };

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-violet-600/8 blur-[140px]" />
        <div className="absolute top-32 left-1/4 h-[300px] w-[400px] rounded-full bg-indigo-600/6 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/8 px-4 py-1.5 text-sm text-violet-400">
          <Sparkles className="h-3.5 w-3.5" />
          <span>33개 AI 툴 큐레이션 · 매주 업데이트</span>
        </div>

        {/* Heading */}
        <h1 className="mb-5 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.1]">
          최고의 AI 툴을
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            찾고 비교하세요
          </span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-zinc-400 leading-relaxed sm:text-xl">
          ChatGPT부터 Cursor까지 — AI 툴의 가격, 기능, 무료 플랜을
          <br className="hidden sm:block" />
          한 곳에서 비교하고 최적의 도구를 선택하세요.
        </p>

        {/* Search with autocomplete */}
        <div ref={wrapperRef} className="relative mx-auto mb-10 max-w-2xl">
          <form onSubmit={handleSearch}>
            <div className="relative flex items-center">
              <Search className="pointer-events-none absolute left-5 h-5 w-5 text-zinc-500" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => query && setSuggestions.length > 0 && setShowSuggestions(true)}
                placeholder="ChatGPT, Cursor, Midjourney..."
                className="h-14 w-full rounded-2xl border border-white/[0.10] bg-white/[0.05] pl-14 pr-36 text-base text-white placeholder:text-zinc-500 focus:border-violet-500/40 focus:outline-none focus:ring-2 focus:ring-violet-500/30 transition-all duration-200"
              />
              <Button type="submit" variant="gradient" className="absolute right-2 h-10 gap-2 px-5">
                검색
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Autocomplete dropdown */}
          {showSuggestions && (
            <div className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 rounded-xl border border-white/[0.10] bg-[#111] shadow-2xl overflow-hidden">
              {suggestions.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => handleSelect(tool.slug)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-white/[0.05] transition-colors border-b border-white/[0.05] last:border-0"
                >
                  <ToolLogo tool={tool} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{tool.name}</p>
                    <p className="text-xs text-zinc-500 truncate">{tool.company} · {tool.category}</p>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-zinc-600 shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
          <span className="text-zinc-600">인기:</span>
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
          {[
            { value: "33+",  label: "AI 툴" },
            { value: "7",    label: "카테고리" },
            { value: "무료", label: "이용 가능" },
          ].map((s) => (
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
