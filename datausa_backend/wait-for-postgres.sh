#!/bin/sh

# Wait for PostgreSQL to start
until pg_isready -h db -p 5432 -U "$POSTGRES_USER"; do
  echo "Waiting for PostgreSQL..."
  sleep 1
done

# Execute the command passed as an argument to the entrypoint
exec "$@"
