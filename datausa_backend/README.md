# THG Exercise Fullstack

This project is a full stack application using Angular on the frontend and Django on the backend, which connects to the API provided by datausa.io and visualizes two charts using a GraphQL API with two resolvers. The application also serves the Angular distribution files at a specific endpoint.

## Requirements

- Docker
- Docker Compose

## Setup

1. Clone this repository:

```bash
git clone https://github.com/rafaelsinosak/thg-test.git
cd thg-test
```

2. Create a `.env` file at the root of the project with the following content:

```env
SECRET_KEY=your_secret_key
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,.localhost
POSTGRES_DB=mydatabase
POSTGRES_USER=user
POSTGRES_PASSWORD=password
DATAUSA_API_BASE_URL=https://datausa.io/api/data
ZIRCON_API_BASE_URL=https://zircon.datausa.io/api/data
```

3. Build and start the Docker containers:

```bash
docker-compose up --build
```

## Accessing GraphQL

The GraphQL API can be accessed at `http://localhost:8000/graphql/`. You can use a tool like Postman, Insomnia, or GraphiQL (available at `http://localhost:8000/graphql/` if DEBUG is enabled) to send queries.

### Query Examples

#### Population Data

```graphql
{
  populationData(
    states: ["Alabama", "Florida", "California"]
    startYear: 2013
    endYear: 2021
  ) {
    idState
    state
    idYear
    year
    population
    slugState
  }
}
```

#### Vehicle Ownership Data

```graphql
{
  vehicleOwnershipData(year: 2021) {
    idVehiclesAvailable
    vehiclesAvailable
    idYear
    year
    commuteMeansByGender
    geography
    idGeography
    slugGeography
  }
}
```

## Running Tests

To run tests, follow these steps:

1. Access the Django container:

```bash
docker-compose exec web /bin/bash
```

2. Run the tests using pytest:

```bash
pytest
```

## Project Structure

- **datausa_backend/**: Contains the backend code in Django.
- **angular-frontend/**: Contains the frontend code in Angular.
- **wait-for-postgres.sh**: Script to wait for PostgreSQL to be available before starting Django.
- **docker-compose.yml**: Docker Compose configuration.
- **Dockerfile**: Docker configuration for the backend.
