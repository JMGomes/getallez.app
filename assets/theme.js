/* The theme toggle.
 *
 * The file loads in the head without defer, so the saved theme reaches the
 * root element before the first paint and the page never flashes the wrong
 * one. The CSS decides the colours; this only sets the attribute, keeps the
 * choice, and tells the browser which colour to tint its own chrome. */
(function () {
  var KEY = 'allez-theme';
  var root = document.documentElement;
  var DARK = '#0F1115';
  var LIGHT = '#F4F4F2';

  function saved() {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      // Private mode and blocked site data both throw here.
      return null;
    }
  }

  function systemPrefersDark() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function apply(theme) {
    if (theme === 'dark' || theme === 'light') {
      root.setAttribute('data-theme', theme);
    } else {
      root.removeAttribute('data-theme');
    }
    var dark = theme ? theme === 'dark' : systemPrefersDark();
    // The two theme-color tags carry a media query for readers without
    // JavaScript. An explicit choice overrides both.
    if (theme) {
      var tags = document.querySelectorAll('meta[name="theme-color"]');
      for (var i = 0; i < tags.length; i++) {
        tags[i].removeAttribute('media');
        tags[i].setAttribute('content', dark ? DARK : LIGHT);
      }
    }
    var buttons = document.querySelectorAll('.theme-toggle');
    for (var j = 0; j < buttons.length; j++) {
      buttons[j].setAttribute(
        'aria-label',
        dark ? 'Switch to the light theme' : 'Switch to the dark theme'
      );
    }
  }

  // Before the first paint. The buttons do not exist yet, which is fine.
  apply(saved());

  document.addEventListener('DOMContentLoaded', function () {
    apply(saved());
  });

  document.addEventListener('click', function (event) {
    var button = event.target.closest && event.target.closest('.theme-toggle');
    if (!button) return;
    var dark = root.getAttribute('data-theme') === 'dark' ||
      (!root.hasAttribute('data-theme') && systemPrefersDark());
    var next = dark ? 'light' : 'dark';
    try {
      localStorage.setItem(KEY, next);
    } catch (e) {
      // The choice then lasts for this page only.
    }
    apply(next);
  });

  // Follow the system again while the reader has made no choice.
  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', function () {
      if (!saved()) apply(null);
    });
})();
