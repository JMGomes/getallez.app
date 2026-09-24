/* The motion on the landing page.
 *
 * The stylesheet does all of the animating. This file does two things. It
 * adds the "motion" class to the root element, which is what lets the
 * stylesheet hide a block before it arrives, and it adds the "in" class when
 * a block reaches the viewport.
 *
 * Nothing hides unless this file runs. A reader who asked for less motion
 * never gets the class, a browser without IntersectionObserver never gets it,
 * and a failed request never gets it. In each of those cases the page is the
 * page it was before any of this existed. The file loads in the head without
 * defer, so the class reaches the root element before the first paint and no
 * block ever flashes into view and then hides itself. */
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;

  document.documentElement.classList.add('motion');

  function start() {
    var blocks = document.querySelectorAll('[data-reveal]');
    if (!blocks.length) return;

    // A block counts as arrived when its top edge passes 90% of the way down
    // the viewport. The reader sees it start to move before they reach it.
    var seen = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (!entries[i].isIntersecting) continue;
        entries[i].target.classList.add('in');
        seen.unobserve(entries[i].target);
      }
    }, { rootMargin: '0px 0px -10% 0px' });

    for (var j = 0; j < blocks.length; j++) seen.observe(blocks[j]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
