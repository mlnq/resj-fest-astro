import type { MiddlewareHandler } from "astro";

const SECTION_ALIASES = new Map<string, string>([
  ["/start", "start"],
  ["/wydarzenie", "wydarzenie"],
  ["/zapisy", "zapisy"],
]);

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { url, redirect } = context;
  const decodedPathname = decodeURIComponent(url.pathname);
  const aliasTarget = SECTION_ALIASES.get(decodedPathname);
  const hashTarget = decodedPathname.startsWith("/#") ? decodedPathname.slice(2) : null;
  const targetSection = aliasTarget ?? hashTarget;

  if (targetSection) {
    const targetUrl = new URL("/", url);
    targetUrl.search = url.search;
    targetUrl.hash = targetSection;
    return redirect(targetUrl.toString(), 302);
  }

  return next();
};
