// Placeholder handling.
//
// Any text written as "[Something in square brackets]" counts as a placeholder.
// In development (npm run dev) placeholders show up as orange tags so you can see
// what is left to fill in. In the built site they are hidden automatically.

export const isDev = import.meta.env.DEV

/** True when a value is missing, empty, or still a "[bracketed]" placeholder. */
export function isPlaceholder(value?: string | null): boolean {
  return !value || /^\s*\[.*\]\s*$/.test(value)
}

/** Returns only the real (non-placeholder) entries of a list of text items. */
export function realItems(list?: string[]): string[] {
  return (list ?? []).filter((item) => !isPlaceholder(item))
}
