export function postPath(slug: string) {
  return `/posts/${slug}`;
}

export function isHomePath(pathname: string) {
  return pathname === "/" || pathname === "";
}

export function postSlugFromPath(pathname: string) {
  return pathname.match(/^\/posts\/([^/]+)\/?$/)?.[1];
}

export function legacyHashSlug(hash: string) {
  return hash.match(/^#\/posts\/(.+)$/)?.[1];
}
