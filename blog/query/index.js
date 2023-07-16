const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const axios = require('axios')

const app = express()
app.use(bodyParser.json());
app.use(cors());


const handleEvent = (type, data) => {
    // Event when a new Post is created
    if (type === 'PostCreated') {
        const { id, title } = data;

        posts[id] = { id, title, comments: [] }
    }

    // Event whan a new Comment is created
    if (type === 'CommentCreated') {
        const { id, content, postId, status } = data;

        posts[postId].comments.push({ id, content, status })
    }

    // Event when a comment Status is updated
    if (type === 'CommentUpdated') {
        const { id, content, postId, status } = data;

        const post = posts[postId];
        const comment = post.comments.find(comment => comment.id === id);
        comment.status = status;
        comment.content = content;
    }
}

const posts = {};
// { postIdis23a: { postId: 1, title: 'Post title', comments: [ { id: 'commentsId', content: "content" } ] }  }

// Client side request comes here
/**
 * GET request
 * send all the posts
 */
app.get('/posts', (req, res) => {
    res.send(posts);
});

// Events coming from event bus
app.post('/events', (req, res) => {
    const { type, data } = req.body;

    handleEvent(type, data);

    res.send({ status: 'OK' })
})

app.listen(4002, async () => {
    console.log('Query is listening on port 4002');

    const res = await axios.get('http://127.0.0.1:4005/events');

    for (let event of res.data) {
        console.log('Existing events ', event.type);

        handleEvent(event.type, event.data);
    }
})