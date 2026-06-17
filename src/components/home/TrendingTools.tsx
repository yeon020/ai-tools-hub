import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { getFeaturedTools } from "@/data/tools";
import ToolCard from "@/components/tools/ToolCard";

export default function TrendingTools() {
  const tools = getFeaturedTools().slice(0, 6);

  return (
    <section className="py-12 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/15 border border-orange-500/20">
              <TrendingUp className="h-4 w-4 text-orange-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Trending Tools</h2>
              <p className="text-xs text-zinc-500">지금 가장 주목받는 AI 툴</p>
            </div>
          </div>
          <Link href="/search" className="flex items-center gap-1 text-sm text-zinc-500 hover:text-violet-400 transition-colors">
            전체 보기 <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
