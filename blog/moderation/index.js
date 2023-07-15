const express = require('express');
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if (type === 'CommentCreated') {
        const status = data.content.includes('red') ? 'rejected' : 'approved';

        await axios.post('http://127.0.0.1:4005/events', {
            type: 'CommentModerated',
            data: { id: data.id, postId: data.postId, content: data.content, status }
        })
    }

    res.send({});
});


app.listen(4007, () => {
    console.log('Moderation is up and running...')
})