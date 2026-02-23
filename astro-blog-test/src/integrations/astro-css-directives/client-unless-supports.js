/**
 * Hydrate component only if CSS.supports(condition) returns FALSE
 * 
 * Usage: <Component client:unless-supports="selector(::scroll-button(left))" />
 */
export default (load, options) => {
    const condition = options.value;

    if (typeof condition !== 'string') {
        console.warn('[client:unless-supports] Expected string condition, got:', condition);
        return;
    }

    const hydrate = async () => {
        const isSupported = CSS.supports(condition);

        if (isSupported) return;

        const hydrateFn = await load();
        await hydrateFn();
    };

    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(hydrate);
    } else {
        window.setTimeout(hydrate, 200);
    }
};