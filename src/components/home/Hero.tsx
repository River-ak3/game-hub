import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-primary)_0%,_transparent_60%)] opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-6 animate-fade-in">
            探索游戏的
            <br />
            <span className="gradient-text">每一个角落</span>
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary leading-relaxed mb-8 animate-fade-in animation-delay-100">
            精心整理的游戏攻略与指南，从新手入门到高手进阶，
            助你畅玩每一款热门游戏。
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in animation-delay-200">
            <Link
              href="/games"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-primary hover:bg-primary-light text-white font-medium transition-all hover:shadow-lg hover:shadow-primary/25"
            >
              浏览全部游戏
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center px-6 py-3 rounded-xl border border-border hover:border-accent/50 text-text-secondary hover:text-accent font-medium transition-all"
            >
              搜索攻略
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
