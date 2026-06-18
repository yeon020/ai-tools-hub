"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "en" | "ko";

const translations = {
  en: {
    nav: { explore: "Explore", compare: "Compare", category: "Categories", search: "Search" },
    hero: {
      badge: "33 AI Tools Curated · Updated Weekly",
      title1: "Find & Compare",
      title2: "the Best AI Tools",
      description: "From ChatGPT to Cursor — compare AI tool pricing, features, and free plans all in one place.",
      searchButton: "Search",
      popularLabel: "Popular:",
      stats: [
        { value: "33+", label: "AI Tools" },
        { value: "7",   label: "Categories" },
        { value: "Free", label: "Available" },
      ],
    },
    footer: {
      description: "AI Tool Comparison & Discovery Platform.\nFind the best AI tools for you.",
      categories: "Categories",
      popularTools: "Popular Tools",
      popularComparisons: "Popular Comparisons",
      copyright: "© 2025 AIHub. All rights reserved.",
      affiliate: "Some links are affiliate links.",
    },
    search: {
      title: "Explore AI Tools",
      resultsCount: " AI tools",
      searchResultsSuffix: "search results for",
      placeholder: "Search by name, company, category...",
      all: "All",
      freePlan: "Free Plan",
      reset: "Reset",
      noResults: "No results found",
      noResultsDesc: "Try different keywords or categories",
      resetFilters: "Reset Filters",
      loading: "Loading...",
    },
    tool: {
      freePlan: "Free Plan",
      featured: "Featured",
      startFree: "Get Started Free",
      officialSite: "Official Site",
      whatIs: " Overview",
      keyFeatures: "Key Features",
      specs: "Specifications",
      faq: "FAQ",
      relatedComparisons: "Related Comparisons",
      relatedTools: "Related AI Tools",
      pricing: "Pricing",
      toolInfo: "Tool Info",
      quickCheck: "Quick Check",
      compareWith: "Compare",
      free: "Free",
      specLabels: {
        price: "Price",
        freePlan: "Free Plan",
        apiSupport: "API Support",
        webSearch: "Web Search",
        fileUpload: "File Upload",
        imageGen: "Image Generation",
        voice: "Voice Support",
        coding: "Coding Support",
        mobileApp: "Mobile App",
        contextWindow: "Context Window",
        recommendedFor: "Recommended For",
        releaseDate: "Release Date",
        company: "Company",
        category: "Category",
        updatedAt: "Last Updated",
        rating: "Rating",
      },
    },
    category: {
      home: "Home",
      tools: "AI Tools",
      otherCategories: "Other Categories",
      toolsCount: "tools",
      noTools: "No tools in this category yet.",
      backHome: "Back to Home",
    },
    compare: {
      home: "Home",
      compare: "Compare",
      subtitlePrefix: "",
      subtitleSuffix: " latest pricing, features & free plan comparison",
      otherComparisons: "More Comparisons",
    },
    card: {
      viewDetails: "View Details",
      free: "Free",
      viewAll: "View All",
    },
    home: {
      trending: "Trending Tools",
      trendingDesc: "Most popular AI tools right now",
      recent: "Recently Updated",
      recentDesc: "AI tools with the latest information",
      categories: "Browse by Category",
      categoriesDesc: "Find the right tool for your use case",
      comparisons: "Popular Comparisons",
      comparisonsDesc: "Most compared AI tools by users",
    },
    categoryLabels: {
      chat: "Chat",
      coding: "Coding",
      image: "Image",
      video: "Video",
      voice: "Voice",
      productivity: "Productivity",
      design: "Design",
    },
  },
  ko: {
    nav: { explore: "탐색", compare: "비교", category: "카테고리", search: "검색" },
    hero: {
      badge: "33개 AI 툴 큐레이션 · 매주 업데이트",
      title1: "최고의 AI 툴을",
      title2: "찾고 비교하세요",
      description: "ChatGPT부터 Cursor까지 — AI 툴의 가격, 기능, 무료 플랜을 한 곳에서 비교하고 최적의 도구를 선택하세요.",
      searchButton: "검색",
      popularLabel: "인기:",
      stats: [
        { value: "33+", label: "AI 툴" },
        { value: "7",   label: "카테고리" },
        { value: "무료", label: "이용 가능" },
      ],
    },
    footer: {
      description: "AI 툴 비교 & 탐색 플랫폼.\n최고의 AI 도구를 찾아드립니다.",
      categories: "카테고리",
      popularTools: "인기 툴",
      popularComparisons: "인기 비교",
      copyright: "© 2025 AIHub. All rights reserved.",
      affiliate: "일부 링크는 제휴 링크입니다.",
    },
    search: {
      title: "AI 툴 탐색",
      resultsCount: "개 AI 툴",
      searchResultsSuffix: "검색 결과",
      placeholder: "툴 이름, 회사, 카테고리로 검색...",
      all: "전체",
      freePlan: "무료 플랜",
      reset: "초기화",
      noResults: "검색 결과가 없습니다",
      noResultsDesc: "다른 키워드나 카테고리로 시도해보세요",
      resetFilters: "필터 초기화",
      loading: "로딩 중...",
    },
    tool: {
      freePlan: "무료 플랜",
      featured: "추천",
      startFree: "무료로 시작하기",
      officialSite: "공식 사이트",
      whatIs: "이란?",
      keyFeatures: "주요 기능",
      specs: "상세 스펙",
      faq: "자주 묻는 질문",
      relatedComparisons: "관련 비교",
      relatedTools: "관련 AI 툴",
      pricing: "가격 정보",
      toolInfo: "툴 정보",
      quickCheck: "빠른 확인",
      compareWith: "비교하기",
      free: "무료",
      specLabels: {
        price: "가격",
        freePlan: "무료 플랜",
        apiSupport: "API 지원",
        webSearch: "웹 검색",
        fileUpload: "파일 업로드",
        imageGen: "이미지 생성",
        voice: "음성 기능",
        coding: "코딩 지원",
        mobileApp: "모바일 앱",
        contextWindow: "컨텍스트 길이",
        recommendedFor: "추천 대상",
        releaseDate: "출시일",
        company: "회사",
        category: "카테고리",
        updatedAt: "업데이트",
        rating: "평점",
      },
    },
    category: {
      home: "홈",
      tools: "AI 툴",
      otherCategories: "다른 카테고리",
      toolsCount: "개의 툴",
      noTools: "이 카테고리에 등록된 툴이 없습니다.",
      backHome: "홈으로 돌아가기",
    },
    compare: {
      home: "홈",
      compare: "비교",
      subtitlePrefix: "",
      subtitleSuffix: "년 최신 가격, 기능, 무료 플랜 비교",
      otherComparisons: "다른 비교 보기",
    },
    card: {
      viewDetails: "자세히 보기",
      free: "무료",
      viewAll: "전체 보기",
    },
    home: {
      trending: "인기 AI 툴",
      trendingDesc: "지금 가장 주목받는 AI 툴",
      recent: "최근 업데이트",
      recentDesc: "최신 정보로 업데이트된 AI 툴",
      categories: "카테고리 탐색",
      categoriesDesc: "용도별 AI 툴 찾기",
      comparisons: "인기 비교",
      comparisonsDesc: "사용자들이 가장 많이 비교하는 AI 툴",
    },
    categoryLabels: {
      chat: "채팅",
      coding: "코딩",
      image: "이미지",
      video: "비디오",
      voice: "음성",
      productivity: "생산성",
      design: "디자인",
    },
  },
};

export type Translations = typeof translations.en;

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("aihub-lang") as Lang | null;
    if (saved && (saved === "en" || saved === "ko")) setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("aihub-lang", l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LangContext);
}
