const { MongoClient } = require('mongodb');

const _uri = "mongodb+srv://layal:gaza1234@cluster0.w1nqsqf.mongodb.net/?retryWrites=true&w=majority";

const dbConnection = async (collection, cb) => {
  const client = new MongoClient(_uri);

  try {
    await client.connect();
    const db = client.db('nodejs_project').collection(collection);
    const result = await cb(db);
    return result;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  } finally {
    await client.close();
  }
};

module.exports = dbConnection;
