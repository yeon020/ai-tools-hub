"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CATEGORIES } from "@/lib/utils";
import type { CategoryInfo } from "@/lib/types";
import type { Tool } from "@/lib/types";
import ToolCard from "@/components/tools/ToolCard";
import { useLanguage } from "@/lib/i18n";

interface Props {
  info: CategoryInfo;
  tools: Tool[];
  otherCategories: CategoryInfo[];
}

export default function CategoryPageContent({ info, tools, otherCategories }: Props) {
  const { t, lang } = useLanguage();

  const label = lang === "ko" ? info.label_ko : info.label;
  const description = lang === "ko" ? info.description_ko : info.description;
  const countLabel = lang === "ko"
    ? `${tools.length}${t.category.toolsCount}`
    : `${tools.length} ${t.category.toolsCount}`;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-zinc-600 mb-8">
        <Link href="/" className="hover:text-white transition-colors">{t.category.home}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-zinc-400">{label}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">
          {label} {t.category.tools}
        </h1>
        <p className="text-zinc-500 text-sm">{description} — {countLabel}</p>
      </div>

      {tools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-zinc-600">
          <p>{t.category.noTools}</p>
          <Link href="/" className="text-violet-400 hover:underline mt-2 inline-block text-sm">
            {t.category.backHome}
          </Link>
        </div>
      )}

      {/* Other categories */}
      <div className="border-t border-white/[0.06] pt-8">
        <h2 className="text-sm font-semibold text-white mb-4">{t.category.otherCategories}</h2>
        <div className="flex flex-wrap gap-2">
          {otherCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="px-4 py-2 rounded-full border border-white/[0.08] text-sm text-zinc-400 hover:text-white hover:border-white/[0.15] transition-all"
            >
              {lang === "ko" ? cat.label_ko : cat.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
