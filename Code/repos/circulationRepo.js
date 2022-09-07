const { MongoClient } = require("mongodb");

function circulationRepo() {
  const url = "mongodb://localhost:27017/";
  const dbName = "circulation";
  function loadData(data) {
    return new Promise((resolve, reject) => {
      const client = new MongoClient(url);
    });
  }

  return { loadData };
}

module.exports = circulationRepo();
