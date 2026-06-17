import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Category, CategoryInfo, ComparisonFeature } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CATEGORIES: CategoryInfo[] = [
  { slug: "chat",         label: "Chat",         description: "AI 챗봇 & 어시스턴트",          icon: "MessageSquare" },
  { slug: "coding",       label: "Coding",       description: "AI 코딩 & 개발 도구",           icon: "Code2" },
  { slug: "image",        label: "Image",        description: "AI 이미지 생성",                icon: "Image" },
  { slug: "video",        label: "Video",        description: "AI 비디오 생성 & 편집",         icon: "Video" },
  { slug: "voice",        label: "Voice",        description: "AI 음성 합성 & 클로닝",         icon: "Mic" },
  { slug: "productivity", label: "Productivity", description: "AI 생산성 & 자동화",            icon: "Zap" },
  { slug: "design",       label: "Design",       description: "AI 디자인 & 크리에이티브",      icon: "Palette" },
];

export function getCategoryInfo(slug: Category): CategoryInfo | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getCategoryLabel(slug: Category): string {
  return getCategoryInfo(slug)?.label ?? slug;
}

export const POPULAR_COMPARISONS = [
  { toolA: "chatgpt",    toolB: "claude",    labelA: "ChatGPT",    labelB: "Claude"    },
  { toolA: "cursor",     toolB: "windsurf",  labelA: "Cursor",     labelB: "Windsurf"  },
  { toolA: "chatgpt",    toolB: "gemini",    labelA: "ChatGPT",    labelB: "Gemini"    },
  { toolA: "perplexity", toolB: "chatgpt",   labelA: "Perplexity", labelB: "ChatGPT"   },
];

export const COMPARISON_FEATURES: ComparisonFeature[] = [
  { key: "pricing",          label: "가격",          type: "text"    },
  { key: "free_plan",        label: "무료 플랜",     type: "boolean" },
  { key: "api_support",      label: "API 지원",      type: "boolean" },
  { key: "web_search",       label: "웹 검색",       type: "boolean" },
  { key: "file_upload",      label: "파일 업로드",   type: "boolean" },
  { key: "image_generation", label: "이미지 생성",   type: "boolean" },
  { key: "voice_support",    label: "음성 기능",     type: "boolean" },
  { key: "coding_support",   label: "코딩 지원",     type: "boolean" },
  { key: "mobile_app",       label: "모바일 앱",     type: "boolean" },
  { key: "context_window",   label: "컨텍스트 길이", type: "text"    },
  { key: "recommended_for",  label: "추천 대상",     type: "text"    },
  { key: "company",          label: "회사",          type: "text"    },
  { key: "release_date",     label: "출시일",        type: "text"    },
  { key: "rating",           label: "평점",          type: "rating"  },
];
