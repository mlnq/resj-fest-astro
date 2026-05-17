import { c as createComponent } from './astro-component_ZE8m3R01.mjs';
import 'piccolore';
import { k as renderComponent, r as renderTemplate } from './ssr-function_jF5HkSbN.mjs';
import { $ as $$Layout } from './Layout_4HNKoiHF.mjs';

const $$Galeria = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Galeria | Rejs Fest 26" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "GalleryPage", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/Users/mlenqe/Desktop/RejsFestAstro/rejs-fest-astro/src/app/pages/GalleryPage.tsx", "client:component-export": "GalleryPage" })} ` })}`;
}, "/Users/mlenqe/Desktop/RejsFestAstro/rejs-fest-astro/src/pages/galeria.astro", void 0);

const $$file = "/Users/mlenqe/Desktop/RejsFestAstro/rejs-fest-astro/src/pages/galeria.astro";
const $$url = "/galeria";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Galeria,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
