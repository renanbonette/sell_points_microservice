# Sell points Microservice

Ref: https://github.com/ZXVentures/code-challenge/blob/master/backend.md 

## Features

 - Geolocalização de pontos de venda por coordenada geográfica
 - Autenticação por usuário
 - Testes (TDD)
 - Banco de dados relacional

## Install

`É necessário um banco de dados postgres configurado com a extensão postgis congirada`
`Criar e configurar um arquivo .env a partir do arquivo .env_sample com as informações da API (Conexão com base de dados, secret key, porta da api)`
`npm install`

## Run

 - **npm start** : `Rodar em produção`
 - **npm run start-dev** : `Rodar em modo de desenvolvimento` 

## Scripts  

 - **npm run test** : `Roda todos teste da aplicação`
 - **npm run test-integration** : `Roda todos teste de integração dos componentes`
 - **npm run test-contract** : `Roda todos teste de de contrato dos modelos`
 - **npm run test-unit** : `Roda todos teste unitários`
 - **npm run lint** : `Verifica erros na estrutura de código usando o padrão lint do airbnb`
 - **npm run lint:fix** : `Verifica erros na estrutura de código usando o padrão lint do airbnb e corrige`

## Dependencies

 - Node v8.3.0
 - Babel
 - Postgres
 - Postgis (extensão para postgres)

## Author

Renan Bonette <renan.bonette@gmail.com>