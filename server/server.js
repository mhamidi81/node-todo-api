const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

app = new express();
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    }).save().then(
        doc => res.send(doc),
        err => res.status(400).send(err)
    );
});







app.listen(3000, () => console.log('Starting server on localhost:3000'));
