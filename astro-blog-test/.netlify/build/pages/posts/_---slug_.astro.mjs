import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, e as addAttribute, f as renderSlot } from '../../chunks/astro/server_md5Jvozh.mjs';
import { r as renderEntry, g as getCollection } from '../../chunks/_astro_content_myjIGe_Y.mjs';
import { $ as $$CSSLayout } from '../../chunks/CSSLayout_fIhe_stO.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Astro$1 = createAstro("https://example.com");
const $$MarkdownPostLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$MarkdownPostLayout;
  const { frontmatter } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "CSSLayout", $$CSSLayout, { "pageTitle": frontmatter.title, "data-astro-cid-5grsw2hi": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 data-astro-cid-5grsw2hi>${frontmatter.title}</h1> <p data-astro-cid-5grsw2hi>${frontmatter.pubDate.toLocaleDateString()}</p> <p data-astro-cid-5grsw2hi><em data-astro-cid-5grsw2hi>${frontmatter.description}</em></p> <p data-astro-cid-5grsw2hi>Written by: ${frontmatter.author}</p> <img${addAttribute(frontmatter.image.url, "src")} width="300"${addAttribute(frontmatter.image.alt, "alt")} data-astro-cid-5grsw2hi> <div class="tags" data-astro-cid-5grsw2hi> ${frontmatter.tags.map((tag) => renderTemplate`<p class="tag" data-astro-cid-5grsw2hi><a${addAttribute(`/tags/${tag}`, "href")} data-astro-cid-5grsw2hi>${tag}</a></p>`)} </div> ${renderSlot($$result2, $$slots["default"])} ` })} `;
}, "/Users/bit/Git/github.com/TheBit/learning-web/astro-blog-test/src/layouts/MarkdownPostLayout.astro", void 0);

const $$Astro = createAstro("https://example.com");
async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post }
  }));
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { post } = Astro2.props;
  const { Content } = await renderEntry(post);
  return renderTemplate`${renderComponent($$result, "MarkdownPostLayout", $$MarkdownPostLayout, { "frontmatter": post.data }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Content", Content, {})} ` })}`;
}, "/Users/bit/Git/github.com/TheBit/learning-web/astro-blog-test/src/pages/posts/[...slug].astro", void 0);

const $$file = "/Users/bit/Git/github.com/TheBit/learning-web/astro-blog-test/src/pages/posts/[...slug].astro";
const $$url = "/posts/[...slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
