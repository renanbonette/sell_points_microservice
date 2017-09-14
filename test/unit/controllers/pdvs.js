import PdvsController from '../../../src/controllers/pontosDeVenda';

describe('Controllers: Pdvs', () => {
  describe('Get all pdvs: getAll()', () => {
    it('should return a list of pdvs', () => {
      const Pdvs = {
        findAll: td.function(),
      };

      const expectedResponse = [{
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
      }];

      td.when(Pdvs.findAll({})).thenResolve(expectedResponse);

      const pdvsController = new PdvsController(Pdvs);
      console.log('aaa');
      console.log(pdvsController);
      return pdvsController.getAll()
      .then((response) => {
        console.log('aaa');
        console.log(response);
        expect(response.data).to.be.eql(expectedResponse);
      }).catch(err => console.log('err'));
    });
  });

  // describe('Get one user: getById()', () => {
  //   it('should return one user', () => {
  //     const Users = {
  //       findOne: td.function(),
  //     };

  //     const expectedResponse = [{
  //       id: 1,
  //       name: 'Test User',
  //     }];

  //     td.when(Users.findOne({ where: { id: 1 } })).thenResolve(expectedResponse);

  //     const usersController = new UsersController(Users);
  //     return usersController.getById({ id: 1 })
  //     .then(response => expect(response.data).to.be.eql(expectedResponse));
  //   });
  // });

  // describe('Create a user: create()', () => {
  //   it('should create a user', () => {
  //     const Users = {
  //       create: td.function(),
  //     };

  //     const requestBody = {
  //       name: 'Test User',
  //     };

  //     const expectedResponse = [{
  //       id: 1,
  //       name: 'Test User',
  //     }];

  //     td.when(Users.create(requestBody)).thenResolve(expectedResponse);

  //     const usersController = new UsersController(Users);
  //     return usersController.create(requestBody)
  //     .then(response => {
  //       expect(response.data).to.be.eql(expectedResponse);
  //       expect(response.statusCode).to.be.eql(201);
  //     });
  //   });
  // });

  // describe('Update a user: update()', () => {
  //   it('should update an existing user', () => {
  //     const Users = {
  //       update: td.function(),
  //     };
  //     const requestBody = {
  //       id: 1,
  //       name: 'Test User Updated',
  //     };
  //     const expectedResponse = [{
  //       id: 1,
  //       name: 'Test User Updated',
  //     }];

  //     td.when(Users.update(requestBody, { where: { id: 1 } })).thenResolve(expectedResponse);

  //     const usersController = new UsersController(Users);
  //     return usersController.update(requestBody, { id: 1 })
  //     .then((response) => expect(response.data).to.be.eql(expectedResponse));
  //   });
  // });

  // describe('Delete a user: delete()', () => {
  //   it('should delete an existing user', () => {
  //     const Users = {
  //       destroy: td.function(),
  //     };
  //     const expectedResponse = {};

  //     td.when(Users.destroy({ where: { id: 1 } })).thenResolve(expectedResponse);

  //     const usersController = new UsersController(Users);
  //     return usersController.delete({ id: 1 })
  //     .then(response => expect(response.statusCode).to.be.eql(204));
  //   });
  // });
});
