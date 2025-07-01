async function connectDB(client) {
    try {
      await client.connect();
      await client.db("admin").command({ ping: 1 });
      console.log("Successfully connected to MongoDB - data");
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  
  module.exports = connectDB;