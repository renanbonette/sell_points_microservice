/*
Arquivos com configurações globais
Emula aplicação em modo de teste
Por isso separamos app de index.js
*/

import supertest from 'supertest';
import chai from 'chai';
import app from '../../app';

global.app = app;
global.request = supertest(app);
global.expect = chai.expect;
