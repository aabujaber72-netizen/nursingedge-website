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
    css.textContent =
      '.ne-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:1000;max-width:560px;margin:0 auto;' +
      'background:#16213E;color:#E6EAF5;border:1px solid rgba(34,211,238,.3);border-radius:14px;' +
      'box-shadow:0 18px 50px rgba(0,0,0,.35);padding:18px 20px;font:14px/1.5 Inter,system-ui,sans-serif}' +
      '.ne-consent p{margin:0 0 12px}.ne-consent a{color:#22D3EE}' +
      '.ne-consent .row{display:flex;gap:10px;flex-wrap:wrap}' +
      '.ne-consent button{font:600 14px Inter,system-ui,sans-serif;border-radius:10px;padding:9px 18px;cursor:pointer}' +
      '.ne-consent .yes{background:#4F5FE8;color:#fff;border:1px solid #4F5FE8}' +
      '.ne-consent .no{background:transparent;color:#E6EAF5;border:1px solid rgba(230,234,245,.4)}' +
      '.ne-consent button:focus-visible{outline:2px solid #22D3EE;outline-offset:2px}';
    document.head.appendChild(css);

    var box = document.createElement('div');
    box.className = 'ne-consent';
    box.setAttribute('role', 'region');
    box.setAttribute('aria-label', 'Cookie choice');
    box.innerHTML =
      '<p>We use Google Analytics cookies to see how visitors use this site, only if you allow it. ' +
      'See our <a href="/privacy.html">Privacy Policy</a>.</p>' +
      '<div class="row"><button type="button" class="yes">Allow analytics</button>' +
      '<button type="button" class="no">No thanks</button></div>';
    document.body.appendChild(box);

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
