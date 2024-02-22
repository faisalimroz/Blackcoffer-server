const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 5000;
const cors = require('cors');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tort7uo.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
app.use(cors());
app.use(express.json());


async function run() {
  try {
    await client.connect();
    const dataCollection = client.db('reactchart').collection('data');
    
    app.get('/',async (req,res)=>{
      res.send("hello world")
    })

    app.get('/data', async (req, res) => {
      try {
        const economicInfo = await dataCollection.find().toArray();
     
        res.json(economicInfo);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve economicInfo' });
      }
    });
    
  } finally {
  }
}

run().catch(console.log);


app.listen(port, () => {
  console.log(`server is running on PORT: ${port}`);
});
