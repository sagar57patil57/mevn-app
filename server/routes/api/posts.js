const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

// Add Post
router.post('/', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
});

// Delete Post
router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: req.params.id });
  res.status(200).send({});
});

//  returns reference to posts collection
async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb://USERNAME:PASSWORD@ds339177.mlab.com:39177/DATABASENAME',
    {
      useNewUrlParser: true
    }
  );

  return client.db('DATABASENAME').collection('posts');
}

module.exports = router;
