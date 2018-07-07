const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

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

app.get('/todos', (req, res) => {
    Todo.find().then(
        todos => res.send({todos}),
        err => res.status(400).send(err)
    );
});

app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id)) {
        console.log(`ID=${id} is not valid.`);
        return res.status(404).send({message: `ID=${id} is not valid.`});
    }
    Todo.findById(id).then(
        todo => {
            if(!todo) {
                return res.status(404).send({message: `No todo found with id=${id} `});
            } else {
                return res.status(200).send(todo);
            }
        },
        err  => { 
            return console.log('errrrooor', err.message);
        } 
    );
});

app.listen(3000, () => console.log('Starting server on localhost:3000'));


module.exports = {
    app
};
