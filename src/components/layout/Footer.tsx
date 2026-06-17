import Link from "next/link";
import { Zap } from "lucide-react";
import { CATEGORIES } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0a0a0a] mt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
                <Zap className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-sm font-bold text-white">AI<span className="text-violet-400">Hub</span></span>
            </Link>
            <p className="text-xs text-zinc-600 leading-relaxed">
              AI 툴 비교 & 탐색 플랫폼.<br />
              최고의 AI 도구를 찾아드립니다.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">카테고리</h4>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} className="text-xs text-zinc-600 hover:text-white transition-colors">
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tools */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">인기 툴</h4>
            <ul className="space-y-2">
              {["chatgpt","claude","cursor","perplexity","midjourney","elevenlabs"].map((slug) => (
                <li key={slug}>
                  <Link href={`/tool/${slug}`} className="text-xs text-zinc-600 hover:text-white transition-colors capitalize">
                    {slug === "chatgpt" ? "ChatGPT" : slug.charAt(0).toUpperCase() + slug.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Comparisons */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">인기 비교</h4>
            <ul className="space-y-2">
              {[
                { href: "/compare/chatgpt-vs-claude",    label: "ChatGPT vs Claude" },
                { href: "/compare/cursor-vs-windsurf",   label: "Cursor vs Windsurf" },
                { href: "/compare/chatgpt-vs-gemini",    label: "ChatGPT vs Gemini" },
                { href: "/compare/perplexity-vs-chatgpt",label: "Perplexity vs ChatGPT" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-xs text-zinc-600 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-700">© 2024 AIHub. All rights reserved.</p>
          <p className="text-xs text-zinc-700">일부 링크는 제휴 링크입니다.</p>
        </div>
      </div>
    </footer>
  );
}
