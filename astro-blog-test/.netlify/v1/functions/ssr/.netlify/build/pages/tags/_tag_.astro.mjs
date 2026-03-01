import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_md5Jvozh.mjs';
import { $ as $$BlogPost } from '../../chunks/BlogPost_B3UNDwWx.mjs';
import { $ as $$CSSLayout } from '../../chunks/CSSLayout_fIhe_stO.mjs';
import { g as getCollection } from '../../chunks/_astro_content_myjIGe_Y.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://example.com");
async function getStaticPaths() {
  const allPosts = await getCollection("blog");
  const uniqueTags = [...new Set(allPosts.map((post) => post.data.tags).flat())];
  return uniqueTags.map((tag) => {
    const filteredPosts = allPosts.filter((post) => post.data.tags.includes(tag));
    return {
      params: { tag },
      props: { posts: filteredPosts }
    };
  });
}
const $$tag = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$tag;
  const { tag } = Astro2.params;
  const { posts } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "CSSLayout", $$CSSLayout, { "pageTitle": tag }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<p>Posts tagged with ${tag}</p> <ul> ${posts.map((post) => renderTemplate`${renderComponent($$result2, "BlogPost", $$BlogPost, { "url": `/posts/${post.id}/`, "title": post.data.title })}`)} </ul> ` })}`;
}, "/Users/bit/Git/github.com/TheBit/learning-web/astro-blog-test/src/pages/tags/[tag].astro", void 0);

const $$file = "/Users/bit/Git/github.com/TheBit/learning-web/astro-blog-test/src/pages/tags/[tag].astro";
const $$url = "/tags/[tag]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$tag,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
