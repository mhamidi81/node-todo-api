const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const todos = [
    {
        _id: new ObjectID(),
        text: 'Simple todo 11'
    },
    {
        _id: new ObjectID(),
        text: 'Simple todo 22',
        completed: true,
        completedAt: 333
    }
];

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [
    {
        _id: userOneId,
        email: 'mhamidi@yopmail.com',
        password: 'mhamidiPass',
        tokens: [{
            access: 'auth',
            token: jwt.sign({ _id: userOneId, access: 'auth'}, 'abc123').toString()
        }]
    },
    {
        _id: userTwoId,
        email: 'ihamidi@yopmail.com',
        password: 'ihamidiPass'
    }
];

const populateTodos = (done) => {
    Todo.remove({})
        .then(
            () => Todo.insertMany(todos)
        )
        .then(() => done());
};


const populateUsers = (done) => {
    User.remove({}).then(() => {
        const userOne = new User(users[0]).save();
        const userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]);
    }).then(() => done());
};

module.exports = { todos, populateTodos, users, populateUsers };
