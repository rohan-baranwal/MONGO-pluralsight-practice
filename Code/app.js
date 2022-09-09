const mongoClient = require("mongodb").MongoClient;
const circulationRepo = require("./repos/circulationRepo");
const circulationData = require("./circulation.json");

const url = "mongodb://localhost:27017/";
const dbName = "circulation";

async function main() {
  const client = new mongoClient(url);
  await client.connect();

  const results = await circulationRepo.loadData(circulationData);
  const admin = client.db(dbName).admin();
  console.log(results.insertedCount, results.ops);
  // console.log(await admin.serverStatus());
  console.log(await admin.listDatabases());
}

main();
