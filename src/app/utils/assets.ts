type AssetLike = string | { src: string };

export function assetUrl(asset: AssetLike) {
  return typeof asset === "string" ? asset : asset.src;
}
