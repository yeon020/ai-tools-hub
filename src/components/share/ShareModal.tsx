"use client";

import { useState } from "react";
import { X, Check, Link2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface Props {
  url: string;
  text: string;
  onClose: () => void;
}

export default function ShareModal({ url, text, onClose }: Props) {
  const { lang } = useLanguage();
  const [copied, setCopied] = useState(false);

  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);

  const platforms = [
    {
      id: "twitter",
      label: "X (Twitter)",
      color: "#000000",
      hoverColor: "#1a1a1a",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      action: () => window.open(
        `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
        "_blank", "noopener,noreferrer,width=550,height=450"
      ),
    },
    {
      id: "reddit",
      label: "Reddit",
      color: "#FF4500",
      hoverColor: "#e03d00",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
        </svg>
      ),
      action: () => window.open(
        `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedText}`,
        "_blank", "noopener,noreferrer,width=900,height=700"
      ),
    },
    {
      id: "kakao",
      label: "카카오톡",
      color: "#FEE500",
      hoverColor: "#e8d000",
      textColor: "#1a1a1a",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 3C6.477 3 2 6.477 2 11c0 2.884 1.574 5.42 3.969 6.978L4.9 21l3.573-1.787A11.1 11.1 0 0 0 12 19c5.523 0 10-3.477 10-8S17.523 3 12 3z"/>
        </svg>
      ),
      action: () => {
        navigator.clipboard.writeText(url).catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      note: lang === "ko" ? "링크 복사 후 카카오톡에 붙여넣기" : "Copy link → paste in KakaoTalk",
    },
    {
      id: "instagram",
      label: "Instagram",
      color: "#E1306C",
      hoverColor: "#c72560",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
        </svg>
      ),
      action: () => {
        navigator.clipboard.writeText(url).catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      note: lang === "ko" ? "링크 복사 후 인스타 스토리에 붙여넣기" : "Copy link → paste in Instagram story",
    },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // fallback
      const el = document.createElement("textarea");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-sm rounded-2xl border border-white/[0.10] bg-[#111111] p-5 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">
            {lang === "ko" ? "공유하기" : "Share"}
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/[0.08] text-zinc-500 hover:text-white transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Platform buttons */}
        <div className="grid grid-cols-2 gap-2">
          {platforms.map((p) => (
            <button
              key={p.id}
              onClick={p.action}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-white/[0.07] hover:border-white/[0.15] hover:bg-white/[0.04] transition-all duration-200 group"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ background: p.color, color: (p as any).textColor ?? "#fff" }}
              >
                {p.id === "kakao" && copied ? <Check className="w-5 h-5" /> : p.icon}
              </div>
              <span className="text-xs font-medium text-zinc-400 group-hover:text-white transition-colors">
                {p.label}
              </span>
              {p.note && (
                <span className="text-[10px] text-zinc-600 text-center leading-tight">{p.note}</span>
              )}
            </button>
          ))}
        </div>

        {/* Copy link */}
        <button
          onClick={copyLink}
          className="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-white/[0.07] hover:border-white/[0.15] hover:bg-white/[0.04] transition-all duration-200 group"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
              {copied ? <Check className="w-4 h-4 text-violet-400" /> : <Link2 className="w-4 h-4 text-zinc-400" />}
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">
                {copied
                  ? (lang === "ko" ? "복사됨!" : "Copied!")
                  : (lang === "ko" ? "링크 복사" : "Copy link")}
              </p>
              <p className="text-[10px] text-zinc-600 truncate max-w-[180px]">{url}</p>
            </div>
          </div>
          <span className="text-[10px] text-zinc-600 group-hover:text-zinc-400">
            {lang === "ko" ? "복사" : "Copy"}
          </span>
        </button>
      </div>
    </div>
  );
}
