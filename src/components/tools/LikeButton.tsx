"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { getToolLikeCount, insertToolLike } from "@/lib/supabase";
import { useLanguage } from "@/lib/i18n";

interface Props {
  toolSlug: string;
}

export default function LikeButton({ toolSlug }: Props) {
  const { lang } = useLanguage();
  const storageKey = `like_${toolSlug}`;

  const [count, setCount] = useState<number>(0);
  const [liked, setLiked] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setLiked(!!localStorage.getItem(storageKey));
    getToolLikeCount(toolSlug).then(setCount);
  }, [toolSlug, storageKey]);

  async function handleLike() {
    if (liked) return;
    setAnimating(true);
    setTimeout(() => setAnimating(false), 600);

    const ok = await insertToolLike(toolSlug);
    if (ok) {
      localStorage.setItem(storageKey, "1");
      setLiked(true);
      setCount((c) => c + 1);
    }
  }

  return (
    <button
      onClick={handleLike}
      disabled={liked}
      className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-200 ${
        liked
          ? "border-rose-500/30 bg-rose-500/10 cursor-default"
          : "border-white/[0.08] bg-white/[0.02] hover:border-rose-500/30 hover:bg-rose-500/5 cursor-pointer"
      }`}
    >
      <Heart
        className={`h-4 w-4 transition-all duration-300 ${
          animating ? "scale-125" : "scale-100"
        } ${liked ? "fill-rose-500 text-rose-500" : "text-zinc-500 group-hover:text-rose-400"}`}
      />
      <span className={`text-sm font-medium ${liked ? "text-rose-400" : "text-zinc-500 group-hover:text-zinc-300"}`}>
        {liked
          ? lang === "ko" ? "추천했어요!" : "Recommended!"
          : lang === "ko" ? "이 툴 추천해요" : "Recommend this"}
      </span>
      {count > 0 && (
        <span className={`text-xs px-1.5 py-0.5 rounded-full ${liked ? "bg-rose-500/20 text-rose-400" : "bg-white/[0.06] text-zinc-500"}`}>
          {count.toLocaleString()}
        </span>
      )}
    </button>
  );
}
