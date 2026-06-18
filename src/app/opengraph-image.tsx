import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AIHub — AI Tool Comparison & Discovery";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(124,58,237,0.25) 0%, transparent 70%)",
          }}
        />

        {/* Logo row */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
            }}
          >
            ⚡
          </div>
          <span style={{ fontSize: "42px", fontWeight: 800, color: "#ffffff", letterSpacing: "-1px" }}>
            AI<span style={{ color: "#a78bfa" }}>Hub</span>
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: "58px",
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-2px",
            lineHeight: 1.1,
            textAlign: "center",
            maxWidth: "900px",
          }}
        >
          Find & Compare the{" "}
          <span style={{ color: "#a78bfa" }}>Best AI Tools</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            marginTop: "24px",
            fontSize: "24px",
            color: "#71717a",
            textAlign: "center",
            maxWidth: "700px",
          }}
        >
          33+ AI tools · Pricing · Features · Free Plans
        </div>

        {/* Tool badges */}
        <div style={{ display: "flex", gap: "12px", marginTop: "40px" }}>
          {["ChatGPT", "Claude", "Cursor", "Midjourney", "Perplexity"].map((name) => (
            <div
              key={name}
              style={{
                padding: "8px 18px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.05)",
                color: "#a1a1aa",
                fontSize: "18px",
                fontWeight: 500,
              }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
