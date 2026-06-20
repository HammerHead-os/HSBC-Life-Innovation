(function () {
  const SIGNAL_KEY = 'mpf-external-signal';
  const PENDING_KEY = 'mpf-pending-tap';
  const PRESENCE = 'mpf-app-presence';
  const VALID = new Set([
    'helloride', 'bus', 'mtr_gate', 'hsr_card', 'hsr_gate', 'flight_card', 'flight_gate',
    'black_rain', 'fire', 'tornado', 'tokyo', 'keeta', 'guangzhou', 'typhoon', 'climbing',
  ]);

  function basePath() {
    const match = location.pathname.match(/^(.*\/HSBC-Life-Innovation\/)/);
    return match ? match[1] : '/';
  }

  function readTap() {
    const params = new URLSearchParams(location.search);
    const fromQuery = params.get('tap');
    if (fromQuery && VALID.has(fromQuery)) return fromQuery;
    const hashMatch = location.hash.match(/\/tap\/([^/?]+)/);
    if (hashMatch && VALID.has(hashMatch[1])) return hashMatch[1];
    return null;
  }

  function showSent() {
    const el = document.getElementById('status');
    if (!el) return;
    el.innerHTML =
      '<div class="mark">✓</div>' +
      '<h1>Signal sent</h1>' +
      '<p>Switch back to the app — coverage is updating there.</p>';
  }

  function pingAppOpen() {
    return new Promise((resolve) => {
      let open = false;
      const bc = new BroadcastChannel(PRESENCE);
      bc.onmessage = (e) => {
        if (e.data === 'pong') open = true;
      };
      bc.postMessage('ping');
      setTimeout(() => {
        bc.close();
        resolve(open);
      }, 150);
    });
  }

  async function run() {
    const tap = readTap();
    if (!tap) {
      location.replace(basePath() + 'mobile.html');
      return;
    }

    localStorage.setItem(
      SIGNAL_KEY,
      JSON.stringify({ scenarioId: tap, at: Date.now(), source: 'nfc' }),
    );

    const appOpen = await pingAppOpen();
    if (appOpen) {
      showSent();
      return;
    }

    sessionStorage.setItem(PENDING_KEY, tap);
    location.replace(basePath() + 'mobile.html');
  }

  run();
})();
