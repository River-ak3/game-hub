import { Suspense } from "react";
import SearchContent from "./SearchContent";
import type { Metadata } from "next";

const SITE_URL = "https://game-hub-eta-rose.vercel.app";

export const metadata: Metadata = {
  title: "搜索攻略 - GameHub",
  description: "搜索游戏攻略，找到你需要的指南",
  alternates: {
    canonical: `${SITE_URL}/search`,
  },
  openGraph: {
    title: "搜索攻略 - GameHub",
    description: "搜索游戏攻略，找到你需要的指南",
    url: `${SITE_URL}/search`,
    type: "website",
  },
};

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
