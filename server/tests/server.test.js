const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');

const { Todo } = require('./../models/todo');
const { User } = require('./../models/user');

describe('POST /todos', () => {

    it('Should add a new Todo', (done) => {

        var text = "New todo by test";

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            })
    });

    it('Should not create todo', (done) => {

        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });

    });

});

