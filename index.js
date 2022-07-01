const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.tinoa.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();

    const itemsCollections = client.db("to-do").collection("items");

    app.post("/todoList", async (req, res) => {
      const newList = req.body;
      const result = await itemsCollections.insertOne(newList);
      res.send(result);
    });

    app.get("/todoList", async (req, res) => {
      const result = await itemsCollections.find().toArray();
      res.send(result);
    });
        app.get('/todoList/:id', async (req, res) => {
              const id = req.params.id
              const query = {_id: ObjectId(id) }
              const result = await itemsCollections.findOne(query)
              res.send(result)
    })
        
        
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`to do app listing or port ${port}`);
});
