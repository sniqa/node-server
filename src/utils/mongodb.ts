import { MongoClient } from "mongodb";

export const client = await MongoClient.connect("mongodb://127.0.0.1:27017");

export const connectDb = (dbName: string) => client.db(dbName);
