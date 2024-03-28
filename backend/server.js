const bodyParser = require("body-parser");
const express = require("express");
const { MongoClient, Collection } = require("mongodb");
const app = express();
const cors = require('cors')

require("dotenv").config();

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = "passop";

const port = 3000;
app.use(bodyParser.json())
app.use(cors())

const db = client.db(dbName);

client.connect();

app.get("/", async (req, res) => {
  const collection = db.collection("passwords");
  const ress = await collection.find({}).toArray();
  res.json(ress);
});

app.post("/", async (req, res) => {
  const password = req.body
  const collection = db.collection("passwords");
  const ress = await collection.insertOne(password)
  res.send({success:true, result: ress})
});

app.delete("/", async (req, res) => {
    const password = req.body
    const collection = db.collection("passwords");
    const ress = await collection.deleteOne(password)
    res.send({success:true, result: ress})
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
