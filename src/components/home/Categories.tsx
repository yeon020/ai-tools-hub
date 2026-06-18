"use client";

import Link from "next/link";
import {
  MessageSquare, Code2, Image, Video, Mic, Zap, Palette,
} from "lucide-react";
import { CATEGORIES } from "@/lib/utils";
import { SAMPLE_TOOLS } from "@/data/tools";
import { useLanguage } from "@/lib/i18n";

const ICON_MAP = { MessageSquare, Code2, Image, Video, Mic, Zap, Palette } as const;

const COLORS = [
  "border-violet-500/20 hover:border-violet-500/40 bg-violet-500/[0.06]  text-violet-400",
  "border-blue-500/20   hover:border-blue-500/40   bg-blue-500/[0.06]    text-blue-400",
  "border-pink-500/20   hover:border-pink-500/40   bg-pink-500/[0.06]    text-pink-400",
  "border-red-500/20    hover:border-red-500/40    bg-red-500/[0.06]     text-red-400",
  "border-orange-500/20 hover:border-orange-500/40 bg-orange-500/[0.06]  text-orange-400",
  "border-emerald-500/20 hover:border-emerald-500/40 bg-emerald-500/[0.06] text-emerald-400",
  "border-cyan-500/20   hover:border-cyan-500/40   bg-cyan-500/[0.06]    text-cyan-400",
];

export default function Categories() {
  const { t, lang } = useLanguage();

  const toolCounts = CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
    acc[cat.slug] = SAMPLE_TOOLS.filter((tool) => tool.category === cat.slug).length;
    return acc;
  }, {});

  return (
    <section className="py-12 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-white">{t.home.categories}</h2>
          <p className="text-xs text-zinc-500 mt-0.5">{t.home.categoriesDesc}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {CATEGORIES.map((cat, i) => {
            const IconComp = ICON_MAP[cat.icon as keyof typeof ICON_MAP];
            const colorClass = COLORS[i % COLORS.length];
            const count = toolCounts[cat.slug] ?? 0;
            const label = lang === "ko" ? cat.label_ko : cat.label;
            const countLabel = lang === "ko" ? `${count}개` : `${count}`;

            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`group rounded-xl border ${colorClass} p-4 transition-all duration-200 hover:scale-[1.02] flex flex-col items-center text-center gap-2`}
              >
                {IconComp && <IconComp className="h-5 w-5" />}
                <div>
                  <div className="text-sm font-semibold text-white">{label}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">{countLabel}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
