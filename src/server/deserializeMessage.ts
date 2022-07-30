import MessageType from "./MessageType";

export default async function deserializeMessage(data: Blob) {
  const buf = await data.arrayBuffer();
  const view = new DataView(buf);
  const type: MessageType = view.getUint16(0);
  const payload = data.slice(2);

  return { type, payload };
}
