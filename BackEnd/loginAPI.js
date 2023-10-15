const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  // Replace the placeholder with your Atlas connection string
  const uri = `mongodb+srv://${username}:${password}@testcluster.7phucdo.mongodb.net/?retryWrites=true&w=majority`;

  const client = new MongoClient(uri, {
    serverApi: {
      version: "1", // Replace with your desired API version
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    res.status(200).json({ message: "Login success" });
  } catch (error) {
    console.error("Error:", error);
    res.status(401).json({ message: "Login failed" });
  } finally {
    await client.close();
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3001");
});