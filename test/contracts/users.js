import HttpStatus from 'http-status';
import jwt from 'jwt-simple';

describe('Routes: Users', () => {
  const Users = app.datasource.models.users;
  const jwtSecret = app.config.jwtSecret;

  const defaultUser = {
    id: 1,
    name: 'Test User',
    email: 'test@mail.com',
    username: 'test',
    password: 'testPassword',
    role: 'admin',
  };

  let token;

  beforeEach((done) => {
    Users
    .destroy({ where: {} })
    .then(() => Users.create({
      name: 'John',
      email: 'john@gmail.com',
      username: 'john',
      password: '12345',
      role: 'user',
    }))
    .then((user) => {
      Users.create(defaultUser)
      .then(() => {
        token = jwt.encode({ id: user.id }, jwtSecret);
        done();
      });
    });
  });

  describe('GET /users', () => {
    it('should validate a list of users', (done) => {
      request
      .get('/users')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        const usersList = Joi.array().items(Joi.object().keys({
          id: Joi.number(),
          name: Joi.string(),
          email: Joi.string(),
          username: Joi.string(),
          password: Joi.string(),
          role: Joi.string(),
        }));

        joiAssert(res.body, usersList);
        done(err);
      });
    });
  });

  describe('GET /users/{id}', () => {
    it('should validate a single user schema', (done) => {
      request
      .get('/users/1')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        const usersList = Joi.object().keys({
          id: Joi.number(),
          name: Joi.string(),
          email: Joi.string(),
          username: Joi.string(),
          password: Joi.string(),
          role: Joi.string(),
        });

        joiAssert(res.body, usersList);
        done(err);
      });
    });
  });

  describe('POST /users', () => {
    it('should validate a new user schema', (done) => {
      const user = {
        id: 2,
        name: 'User Created',
        email: 'test2@mail.com',
        username: 'test2',
        password: 'test2',
        role: 'user',
      };

      request
      .post('/users')
      .set('Authorization', `JWT ${token}`)
      .send(user)
      .end((err, res) => {
        const createdBook = Joi.object().keys({
          id: Joi.number(),
          name: Joi.string(),
          email: Joi.string(),
          username: Joi.string(),
          password: Joi.string(),
          role: Joi.string(),
        });
        joiAssert(res.body, createdBook);
        done(err);
      });
    });
  });

  describe('PUT /users/{id}', () => {
    it('should validate a updated user', (done) => {
      const user = {
        id: 1,
        name: 'User Created',
        username: 'user_new',
        email: 'test@mail.com',
        role: 'admin',
        password: 'test',
      };

      request
      .put('/users/1')
      .set('Authorization', `JWT ${token}`)
      .send(user)
      .end((err, res) => {
        const updatedCount = Joi.array().items(1);

        joiAssert(res.body, updatedCount);
        done(err);
      });
    });
  });

  describe('DELETE /users/{id}', () => {
    it('should validate a deleted user', (done) => {
      request
      .delete('/users/1')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        expect(res.statusCode).to.eql(HttpStatus.NO_CONTENT);
        done(err);
      });
    });
  });
});
