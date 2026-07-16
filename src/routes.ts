export function postPath(slug: string) {
  return `/posts/${slug}`;
}

export function postSlugFromPath(pathname: string) {
  return pathname.match(/^\/posts\/([^/]+)\/?$/)?.[1];
}

export function legacyHashSlug(hash: string) {
  return hash.match(/^#\/posts\/(.+)$/)?.[1];
}
