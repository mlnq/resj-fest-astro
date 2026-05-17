import { c as createComponent } from './astro-component_ZE8m3R01.mjs';
import 'piccolore';
import { k as renderComponent, r as renderTemplate, m as maybeRenderHead } from './ssr-function_jF5HkSbN.mjs';
import { $ as $$Layout } from './Layout_4HNKoiHF.mjs';

const $$Regulamin = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Regulamin | Rejs Fest 26" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-[#FFF9E6] px-5 py-16 text-[#1F2535] md:px-8 md:py-24"> <div class="mx-auto max-w-3xl"> <h1 class="font-rejsfest text-4xl uppercase tracking-[0.04em]">Regulamin</h1> <p class="mt-6 text-lg leading-8">
Strona regulaminu jest przygotowana jako miejsce docelowe dla pełnych zasad
        uczestnictwa. Uzupełnij tutaj finalną treść organizacyjną wydarzenia.
</p> </div> </main> ` })}`;
}, "/Users/mlenqe/Desktop/RejsFestAstro/rejs-fest-astro/src/pages/regulamin.astro", void 0);

const $$file = "/Users/mlenqe/Desktop/RejsFestAstro/rejs-fest-astro/src/pages/regulamin.astro";
const $$url = "/regulamin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Regulamin,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
