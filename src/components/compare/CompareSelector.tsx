"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftRight, ChevronDown } from "lucide-react";
import { SAMPLE_TOOLS } from "@/data/tools";
import { getCategoryLabel } from "@/lib/utils";
import ToolLogo from "@/components/tools/ToolLogo";
import { Button } from "@/components/ui/button";
import type { Tool } from "@/lib/types";

interface CompareSelectorProps {
  toolA: Tool;
  toolB: Tool;
}

function ToolDropdown({
  selected,
  onChange,
  exclude,
}: {
  selected: Tool;
  onChange: (slug: string) => void;
  exclude: string;
}) {
  const [open, setOpen] = useState(false);
  const options = SAMPLE_TOOLS.filter((t) => t.slug !== exclude);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 rounded-xl border border-white/[0.10] bg-white/[0.04] px-4 py-3 hover:border-violet-500/40 hover:bg-white/[0.06] transition-all duration-200 min-w-[200px]"
      >
        <ToolLogo tool={selected} size="sm" />
        <div className="flex-1 text-left">
          <p className="text-sm font-semibold text-white">{selected.name}</p>
          <p className="text-xs text-zinc-500">{selected.company}</p>
        </div>
        <ChevronDown className={`h-4 w-4 text-zinc-500 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-[calc(100%+6px)] left-0 z-50 w-full min-w-[240px] rounded-xl border border-white/[0.10] bg-[#111] shadow-2xl overflow-hidden">
          <div className="max-h-72 overflow-y-auto">
            {options.map((tool) => (
              <button
                key={tool.id}
                onClick={() => { onChange(tool.slug); setOpen(false); }}
                className="flex w-full items-center gap-3 px-4 py-2.5 hover:bg-white/[0.06] transition-colors border-b border-white/[0.04] last:border-0"
              >
                <ToolLogo tool={tool} size="xs" />
                <div className="text-left">
                  <p className="text-sm font-medium text-white">{tool.name}</p>
                  <p className="text-[11px] text-zinc-500">{getCategoryLabel(tool.category)}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CompareSelector({ toolA, toolB }: CompareSelectorProps) {
  const router = useRouter();
  const [leftSlug, setLeftSlug] = useState(toolA.slug);
  const [rightSlug, setRightSlug] = useState(toolB.slug);

  const handleSwap = () => {
    const newLeft = rightSlug;
    const newRight = leftSlug;
    setLeftSlug(newLeft);
    setRightSlug(newRight);
    router.push(`/compare/${newLeft}-vs-${newRight}`);
  };

  const handleLeftChange = (slug: string) => {
    setLeftSlug(slug);
    router.push(`/compare/${slug}-vs-${rightSlug}`);
  };

  const handleRightChange = (slug: string) => {
    setRightSlug(slug);
    router.push(`/compare/${leftSlug}-vs-${slug}`);
  };

  const left = SAMPLE_TOOLS.find((t) => t.slug === leftSlug) ?? toolA;
  const right = SAMPLE_TOOLS.find((t) => t.slug === rightSlug) ?? toolB;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
      <ToolDropdown selected={left} onChange={handleLeftChange} exclude={rightSlug} />

      <Button
        variant="outline"
        size="icon"
        onClick={handleSwap}
        className="border-white/[0.08] text-zinc-400 hover:text-white hover:border-violet-500/40 rounded-full h-10 w-10 shrink-0"
        title="좌우 바꾸기"
      >
        <ArrowLeftRight className="h-4 w-4" />
      </Button>

      <ToolDropdown selected={right} onChange={handleRightChange} exclude={leftSlug} />
    </div>
  );
}
