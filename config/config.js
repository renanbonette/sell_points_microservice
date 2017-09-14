import dotenv from 'dotenv';

dotenv.config();
export default {
  database: `${process.env.DATABSE}_${process.env.enviroment}`,
  database_user: process.env.DATABSE_USER,
  database_password: process.env.DATABASE_PWD,
  params: {
    port: 5432,
    host: 'localhost',
    dialect: 'postgres',
    define: {
      underscored: true,
    },
  },
  jwtSecret: `${process.env.SecretKeyClickCollect}`,
  jwtSession: { session: false },
};
