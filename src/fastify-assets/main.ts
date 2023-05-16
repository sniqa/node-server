import { fastifyHandler } from "#utils/fastify.js";
import cors from "@fastify/cors";
import mongodb from "@fastify/mongodb";
import fastify from "fastify";
import { client } from "../utils/mongodb.js";
import { create_network_group } from "./controller/network_group/create.js";
import { delete_network_group } from "./controller/network_group/delete.js";
import { find_network_group } from "./controller/network_group/find.js";
import { update_network_group } from "./controller/network_group/update.js";

import { find_ip_address } from "./controller/ip_address/find.js";
import { QeuryOptions } from "#types/common.js";

const app = fastify({ logger: true });

app.register(cors);

app.register(mongodb, {
  client,
});

app.post("/create_network_group", fastifyHandler(create_network_group));

app.post("/update_network_group", fastifyHandler(update_network_group));

app.post("/delete_network_group", fastifyHandler(delete_network_group));

app.post(
  "/find_network_group",
  fastifyHandler((body) => find_network_group(...(body as [any, QeuryOptions])))
);

app.post(
  "/find_ip_address",
  fastifyHandler((body) => find_ip_address(...(body as [any, QeuryOptions])))
);

app.listen({ port: 8100 });
