"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw, Sparkles, ChevronRight } from "lucide-react";
import { SAMPLE_TOOLS } from "@/data/tools";
import { useLanguage } from "@/lib/i18n";
import type { Tool } from "@/lib/types";

interface Question {
  id: string;
  question_ko: string;
  question_en: string;
  options: {
    label_ko: string;
    label_en: string;
    value: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: "purpose",
    question_ko: "주로 어떤 용도로 AI를 쓰고 싶으세요?",
    question_en: "What do you mainly want to use AI for?",
    options: [
      { label_ko: "글쓰기 / 대화", label_en: "Writing / Chat", value: "chat" },
      { label_ko: "코딩 / 개발", label_en: "Coding / Dev", value: "coding" },
      { label_ko: "이미지 / 디자인 생성", label_en: "Image / Design", value: "image" },
      { label_ko: "영상 제작", label_en: "Video Creation", value: "video" },
    ],
  },
  {
    id: "budget",
    question_ko: "예산은 어느 정도 생각하세요?",
    question_en: "What's your budget?",
    options: [
      { label_ko: "무료만 쓸게요", label_en: "Free only", value: "free" },
      { label_ko: "$10~20/월 정도", label_en: "$10–20/mo", value: "low" },
      { label_ko: "$20 이상도 괜찮아요", label_en: "$20+/mo is fine", value: "high" },
    ],
  },
  {
    id: "level",
    question_ko: "AI 툴 사용 경험이 어느 정도예요?",
    question_en: "How experienced are you with AI tools?",
    options: [
      { label_ko: "처음 써봐요", label_en: "Beginner", value: "beginner" },
      { label_ko: "조금 써봤어요", label_en: "Intermediate", value: "mid" },
      { label_ko: "자주 씁니다", label_en: "Power user", value: "expert" },
    ],
  },
  {
    id: "feature",
    question_ko: "가장 중요한 기능은 뭔가요?",
    question_en: "Which feature matters most?",
    options: [
      { label_ko: "웹 검색 / 최신 정보", label_en: "Web search / Real-time", value: "search" },
      { label_ko: "API / 자동화", label_en: "API / Automation", value: "api" },
      { label_ko: "모바일 앱", label_en: "Mobile app", value: "mobile" },
      { label_ko: "다국어 / 번역", label_en: "Multilingual", value: "multilingual" },
    ],
  },
];

type Answers = Record<string, string>;

function scoreTools(answers: Answers): Tool[] {
  const scores: Record<string, number> = {};

  SAMPLE_TOOLS.forEach((tool) => {
    let score = 0;

    // category match
    if (answers.purpose && tool.category === answers.purpose) score += 5;

    // budget match
    if (answers.budget === "free" && tool.free_plan) score += 4;
    if (answers.budget === "low" && tool.free_plan) score += 2;
    if (answers.budget === "high" && (tool.rating ?? 0) >= 4.5) score += 2;

    // feature match
    if (answers.feature === "search" && tool.web_search) score += 3;
    if (answers.feature === "api" && tool.api_support) score += 3;
    if (answers.feature === "mobile" && tool.mobile_app) score += 3;

    // level match — beginners get featured/popular tools
    if (answers.level === "beginner" && tool.featured) score += 2;
    if (answers.level === "expert" && tool.api_support) score += 1;

    // rating boost
    score += (tool.rating ?? 0) * 0.3;

    scores[tool.slug] = score;
  });

  return [...SAMPLE_TOOLS]
    .sort((a, b) => (scores[b.slug] ?? 0) - (scores[a.slug] ?? 0))
    .slice(0, 3);
}

