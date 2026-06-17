import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getToolsByCategory } from "@/data/tools";
import { CATEGORIES, getCategoryInfo } from "@/lib/utils";
import type { Category } from "@/lib/types";
import ToolCard from "@/components/tools/ToolCard";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const info = getCategoryInfo(category as Category);
  if (!info) return {};

  const year = new Date().getFullYear();
  const title = `최고의 ${info.label} AI 툴 모음 (${year}) — AIHub`;
  const description = `${info.description}. ${year}년 최신 ${info.label} AI 툴 가격, 기능, 무료 플랜 비교.`;

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { card: "summary_large_image", title, description },
    alternates: { canonical: `/category/${category}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const info = getCategoryInfo(category as Category);
  if (!info) notFound();

  const tools = getToolsByCategory(category);
  const otherCategories = CATEGORIES.filter((c) => c.slug !== category);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-zinc-600 mb-8">
        <Link href="/" className="hover:text-white transition-colors">홈</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-zinc-400">{info.label}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">{info.label} AI 툴</h1>
        <p className="text-zinc-500 text-sm">{info.description} — {tools.length}개의 툴</p>
      </div>

      {tools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-zinc-600">
          <p>이 카테고리에 등록된 툴이 없습니다.</p>
          <Link href="/" className="text-violet-400 hover:underline mt-2 inline-block text-sm">홈으로 돌아가기</Link>
        </div>
      )}

      {/* Other categories */}
      <div className="border-t border-white/[0.06] pt-8">
        <h2 className="text-sm font-semibold text-white mb-4">다른 카테고리</h2>
        <div className="flex flex-wrap gap-2">
          {otherCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="px-4 py-2 rounded-full border border-white/[0.08] text-sm text-zinc-400 hover:text-white hover:border-white/[0.15] transition-all"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
