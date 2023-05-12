import fastify from "fastify";
import cors from "@fastify/cors";
import mongodb from "@fastify/mongodb";
import { client } from "../utils/mongodb.js";
import { create_account } from "./controllers/create.js";
import { faildResult2 } from "#utils/response.js";

const app = fastify({ logger: true });

app.register(cors);

app.register(mongodb, {
  client,
});

app.post("/create_account", async (req, res) => {
  const body = req.body;

  const result = await create_account(body as any).catch((res) =>
    faildResult2(res)
  );

  res.send(result);
});

app.listen({ port: 8000 });
