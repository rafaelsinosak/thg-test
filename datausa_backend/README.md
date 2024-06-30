# Django Backend

## Requirements

- Docker
- Docker Compose

## Setup

1. Create a `.env` file at the root of the project with the following content:

```env
SECRET_KEY=your_secret_key
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,.localhost
DATAUSA_API_BASE_URL=https://datausa.io/api/data
ZIRCON_API_BASE_URL=https://zircon.datausa.io/api/data
```

2. Build and start the Docker containers:

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

## Stop the containers:

```bash
docker-compose down
```
