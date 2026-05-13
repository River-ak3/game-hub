import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🎮</span>
              <span className="text-lg font-bold text-text-primary">GameHub</span>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              你的游戏攻略终极指南
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-text-primary mb-3">快速导航</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-xs sm:text-sm text-text-secondary hover:text-primary transition-colors">首页</Link></li>
              <li><Link href="/games" className="text-xs sm:text-sm text-text-secondary hover:text-primary transition-colors">全部游戏</Link></li>
              <li><Link href="/search" className="text-xs sm:text-sm text-text-secondary hover:text-primary transition-colors">搜索攻略</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-text-primary mb-3">关于</h3>
            <ul className="space-y-2">
              <li><span className="text-xs sm:text-sm text-text-secondary">关于我们</span></li>
              <li><span className="text-xs sm:text-sm text-text-secondary">联系方式</span></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-text-primary mb-3">法律</h3>
            <ul className="space-y-2">
              <li><span className="text-xs sm:text-sm text-text-secondary">隐私政策</span></li>
              <li><span className="text-xs sm:text-sm text-text-secondary">服务条款</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border/50 text-center">
          <p className="text-[11px] sm:text-xs text-text-muted">
            © {new Date().getFullYear()} GameHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
