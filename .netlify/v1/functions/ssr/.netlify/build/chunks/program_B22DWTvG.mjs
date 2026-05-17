import { c as createComponent } from './astro-component_ZE8m3R01.mjs';
import 'piccolore';
import { k as renderComponent, r as renderTemplate } from './ssr-function_jF5HkSbN.mjs';
import { $ as $$Layout } from './Layout_4HNKoiHF.mjs';

const $$Program = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Program | Rejs Fest 26" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ScheduleSection", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/Users/mlenqe/Desktop/RejsFestAstro/rejs-fest-astro/src/app/components/landing/ScheduleSection.tsx", "client:component-export": "ScheduleSection" })} ` })}`;
}, "/Users/mlenqe/Desktop/RejsFestAstro/rejs-fest-astro/src/pages/program.astro", void 0);

const $$file = "/Users/mlenqe/Desktop/RejsFestAstro/rejs-fest-astro/src/pages/program.astro";
const $$url = "/program";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Program,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
