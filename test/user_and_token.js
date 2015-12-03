import {agent, checkErr, user}  from './_common.js';

var token;

describe('User', () => {
  describe('Create', () => {
    it('should give 201 with created user data', done => {
      agent
        .post('/users')
        .type('form')
        .send(user)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);

          res.body.user.should.have.property('id');
          res.body.user.name.should.equal(user.name);
          res.body.user.email.should.equal(user.email);
          res.body.accessToken.should.not.be.empty();

          token = res.body.accessToken;

          done();
        });
    });
  });

  describe('List', () => {
    it('should give 200 with users', done => {
      agent
        .get('/users')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          res.body.users.length.should.equal(1);
          res.body.currentPage.should.equal(1);
          res.body.totalPages.should.equal(1);

          done();
        });
    });
  });

  describe('Auth and get me', () => {
    it('should give 401', done => {
      agent
        .get('/me')
        .expect(401, done)
    });

    it('should give 200 with authenticated user', done => {
      agent
        .get('/me')
        .set('X-Auth-Token', token)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          res.body.user.name.should.equal(user.name);
          done();
        });
    });
  });
});

describe('Token', () => {
  describe('Login', () => {
    it('should give 201 with created token', done => {
      agent
        .post('/tokens')
        .type('form')
        .send({
          email: user.email,
          password: user.password,
        })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          res.body.accessToken.should.not.be.empty();
          done();
        });
    });

    it('should give 400', done => {
      agent
        .post('/tokens')
        .type('form')
        .send({
          email: user.email,
          password: "x",
        })
        .expect(400, done)
    });
  });
});
