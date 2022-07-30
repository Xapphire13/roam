import MessageType from "./MessageType";

export default function serializeMessage(type: MessageType, payload: unknown) {
  const payloadBuffer = (() => {
    if (Array.isArray(payload)) {
      const first = payload[0];

      if (typeof first === "number") {
        return Int32Array.from(payload).buffer;
      }
    }

    return new ArrayBuffer(0);
  })();

  const buf = new ArrayBuffer(2 + payloadBuffer.byteLength);
  const view = new DataView(buf);
  const payloadView = new DataView(payloadBuffer);

  view.setUint16(0, type);

  const offset = 2;
  for (let i = 0; i < payloadView.byteLength; i++) {
    view.setUint8(offset + i, payloadView.getUint8(i));
  }

  return buf;
}
