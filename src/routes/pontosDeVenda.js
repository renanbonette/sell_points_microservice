import PdvsController from '../controllers/pontosDeVenda';

export default (app) => {
  const pontosDeVendaController = new PdvsController(app.datasource.models.pdvs, app.datasource.sequelize);

  app.route('/pdvs')
    .all(app.auth.authenticate())
    .get((req, res) => {
      pontosDeVendaController.searchAreaByLatLng(req.query)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .post((req, res) => {
      pontosDeVendaController.create(req.body)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/pdvs/:id')
    .all(app.auth.authenticate())
    .get((req, res) => {
      pontosDeVendaController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });
};
