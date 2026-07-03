let done = false
const subscribers = new Set<() => void>()

/** Called by the loading screen the moment the intro finishes. */
export function markIntroDone() {
  if (done) return
  done = true
  subscribers.forEach((fn) => fn())
  subscribers.clear()
}

/**
 * Run `cb` once the intro overlay has left the screen (immediately if it
 * already has). Lets below-the-fold-free elements like the hero hold their
 * entrance until the visitor can actually see it. Returns an unsubscribe.
 */
export function onIntroDone(cb: () => void): () => void {
  if (done) {
    cb()
    return () => {}
  }
  subscribers.add(cb)
  return () => {
    subscribers.delete(cb)
  }
}
