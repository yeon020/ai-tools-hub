"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Flame } from "lucide-react";
import { getVoteCounts } from "@/lib/supabase";
import { useLanguage } from "@/lib/i18n";

const COMPARISONS = [
  { slug: "chatgpt-vs-claude",        labelA: "ChatGPT", labelB: "Claude",          toolA: "chatgpt",        toolB: "claude"        },
  { slug: "cursor-vs-windsurf",       labelA: "Cursor",  labelB: "Windsurf",         toolA: "cursor",         toolB: "windsurf"      },
  { slug: "chatgpt-vs-gemini",        labelA: "ChatGPT", labelB: "Gemini",           toolA: "chatgpt",        toolB: "gemini"        },
  { slug: "midjourney-vs-leonardo-ai",labelA: "Midjourney",labelB: "Leonardo AI",   toolA: "midjourney",     toolB: "leonardo-ai"   },
  { slug: "cursor-vs-github-copilot", labelA: "Cursor",  labelB: "GitHub Copilot",   toolA: "cursor",         toolB: "github-copilot"},
  { slug: "claude-vs-gemini",         labelA: "Claude",  labelB: "Gemini",           toolA: "claude",         toolB: "gemini"        },
];

interface VoteItem {
  slug: string;
  labelA: string;
  labelB: string;
  pctA: number;
  pctB: number;
  total: number;
  winner: "A" | "B" | "tie";
}

export default function VoteTicker() {
  const { lang } = useLanguage();
  const [items, setItems] = useState<VoteItem[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Promise.all(
      COMPARISONS.map(async (c) => {
        const counts = await getVoteCounts(c.slug);
        const vA = counts[c.toolA] ?? 0;
        const vB = counts[c.toolB] ?? 0;
        const total = vA + vB;
        const pctA = total > 0 ? Math.round((vA / total) * 100) : 50;
        const pctB = 100 - pctA;
        const winner: "A" | "B" | "tie" =
          pctA > pctB ? "A" : pctB > pctA ? "B" : "tie";
        return { slug: c.slug, labelA: c.labelA, labelB: c.labelB, pctA, pctB, total, winner };
      })
    ).then(setItems);
  }, []);

  if (items.length === 0) return null;

  // duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="w-full border-b border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-sm overflow-hidden">
      <div className="flex items-center">
        {/* Label */}
        <div className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 border-r border-white/[0.06] bg-violet-500/10">
          <Flame className="h-3.5 w-3.5 text-violet-400" />
          <span className="text-[11px] font-bold text-violet-400 uppercase tracking-wider whitespace-nowrap">
            {lang === "ko" ? "실시간 투표" : "Live Votes"}
          </span>
        </div>

        {/* Scrolling track */}
        <div className="flex-1 overflow-hidden">
          <div
            ref={trackRef}
            className="flex items-center gap-0 animate-ticker"
            style={{ width: "max-content" }}
          >
            {doubled.map((item, i) => (
              <Link
                key={`${item.slug}-${i}`}
                href={`/compare/${item.slug}`}
                className="group flex items-center gap-3 px-5 py-2 border-r border-white/[0.04] hover:bg-white/[0.03] transition-colors whitespace-nowrap"
              >
                {/* Tool names + winner highlight */}
                <span className={`text-xs font-semibold transition-colors ${item.winner === "A" ? "text-violet-300" : "text-zinc-400"} group-hover:text-white`}>
                  {item.labelA}
                </span>
                <span className="text-[10px] text-zinc-600">vs</span>
                <span className={`text-xs font-semibold transition-colors ${item.winner === "B" ? "text-violet-300" : "text-zinc-400"} group-hover:text-white`}>
                  {item.labelB}
                </span>

                {/* Percentage bar */}
                <div className="flex items-center gap-1.5">
                  <span className={`text-[11px] font-bold ${item.winner === "A" ? "text-violet-400" : "text-zinc-500"}`}>
                    {item.pctA}%
                  </span>
                  <div className="w-16 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <div
                      className="h-full bg-violet-500 rounded-full transition-all"
                      style={{ width: `${item.pctA}%` }}
                    />
                  </div>
                  <span className={`text-[11px] font-bold ${item.winner === "B" ? "text-violet-400" : "text-zinc-500"}`}>
                    {item.pctB}%
                  </span>
                </div>

                {/* Vote count */}
                <span className="text-[10px] text-zinc-600">
                  {item.total > 0
                    ? lang === "ko" ? `${item.total}표` : `${item.total} votes`
                    : lang === "ko" ? "첫 투표!" : "Be first!"}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
