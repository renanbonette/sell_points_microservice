import HttpStatus from 'http-status';
import jwt from 'jwt-simple';

describe('Routes: Pdvs', () => {
  const Pdvs = app.datasource.models.pdvs;
  const Users = app.datasource.models.users;
  const jwtSecret = app.config.jwtSecret;

  const defaultPdv = {
    id: 1,
    tradingName: 'Adega da Cerveja - Pinheiros',
    ownerName: 'Zé da Silva',
    document: '1432132123891/0001',
    coverageArea: {
      type: 'MultiPolygon',
      coordinates: [
          [[[30, 20], [45, 40], [10, 40], [30, 20]]],
          [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]],
      ],
    },
    address: {
      type: 'Point',
      coordinates: [-46.57421, -21.785741],
    },
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
      Pdvs
      .destroy({ where: {} })
      .then(() => {
        Pdvs.create(defaultPdv)
        .then(() => {
          token = jwt.encode({ id: user.id }, jwtSecret);
          done();
        });
      });
    });
  });

  describe('GET /pdvs', () => {
    it('should validate a list of pdvs', (done) => {
      request
      .get('/pdvs')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        const pdvsList = Joi.array().items(Joi.object().keys({
          id: Joi.number(),
          tradingName: Joi.string(),
          ownerName: Joi.string(),
          document: Joi.string(),
          coverageArea: Joi.object(),
          address: Joi.object(),
        }));
        joiAssert(res.body.pdvs, pdvsList);
        done(err);
      });
    });
  });

  describe('GET /pdvs/:id', () => {
    it('should validate a single pdv schema', (done) => {
      request
      .get('/pdvs/1')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        const pdv = Joi.object().keys({
          id: Joi.number(),
          tradingName: Joi.string(),
          ownerName: Joi.string(),
          document: Joi.string(),
          coverageArea: Joi.object(),
          address: Joi.object(),
        });
        joiAssert(res.body, pdv);
        done(err);
      });
    });
  });

  describe('POST /pdvs', () => {
    it('should validate a new pdv schema', (done) => {
      const pdv = {
        id: 2,
        tradingName: 'Adega da Cerveja - Pinheiros',
        ownerName: 'Zé da Silva',
        document: '1432132123891/0002',
        coverageArea: {
          type: 'MultiPolygon',
          coordinates: [
              [[[30, 20], [45, 40], [10, 40], [30, 20]]],
              [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]],
          ],
        },
        address: {
          type: 'Point',
          coordinates: [-46.57421, -21.785741],
        },
      };

      request
      .post('/pdvs')
      .set('Authorization', `JWT ${token}`)
      .send(pdv)
      .end((err, res) => {
        const createdPdv = Joi.object().keys({
          id: Joi.number(),
          tradingName: Joi.string(),
          ownerName: Joi.string(),
          document: Joi.string(),
          coverageArea: Joi.object(),
          address: Joi.object(),
        });
        joiAssert(res.body, createdPdv);
        done(err);
      });
    });
  });
});
