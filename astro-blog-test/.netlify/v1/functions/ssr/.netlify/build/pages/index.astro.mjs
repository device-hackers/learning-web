import { c as createAstro, a as createComponent, e as addAttribute, g as renderHead, r as renderComponent, f as renderSlot, h as renderScript, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_md5Jvozh.mjs';
import { $ as $$Header, a as $$Footer } from '../chunks/Footer_rUo3D7T_.mjs';
/* empty css                                 */
import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cva } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import Autoplay from 'embla-carousel-autoplay';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro("https://example.com");
const $$TailwindLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$TailwindLayout;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" href="/favicon.ico"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${Astro2.props.title}</title>${renderHead()}</head> <body> ${renderComponent($$result, "Header", $$Header, {})} ${renderSlot($$result, $$slots["default"])} ${renderScript($$result, "/Users/bit/Git/github.com/TheBit/learning-web/astro-blog-test/src/layouts/TailwindLayout.astro?astro&type=script&index=0&lang.ts")} ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/Users/bit/Git/github.com/TheBit/learning-web/astro-blog-test/src/layouts/TailwindLayout.astro", void 0);

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      "data-variant": variant,
      "data-size": size,
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}

const CarouselContext = React.createContext(null);
function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}
function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y"
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const onSelect = React.useCallback((api2) => {
    if (!api2) return;
    setCanScrollPrev(api2.canScrollPrev());
    setCanScrollNext(api2.canScrollNext());
  }, []);
  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);
  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);
  const handleKeyDown = React.useCallback(
    (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );
  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);
  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);
  return /* @__PURE__ */ jsx(
    CarouselContext.Provider,
    {
      value: {
        carouselRef,
        api,
        opts,
        orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext
      },
      children: /* @__PURE__ */ jsx(
        "div",
        {
          onKeyDownCapture: handleKeyDown,
          className: cn("relative", className),
          role: "region",
          "aria-roledescription": "carousel",
          "data-slot": "carousel",
          ...props,
          children
        }
      )
    }
  );
}
function CarouselContent({ className, ...props }) {
  const { carouselRef, orientation } = useCarousel();
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: carouselRef,
      className: "overflow-hidden",
      "data-slot": "carousel-content",
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: cn(
            "flex",
            orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
            className
          ),
          ...props
        }
      )
    }
  );
}
function CarouselItem({ className, ...props }) {
  const { orientation } = useCarousel();
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "group",
      "aria-roledescription": "slide",
      "data-slot": "carousel-item",
      className: cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      ),
      ...props
    }
  );
}
function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon",
  ...props
}) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  return /* @__PURE__ */ jsxs(
    Button,
    {
      "data-slot": "carousel-previous",
      variant,
      size,
      className: cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal" ? "top-1/2 -left-12 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      ),
      disabled: !canScrollPrev,
      onClick: scrollPrev,
      ...props,
      children: [
        /* @__PURE__ */ jsx(ArrowLeft, {}),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Previous slide" })
      ]
    }
  );
}
function CarouselNext({
  className,
  variant = "outline",
  size = "icon",
  ...props
}) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  return /* @__PURE__ */ jsxs(
    Button,
    {
      "data-slot": "carousel-next",
      variant,
      size,
      className: cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal" ? "top-1/2 -right-12 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      ),
      disabled: !canScrollNext,
      onClick: scrollNext,
      ...props,
      children: [
        /* @__PURE__ */ jsx(ArrowRight, {}),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Next slide" })
      ]
    }
  );
}

