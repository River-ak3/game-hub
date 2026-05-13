import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-accent/10 to-surface">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 sm:w-72 h-32 sm:h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-32 sm:w-72 h-32 sm:h-72 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="max-w-2xl lg:max-w-3xl animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium mb-4 sm:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            攻略持续更新中
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-text-primary leading-tight">
            你的游戏攻略
            <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              终极指南
            </span>
          </h1>

          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-text-secondary leading-relaxed max-w-xl">
            专业游戏攻略、Boss 打法、装备推荐，一网打尽。从新手入门到高手进阶，助你征服每一款游戏。
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="/games"
              className="inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-light transition-colors"
            >
              浏览全部游戏
              <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 rounded-xl bg-surface border border-border text-text-primary text-sm font-medium hover:bg-surface-lighter transition-colors"
            >
              搜索攻略
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
