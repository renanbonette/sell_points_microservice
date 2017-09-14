import HttpStatus from 'http-status';
import jwt from 'jwt-simple';

describe('Routes: Books', () => {
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
      username: 'john',
      email: 'john@gmail.com',
      role: 'user',
      password: '12345',
    }))
    .then((user) => {
      Pdvs
      .destroy({ where: {} })
      .then(() => Pdvs.create(defaultPdv))
      .then(() => {
        token = jwt.encode({ id: user.id }, jwtSecret);
        done();
      });
    });
  });

  describe('GET /pdvs', () => {
    it('should return a list of pdvs', (done) => {
      request
      .get('/pdvs')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        expect(res.body.pdvs[0].tradingName).to.eql(defaultPdv.tradingName);
        expect(res.body.pdvs[0].id).to.eql(defaultPdv.id);
        expect(res.body.pdvs[0].ownerName).to.eql(defaultPdv.ownerName);
        expect(res.body.pdvs[0].document).to.eql(defaultPdv.document);
        expect(res.body.pdvs[0].coverageArea).to.eql(defaultPdv.coverageArea);
        expect(res.body.pdvs[0].address).to.eql(defaultPdv.address);
        done(err);
      });
    });
  });

  describe('GET /pdvs/:id', () => {
    it('should return a pdv by id', (done) => {
      request
      .get('/pdvs/1')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        expect(res.body.tradingName).to.eql(defaultPdv.tradingName);
        expect(res.body.id).to.eql(defaultPdv.id);
        expect(res.body.ownerName).to.eql(defaultPdv.ownerName);
        expect(res.body.document).to.eql(defaultPdv.document);
        expect(res.body.coverageArea).to.eql(defaultPdv.coverageArea);
        expect(res.body.address).to.eql(defaultPdv.address);
        done(err);
      });
    });
  });

  describe('POST /pdvs', () => {
    it('should post a pdv', (done) => {
      const pdv = {
        id: 2,
        tradingName: 'Adega da Cachaça - Freguesia do ó',
        ownerName: 'Tião marreco',
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
        expect(res.body.tradingName).to.eql(pdv.tradingName);
        expect(res.body.id).to.eql(pdv.id);
        expect(res.body.ownerName).to.eql(pdv.ownerName);
        expect(res.body.document).to.eql(pdv.document);
        expect(res.body.coverageArea).to.eql(pdv.coverageArea);
        expect(res.body.address).to.eql(pdv.address);
        done(err);
      });
    });
  });
});
