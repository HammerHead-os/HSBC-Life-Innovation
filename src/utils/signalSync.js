import Peer from 'peerjs';
import {
  isBroadcastReady,
  publishBroadcast,
  startBroadcastPublisher,
  subscribeBroadcast,
} from './signalBroadcast';

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

/** Signals console — cloud broadcast + optional direct peer backup. */
export function startSignalRelay(onStatus) {
  let broadcastStatus = 'connecting';
  let peerStatus = 'connecting';
  let phoneCount = 0;

  const emit = () => {
    onStatus?.({
      broadcast: broadcastStatus,
      peer: peerStatus,
      phoneCount,
    });
  };

  const stopBroadcast = startBroadcastPublisher(POSTER_ROOM, (status) => {
    broadcastStatus = status;
    emit();
  });
  const stopPeer = startSignalHub((status, count = 0) => {
    peerStatus = status;
    phoneCount = count;
    emit();
  });

  return () => {
    stopBroadcast();
    stopPeer();
  };
}

function startSignalHub(onStatus) {
  if (hubPeer) {
    onStatus?.(hubReady ? 'ready' : 'connecting', hubConnections.size);
    return stopSignalHub;
  }

  hubPeer = new Peer(peerIdForRoom(), { debug: 0 });

  hubPeer.on('open', () => {
    hubReady = true;
    onStatus?.('ready', hubConnections.size);
  });

  const dropConn = (conn) => {
    hubConnections.delete(conn);
    onStatus?.('ready', hubConnections.size);
  };

  hubPeer.on('connection', (conn) => {
    conn.on('open', () => {
      hubConnections.add(conn);
      onStatus?.('ready', hubConnections.size);
    });
    conn.on('close', () => dropConn(conn));
    conn.on('error', () => dropConn(conn));
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

function parseSignalPayload(data) {
  if (!data) return null;
  const payload = typeof data === 'string' ? JSON.parse(data) : data;
  return payload?.scenarioId ? payload : null;
}

/** Phone / web app — cloud broadcast (primary) + direct peer (backup). */
export function subscribeRemoteSignals(room, onPayload, onStatus) {
  let broadcastStatus = 'connecting';
  let peerStatus = 'connecting';

  const emit = () => {
    const ready = broadcastStatus === 'ready' || peerStatus === 'ready';
    const error = broadcastStatus === 'error' && peerStatus === 'error';
    onStatus?.(ready ? 'ready' : error ? 'error' : 'connecting');
  };

  const stopBroadcast = subscribeBroadcast(room, onPayload, (status) => {
    broadcastStatus = status;
    emit();
  });
  const stopPeer = subscribePeerSignals(onPayload, (status) => {
    peerStatus = status;
    emit();
  });

  return () => {
    stopBroadcast();
    stopPeer();
  };
}

function subscribePeerSignals(onPayload, onStatus) {
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
      conn.on('open', () => {
        onStatus?.('ready');
        try {
          conn.send({ type: 'hello', at: Date.now() });
        } catch {
          // hub only needs inbound; ignore
        }
      });
      conn.on('data', (data) => {
        try {
          const payload = parseSignalPayload(data);
          if (payload) onPayload(payload);
        } catch {
          // ignore malformed payloads
        }
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

  const onVisibility = () => {
    if (document.hidden || destroyed) return;
    if (!conn?.open) scheduleRetry();
  };
  document.addEventListener('visibilitychange', onVisibility);

  return () => {
    destroyed = true;
    document.removeEventListener('visibilitychange', onVisibility);
    clearTimeout(retryTimer);
    conn?.close();
    cleanupPeer();
  };
}

/** Signals console — push a scenario to all connected phones. */
export async function sendRemoteSignal(room, scenarioId) {
  const payload = {
    scenarioId,
    at: Date.now(),
    source: 'signal-console',
  };

  let broadcast = false;
  let peer = 0;

  if (isBroadcastReady()) {
    try {
      await publishBroadcast(room, payload);
      broadcast = true;
    } catch {
      // fall through to peer backup
    }
  }

  if (hubPeer && hubReady) {
    const openConnections = [...hubConnections].filter((conn) => conn.open);
    openConnections.forEach((conn) => {
      try {
        conn.send(payload);
        peer += 1;
      } catch {
        hubConnections.delete(conn);
      }
    });
  }

  if (!broadcast && peer === 0) {
    if (!isBroadcastReady() && (!hubPeer || !hubReady)) {
      throw new Error('Relay not ready — reload signal console and check Wi‑Fi');
    }
    throw new Error('Send failed — use Standby tap URLs below or reload phones');
  }

  return { payload, broadcast, peer };
}
