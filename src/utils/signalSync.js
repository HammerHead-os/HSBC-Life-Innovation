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

let hubPeer = null;
let hubConnections = new Set();
let hubReady = false;

/** Signals console — host the fixed peer so phones connect outbound (more reliable on mobile). */
export function startSignalHub(onStatus) {
  if (hubPeer) {
    onStatus?.(hubReady ? 'ready' : 'connecting', hubConnections.size);
    return stopSignalHub;
  }

  hubPeer = new Peer(peerIdForRoom(), { debug: 0 });

  hubPeer.on('open', () => {
    hubReady = true;
    onStatus?.('ready', hubConnections.size);
  });

  hubPeer.on('connection', (conn) => {
    hubConnections.add(conn);
    onStatus?.('ready', hubConnections.size);

    conn.on('close', () => {
      hubConnections.delete(conn);
      onStatus?.('ready', hubConnections.size);
    });
    conn.on('error', () => {
      hubConnections.delete(conn);
      onStatus?.('ready', hubConnections.size);
    });
  });

  hubPeer.on('error', () => {
    hubReady = false;
    onStatus?.('error', hubConnections.size);
  });

  hubPeer.on('disconnected', () => {
    hubReady = false;
    if (hubPeer && !hubPeer.destroyed) hubPeer.reconnect();
  });

  return stopSignalHub;
}

function stopSignalHub() {
  hubConnections.forEach((conn) => conn.close());
  hubConnections.clear();
  hubPeer?.destroy();
  hubPeer = null;
  hubReady = false;
}

export function getHubPhoneCount() {
  return hubConnections.size;
}

/** Phone / web app — connect to the presenter's signal hub and listen. */
export function subscribeRemoteSignals(_room, onPayload, onStatus) {
  let destroyed = false;
  let peer = null;
  let conn = null;
  let retryTimer = null;

  const cleanupPeer = () => {
    conn = null;
    peer?.destroy();
    peer = null;
  };

  const scheduleRetry = () => {
    if (destroyed) return;
    clearTimeout(retryTimer);
    cleanupPeer();
    onStatus?.('connecting');
    retryTimer = setTimeout(connect, 2000);
  };

  const connect = () => {
    if (destroyed) return;
    onStatus?.('connecting');

    peer = new Peer({ debug: 0 });

    peer.on('open', () => {
      if (destroyed) return;
      conn = peer.connect(peerIdForRoom(), { reliable: true });
      conn.on('open', () => onStatus?.('ready'));
      conn.on('data', (data) => {
        if (data?.scenarioId) onPayload(data);
      });
      conn.on('close', scheduleRetry);
      conn.on('error', scheduleRetry);
    });

    peer.on('error', () => {
      onStatus?.('error');
      scheduleRetry();
    });

    peer.on('disconnected', () => {
      if (!destroyed && peer && !peer.destroyed) peer.reconnect();
    });
  };

  connect();

  return () => {
    destroyed = true;
    clearTimeout(retryTimer);
    conn?.close();
    cleanupPeer();
  };
}

/** Signals console — push a scenario to connected phones. */
export function sendRemoteSignal(_room, scenarioId) {
  const payload = {
    scenarioId,
    at: Date.now(),
    source: 'signal-console',
  };

  if (!hubPeer || !hubReady) {
    return Promise.reject(new Error('Signal hub not ready — reload this page'));
  }

  if (hubConnections.size === 0) {
    return Promise.reject(
      new Error('No phone connected — friend opens poster QR → Mobile App → log in and keep open'),
    );
  }

  hubConnections.forEach((conn) => {
    if (conn.open) conn.send(payload);
  });

  return Promise.resolve(payload);
}
