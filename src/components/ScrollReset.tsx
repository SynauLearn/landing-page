"use client";

import { useLenis } from "lenis/react";
import { useEffect } from "react";

export default function ScrollReset() {
  const lenis = useLenis();

  useEffect(() => {
    // Disable browser's default scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Force scroll to top
    window.scrollTo(0, 0);

    // If Lenis is active, force it to top as well
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [lenis]);

  return null;
}
