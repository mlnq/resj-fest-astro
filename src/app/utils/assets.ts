type AssetLike = string | { src: string };

export function assetUrl(asset: AssetLike) {
  return typeof asset === "string" ? asset : asset.src;
}

export function withBasePath(path: string) {
  const baseUrl = import.meta.env.BASE_URL;
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;

  return `${baseUrl}${normalizedPath}`;
}
