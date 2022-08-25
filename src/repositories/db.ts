import { MongoClient } from "mongodb";
import logger from "../logger";

const dbUrl = process.env.DB_URL;

if (!dbUrl) {
    throw new Error("DB url not provided");
}

const client = new MongoClient(dbUrl);

export default client;

export async function connect() {
    await client.connect();
    logger.info("DB connected successfully");
}

export async function disconnect() {
    await client.close();
    logger.info("DB disconnected successfully");
}

