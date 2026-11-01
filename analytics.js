/* Google Analytics 4, loaded only after the visitor accepts analytics cookies. */
(function () {
  var GA_ID = 'G-MST92ZGEVT';
  var KEY = 'ne_analytics_consent';

  function getChoice() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function setChoice(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }

  var loaded = false;
  function loadGA() {
    if (loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { anonymize_ip: true });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }

  // Lets pages record an event (for example a form submission) when analytics is on.
  window.neTrack = function (name, params) {
    if (loaded && window.gtag) window.gtag('event', name, params || {});
  };

  function showBanner() {
    var css = document.createElement('style');
    // A slim bar along the bottom: short on phones so it never hides the
    // page's main button for long, brand colours, 44px buttons.
    css.textContent =
      '.ne-consent{position:fixed;left:0;right:0;bottom:0;z-index:1000;background:#0f172a;color:#e6eaf5;' +
      'border-top:1px solid rgba(34,211,238,.35);padding:12px 16px;font:14px/1.45 Inter,system-ui,sans-serif}' +
      '.ne-consent .in{max-width:1180px;margin:0 auto;display:flex;align-items:center;gap:12px 20px;flex-wrap:wrap}' +
      '.ne-consent p{margin:0;flex:1 1 320px}.ne-consent a{color:#22d3ee}' +
      '.ne-consent .row{display:flex;gap:8px}' +
      '.ne-consent button{font:600 14px Inter,system-ui,sans-serif;border-radius:10px;padding:0 16px;min-height:44px;cursor:pointer}' +
      '.ne-consent .yes{background:#22d3ee;color:#0f172a;border:1px solid #22d3ee}' +
      '.ne-consent .no{background:transparent;color:#e6eaf5;border:1px solid rgba(230,234,245,.45)}' +
      '.ne-consent button:focus-visible{outline:2px solid #22d3ee;outline-offset:2px}' +
      '@media (max-width:560px){.ne-consent{padding:10px 12px;font-size:13px}.ne-consent p{flex-basis:100%}.ne-consent .row{width:100%}.ne-consent button{flex:1}}';
    document.head.appendChild(css);

    var box = document.createElement('div');
    box.className = 'ne-consent';
    box.setAttribute('role', 'region');
    box.setAttribute('aria-label', 'Cookie choice');
    box.innerHTML =
      '<div class="in"><p>We use Google Analytics cookies only if you allow it. ' +
      'See our <a href="/privacy.html">Privacy Policy</a>.</p>' +
      '<div class="row"><button type="button" class="yes">Allow analytics</button>' +
      '<button type="button" class="no">No thanks</button></div></div>';
    // First in the page, so keyboard users reach the choice right after the
    // skip link instead of after every other link.
    var skip = document.querySelector('.skip-link');
    document.body.insertBefore(box, skip ? skip.nextSibling : document.body.firstChild);

    box.querySelector('.yes').addEventListener('click', function () {
      setChoice('granted'); box.remove(); loadGA();
    });
    box.querySelector('.no').addEventListener('click', function () {
      setChoice('denied'); box.remove();
    });
  }

  function init() {
    var choice = getChoice();
    if (choice === 'granted') loadGA();
    else if (choice !== 'denied') showBanner();
  }

  // A "Cookie settings" link anywhere on the page reopens the choice.
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-cookie-settings]');
    if (!t) return;
    e.preventDefault();
    try { localStorage.removeItem(KEY); } catch (err) {}
    if (!document.querySelector('.ne-consent')) showBanner();
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
