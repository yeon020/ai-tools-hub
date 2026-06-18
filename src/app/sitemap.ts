import type { MetadataRoute } from "next";
import { SAMPLE_TOOLS } from "@/data/tools";
import { CATEGORIES, POPULAR_COMPARISONS } from "@/lib/utils";

const BASE_URL = "https://ai-tools-hub-silk.vercel.app";

const COMPARE_SLUGS = [
  ...POPULAR_COMPARISONS.map((c) => `${c.toolA}-vs-${c.toolB}`),
  "chatgpt-vs-perplexity",
  "chatgpt-vs-deepseek",
  "chatgpt-vs-microsoft-copilot",
  "chatgpt-vs-notion-ai",
  "claude-vs-deepseek",
  "claude-vs-gemini",
  "claude-vs-perplexity",
  "gemini-vs-perplexity",
  "deepseek-vs-gemini",
  "cursor-vs-github-copilot",
  "cursor-vs-cline",
  "cursor-vs-bolt",
  "github-copilot-vs-cline",
  "bolt-vs-lovable",
  "bolt-vs-v0",
  "windsurf-vs-github-copilot",
  "midjourney-vs-leonardo-ai",
  "midjourney-vs-ideogram",
  "midjourney-vs-stable-diffusion",
  "leonardo-ai-vs-ideogram",
  "heygen-vs-synthesia",
  "runway-vs-pika",
  "runway-vs-kling-ai",
  "pika-vs-kling-ai",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`,       lastModified: now, changeFrequency: "daily",   priority: 1.0 },
    { url: `${BASE_URL}/search`, lastModified: now, changeFrequency: "daily",   priority: 0.8 },
  ];

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${BASE_URL}/category/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const toolPages: MetadataRoute.Sitemap = SAMPLE_TOOLS.map((tool) => ({
    url: `${BASE_URL}/tool/${tool.slug}`,
    lastModified: new Date(tool.updated_at),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const comparePages: MetadataRoute.Sitemap = COMPARE_SLUGS.map((slug) => ({
    url: `${BASE_URL}/compare/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...toolPages, ...comparePages];
}
