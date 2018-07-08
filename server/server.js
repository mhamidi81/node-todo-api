const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const {ObjectID} = require('mongodb');
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');

const port = process.env.PORT || 3000;

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
                return res.status(404).send({message: `No todo found with id=${id}`});
            } else {
                return res.status(200).send(todo);
            }
        },
        err  => {
            return res.status(400).send({message: err.message});
        } 
    );
});

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send({message: `ID=${id} is not valid.`});
    }
    Todo.findByIdAndRemove(id).then(
        todo  => {
            if(!todo) {
                return res.status(404).send({message: `No todo found with id=${id}`});
            }
            return res.status(200).send(todo);
        },
        err  => {
            return res.status(400).send({message: err.message});
        } 
    );
});

app.patch('/todos/:id', (req, res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send({message: `ID=${id} is not valid.`});
    }
    const body = _.pick(req.body, ['text', 'completed']);
    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }
    
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
        .then(
            todo => {
                if(!todo) {
                    return res.status(404).send({message: `No todo found with id=${id}`});
                } else {
                    return res.status(200).send(todo);
                }
            },
            err => {
                return res.status(400).send({message: err.message});
            }
        );
});

app.listen(port, () => console.log(`Starting server on localhost:${port}`));


module.exports = {
    app
};
