FROM mdillon/postgis  

ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD postgres

USER root
RUN chown -R postgres:postgres /var/lib/postgresql/
RUN chmod -R 777 /var/lib/postgresql/