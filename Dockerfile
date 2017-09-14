FROM node:8.3.0

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app

COPY package.json $HOME/library/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/library
RUN npm cache clean --force
RUN npm install --silent --progress=false

USER root
COPY . $HOME/library
RUN chown -R app:app $HOME/*
USER app

CMD ["npm", "start"]
