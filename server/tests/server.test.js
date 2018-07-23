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

describe('GET /todos', () => {


    it('Should display all the todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            })
    });

});

describe('GET todos/id', () => {
    var id = '5b51d379ad557311a43c2b49';
    it("Should return the todo", (done) => {

        request(app)
            .get(`/todos/${id}`)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });

    });

})


