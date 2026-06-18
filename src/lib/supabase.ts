import { createClient } from "@supabase/supabase-js";
import type { Tool, Review } from "./types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Votes (compare page) ────────────────────────────────
export async function getVoteCounts(comparisonSlug: string): Promise<Record<string, number>> {
  const { data, error } = await supabase
    .from("votes")
    .select("tool_slug")
    .eq("comparison_slug", comparisonSlug);

  if (error || !data) return {};

  return data.reduce<Record<string, number>>((acc, row) => {
    acc[row.tool_slug] = (acc[row.tool_slug] ?? 0) + 1;
    return acc;
  }, {});
}

export async function insertVote(comparisonSlug: string, toolSlug: string): Promise<boolean> {
  const { error } = await supabase
    .from("votes")
    .insert({ comparison_slug: comparisonSlug, tool_slug: toolSlug });
  return !error;
}

// ─── Tool Likes ──────────────────────────────────────────
export async function getToolLikeCount(toolSlug: string): Promise<number> {
  const { count, error } = await supabase
    .from("tool_likes")
    .select("*", { count: "exact", head: true })
    .eq("tool_slug", toolSlug);

  if (error) return 0;
  return count ?? 0;
}

export async function insertToolLike(toolSlug: string): Promise<boolean> {
  const { error } = await supabase
    .from("tool_likes")
    .insert({ tool_slug: toolSlug });
  return !error;
}

// ─── Legacy functions ────────────────────────────────────
export async function getAllTools(): Promise<Tool[]> {
  const { data, error } = await supabase
    .from("tools")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getToolBySlug(slug: string): Promise<Tool | null> {
  const { data, error } = await supabase
    .from("tools")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) return null;
  return data;
}

export async function getToolsByCategory(category: string): Promise<Tool[]> {
  const { data, error } = await supabase
    .from("tools")
    .select("*")
    .eq("category", category)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function searchTools(query: string): Promise<Tool[]> {
  const { data, error } = await supabase
    .from("tools")
    .select("*")
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getFeaturedTools(): Promise<Tool[]> {
  const { data, error } = await supabase
    .from("tools")
    .select("*")
    .eq("featured", true)
    .limit(6);
  if (error) throw error;
  return data ?? [];
}

export async function getRecentTools(limit = 6): Promise<Tool[]> {
  const { data, error } = await supabase
    .from("tools")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

export async function getToolReviews(toolId: string): Promise<Review[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("tool_id", toolId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}
