import express from "express";
import cors from "cors";
import expressWs from "express-ws";
import TestChunk from "./TestChunk";
import serializeMessage from "./serializeMessage";
import MessageType from "./MessageType";

const { app } = expressWs(express());
const port = 3000;

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.get("/chunks", (_req, res) => {
  res.send({
    chunks: [TestChunk],
  });
});

app.ws("/", (ws) => {
  ws.on("message", (data) => {
    console.log("Message", data);
  });

  ws.send(serializeMessage(MessageType.TEST, [1, 2, 3]));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
