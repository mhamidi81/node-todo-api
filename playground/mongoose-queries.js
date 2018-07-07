const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

const id = '55b40e3b3f24e113e9481e180';

/* Todo.find({
    _id : id
}).then(
    todos => console.log(todos)
); */

Todo.findOne({
    _id : id
}).then(
    todo => console.log(todo)
).catch(
    e => console.log(e.message)
);

Todo.findById(id).then(
    todo => {
        if(!todo) {
            return console.log('No id found');
        }
        console.log('By Id', todo);
    },
    err  => { 
        return console.log('errrrooor', err.message)
        } 
);