const CATEGORY_COLORS: Record<string, string> = {
  chat: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  coding: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  image: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  video: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  voice: "bg-green-500/10 text-green-400 border-green-500/20",
  productivity: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  design: "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

export default function ToolQuiz() {
  const { lang } = useLanguage();
  const [step, setStep] = useState<number>(0); // 0 = intro
  const [answers, setAnswers] = useState<Answers>({});
  const [results, setResults] = useState<Tool[] | null>(null);

  const currentQ = QUESTIONS[step - 1];
  const isIntro = step === 0;
  const isDone = results !== null;
  const progress = step === 0 ? 0 : Math.round((step / QUESTIONS.length) * 100);

  function handleAnswer(value: string) {
    const newAnswers = { ...answers, [currentQ.id]: value };
    setAnswers(newAnswers);

    if (step < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setResults(scoreTools(newAnswers));
    }
  }

  function reset() {
    setStep(0);
    setAnswers({});
    setResults(null);
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-4">
            <Sparkles className="h-3 w-3" />
            {lang === "ko" ? "나에게 맞는 AI 툴 찾기" : "Find Your AI Tool"}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            {lang === "ko" ? "어떤 AI 툴이 나에게 맞을까?" : "Which AI Tool Is Right for You?"}
          </h2>
          <p className="mt-2 text-zinc-500 text-sm">
            {lang === "ko"
              ? "4가지 질문에 답하면 딱 맞는 툴 3개를 추천해 드려요"
              : "Answer 4 quick questions and get 3 personalized recommendations"}
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
          {/* Progress bar */}
          {!isIntro && !isDone && (
            <div className="h-1 bg-white/[0.05]">
              <div
                className="h-full bg-violet-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          <div className="p-8">
            {/* INTRO */}
            {isIntro && (
              <div className="text-center space-y-6">
                <div className="text-6xl">🤖</div>
                <div>
                  <p className="text-white font-medium text-lg">
                    {lang === "ko"
                      ? "33개 AI 툴 중 나에게 맞는 것을 찾아드려요"
                      : "Find the best match among 33+ AI tools"}
                  </p>
                  <p className="text-zinc-500 text-sm mt-1">
                    {lang === "ko" ? "약 1분 소요" : "Takes about 1 minute"}
                  </p>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors"
                >
                  {lang === "ko" ? "시작하기" : "Get Started"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* QUESTION */}
            {!isIntro && !isDone && currentQ && (
              <div className="space-y-6">
                <div className="flex items-center justify-between text-xs text-zinc-600">
                  <span>{lang === "ko" ? `질문 ${step} / ${QUESTIONS.length}` : `Question ${step} of ${QUESTIONS.length}`}</span>
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {lang === "ko" ? currentQ.question_ko : currentQ.question_en}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentQ.options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleAnswer(opt.value)}
                      className="group text-left px-5 py-4 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:border-violet-500/50 hover:bg-violet-500/5 transition-all duration-200"
                    >
                      <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
                        {lang === "ko" ? opt.label_ko : opt.label_en}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* RESULTS */}
            {isDone && results && (
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-sm text-violet-400 font-medium mb-1">
                    {lang === "ko" ? "추천 결과" : "Your Matches"}
                  </p>
                  <h3 className="text-xl font-bold text-white">
                    {lang === "ko" ? "이런 툴들이 잘 맞을 것 같아요!" : "Here are your top picks!"}
                  </h3>
                </div>

                <div className="space-y-3">
                  {results.map((tool, i) => (
                    <Link
                      key={tool.slug}
                      href={`/tool/${tool.slug}`}
                      className="group flex items-center gap-4 p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-200"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 text-sm font-bold">
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-white text-sm">{tool.name}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[tool.category] ?? "bg-zinc-800 text-zinc-400 border-zinc-700"}`}>
                            {tool.category}
                          </span>
                          {tool.free_plan && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400">
                              Free
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1">
                          {lang === "ko" && tool.description_ko ? tool.description_ko : tool.description}
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-zinc-600 group-hover:text-violet-400 transition-colors flex-shrink-0" />
                    </Link>
                  ))}
                </div>

                {/* Compare CTA */}
                {results.length >= 2 && (
                  <Link
                    href={`/compare/${results[0].slug}-vs-${results[1].slug}`}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/[0.08] hover:border-violet-500/30 text-zinc-400 hover:text-white text-sm font-medium transition-all duration-200"
                  >
                    {lang === "ko"
                      ? `${results[0].name} vs ${results[1].name} 자세히 비교하기`
                      : `Compare ${results[0].name} vs ${results[1].name} in detail`}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}

                <button
                  onClick={reset}
                  className="flex items-center gap-1.5 mx-auto text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
                >
                  <RotateCcw className="h-3 w-3" />
                  {lang === "ko" ? "다시 하기" : "Start over"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
