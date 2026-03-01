import { a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../chunks/astro/server_md5Jvozh.mjs';
import { g as getCollection } from '../chunks/_astro_content_myjIGe_Y.mjs';
import { $ as $$CSSLayout } from '../chunks/CSSLayout_fIhe_stO.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const allPosts = await getCollection("blog");
  const tags = [...new Set(allPosts.map((post) => post.data.tags).flat())];
  const pageTitle = "Tag Index";
  return renderTemplate`${renderComponent($$result, "CSSLayout", $$CSSLayout, { "title": pageTitle, "data-astro-cid-os4i7owy": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="tags" data-astro-cid-os4i7owy> ${tags.map((tag) => renderTemplate`<p class="tag" data-astro-cid-os4i7owy><a${addAttribute(`/tags/${tag}`, "href")} data-astro-cid-os4i7owy>${tag}</a></p>`)} </div> ` })} `;
}, "/Users/bit/Git/github.com/TheBit/learning-web/astro-blog-test/src/pages/tags/index.astro", void 0);

const $$file = "/Users/bit/Git/github.com/TheBit/learning-web/astro-blog-test/src/pages/tags/index.astro";
const $$url = "/tags";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
