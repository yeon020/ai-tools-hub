import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Category, CategoryInfo, ComparisonFeature } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CATEGORIES: CategoryInfo[] = [
  { slug: "chat",         label: "Chat",         label_ko: "채팅",    description: "AI Chatbots & Assistants",         description_ko: "AI 챗봇 & 어시스턴트",        icon: "MessageSquare" },
  { slug: "coding",       label: "Coding",       label_ko: "코딩",    description: "AI Coding & Development Tools",    description_ko: "AI 코딩 & 개발 도구",         icon: "Code2" },
  { slug: "image",        label: "Image",        label_ko: "이미지",  description: "AI Image Generation",             description_ko: "AI 이미지 생성",              icon: "Image" },
  { slug: "video",        label: "Video",        label_ko: "비디오",  description: "AI Video Generation & Editing",   description_ko: "AI 비디오 생성 & 편집",       icon: "Video" },
  { slug: "voice",        label: "Voice",        label_ko: "음성",    description: "AI Voice Synthesis & Cloning",    description_ko: "AI 음성 합성 & 클로닝",       icon: "Mic" },
  { slug: "productivity", label: "Productivity", label_ko: "생산성",  description: "AI Productivity & Automation",    description_ko: "AI 생산성 & 자동화",          icon: "Zap" },
  { slug: "design",       label: "Design",       label_ko: "디자인",  description: "AI Design & Creative Tools",      description_ko: "AI 디자인 & 크리에이티브",    icon: "Palette" },
];

export function getCategoryInfo(slug: Category): CategoryInfo | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getCategoryLabel(slug: Category, lang?: string): string {
  const info = getCategoryInfo(slug);
  if (!info) return slug;
  return lang === "ko" ? info.label_ko : info.label;
}

export const POPULAR_COMPARISONS = [
  { toolA: "chatgpt",    toolB: "claude",    labelA: "ChatGPT",    labelB: "Claude"    },
  { toolA: "cursor",     toolB: "windsurf",  labelA: "Cursor",     labelB: "Windsurf"  },
  { toolA: "chatgpt",    toolB: "gemini",    labelA: "ChatGPT",    labelB: "Gemini"    },
  { toolA: "perplexity", toolB: "chatgpt",   labelA: "Perplexity", labelB: "ChatGPT"   },
];

export const COMPARISON_FEATURES: ComparisonFeature[] = [
  { key: "pricing",          label: "Price",           type: "text"    },
  { key: "free_plan",        label: "Free Plan",       type: "boolean" },
  { key: "api_support",      label: "API Support",     type: "boolean" },
  { key: "web_search",       label: "Web Search",      type: "boolean" },
  { key: "file_upload",      label: "File Upload",     type: "boolean" },
  { key: "image_generation", label: "Image Generation",type: "boolean" },
  { key: "voice_support",    label: "Voice Support",   type: "boolean" },
  { key: "coding_support",   label: "Coding Support",  type: "boolean" },
  { key: "mobile_app",       label: "Mobile App",      type: "boolean" },
  { key: "context_window",   label: "Context Window",  type: "text"    },
  { key: "recommended_for",  label: "Recommended For", type: "text"    },
  { key: "company",          label: "Company",         type: "text"    },
  { key: "release_date",     label: "Release Date",    type: "text"    },
  { key: "rating",           label: "Rating",          type: "rating"  },
];
