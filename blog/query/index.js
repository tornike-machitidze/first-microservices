const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express()
app.use(bodyParser.json());
app.use(cors());


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

    // Event when a comment status is updated
    if (type === 'CommentUpdated') {
        const { id, content, postId, status } = data;

        const post = posts[postId];
        const comment = post.comments.find(comment => comment.id === id);
        comment.status = status;
        comment.content = content;
    }

    res.send({ status: 'OK' })
})

app.listen(4002, () => {
    console.log('Query is listening on port 4002');
})