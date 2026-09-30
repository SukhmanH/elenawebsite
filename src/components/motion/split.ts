export type SplitWord = { word: string; accent: boolean }

/**
 * Split copy into words for per-word animation. Words wrapped in *asterisks*
 * are flagged as accent words (set in the italic accent colour).
 */
export function splitWords(text: string): SplitWord[] {
  return text.split('*').flatMap((part, i) =>
    part
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => ({ word, accent: i % 2 === 1 })),
  )
}

/** The same copy with the accent markers stripped, for screen readers. */
export function plainText(text: string) {
  return text.replaceAll('*', '')
}
