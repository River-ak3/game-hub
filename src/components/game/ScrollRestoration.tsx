"use client";

import { useEffect } from "react";

export function ScrollRestoration() {
  useEffect(() => {
    const savedId = sessionStorage.getItem("scroll_restore_id");
    if (savedId) {
      // Clear immediately so it only runs once
      sessionStorage.removeItem("scroll_restore_id");
      requestAnimationFrame(() => {
        const el = document.getElementById(savedId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }
  }, []);

  return null;
}
