"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import CompareSelector from "@/components/compare/CompareSelector";
import CompareTable from "@/components/compare/CompareTable";
import VoteSection from "@/components/compare/VoteSection";
import { useLanguage } from "@/lib/i18n";
import type { Tool } from "@/lib/types";
import { POPULAR_COMPARISONS } from "@/lib/utils";

interface Props {
  toolA: Tool;
  toolB: Tool;
  comparison: string;
}

export default function ComparePageContent({ toolA, toolB, comparison }: Props) {
  const { t, lang } = useLanguage();
  const year = new Date().getFullYear();

  const otherComparisons = POPULAR_COMPARISONS.filter(
    (c) =>
      !(c.toolA === toolA.slug && c.toolB === toolB.slug) &&
      !(c.toolA === toolB.slug && c.toolB === toolA.slug)
  );

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-zinc-600 mb-8">
        <Link href="/" className="hover:text-white transition-colors">
          {t.compare.home}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-zinc-500">{t.compare.compare}</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-zinc-400">{toolA.name} vs {toolB.name}</span>
      </nav>

      {/* Page header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          {toolA.name}{" "}
          <span className="text-zinc-600">vs</span>{" "}
          {toolB.name}
        </h1>
        <p className="text-zinc-500 text-sm">
          {t.compare.subtitlePrefix}{year}{t.compare.subtitleSuffix}
        </p>
      </div>

      {/* Tool selector */}
      <CompareSelector toolA={toolA} toolB={toolB} />

      {/* Main compare content */}
      <CompareTable toolA={toolA} toolB={toolB} />

      {/* Vote section */}
      <VoteSection toolA={toolA} toolB={toolB} comparisonSlug={comparison} />

      {/* Other comparisons */}
      {otherComparisons.length > 0 && (
        <div className="mt-12 pt-10 border-t border-white/[0.06]">
          <h2 className="text-base font-semibold text-white mb-4">
            {t.compare.otherComparisons}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {otherComparisons.map((comp) => (
              <Link
                key={`${comp.toolA}-vs-${comp.toolB}`}
                href={`/compare/${comp.toolA}-vs-${comp.toolB}`}
              >
                <Card className="hover:border-white/[0.15] hover:bg-white/[0.04] cursor-pointer transition-all duration-200">
                  <CardContent className="p-3 text-center">
                    <p className="text-xs font-medium text-zinc-300">
                      {comp.labelA} vs {comp.labelB}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
