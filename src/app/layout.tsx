import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Analytics from "@/components/analytics/Analytics";
import { LanguageProvider } from "@/lib/i18n";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-tools-hub-silk.vercel.app"),
  title: {
    default: "AIHub — AI Tool Comparison & Discovery",
    template: "%s | AIHub",
  },
  description:
    "Compare ChatGPT, Claude, Cursor, Midjourney and 30+ AI tools. Find pricing, features, and free plan info all in one place.",
  keywords: ["AI tools", "AI comparison", "ChatGPT", "Claude", "Cursor", "Midjourney", "AI directory", "artificial intelligence"],
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ko_KR",
    url: "https://ai-tools-hub-silk.vercel.app",
    siteName: "AIHub",
    title: "AIHub — AI Tool Comparison & Discovery",
    description: "Compare 33+ AI tools. Find pricing, features, and free plans all in one place.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AIHub — AI Tool Comparison & Discovery",
    description: "Compare 33+ AI tools. Find pricing, features, and free plans all in one place.",
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
