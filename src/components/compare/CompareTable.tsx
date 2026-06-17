import { CheckCircle2, XCircle, ExternalLink, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCategoryLabel, COMPARISON_FEATURES } from "@/lib/utils";
import type { Tool } from "@/lib/types";
import ToolLogo from "@/components/tools/ToolLogo";

interface CompareTableProps {
  toolA: Tool;
  toolB: Tool;
}

function BooleanCell({ value }: { value: boolean }) {
  return value
    ? <CheckCircle2 className="h-5 w-5 text-emerald-400 mx-auto" />
    : <XCircle className="h-5 w-5 text-zinc-700 mx-auto" />;
}

function RatingCell({ value }: { value: number | undefined }) {
  if (!value) return <span className="text-zinc-600 text-sm">—</span>;
  return (
    <div className="flex items-center justify-center gap-1">
      <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
      <span className="text-sm font-semibold text-white">{value}</span>
    </div>
  );
}

function ToolHeader({ tool, primary }: { tool: Tool; primary?: boolean }) {
  return (
    <div className={`flex flex-col items-center text-center p-6 rounded-xl border ${primary ? "border-violet-500/30 bg-violet-500/[0.04]" : "border-white/[0.08] bg-white/[0.02]"}`}>
      <ToolLogo tool={tool} size="lg" />
      <h3 className="mt-3 text-lg font-bold text-white">{tool.name}</h3>
      <p className="text-xs text-zinc-500 mt-0.5">{tool.company}</p>
      <Badge variant="purple" className="mt-2 text-xs">{getCategoryLabel(tool.category)}</Badge>
      <p className="text-xs text-zinc-500 mt-3 line-clamp-2 leading-relaxed">{tool.description}</p>
      <a href={tool.affiliate_url} target="_blank" rel="noopener noreferrer" className="mt-4 w-full">
        <Button
          variant={primary ? "gradient" : "outline"}
          size="sm"
          className={`w-full ${!primary ? "border-white/[0.08] text-zinc-300 hover:text-white" : ""}`}
        >
          사용해보기 <ExternalLink className="h-3.5 w-3.5" />
        </Button>
      </a>
    </div>
  );
}

export default function CompareTable({ toolA, toolB }: CompareTableProps) {
  return (
    <div className="space-y-6">
      {/* Tool headers — 3 col grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center">
          <span className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">비교 항목</span>
        </div>
        <ToolHeader tool={toolA} primary />
        <ToolHeader tool={toolB} />
      </div>

      {/* Comparison table */}
      <div className="rounded-xl border border-white/[0.08] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06] bg-white/[0.02]">
              <th className="py-3 px-5 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider w-1/3">항목</th>
              <th className="py-3 px-5 text-center text-sm font-semibold text-white w-1/3">{toolA.name}</th>
              <th className="py-3 px-5 text-center text-sm font-semibold text-white w-1/3">{toolB.name}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.05]">
            {COMPARISON_FEATURES.map((feat) => {
              const valA = toolA[feat.key];
              const valB = toolB[feat.key];

              return (
                <tr key={String(feat.key)} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-5 text-sm text-zinc-400 font-medium">{feat.label}</td>
                  <td className="py-3.5 px-5 text-center">
                    {feat.type === "boolean" ? (
                      <BooleanCell value={Boolean(valA)} />
                    ) : feat.type === "rating" ? (
                      <RatingCell value={valA as number | undefined} />
                    ) : (
                      <span className="text-xs text-zinc-300 font-mono leading-relaxed">{String(valA ?? "—")}</span>
                    )}
                  </td>
                  <td className="py-3.5 px-5 text-center">
                    {feat.type === "boolean" ? (
                      <BooleanCell value={Boolean(valB)} />
                    ) : feat.type === "rating" ? (
                      <RatingCell value={valB as number | undefined} />
                    ) : (
                      <span className="text-xs text-zinc-300 font-mono leading-relaxed">{String(valB ?? "—")}</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Features side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[toolA, toolB].map((tool, i) => (
          <div key={tool.id} className={`rounded-xl border p-6 ${i === 0 ? "border-violet-500/20 bg-violet-500/[0.03]" : "border-white/[0.08] bg-white/[0.02]"}`}>
            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
              <ToolLogo tool={tool} size="sm" />
              {tool.name} 주요 기능
            </h4>
            <ul className="space-y-2">
              {tool.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-zinc-400">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
