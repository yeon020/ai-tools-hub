"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { searchTools, SAMPLE_TOOLS } from "@/data/tools";
import { CATEGORIES } from "@/lib/utils";
import type { Tool, Category } from "@/lib/types";
import { Button } from "@/components/ui/button";
import ToolCard from "@/components/tools/ToolCard";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  const [freeOnly, setFreeOnly] = useState(false);
  const [results, setResults] = useState<Tool[]>([]);

  useEffect(() => {
    let filtered = query.trim() ? searchTools(query.trim()) : [...SAMPLE_TOOLS];
    if (selectedCategory !== "all") filtered = filtered.filter((t) => t.category === selectedCategory);
    if (freeOnly) filtered = filtered.filter((t) => t.free_plan);
    setResults(filtered);
  }, [query, selectedCategory, freeOnly]);

  const clearFilters = () => {
    setQuery("");
    setSelectedCategory("all");
    setFreeOnly(false);
    router.push("/search", { scroll: false });
  };

  const hasFilters = query || selectedCategory !== "all" || freeOnly;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">AI 툴 탐색</h1>
        <p className="text-sm text-zinc-500">
          {results.length}개 AI 툴
          {query && <> — <span className="text-zinc-300">&ldquo;{query}&rdquo;</span> 검색 결과</>}
        </p>
      </div>

      {/* Search bar */}
      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            router.push(`/search?q=${encodeURIComponent(e.target.value)}`, { scroll: false });
          }}
          placeholder="툴 이름, 회사, 카테고리로 검색..."
          className="w-full h-12 pl-12 pr-12 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500/40 transition-all"
        />
        {query && (
          <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <SlidersHorizontal className="h-4 w-4 text-zinc-600" />

        {/* Category filters */}
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
            selectedCategory === "all"
              ? "bg-violet-500/20 text-violet-300 border-violet-500/30"
              : "text-zinc-500 border-white/[0.06] hover:text-white hover:border-white/[0.12]"
          }`}
        >
          전체
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setSelectedCategory(cat.slug)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
              selectedCategory === cat.slug
                ? "bg-violet-500/20 text-violet-300 border-violet-500/30"
                : "text-zinc-500 border-white/[0.06] hover:text-white hover:border-white/[0.12]"
            }`}
          >
            {cat.label}
          </button>
        ))}

        <div className="w-px h-4 bg-white/[0.08] mx-1" />

        {/* Free filter */}
        <button
          onClick={() => setFreeOnly(!freeOnly)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
            freeOnly
              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
              : "text-zinc-500 border-white/[0.06] hover:text-white hover:border-white/[0.12]"
          }`}
        >
          무료 플랜
        </button>

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 px-3 py-1.5 text-xs text-zinc-600 hover:text-white transition-colors"
          >
            <X className="h-3 w-3" />초기화
          </button>
        )}
      </div>

      {/* Results */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-zinc-400 text-base mb-1">검색 결과가 없습니다</p>
          <p className="text-zinc-600 text-sm mb-6">다른 키워드나 카테고리로 시도해보세요</p>
          <Button variant="outline" onClick={clearFilters} className="border-white/[0.08] text-zinc-400">
            필터 초기화
          </Button>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-zinc-600 text-sm">로딩 중...</div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
