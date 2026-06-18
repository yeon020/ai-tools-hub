import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AIHub — AI Tool Comparison & Discovery";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const fontData = await fetch(
    new URL("https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2")
  ).then((res) => res.arrayBuffer()).catch(() => null);

  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontFamily: fontData ? "Inter" : "sans-serif",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "900px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(124,58,237,0.3) 0%, transparent 65%)",
          }}
        />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "36px" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "24px",
              fontWeight: 900,
            }}
          >
            AI
          </div>
          <span style={{ fontSize: "48px", fontWeight: 800, color: "#ffffff", letterSpacing: "-2px" }}>
            Hub
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
          {"Find & Compare the "}
          <span style={{ color: "#a78bfa" }}>Best AI Tools</span>
        </div>

        {/* Subtitle */}
        <div style={{ marginTop: "24px", fontSize: "26px", color: "#71717a", textAlign: "center" }}>
          {"33+ AI tools · Pricing · Features · Free Plans"}
        </div>

        {/* Badges */}
        <div style={{ display: "flex", gap: "14px", marginTop: "44px" }}>
          {["ChatGPT", "Claude", "Cursor", "Midjourney", "Perplexity"].map((name) => (
            <div
              key={name}
              style={{
                padding: "10px 22px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.06)",
                color: "#a1a1aa",
                fontSize: "20px",
                fontWeight: 500,
              }}
            >
              {name}
            </div>
          ))}
        </div>

        {/* URL */}
        <div style={{ position: "absolute", bottom: "36px", fontSize: "18px", color: "#52525b" }}>
          ai-tools-hub-silk.vercel.app
        </div>
      </div>
    ),
    {
      ...size,
      ...(fontData
        ? { fonts: [{ name: "Inter", data: fontData, style: "normal", weight: 800 }] }
        : {}),
    }
  );
}
