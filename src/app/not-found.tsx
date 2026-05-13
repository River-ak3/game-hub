import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - 页面未找到",
  description: "你访问的页面不存在",
};

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="text-6xl mb-4">🎮</div>
      <h1 className="text-3xl font-bold text-text-primary mb-4">
        404 - 页面未找到
      </h1>
      <p className="text-text-secondary mb-8">
        你访问的页面不存在，可能已被移动或删除。
      </p>
      <Link
        href="/"
        className="inline-flex items-center px-6 py-3 rounded-xl bg-primary hover:bg-primary-light text-white font-medium transition-all"
      >
        返回首页
      </Link>
    </div>
  );
}
