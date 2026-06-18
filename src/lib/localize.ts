import type { Tool } from "@/lib/types";
import type { Lang } from "@/lib/i18n";

export interface LocalizedTool extends Tool {
  localDescription: string;
  localLongDescription?: string;
  localFeatures: string[];
}

export function localizeTool(tool: Tool, lang: Lang): LocalizedTool {
  return {
    ...tool,
    localDescription:
      lang === "ko" && tool.description_ko ? tool.description_ko : tool.description,
    localLongDescription:
      lang === "ko" && tool.long_description_ko
        ? tool.long_description_ko
        : tool.long_description,
    localFeatures:
      lang === "ko" && tool.features_ko ? tool.features_ko : tool.features,
  };
}
