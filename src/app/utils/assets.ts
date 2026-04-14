type AssetLike = string | { src: string };

export function assetUrl(asset: AssetLike) {
  return typeof asset === "string" ? asset : asset.src;
}

export function withBasePath(path: string) {
  const rawBaseUrl = import.meta.env.BASE_URL || "/";
  const baseUrl = rawBaseUrl.endsWith("/") ? rawBaseUrl : `${rawBaseUrl}/`;
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;

  return `${baseUrl}${normalizedPath}`;
}
