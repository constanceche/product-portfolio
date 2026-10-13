const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix an internal path with the deploy base (e.g. "/portfolio" on a GitHub Pages project site). */
export function withBase(path: string): string {
  return `${base}/${path.replace(/^\//, '')}`;
}
