import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                G
              </div>
              <span className="text-lg font-bold text-text-primary">
                GameHub
              </span>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed">
              高质量游戏攻略与指南，帮助玩家探索每一款游戏的精彩内容。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">
              快速导航
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-text-secondary hover:text-accent transition-colors"
                >
                  首页
                </Link>
              </li>
              <li>
                <Link
                  href="/games"
                  className="text-sm text-text-secondary hover:text-accent transition-colors"
                >
                  全部游戏
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-sm text-text-secondary hover:text-accent transition-colors"
                >
                  搜索攻略
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">
              关于
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">
              GameHub 致力于为玩家提供最全面、最优质的游戏攻略内容。所有内容均经过验证，确保准确性。
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-center text-xs text-text-muted">
            © {new Date().getFullYear()} GameHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
