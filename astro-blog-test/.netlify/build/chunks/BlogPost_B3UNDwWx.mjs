import { c as createAstro, a as createComponent, m as maybeRenderHead, e as addAttribute, b as renderTemplate } from './astro/server_md5Jvozh.mjs';
import 'clsx';

const $$Astro = createAstro("https://example.com");
const $$BlogPost = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BlogPost;
  const { url, title } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<li> <a${addAttribute(url, "href")}>${title}</a> </li>`;
}, "/Users/bit/Git/github.com/TheBit/learning-web/astro-blog-test/src/components/BlogPost.astro", void 0);

export { $$BlogPost as $ };
