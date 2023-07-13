const mongoose = require("mongoose");

async function connectToMongoDB(url) {
  return mongoose.connect(url, {
    dbName: "url-shortener",
  });
}

module.exports = {
  connectToMongoDB,
};
