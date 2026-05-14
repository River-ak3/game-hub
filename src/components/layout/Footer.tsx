import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="text-sm">🎮</span>
            <span className="text-sm font-bold text-text-primary">GameHub</span>
            <span className="text-xs text-text-muted hidden sm:inline">· 游戏攻略站</span>
          </div>

          {/* Quick Links */}
          <nav className="flex items-center gap-4">
            <Link href="/" className="text-xs text-text-muted hover:text-primary transition-colors">首页</Link>
            <Link href="/games" className="text-xs text-text-muted hover:text-primary transition-colors">全部游戏</Link>
            <Link href="/search" className="text-xs text-text-muted hover:text-primary transition-colors">搜索</Link>
          </nav>

          {/* Copyright */}
          <p className="text-[11px] text-text-muted">
            © {new Date().getFullYear()} GameHub
          </p>
        </div>
      </div>
    </footer>
  );
}
