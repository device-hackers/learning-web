import { c as createAstro, a as createComponent, e as addAttribute, g as renderHead, r as renderComponent, f as renderSlot, h as renderScript, b as renderTemplate } from './astro/server_md5Jvozh.mjs';
import { $ as $$Header, a as $$Footer } from './Footer_rUo3D7T_.mjs';
/* empty css                          */

const $$Astro = createAstro("https://example.com");
const $$CSSLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CSSLayout;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" href="/favicon.ico"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${Astro2.props.title}</title>${renderHead()}</head> <body> ${renderComponent($$result, "Header", $$Header, {})} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", $$Footer, {})} ${renderScript($$result, "/Users/bit/Git/github.com/TheBit/learning-web/astro-blog-test/src/layouts/CSSLayout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/Users/bit/Git/github.com/TheBit/learning-web/astro-blog-test/src/layouts/CSSLayout.astro", void 0);

export { $$CSSLayout as $ };
