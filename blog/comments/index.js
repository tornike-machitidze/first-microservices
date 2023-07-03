const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes }  = require('crypto');
const cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {}; // { sdja1245: [{ id: sqws12, content: good post }], ewe23sd: [ coomet1, comment2 ] }

app.get('/posts/:id/comments', ( req, res ) => {
    res.send(commentsByPostId[req.params.id] || []);
})

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content })

    commentsByPostId[req.params.id] = comments;

    res.status(201).send(comments);
})

app.listen(4001, () => {
    console.log('Comments microservice is up and listening on port 4001');
})