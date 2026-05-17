import { c as createComponent } from './astro-component_ZE8m3R01.mjs';
import 'piccolore';
import { r as renderTemplate, l as renderSlot, g as addAttribute, n as renderHead } from './ssr-function_jF5HkSbN.mjs';
import 'clsx';

const loaderLogo = new Proxy({"src":"/_astro/logo.COQiq-eu.png","width":420,"height":235,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/mlenqe/Desktop/RejsFestAstro/rejs-fest-astro/src/assets/imports/logo.png";
							}
							
							return target[name];
						}
					});

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const { title = "Rejs Fest 26" } = Astro2.props;
  const baseUrl = "/";
  return renderTemplate(_a || (_a = __template(['<html lang="pl" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml"', '><link rel="icon"', '><meta name="generator"', "><title>", "</title>", '</head> <body class="is-loading" data-astro-cid-sckkx6r4> <div class="page-loader" id="page-loader" aria-live="polite" data-astro-cid-sckkx6r4> <div class="page-loader__inner" data-astro-cid-sckkx6r4> <img class="page-loader__brand"', ' alt="Rejs Fest" data-astro-cid-sckkx6r4> <p class="page-loader__status" data-astro-cid-sckkx6r4>\nLoading<span class="page-loader__dots" aria-hidden="true" data-astro-cid-sckkx6r4>...</span> </p> </div> </div> ', ' <script>\n			const hideLoader = () => {\n				document.body.classList.remove("is-loading");\n			};\n\n			if (document.readyState === "complete") {\n				hideLoader();\n			} else {\n				window.addEventListener("load", hideLoader, { once: true });\n			}\n		</script> </body> </html> '])), addAttribute(`${baseUrl}favicon.svg`, "href"), addAttribute(`${baseUrl}favicon.ico`, "href"), addAttribute(Astro2.generator, "content"), title, renderHead(), addAttribute(loaderLogo.src, "src"), renderSlot($$result, $$slots["default"]));
}, "/Users/mlenqe/Desktop/RejsFestAstro/rejs-fest-astro/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
