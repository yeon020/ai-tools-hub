import Link from "next/link";
import { ExternalLink, Star, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCategoryLabel } from "@/lib/utils";
import type { Tool } from "@/lib/types";
import ToolLogo from "./ToolLogo";

interface ToolCardProps {
  tool: Tool;
  variant?: "default" | "compact";
}

export default function ToolCard({ tool, variant = "default" }: ToolCardProps) {
  if (variant === "compact") {
    return (
      <Link href={`/tool/${tool.slug}`}>
        <Card className="group hover:border-white/[0.15] hover:bg-white/[0.05] cursor-pointer transition-all duration-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <ToolLogo tool={tool} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{tool.name}</p>
                <p className="text-xs text-zinc-500 truncate">{tool.company}</p>
              </div>
              {tool.free_plan && (
                <Badge variant="success" className="text-xs shrink-0">무료</Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Card className="group hover:border-white/[0.15] hover:bg-white/[0.05] transition-all duration-200 flex flex-col">
      <CardContent className="p-5 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <ToolLogo tool={tool} size="md" />
            <div>
              <h3 className="font-semibold text-white text-base leading-tight">{tool.name}</h3>
              <p className="text-xs text-zinc-500 mt-0.5">{tool.company}</p>
              <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                <Badge variant="purple" className="text-xs">{getCategoryLabel(tool.category)}</Badge>
                {tool.free_plan && (
                  <Badge variant="success" className="text-xs">
                    <CheckCircle2 className="h-3 w-3 mr-0.5" />무료
                  </Badge>
                )}
              </div>
            </div>
          </div>
          {tool.rating && (
            <div className="flex items-center gap-1 shrink-0">
              <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
              <span className="text-sm font-medium text-zinc-300">{tool.rating}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2 mb-3 flex-1">
          {tool.description}
        </p>

        {/* Pricing */}
        <p className="text-xs text-zinc-600 mb-4 font-mono truncate">{tool.pricing}</p>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link href={`/tool/${tool.slug}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full border-white/[0.08] text-zinc-300 hover:text-white hover:bg-white/[0.06]">
              자세히 보기
            </Button>
          </Link>
          <a href={tool.affiliate_url} target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant="gradient" className="shrink-0">
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
