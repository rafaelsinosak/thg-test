#!/bin/sh

echo "Esperando o PostgreSQL..."

while ! python -c "import psycopg2; psycopg2.connect(dbname='${POSTGRES_DB}', user='${POSTGRES_USER}', password='${POSTGRES_PASSWORD}', host='db', port='5432')"; do
  echo "PostgreSQL não está disponível, tentando novamente em 1 segundo..."
  sleep 1
done

echo "PostgreSQL está disponível"
exec "$@"
