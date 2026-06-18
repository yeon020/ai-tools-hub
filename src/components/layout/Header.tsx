"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Search, Zap, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { getToolSuggestions } from "@/data/tools";
import type { Tool } from "@/lib/types";
import ToolLogo from "@/components/tools/ToolLogo";
import { useLanguage, type Lang } from "@/lib/i18n";

const LANG_OPTIONS: { value: Lang; flag: string }[] = [
  { value: "en", flag: "EN" },
  { value: "ko", flag: "한" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { t, lang, setLang } = useLanguage();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Tool[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const NAV_LINKS = [
    { href: "/search",                    label: t.nav.explore },
    { href: "/compare/chatgpt-vs-claude", label: t.nav.compare },
    { href: "/category/coding",           label: t.nav.category },
  ];

  useEffect(() => {
    setSuggestions(getToolSuggestions(query, 5));
  }, [query]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearch(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowSearch(false);
      setQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#0a0a0a]/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-15 items-center justify-between gap-4 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
              <Zap className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-sm font-bold tracking-tight text-white">
              AI<span className="text-violet-400">Hub</span>
            </span>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                  pathname === link.href || pathname.startsWith(link.href.split("/")[1] ? `/${link.href.split("/")[1]}` : "___")
                    ? "text-white bg-white/[0.08]"
                    : "text-zinc-500 hover:text-white hover:bg-white/[0.05]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div ref={searchRef} className="relative hidden md:block">
              {showSearch ? (
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
                    <input
                      autoFocus
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder={t.search.placeholder}
                      className="w-56 h-8 pl-9 pr-3 rounded-lg border border-white/[0.10] bg-white/[0.05] text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-violet-500/40 transition-all"
                    />
                  </div>
                  {suggestions.length > 0 && query && (
                    <div className="absolute top-[calc(100%+4px)] right-0 w-64 rounded-xl border border-white/[0.10] bg-[#111] shadow-2xl overflow-hidden z-50">
                      {suggestions.map((tool) => (
                        <button
                          key={tool.id}
                          type="button"
                          onClick={() => { router.push(`/tool/${tool.slug}`); setShowSearch(false); setQuery(""); }}
                          className="flex w-full items-center gap-2.5 px-3 py-2.5 hover:bg-white/[0.05] transition-colors border-b border-white/[0.04] last:border-0"
                        >
                          <ToolLogo tool={tool} size="xs" />
                          <span className="text-sm text-white">{tool.name}</span>
                          <span className="ml-auto text-xs text-zinc-600">{tool.category}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </form>
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  className="flex items-center gap-2 h-8 px-3 rounded-lg border border-white/[0.08] text-zinc-500 hover:text-white hover:border-white/[0.15] transition-all text-sm"
                >
                  <Search className="h-3.5 w-3.5" />
                  <span className="text-xs">{t.nav.search}</span>
                </button>
              )}
            </div>

            {/* Language switcher */}
            <div className="flex items-center rounded-lg border border-white/[0.08] overflow-hidden">
              {LANG_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setLang(opt.value)}
                  className={cn(
                    "h-8 px-2.5 text-xs font-medium transition-colors",
                    lang === opt.value
                      ? "bg-violet-600 text-white"
                      : "text-zinc-500 hover:text-white hover:bg-white/[0.05]"
                  )}
                >
                  {opt.flag}
                </button>
              ))}
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-1.5 rounded-md text-zinc-500 hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/[0.06] bg-[#0a0a0a]">
          <div className="px-4 py-4 space-y-2">
            <form onSubmit={(e) => { e.preventDefault(); if (query.trim()) { router.push(`/search?q=${encodeURIComponent(query.trim())}`); setMobileOpen(false); }}}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t.search.placeholder}
                  className="w-full h-10 pl-10 pr-4 rounded-lg border border-white/[0.08] bg-white/[0.04] text-sm text-white placeholder:text-zinc-600 focus:outline-none"
                />
              </div>
            </form>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-md text-sm text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {/* Mobile language switcher */}
            <div className="flex items-center gap-2 pt-2 border-t border-white/[0.06]">
              {LANG_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setLang(opt.value)}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                    lang === opt.value ? "bg-violet-600 text-white" : "text-zinc-500 border border-white/[0.08]"
                  )}
                >
                  {opt.flag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
