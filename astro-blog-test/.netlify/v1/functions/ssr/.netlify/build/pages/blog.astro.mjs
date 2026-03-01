import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_md5Jvozh.mjs';
import { $ as $$BlogPost } from '../chunks/BlogPost_B3UNDwWx.mjs';
import { $ as $$CSSLayout } from '../chunks/CSSLayout_fIhe_stO.mjs';
import { g as getCollection } from '../chunks/_astro_content_myjIGe_Y.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://example.com");
const $$Blog = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Blog;
  const allPosts = await getCollection("blog");
  const pageTitle = "My Astro Learning Blog";
  return renderTemplate`${renderComponent($$result, "CSSLayout", $$CSSLayout, { "title": pageTitle }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>${pageTitle}</h1> <p>This is where I will post about my journey learning Astro.</p> ${allPosts.map((post) => renderTemplate`${renderComponent($$result2, "BlogPost", $$BlogPost, { "url": `/posts/${post.id}/`, "title": post.data.title })}`)}` })}`;
}, "/Users/bit/Git/github.com/TheBit/learning-web/astro-blog-test/src/pages/blog.astro", void 0);

const $$file = "/Users/bit/Git/github.com/TheBit/learning-web/astro-blog-test/src/pages/blog.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Blog,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
