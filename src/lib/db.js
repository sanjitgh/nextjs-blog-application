import "server-only";
const { MongoClient, ServerApiVersion } = require("mongodb");

////////////////   Connect MongoDB server   //////////////

if (!process.env.DB_URI) {
  throw new Error("Mongo URI not found!");
}

const client = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function getDB(dbName) {
  try {
    await client.connect();
    console.log("database connected");
    return client.db(dbName);
  } catch (err) {
    console.log(err);
  }
}

export async function getCollection(collectionName) {
  const db = await getDB("next_blog_db");
  if (db) return db.collection(collectionName);

  return null;
}
