/** Design tokens live here. Change a color once and it updates everywhere. */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0b1118',        // page background (deep navy-charcoal)
        surface: '#121a24',   // main surfaces
        surface2: '#182230',  // raised surfaces / hover
        line: '#243142',      // borders and grid lines
        ink: '#e8edf2',       // primary text (off-white)
        muted: '#93a1b3',     // secondary text (cool gray)
        accent: '#38bdf8',    // aerospace blue / cyan
        safety: '#ff8a3d',    // safety orange: labels, status, placeholders
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
