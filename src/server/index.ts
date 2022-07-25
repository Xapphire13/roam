import express from "express";
import cors from "cors";
import expressWs from "express-ws";
import TestChunk from "./TestChunk";

const app = express();
expressWs(app);
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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
