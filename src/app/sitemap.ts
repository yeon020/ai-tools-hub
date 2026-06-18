import type { MetadataRoute } from "next";
import { SAMPLE_TOOLS } from "@/data/tools";
import { CATEGORIES, POPULAR_COMPARISONS } from "@/lib/utils";

const BASE_URL = "https://ai-tools-hub-silk.vercel.app";

const COMPARE_SLUGS = [
  ...POPULAR_COMPARISONS.map((c) => `${c.toolA}-vs-${c.toolB}`),
  "chatgpt-vs-perplexity",
  "cursor-vs-github-copilot",
  "midjourney-vs-leonardo-ai",
  "chatgpt-vs-deepseek",
  "claude-vs-deepseek",
  "chatgpt-vs-microsoft-copilot",
  "bolt-vs-lovable",
  "bolt-vs-v0",
  "cursor-vs-cline",
  "heygen-vs-synthesia",
  "runway-vs-pika",
  "deepseek-vs-gemini",
];

function entry(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "weekly"
): MetadataRoute.Sitemap[number] {
  return {
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: {
        en: `${BASE_URL}${path}`,
        ko: `${BASE_URL}${path}`,
      },
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    entry("/",       1.0, "daily"),
    entry("/search", 0.8, "daily"),
  ];

  const categoryPages = CATEGORIES.map((cat) =>
    entry(`/category/${cat.slug}`, 0.8, "weekly")
  );

  const toolPages = SAMPLE_TOOLS.map((tool) =>
    entry(`/tool/${tool.slug}`, 0.9, "weekly")
  );

  const comparePages = COMPARE_SLUGS.map((slug) =>
    entry(`/compare/${slug}`, 0.7, "monthly")
  );

  return [...staticPages, ...categoryPages, ...toolPages, ...comparePages];
}
