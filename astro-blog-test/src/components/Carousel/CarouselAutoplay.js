/**
 * Global autoplay for CSS-only carousels.
 * Does NOT target React carousels (they handle autoplay internally).
 */
function initCarouselAutoplay(options) {
  const defaultOptions = {
    pauseOnHover: true,
    pauseOnFocus: true,
    respectReducedMotion: true,
  };

  const config = { ...defaultOptions, ...options };

  // Respect prefers-reduced-motion
  if (config.respectReducedMotion && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    console.log('[CarouselAutoplay] Disabled due to prefers-reduced-motion');
    return;
  }

  // Only target CSS carousels with data-autoplay attribute
  const carousels = document.querySelectorAll('[data-carousel][data-autoplay]');

  carousels.forEach((carousel) => {
    const autoplayDelay = parseInt(carousel.dataset.autoplay || '4000', 10);

    if (isNaN(autoplayDelay) || autoplayDelay <= 0) return;

    let timer = null;
    let isPaused = false;

    const start = () => {
      if (isPaused) return;

      timer = window.setInterval(() => {
        const scrollPosition = carousel.scrollLeft;
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        const itemWidth =
          carousel.querySelector('.carousel-item')?.clientWidth || carousel.clientWidth;

        // Check if at end, reset to start
        if (scrollPosition >= maxScroll - 10) {
          carousel.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carousel.scrollBy({ left: itemWidth, behavior: 'smooth' });
        }
      }, autoplayDelay);
    };

    const stop = () => {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    };

    const pause = () => {
      isPaused = true;
      stop();
    };

    const resume = () => {
      isPaused = false;
      start();
    };

    // Pause on hover
    if (config.pauseOnHover) {
      carousel.addEventListener('mouseenter', pause);
      carousel.addEventListener('mouseleave', resume);
    }

    // Pause on focus (keyboard navigation)
    if (config.pauseOnFocus) {
      carousel.addEventListener('focusin', pause);
      carousel.addEventListener('focusout', resume);
    }

    // Handle visibility change (tab switching)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stop();
      } else if (!isPaused) {
        start();
      }
    });

    // Start autoplay
    start();

    // Store cleanup function on element for potential manual cleanup
    carousel.__carouselAutoplayCleanup = () => {
      stop();
      carousel.removeEventListener('mouseenter', pause);
      carousel.removeEventListener('mouseleave', resume);
      carousel.removeEventListener('focusin', pause);
      carousel.removeEventListener('focusout', resume);
    };
  });
}
  
export { initCarouselAutoplay };
