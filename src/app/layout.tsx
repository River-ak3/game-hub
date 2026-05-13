import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://game-hub-eta-rose.vercel.app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sc",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "GameHub - 游戏攻略站",
    template: "%s | GameHub",
  },
  description: "高质量游戏攻略与指南，覆盖热门游戏的Boss攻略、隐藏任务、收集要素等完整内容。",
  keywords: ["游戏攻略", "游戏指南", "黑神话悟空", "地平线", "GTA6", "游戏攻略站"],
  authors: [{ name: "GameHub Team" }],
  creator: "GameHub",
  publisher: "GameHub",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: BASE_URL,
    siteName: "GameHub",
    title: "GameHub - 游戏攻略站",
    description: "高质量游戏攻略与指南，覆盖热门游戏的Boss攻略、隐藏任务、收集要素等完整内容。",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "GameHub - 游戏攻略站",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GameHub - 游戏攻略站",
    description: "高质量游戏攻略与指南，覆盖热门游戏的Boss攻略、隐藏任务、收集要素等完整内容。",
    images: [`${BASE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD 结构化数据
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "GameHub",
  url: BASE_URL,
  description: "高质量游戏攻略与指南，覆盖热门游戏的Boss攻略、隐藏任务、收集要素等完整内容。",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansSC.variable} min-h-screen antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
