import Link from "next/link";
import { Flame, ChevronRight } from "lucide-react";
import { POPULAR_COMPARISONS } from "@/lib/utils";
import { getToolBySlug } from "@/data/tools";
import { Card, CardContent } from "@/components/ui/card";
import ToolLogo from "@/components/tools/ToolLogo";

export default function PopularComparisons() {
  return (
    <section className="py-12 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/15 border border-rose-500/20">
            <Flame className="h-4 w-4 text-rose-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Popular Comparisons</h2>
            <p className="text-xs text-zinc-500">사용자들이 가장 많이 비교하는 AI 툴</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {POPULAR_COMPARISONS.map((comp) => {
            const toolA = getToolBySlug(comp.toolA);
            const toolB = getToolBySlug(comp.toolB);
            return (
              <Link
                key={`${comp.toolA}-vs-${comp.toolB}`}
                href={`/compare/${comp.toolA}-vs-${comp.toolB}`}
              >
                <Card className="group hover:border-white/[0.15] hover:bg-white/[0.04] cursor-pointer transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {toolA && <ToolLogo tool={toolA} size="sm" />}
                        <div className="text-center">
                          <span className="text-sm font-semibold text-white">{comp.labelA}</span>
                          <div className="flex items-center gap-2 mt-0.5">
                            <div className="h-px w-8 bg-white/[0.10]" />
                            <span className="text-[10px] font-medium text-zinc-600 uppercase tracking-wider">vs</span>
                            <div className="h-px w-8 bg-white/[0.10]" />
                          </div>
                          <span className="text-sm font-semibold text-white">{comp.labelB}</span>
                        </div>
                        {toolB && <ToolLogo tool={toolB} size="sm" />}
                      </div>
                      <ChevronRight className="h-4 w-4 text-zinc-600 group-hover:text-violet-400 transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
