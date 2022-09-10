const { MongoClient, ObjectId } = require("mongodb");

function circulationRepo() {
  const url = "mongodb://localhost:27017/";
  const dbName = "circulation";
  const NEWSPAPERS_COLLECTION = "newspapers";
  function loadData(data) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(url);
      try {
        await client.connect();
        const db = client.db(dbName);

        results = await db.collection(NEWSPAPERS_COLLECTION).insertMany(data);
        resolve(results);
      } catch (error) {
        reject(error);
      } finally {
        client.close();
      }
    });
  }

  function get(query, limit) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(url);
      try {
        await client.connect();
        const db = client.db(dbName);

        let results = db.collection(NEWSPAPERS_COLLECTION).find(query);

        if (limit > 0) {
          results = results.limit(limit);
        }

        resolve(await results.toArray());
      } catch (error) {
        reject(error);
      } finally {
        client.close();
      }
    });
  }

  function getById(id) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(url);
      try {
        client.connect();
        db = client.db(dbName);

        results = db
          .collection(NEWSPAPERS_COLLECTION)
          .findOne({ _id: ObjectId(id) });
        resolve(await results);
      } catch (error) {
        reject(error);
      } finally {
        client.close();
      }
    });
  }

  function add(item) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(url);

      try {
        client.connect();
        const db = client.db(dbName);

        const results = await db
          .collection(NEWSPAPERS_COLLECTION)
          .insertOne(item);
        resolve(results);
      } catch (error) {
        reject(error);
      } finally {
        client.close();
      }
    });
  }

  function update(id, item) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(url);

      try {
        client.connect();
        const db = client.db(dbName);

        const results = await db
          .collection(NEWSPAPERS_COLLECTION)
          .findOneAndReplace({ _id: ObjectId(id) }, item, {
            returnOriginal: false,
          });

        resolve(results);
      } catch (error) {
        reject(error);
      } finally {
        client.close();
      }
    });
  }
  return { loadData, get, getById, add, update };
}

module.exports = circulationRepo();
