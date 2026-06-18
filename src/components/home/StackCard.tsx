"use client";

import { useRef, useState } from "react";
import { Download, Share2, Check, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import type { Tool } from "@/lib/types";

interface Props {
  tools: Tool[];
  onClose: () => void;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  chat:         { bg: "#7c3aed22", text: "#a78bfa" },
  coding:       { bg: "#3b82f622", text: "#93c5fd" },
  image:        { bg: "#ec489922", text: "#f9a8d4" },
  video:        { bg: "#f9731622", text: "#fdba74" },
  voice:        { bg: "#10b98122", text: "#6ee7b7" },
  productivity: { bg: "#eab30822", text: "#fde68a" },
  design:       { bg: "#f4364422", text: "#fca5a5" },
};

export default function StackCard({ tools, onClose }: Props) {
  const { lang } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const [sharing, setSharing] = useState(false);
  const [copied, setCopied] = useState(false);

  const top3 = tools.slice(0, 3);

  async function captureAndShare(action: "download" | "share") {
    if (!cardRef.current) return;
    setSharing(true);

    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#09090b",
        scale: 2,
        useCORS: true,
        logging: false,
      });

      if (action === "download") {
        const link = document.createElement("a");
        link.download = "my-ai-stack.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      } else {
        const blob = await new Promise<Blob>((resolve) =>
          canvas.toBlob((b) => resolve(b!), "image/png")
        );
        const file = new File([blob], "my-ai-stack.png", { type: "image/png" });
        const text =
          lang === "ko"
            ? `나의 AI 스택: ${top3.map((t) => t.name).join(" + ")} 🚀\n#AIHub #AI툴`
            : `My AI Stack: ${top3.map((t) => t.name).join(" + ")} 🚀\n#AIHub #AITools`;
        const url = "https://ai-tools-hub-silk.vercel.app";

        if (navigator.canShare?.({ files: [file] })) {
          await navigator.share({ files: [file], text, url });
        } else {
          // fallback: copy text + URL
          await navigator.clipboard.writeText(`${text}\n${url}`);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      }
    } catch (e) {
      console.error(e);
    }
    setSharing(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md space-y-4">
        {/* Close */}
        <div className="flex justify-end">
          <button onClick={onClose} className="p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-zinc-400 hover:text-white transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Card (this gets captured) */}
        <div
          ref={cardRef}
          className="rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #09090b 0%, #0f0a1a 100%)",
            border: "1px solid rgba(124,58,237,0.3)",
            padding: "32px",
            fontFamily: "sans-serif",
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <div style={{
                width: "28px", height: "28px", borderRadius: "8px",
                background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "12px", fontWeight: 900, color: "#fff",
              }}>AI</div>
              <span style={{ fontSize: "16px", fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>
                Hub
              </span>
            </div>
            <p style={{ fontSize: "22px", fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", lineHeight: 1.2 }}>
              {lang === "ko" ? "나의 AI 스택" : "My AI Stack"}
            </p>
            <p style={{ fontSize: "13px", color: "#71717a", marginTop: "4px" }}>
              {lang === "ko" ? "나에게 딱 맞는 AI 툴 조합" : "My personalized AI tool combo"}
            </p>
          </div>

          {/* Tools */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
            {top3.map((tool, i) => {
              const color = CATEGORY_COLORS[tool.category] ?? { bg: "#ffffff11", text: "#a1a1aa" };
              const initials = tool.name.slice(0, 2).toUpperCase();
              return (
                <div key={tool.slug} style={{
                  display: "flex", alignItems: "center", gap: "14px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "12px", padding: "14px 16px",
                }}>
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "10px",
                    background: color.bg, border: `1px solid ${color.text}33`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "13px", fontWeight: 800, color: color.text, flexShrink: 0,
                  }}>{initials}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "15px", fontWeight: 700, color: "#fff" }}>{tool.name}</div>
                    <div style={{ fontSize: "11px", color: "#71717a", marginTop: "1px" }}>{tool.company}</div>
                  </div>
                  <div style={{
                    fontSize: "10px", fontWeight: 600, color: color.text,
                    background: color.bg, border: `1px solid ${color.text}33`,
                    padding: "3px 8px", borderRadius: "999px",
                  }}>
                    #{i + 1}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.06)",
          }}>
            <span style={{ fontSize: "11px", color: "#52525b" }}>
              ai-tools-hub-silk.vercel.app
            </span>
            <span style={{
              fontSize: "11px", color: "#a78bfa",
              background: "rgba(124,58,237,0.1)", padding: "3px 10px", borderRadius: "999px",
              border: "1px solid rgba(124,58,237,0.2)",
            }}>
              {lang === "ko" ? "나만의 추천 결과" : "Personalized for me"}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => captureAndShare("share")}
            disabled={sharing}
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors disabled:opacity-50"
          >
            {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
            {copied
              ? (lang === "ko" ? "복사됨!" : "Copied!")
              : (lang === "ko" ? "공유하기" : "Share")}
          </button>
          <button
            onClick={() => captureAndShare("download")}
            disabled={sharing}
            className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/[0.12] text-zinc-300 hover:text-white hover:border-white/20 text-sm font-medium transition-colors disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            {lang === "ko" ? "이미지 저장" : "Save Image"}
          </button>
        </div>
      </div>
    </div>
  );
}
