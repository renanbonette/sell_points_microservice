import HttpStatus from 'http-status';
import { defaultResponse, errorResponse } from '../utils/response';

class UsersController {
  constructor(Users, Sequelize) {
    this.Users = Users;
    this.Sequelize = Sequelize;
  }

  getAll() {
    return this.Users.findAll({})
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  getById(params) {
    return this.Users.findOne({ where: params })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  create(data) {
    return this.Users.create(data)
      .then(result => defaultResponse(result, HttpStatus.CREATED))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  update(data, params) {
    return this.Users.update(data, { where: params })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(params) {
    return this.Users.destroy({ where: params })
      .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

}

export default UsersController;
