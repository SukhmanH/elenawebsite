'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

declare global {
  interface Window {
    // Lenis's own types claim `window.lenis` for metadata, so use a distinct key.
    __lenis?: Lenis
  }
}

/**
 * Inertial smooth scrolling via Lenis. Skipped entirely under
 * prefers-reduced-motion (native scrolling remains untouched). The instance
 * is exposed on `window.__lenis` so overlays that lock the page (menu, loader)
 * can pause it while scroll is locked.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ anchors: true })
    window.__lenis = lenis

    let raf = requestAnimationFrame(function loop(time) {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    })

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])

  return null
}
