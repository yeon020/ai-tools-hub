import type { Tool } from "@/lib/types";

const LOGO_CONFIG: Record<string, { gradient: string; initials: string }> = {
  chatgpt:        { gradient: "from-[#10a37f] to-[#0d8a6d]",   initials: "GP" },
  claude:         { gradient: "from-[#cc785c] to-[#b5634a]",   initials: "CL" },
  gemini:         { gradient: "from-[#4285f4] to-[#1967d2]",   initials: "GM" },
  perplexity:     { gradient: "from-[#20b2aa] to-[#178a83]",   initials: "PX" },
  grok:           { gradient: "from-[#1a1a1a] to-[#444]",      initials: "GK" },
  cursor:         { gradient: "from-[#1a1a2e] to-[#16213e]",   initials: "CU" },
  windsurf:       { gradient: "from-[#6366f1] to-[#4f46e5]",   initials: "WS" },
  "github-copilot":{ gradient: "from-[#24292e] to-[#1b1f23]", initials: "GH" },
  "claude-code":  { gradient: "from-[#cc785c] to-[#8b4513]",   initials: "CC" },
  "replit-ai":    { gradient: "from-[#f26207] to-[#d4500a]",   initials: "RP" },
  midjourney:     { gradient: "from-[#1a1a1a] to-[#2d2d2d]",   initials: "MJ" },
  "leonardo-ai":  { gradient: "from-[#7c3aed] to-[#5b21b6]",   initials: "LN" },
  "adobe-firefly":{ gradient: "from-[#ff0000] to-[#cc0000]",   initials: "FF" },
  runway:         { gradient: "from-[#000000] to-[#333333]",   initials: "RW" },
  elevenlabs:     { gradient: "from-[#f97316] to-[#ea580c]",   initials: "EL" },
  "notion-ai":    { gradient: "from-[#1a1a1a] to-[#404040]",   initials: "NT" },
  grammarly:      { gradient: "from-[#15c39a] to-[#0fa37e]",   initials: "GR" },
  notebooklm:     { gradient: "from-[#4285f4] to-[#fbbc04]",   initials: "NB" },
  "canva-ai":          { gradient: "from-[#00c4cc] to-[#7d2ae8]",   initials: "CV" },
  "figma-ai":          { gradient: "from-[#f24e1e] to-[#a259ff]",   initials: "FG" },
  deepseek:            { gradient: "from-[#4d6bfe] to-[#2f4de0]",   initials: "DS" },
  "microsoft-copilot": { gradient: "from-[#00a4ef] to-[#0078d4]",   initials: "MS" },
  "meta-ai":           { gradient: "from-[#0866ff] to-[#0052cc]",   initials: "MT" },
  poe:                 { gradient: "from-[#5a5fcf] to-[#3d42b5]",   initials: "PO" },
  "character-ai":      { gradient: "from-[#4caf50] to-[#2e7d32]",   initials: "CA" },
  bolt:                { gradient: "from-[#1d4ed8] to-[#1e3a8a]",   initials: "BT" },
  lovable:             { gradient: "from-[#f43f5e] to-[#be123c]",   initials: "LV" },
  v0:                  { gradient: "from-[#0a0a0a] to-[#333333]",   initials: "V0" },
  continue:            { gradient: "from-[#059669] to-[#047857]",   initials: "CT" },
  cline:               { gradient: "from-[#7c3aed] to-[#4c1d95]",   initials: "CL" },
  pika:                { gradient: "from-[#ec4899] to-[#be185d]",   initials: "PK" },
  heygen:              { gradient: "from-[#f59e0b] to-[#d97706]",   initials: "HG" },
  synthesia:           { gradient: "from-[#6366f1] to-[#4338ca]",   initials: "SY" },
};

const SIZES = {
  xs:  "h-6 w-6 text-[10px] rounded-md",
  sm:  "h-8 w-8 text-xs rounded-lg",
  md:  "h-10 w-10 text-sm rounded-xl",
  lg:  "h-14 w-14 text-base rounded-xl",
  xl:  "h-20 w-20 text-xl rounded-2xl",
};

interface ToolLogoProps {
  tool: Tool;
  size?: keyof typeof SIZES;
}

export default function ToolLogo({ tool, size = "md" }: ToolLogoProps) {
  const config = LOGO_CONFIG[tool.slug] ?? {
    gradient: "from-violet-600 to-indigo-600",
    initials: tool.name.slice(0, 2).toUpperCase(),
  };

  return (
    <div
      className={`${SIZES[size]} bg-gradient-to-br ${config.gradient} flex items-center justify-center font-bold text-white shadow-lg shrink-0`}
    >
      {config.initials}
    </div>
  );
}
