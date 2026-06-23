import mqtt from 'mqtt';

/** Public WSS broker — works from HTTPS GitHub Pages on café / venue Wi‑Fi. */
const BROKER_URL = 'wss://broker.hivemq.com:8884/mqtt';

function topicForRoom(room) {
  return `mpf/${room}/signal`;
}

function clientId(prefix, room) {
  return `${prefix}-${room}-${Math.random().toString(36).slice(2, 10)}`;
}

let publisher = null;
let publisherReady = false;

/** Signals console — connect once and publish to every subscribed phone. */
export function startBroadcastPublisher(room, onStatus) {
  if (publisher) {
    onStatus?.(publisherReady ? 'ready' : 'connecting');
    return stopBroadcastPublisher;
  }

  publisher = mqtt.connect(BROKER_URL, {
    clientId: clientId('mpf-pub', room),
    clean: true,
    reconnectPeriod: 2000,
    connectTimeout: 12000,
  });

  publisher.on('connect', () => {
    publisherReady = true;
    onStatus?.('ready');
  });
  publisher.on('reconnect', () => {
    publisherReady = false;
    onStatus?.('connecting');
  });
  publisher.on('offline', () => {
    publisherReady = false;
    onStatus?.('connecting');
  });
  publisher.on('error', () => onStatus?.('error'));

  return stopBroadcastPublisher;
}

function stopBroadcastPublisher() {
  publisher?.end(true);
  publisher = null;
  publisherReady = false;
}

export function isBroadcastReady() {
  return Boolean(publisher && publisherReady);
}

export function publishBroadcast(room, payload) {
  return new Promise((resolve, reject) => {
    if (!publisher || !publisherReady) {
      reject(new Error('Cloud relay not ready'));
      return;
    }
    publisher.publish(topicForRoom(room), JSON.stringify(payload), { qos: 1 }, (err) => {
      if (err) reject(err);
      else resolve(payload);
    });
  });
}

/** Phone / web app — subscribe to the shared demo channel (unlimited listeners). */
export function subscribeBroadcast(room, onPayload, onStatus) {
  let destroyed = false;
  const client = mqtt.connect(BROKER_URL, {
    clientId: clientId('mpf-sub', room),
    clean: true,
    reconnectPeriod: 2000,
    connectTimeout: 12000,
  });

  client.on('connect', () => {
    if (destroyed) return;
    client.subscribe(topicForRoom(room), { qos: 1 }, (err) => {
      if (destroyed) return;
      onStatus?.(err ? 'error' : 'ready');
    });
  });
  client.on('message', (_topic, buf) => {
    try {
      const payload = JSON.parse(buf.toString());
      if (payload?.scenarioId) onPayload(payload);
    } catch {
      // ignore malformed payloads
    }
  });
  client.on('reconnect', () => {
    if (!destroyed) onStatus?.('connecting');
  });
  client.on('offline', () => {
    if (!destroyed) onStatus?.('connecting');
  });
  client.on('error', () => {
    if (!destroyed) onStatus?.('error');
  });

  const onVisibility = () => {
    if (document.hidden || destroyed) return;
    if (!client.connected) client.reconnect();
  };
  document.addEventListener('visibilitychange', onVisibility);

  return () => {
    destroyed = true;
    document.removeEventListener('visibilitychange', onVisibility);
    client.end(true);
  };
}