function ReactCarousel({ items, autoplay }) {
  const [api, setApi] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const plugins = autoplay ? [
    Autoplay({
      delay: autoplay,
      stopOnInteraction: false,
      stopOnMouseEnter: true
    })
  ] : [];
  const scrollTo = useCallback((index) => api?.scrollTo(index), [api]);
  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };
    const onReInit = () => {
      setScrollSnaps(api.scrollSnapList());
      onSelect();
    };
    onReInit();
    api.on("select", onSelect);
    api.on("reInit", onReInit);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onReInit);
    };
  }, [api]);
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxs(
      Carousel,
      {
        opts: {
          align: "start",
          loop: true
        },
        plugins,
        className: "w-full",
        setApi,
        children: [
          /* @__PURE__ */ jsx(CarouselContent, { className: "-ml-2 md:-ml-4", children: (items || ["1", "2", "3", "4", "5", "6"]).map((item, index) => /* @__PURE__ */ jsx(CarouselItem, { className: "pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3", children: /* @__PURE__ */ jsx("div", { className: "min-h-[200px] md:min-h-[300px] bg-slate-100 rounded-xl flex items-center justify-center text-6xl font-bold text-slate-400 hover:bg-slate-200 transition-colors", children: item }) }, index)) }),
          /* @__PURE__ */ jsx(CarouselPrevious, {}),
          /* @__PURE__ */ jsx(CarouselNext, {})
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center justify-center gap-2", children: scrollSnaps.map((_, index) => {
      const isActive = index === selectedIndex;
      return /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          "aria-label": `Go to slide ${index + 1}`,
          "aria-current": isActive ? "true" : void 0,
          onClick: () => scrollTo(index),
          className: `size-2 rounded-full transition-all ${isActive ? "bg-primary scale-125" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"}`
        },
        index
      );
    }) })
  ] });
}

const $$Astro = createAstro("https://example.com");
const $$Carousel = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Carousel;
  const { id, autoplay, items = ["1", "2", "3", "4", "5", "6"] } = Astro2.props;
  const normalizedId = id.toLowerCase().replace(/[^a-z0-9_-]/g, "-");
  const carouselAnchor = `--css-carousel-${normalizedId}`;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(id, "id")}${addAttribute([
    "carousel relative flex overflow-x-auto scroll-smooth snap-x snap-mandatory pt-4",
    "-ml-2 md:-ml-4"
  ], "class:list")}${addAttribute(`--carousel-anchor: ${carouselAnchor};`, "style")} data-carousel${addAttribute(autoplay, "data-autoplay")} data-astro-cid-beja5f4g> ${items.map((item) => renderTemplate`<div${addAttribute([
    "carousel-item",
    "min-w-0 shrink-0 grow-0 basis-full pl-2 md:pl-4",
    "md:basis-1/2 lg:basis-1/3",
    "snap-center [scroll-snap-stop:always]"
  ], "class:list")} data-astro-cid-beja5f4g> <div class="min-h-[200px] md:min-h-[300px] bg-slate-100 rounded-xl flex items-center justify-center text-6xl font-bold text-slate-400 hover:bg-slate-200 transition-colors" data-astro-cid-beja5f4g> ${item} </div> </div>`)} </div> <div class="react-carousel-fallback" data-astro-cid-beja5f4g> ${renderComponent($$result, "CarouselReact", ReactCarousel, { "items": items, "autoplay": autoplay, "client:unless-supports": "selector(::scroll-button(left))", "client:component-hydration": "unless-supports", "client:component-path": "/Users/bit/Git/github.com/TheBit/learning-web/astro-blog-test/src/components/Carousel/CarouselReact.jsx", "client:component-export": "default", "data-astro-cid-beja5f4g": true })} </div> `;
}, "/Users/bit/Git/github.com/TheBit/learning-web/astro-blog-test/src/components/Carousel/Carousel.astro", void 0);

function Greeting({ messages }) {
  const randomMessage = () => messages[Math.floor(Math.random() * messages.length)];
  const [greeting, setGreeting] = useState(messages[0]);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("h3", { children: [
      greeting,
      "! Thank you for visiting!"
    ] }),
    /* @__PURE__ */ jsx("button", { onClick: () => setGreeting(randomMessage()), children: "New Greeting" })
  ] });
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const pageTitle = "Home";
  return renderTemplate`${renderComponent($$result, "TailwindLayout", $$TailwindLayout, { "title": pageTitle }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container mx-auto px-4 py-8 space-y-12"> ${renderComponent($$result2, "Greeting", Greeting, { "client:load": true, "messages": ["Hi", "Hello", "Howdy", "Hey there"], "client:component-hydration": "load", "client:component-path": "@/components/Greeting", "client:component-export": "default" })} ${renderComponent($$result2, "Carousel", $$Carousel, { "id": "carousel-home-1", "items": ["1", "2", "3", "4", "5", "6"], "autoplay": 4e3 })} ${renderComponent($$result2, "Carousel", $$Carousel, { "id": "carousel-home-2", "items": ["A", "B", "C", "D"] })} </main> ` })}`;
}, "/Users/bit/Git/github.com/TheBit/learning-web/astro-blog-test/src/pages/index.astro", void 0);

const $$file = "/Users/bit/Git/github.com/TheBit/learning-web/astro-blog-test/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
