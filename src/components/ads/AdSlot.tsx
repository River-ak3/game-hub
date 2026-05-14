interface AdSlotProps {
  slot: "header-banner" | "in-article" | "sidebar" | "footer-banner";
  className?: string;
}

const slotConfig = {
  "header-banner": { width: "w-full", height: "h-[90px]", label: "横幅广告" },
  "in-article": { width: "w-full", height: "h-[250px]", label: "文章内广告" },
  "sidebar": { width: "w-full", height: "h-[600px]", label: "侧栏广告" },
  "footer-banner": { width: "w-full", height: "h-[90px]", label: "底部横幅" },
};

export function AdSlot({ slot, className = "" }: AdSlotProps) {
  const config = slotConfig[slot];

  return (
    <div
      className={`relative bg-surface/50 border border-border rounded-xl overflow-hidden ${config.width} ${config.height} ${className}`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-surface-lighter flex items-center justify-center">
          <svg
            className="w-4 h-4 text-text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
        </div>
        <span className="text-xs text-text-muted">{config.label}</span>
        <span className="text-[10px] text-text-muted/60">AdSense 占位</span>
      </div>
    </div>
  );
}
