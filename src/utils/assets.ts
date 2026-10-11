/** Build the URL for a file inside the /public folder, e.g. asset('images/airfoil.png'). */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
