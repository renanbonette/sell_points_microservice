import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';
import config from './config';

let database = null;

const loadModels = (sequelize) => {
  const dir = path.join(__dirname, '../src/models');
  const models = [];
  fs.readdirSync(dir).forEach((file) => {
    const modelDir = path.join(dir, file);
    const model = sequelize.import(modelDir);
    models[model.name] = model;
  });
  return models;
};

export default() => {
  if (!database) {
    const sequelize = new Sequelize(
      process.env.DATABASE || config.database || 'database_name',
      process.env.DATABASE_USER || config.database_user || 'root',
      process.env.DATABASE_PWD || config.database_password || 'pwd',
      {
        dialect: config.params.dialect || 'postgres',
        host: process.env.DATABASE_HOST || config.params.host,
      },
    );
    database = {
      sequelize,
      Sequelize,
      models: {},
    };
    database.models = loadModels(sequelize);
    sequelize.sync({ }).done(() => database);
  }
  return database;
};
