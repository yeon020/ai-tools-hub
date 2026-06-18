"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Zap, Menu, X, Search as SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage, type Lang } from "@/lib/i18n";
import { SearchCommand } from "@/components/search/SearchCommand";

const LANG_OPTIONS: { value: Lang; flag: string }[] = [
  { value: "en", flag: "EN" },
  { value: "ko", flag: "한" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { t, lang, setLang } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const NAV_LINKS = [
    { href: "/search",                    label: t.nav.explore },
    { href: "/compare/chatgpt-vs-claude", label: t.nav.compare },
    { href: "/category/coding",           label: t.nav.category },
  ];

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

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                  pathname === link.href ||
                    pathname.startsWith(
                      link.href.split("/")[1] ? `/${link.href.split("/")[1]}` : "___"
                    )
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
            {/* Search command (desktop trigger rendered inside) */}
            <SearchCommand />

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
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/[0.06] bg-[#0a0a0a]">
          <div className="px-4 py-4 space-y-1">
            {/* Mobile search — opens SearchCommand modal */}
            <button
              onClick={() => {
                setMobileOpen(false);
                // small delay so menu closes first
                setTimeout(() => {
                  document.dispatchEvent(new CustomEvent("aihub:opensearch"));
                }, 50);
              }}
              className="flex w-full items-center gap-2 px-3 py-2.5 rounded-md text-sm text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors"
            >
              <SearchIcon className="h-4 w-4" />
              {t.nav.search}
            </button>

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
            <div className="flex items-center gap-2 pt-3 border-t border-white/[0.06]">
              {LANG_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setLang(opt.value)}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                    lang === opt.value
                      ? "bg-violet-600 text-white"
                      : "text-zinc-500 border border-white/[0.08] hover:text-white"
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
