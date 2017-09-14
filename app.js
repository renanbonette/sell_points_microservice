import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import authRouter from './src/routes/auth';
import usersRouter from './src/routes/users';
import pontosDeVendaRouter from './src/routes/pontosDeVenda';
import authorization from './auth';

const app = express();
app.config = config;
app.datasource = datasource();
app.set('port', process.env.app_port);
app.use(bodyParser.json());

const auth = authorization(app);
app.use(auth.initialize());
app.auth = auth;

usersRouter(app);
pontosDeVendaRouter(app);
authRouter(app);

export default app;
