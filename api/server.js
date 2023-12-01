const cors = require('cors');
const express = require('express');
const mongodb = require('mongodb');
const { createProxyMiddleware } = require('http-proxy-middleware');

// Express + MongoDB Setup
const uri = "mongodb+srv://manish:DailyBugle24@daily-bugle.q0hsoij.mongodb.net/?retryWrites=true&w=majority";
const port = process.env.PORT || 3200;
const client = new mongodb.MongoClient(uri);

const app = express();

app.use(cors());
app.use(express.json());

app.listen(5050, () => {
    console.log('Server running on port 5050');
});

// Connect to MongoDB
client.connect()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  }); 

const db = client.db("daily-bugle");
const articlesList = db.collection("articles");
const advertisementList = db.collection("ads")


app.get('/api/articles', async (req, res) => {
  try {
    const articles = await articlesList.find().toArray();
    res.json(articles);
  } catch(error){
    error => console.error(error)
  };
})

app.get('/api/article/:articleid', async (req, res) => {
  try {
    const article = await db.collection('articles').findOne({ _id: new mongodb.ObjectId(req.params.articleid) });
    if (article != null) {
      res.json(article);
    } else {
      res.status(404).json({ error: 'Article not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
})


app.get('/api/top-article', async (req, res) => {
  try {
    const article = await articlesList.findOne({"categories.0": "top_article"})
    res.json(article);
  } catch(error){
    error => console.error(error)
  };
})

app.get('/api/advertisement', async (req, res) => {
  try {
    const ad = await advertisementList.find().toArray();
    res.json(ad);
  } catch(error){
    error => console.error(error)
  };
})


app.post('/api/article/comment', async (req, res) => {
    try {
      const userName = req.body.userName;
      const comment = req.body.comment; // assuming the comment is sent in the request body
      const article = await db.collection('articles').updateOne(
        { _id: new mongodb.ObjectId(req.body.articleId) },
        { $push: {comments: {userName: userName, comment: comment }}}
      );
      res.status(200).send('Comment added successfully');
    } catch(error){
      console.error(error);
      res.status(500).send('An error occurred');
    }
  });
  


