import Peer from 'peerjs';

/** Matches the printed poster QR — https://hammerhead-os.github.io/HSBC-Life-Innovation/ */
export const POSTER_URL = 'https://hammerhead-os.github.io/HSBC-Life-Innovation/';
const POSTER_ROOM = 'hsbc-life-innovation';

function peerIdForRoom() {
  return `mpf-sig-${POSTER_ROOM}`;
}

/** Single shared demo channel for everyone on the poster link. */
export function getSignalRoom() {
  return POSTER_ROOM;
}

export function initRoomFromUrl() {
  return POSTER_ROOM;
}

/** Phone / web app — stay open as the listener for the poster demo. */
export function subscribeRemoteSignals(_room, onPayload, onStatus) {
  const peer = new Peer(peerIdForRoom(), { debug: 0 });

  peer.on('open', () => onStatus?.('ready'));
  peer.on('connection', (conn) => {
    conn.on('data', (data) => {
      if (data?.scenarioId) onPayload(data);
    });
  });
  peer.on('error', (err) => onStatus?.('error', err));

  return () => {
    peer.destroy();
  };
}

/** Signals console — push a scenario to phones opened from the poster QR. */
export function sendRemoteSignal(_room, scenarioId) {
  const payload = {
    scenarioId,
    at: Date.now(),
    source: 'signal-console',
  };

  return new Promise((resolve, reject) => {
    const peer = new Peer({ debug: 0 });
    let settled = false;

    const finish = (fn, value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      peer.destroy();
      fn(value);
    };

    const timeout = setTimeout(
      () =>
        finish(
          reject,
          new Error('Phone not reachable — ask them to open Mobile App from the poster QR and keep it open'),
        ),
      8000,
    );

    peer.on('open', () => {
      const conn = peer.connect(peerIdForRoom(), { reliable: true });
      conn.on('open', () => {
        conn.send(payload);
        setTimeout(() => finish(resolve, payload), 400);
      });
      conn.on('error', (err) => finish(reject, err));
    });
    peer.on('error', (err) => finish(reject, err));
  });
}
