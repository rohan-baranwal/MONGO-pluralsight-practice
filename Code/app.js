const mongoClient = require("mongodb").MongoClient;
const circulationRepo = require("./repos/circulationRepo");
const circulationData = require("./circulation.json");
const assert = require("assert");

const url = "mongodb://localhost:27017/";
const dbName = "circulation";

async function main() {
  const client = new mongoClient(url);
  await client.connect();

  try {
    const results = await circulationRepo.loadData(circulationData);
    assert.equal(circulationData.length, results.insertedCount);

    const getData = await circulationRepo.get();
    assert.equal(circulationData.length, getData.length);

    const filterData = await circulationRepo.get({
      Newspaper: getData[4].Newspaper,
    });
    assert.deepEqual(filterData[0], getData[4]);

    const limitData = await circulationRepo.get({}, 3);
    assert.equal(limitData.length, 3);

    const id = getData[4]._id;
    const getById = await circulationRepo.getById(id);
    assert.deepEqual(getById, getData[4]);

    const newItem = {
      Newspaper: "Wall Street Journal",
      "Daily Circulation, 2004": 2124,
      "Daily Circulation, 2013": 2372,
      "Change in Daily Circulation, 2004-2013": 137,
      "Pulitzer Prize Winners and Finalists, 1990-2003": 80,
      "Pulitzer Prize Winners and Finalists, 2004-2014": 20,
      "Pulitzer Prize Winners and Finalists, 1990-2014": 50,
    };
    const addItem = await circulationRepo.add(newItem);
    assert(addItem.insertedId);

    const updateItem = await circulationRepo.update(addItem.insertedId.toString(), {
      Newspaper: "Bro Street Kernel",
      "Daily Circulation, 2004": 2124,
      "Daily Circulation, 2013": 2372,
      "Change in Daily Circulation, 2004-2013": 137,
      "Pulitzer Prize Winners and Finalists, 1990-2003": 80,
      "Pulitzer Prize Winners and Finalists, 2004-2014": 20,
      "Pulitzer Prize Winners and Finalists, 1990-2014": 50,
    });
    assert(updateItem.Newspaper, "Bro Street Kernel");
  } catch (error) {
    console.log(error);
  } finally {
    const admin = client.db(dbName).admin();

    await client.db(dbName).dropDatabase();
    console.log(await admin.listDatabases());

    client.close();
  }
}

main();
