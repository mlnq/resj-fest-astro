import { c as createComponent } from './astro-component_ZE8m3R01.mjs';
import 'piccolore';
import { k as renderComponent, r as renderTemplate, m as maybeRenderHead } from './ssr-function_jF5HkSbN.mjs';
import { $ as $$Layout } from './Layout_4HNKoiHF.mjs';

const $$PolitykaPrywatnosci = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Polityka Prywatności | Rejs Fest 26" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-[#FFF9E6] px-5 py-16 text-[#1F2535] md:px-8 md:py-24"> <div class="mx-auto max-w-3xl"> <h1 class="font-rejsfest text-4xl uppercase tracking-[0.04em]">
Polityka Prywatności
</h1> <p class="mt-6 text-lg leading-8">
Ta podstrona jest gotowa pod właściwą politykę prywatności dotyczącą zapisów,
        formularzy i komunikacji organizacyjnej. Wstaw tutaj finalny dokument.
</p> </div> </main> ` })}`;
}, "/Users/mlenqe/Desktop/RejsFestAstro/rejs-fest-astro/src/pages/polityka-prywatnosci.astro", void 0);

const $$file = "/Users/mlenqe/Desktop/RejsFestAstro/rejs-fest-astro/src/pages/polityka-prywatnosci.astro";
const $$url = "/polityka-prywatnosci";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$PolitykaPrywatnosci,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
