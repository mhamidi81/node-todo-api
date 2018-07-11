const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const { todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST / todos', () => {
    it('should create a new todo', (done) => {
        const text = 'Test todo text';
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });
    
    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
        });
    });

});

describe('GET / todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect(
                (res) => {
                    expect(res.body.todos.length).toBe(2);
                }
            )
            .end(done);
    });
});

describe('GET / todos/:id', () => {
    it('should return one todo', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect(
                (res) => {
                    expect(res.body.text).toBe(todos[0].text);
                }
            )
            .end(done);
    });

    it('should return no todo', (done) => {
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('It should remove a todo', (done) => {
        request(app)
            .delete(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect(
                res => {
                    expect(res.body._id).toBe(todos[0]._id.toHexString());
                }
            )
            .end(
                (err, res) => {
                    if(err) {
                        return done(err);
                    }
                    
                    Todo.findById(todos[0]._id.toHexString())
                        .then(
                            (todo) => {
                                expect(todo).toEqual(null);
                                done();
                            }
                        ).catch(err => done(err));
                }
            );
    });

    it('It should return 404 status if todo does not exists', (done) => {
        request(app)
            .delete(`/todos/6b40d23e86dd0c1688523443`)
            .expect(404)
            .end(done);
    });

    it('It should return 404 status if id is not valid', (done) => {
        request(app)
        .delete(`/todos/44b40d23e86dd0c1688523443`)
        .expect(404)
        .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
      var hexId = todos[0]._id.toHexString();
      var text = 'This should be the new text';
  
      request(app)
        .patch(`/todos/${hexId}`)
        .send({
          completed: true,
          text
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.text).toBe(text);
          expect(res.body.completed).toBe(true);
          // expect(res.body.completedAt).toBeA('number');
        })
        .end(done);
    });
  
    it('should clear completedAt when todo is not completed', (done) => {
      var hexId = todos[1]._id.toHexString();
      var text = 'This should be the new text!!';
  
      request(app)
        .patch(`/todos/${hexId}`)
        .send({
          completed: false,
          text
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.text).toBe(text);
          expect(res.body.completed).toBe(false);
          expect(res.body.completedAt).toEqual(null);
          // expect(res.body.completedAt).toNotExist();
        })
        .end(done);
    });
  });


  describe('GET /users/me', () => {
    it('should return user if authenticated', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done);
    });

    it('should return 401 if user is not authenticated', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token+'a')
            .expect(401)
            .end(done);
    });
  });

  describe('', () => {
    
    it('should create a user', (done) => {
        const email = 'example@example.com';
        const password = '123abc!';
        request(app)
            .post('/users')
            .send({email, password})
            .expect(200)
            .expect((res) => {
                console.log(res.body);
                // expect(res.headers['x-auth']).toNotEqual(null);
                expect(res.body.email).toBe(email);
                // expect(res.body._id).toNotEqual(null);
            })
            .end(done);
    });

    it('should return validation errors if request invalid', (done) => {
        const email = '';
        const password = '123abc!';
        request(app)
            .post('/users')
            .send({email, password})
            .expect(400)
            .end(done);
    });

    it('should not create user if email in use', (done) => {
        request(app)
            .post('/users')
            .send({
                email: users[0].email, 
                password: 'Password123!'
            })
            .expect(400)
            .end(done);
    });

  });
