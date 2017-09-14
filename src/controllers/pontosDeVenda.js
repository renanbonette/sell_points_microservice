import HttpStatus from 'http-status';
import { defaultResponse, errorResponse } from '../utils/response';

class PdvsController {
  constructor(Pdvs, Sequelize) {
    this.Pdvs = Pdvs;
    this.Sequelize = Sequelize;
  }

  getAll() {
    return this.Pdvs.findAll()
      .then(result => defaultResponse({ pdvs: result }))
      .catch(error => errorResponse(error));
  }

  create(pdv) {
    return this.Pdvs.create(pdv)
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error));
  }

  getById(params) {
    return this.Pdvs.findOne({ where: params })
      .then((result) => {
        if (result) {
          return defaultResponse(result);
        }
        return defaultResponse({}, HttpStatus.NOT_FOUND);
      })
      .catch(error => errorResponse(error.message));
  }

  searchAreaByLatLng(params) {
    console.info(params);
    const sql = `select pdvs.*, 
      ST_Distance(address, 
      ST_MakePoint(${params.long}, ${params.lat})::geography) as distance,
      ST_Contains("coverageArea", ST_GeomFromText('POINT(${params.long} ${params.lat})')) as contain
      from pdvs 
      where 
      ST_Contains("coverageArea", ST_GeomFromText('POINT(${params.long} ${params.lat})')) = true
      order by distance ASC 
      limit 1;`;
    return this.Sequelize.query(sql, { type: this.Sequelize.QueryTypes.SELECT })
      .then(result => defaultResponse(result[0]))
      .catch(error => errorResponse(error.message));
  }

}

export default PdvsController;
