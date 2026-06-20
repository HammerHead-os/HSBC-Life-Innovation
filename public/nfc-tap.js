(function () {
  const SIGNAL_KEY = 'mpf-external-signal';
  const PENDING_KEY = 'mpf-pending-tap';
  const ANIM_FROM_KEY = 'mpf-anim-from';
  const PRESENCE = 'mpf-app-presence';
  const VALID = new Set([
    'helloride', 'bus', 'mtr_gate', 'hsr_card', 'hsr_gate', 'flight_card', 'flight_gate',
    'black_rain', 'fire', 'tornado', 'tokyo', 'keeta', 'guangzhou', 'typhoon', 'climbing',
  ]);

  function readTap() {
    const params = new URLSearchParams(location.search);
    const fromQuery = params.get('tap');
    if (fromQuery && VALID.has(fromQuery)) return fromQuery;
    const hashMatch = location.hash.match(/\/tap\/([^/?]+)/);
    if (hashMatch && VALID.has(hashMatch[1])) return hashMatch[1];
    return null;
  }

  function saveAnimFrom() {
    try {
      const raw = localStorage.getItem('mpf-protection');
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data.scenarioId) sessionStorage.setItem(ANIM_FROM_KEY, data.scenarioId);
    } catch (_) {
      // ignore
    }
  }

  function pingAppOpen() {
    return new Promise((resolve) => {
      let open = false;
      const bc = new BroadcastChannel(PRESENCE);
      bc.onmessage = (e) => {
        if (e.data === 'pong') open = true;
      };
      bc.postMessage('ping');
      window.setTimeout(() => {
        bc.close();
        resolve(open);
      }, 80);
    });
  }

  function exitDuplicateTab() {
    window.__MPF_SKIP_APP__ = true;
    document.documentElement.style.background = '#fafafa';
    if (document.body) document.body.innerHTML = '';
    history.back();
    window.setTimeout(() => {
      window.close();
    }, 60);
  }

  /** Returns 'duplicate' (signaled other tab, exiting) or 'cold' (load app here). */
  window.__MPF_RUN_NFC_TAP__ = function runNfcTap() {
    const tap = readTap();
    if (!tap) return Promise.resolve('none');

    return pingAppOpen().then((appOpen) => {
      if (appOpen) {
        localStorage.setItem(
          SIGNAL_KEY,
          JSON.stringify({ scenarioId: tap, at: Date.now(), source: 'nfc' }),
        );
        exitDuplicateTab();
        return 'duplicate';
      }

      sessionStorage.setItem(PENDING_KEY, tap);
      saveAnimFrom();
      history.replaceState(null, '', location.pathname);
      return 'cold';
    });
  };
})();
