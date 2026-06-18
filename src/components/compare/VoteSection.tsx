"use client";

import { useEffect, useState } from "react";
import { Share2, Check, Trophy } from "lucide-react";
import { getVoteCounts, insertVote } from "@/lib/supabase";
import { useLanguage } from "@/lib/i18n";
import type { Tool } from "@/lib/types";

interface Props {
  toolA: Tool;
  toolB: Tool;
  comparisonSlug: string;
}

export default function VoteSection({ toolA, toolB, comparisonSlug }: Props) {
  const { lang } = useLanguage();
  const storageKey = `vote_${comparisonSlug}`;

  const [counts, setCounts] = useState<Record<string, number>>({});
  const [voted, setVoted] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [shared, setShared] = useState(false);

  const totalVotes = (counts[toolA.slug] ?? 0) + (counts[toolB.slug] ?? 0);
  const pctA = totalVotes > 0 ? Math.round(((counts[toolA.slug] ?? 0) / totalVotes) * 100) : 50;
  const pctB = 100 - pctA;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setVoted(saved);

    getVoteCounts(comparisonSlug).then((data) => {
      setCounts(data);
      setLoading(false);
    });
  }, [comparisonSlug, storageKey]);

  async function handleVote(toolSlug: string) {
    if (voted || voting) return;
    setVoting(true);

    const ok = await insertVote(comparisonSlug, toolSlug);
    if (ok) {
      localStorage.setItem(storageKey, toolSlug);
      setVoted(toolSlug);
      setCounts((prev) => ({ ...prev, [toolSlug]: (prev[toolSlug] ?? 0) + 1 }));
    }
    setVoting(false);
  }

  async function handleShare() {
    const url = `https://ai-tools-hub-silk.vercel.app/compare/${comparisonSlug}`;
    const text =
      lang === "ko"
        ? `${toolA.name} vs ${toolB.name} — 현재 ${pctA}% vs ${pctB}%! 당신의 선택은? 🤔`
        : `${toolA.name} vs ${toolB.name} — currently ${pctA}% vs ${pctB}%! Which do you prefer? 🤔`;

    if (navigator.share) {
      await navigator.share({ title: `${toolA.name} vs ${toolB.name}`, text, url });
    } else {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  }

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden mt-8">
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-amber-400" />
          <h2 className="text-base font-bold text-white">
            {lang === "ko" ? "어떤 툴이 더 나은가요?" : "Which tool is better?"}
          </h2>
        </div>
        <p className="text-xs text-zinc-500 mt-1">
          {lang === "ko"
            ? `${totalVotes.toLocaleString()}명이 투표했어요`
            : `${totalVotes.toLocaleString()} votes so far`}
        </p>
      </div>

      <div className="p-6 space-y-5">
        {/* Vote buttons */}
        <div className="grid grid-cols-2 gap-3">
          {[toolA, toolB].map((tool) => {
            const isVoted = voted === tool.slug;
            const pct = tool.slug === toolA.slug ? pctA : pctB;
            const hasVoted = voted !== null;

            return (
              <button
                key={tool.slug}
                onClick={() => handleVote(tool.slug)}
                disabled={hasVoted || voting}
                className={`relative overflow-hidden rounded-xl border p-5 text-left transition-all duration-300 ${
                  isVoted
                    ? "border-violet-500/50 bg-violet-500/10"
                    : hasVoted
                    ? "border-white/[0.06] bg-white/[0.01] opacity-60 cursor-default"
                    : "border-white/[0.08] bg-white/[0.02] hover:border-violet-500/30 hover:bg-violet-500/5 cursor-pointer"
                }`}
              >
                {/* Progress bar background */}
                {hasVoted && (
                  <div
                    className="absolute inset-y-0 left-0 bg-violet-500/10 transition-all duration-700"
                    style={{ width: `${pct}%` }}
                  />
                )}

                <div className="relative flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{tool.name}</span>
                      {isVoted && <Check className="h-4 w-4 text-violet-400" />}
                    </div>
                    <span className="text-xs text-zinc-500">{tool.company}</span>
                  </div>
                  {hasVoted && (
                    <span className={`text-2xl font-black ${isVoted ? "text-violet-400" : "text-zinc-500"}`}>
                      {pct}%
                    </span>
                  )}
                </div>

                {!hasVoted && (
                  <p className="relative text-xs text-zinc-500 mt-2">
                    {lang === "ko" ? "클릭해서 투표" : "Click to vote"}
                  </p>
                )}
              </button>
            );
          })}
        </div>

        {/* Share button — 투표 후 표시 */}
        {voted && (
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-violet-500/30 bg-violet-500/5 hover:bg-violet-500/10 text-violet-400 text-sm font-semibold transition-all duration-200"
          >
            {shared ? (
              <>
                <Check className="h-4 w-4" />
                {lang === "ko" ? "링크 복사됨!" : "Link copied!"}
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4" />
                {lang === "ko"
                  ? `결과 공유하기 — ${pctA}% vs ${pctB}%`
                  : `Share result — ${pctA}% vs ${pctB}%`}
              </>
            )}
          </button>
        )}

        {loading && (
          <p className="text-center text-xs text-zinc-600">
            {lang === "ko" ? "투표 데이터 불러오는 중..." : "Loading votes..."}
          </p>
        )}
      </div>
    </div>
  );
}
