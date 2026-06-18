import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Analytics from "@/components/analytics/Analytics";
import { LanguageProvider } from "@/lib/i18n";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://aihub.kr"),
  title: {
    default: "AIHub — AI 툴 비교 & 탐색 플랫폼",
    template: "%s | AIHub",
  },
  description:
    "ChatGPT, Claude, Cursor, Midjourney 등 20개 이상의 AI 툴을 탐색하고 비교하세요. 가격, 기능, 무료 플랜 정보를 한 곳에서 확인하세요.",
  keywords: ["AI 툴", "AI 비교", "ChatGPT", "Claude", "Cursor", "Midjourney", "AI 디렉토리", "인공지능"],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://aihub.kr",
    siteName: "AIHub",
    title: "AIHub — AI 툴 비교 & 탐색 플랫폼",
    description: "20개 이상의 AI 툴을 탐색하고 비교하세요.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AIHub" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AIHub — AI 툴 비교 & 탐색 플랫폼",
    description: "20개 이상의 AI 툴을 탐색하고 비교하세요.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="dark">
      <body className={inter.className}>
        <Analytics />
        <LanguageProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
