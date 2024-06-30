# THG Exercise Fullstack

This project is a full stack application using Angular 18.0.6 on the frontend and Django on the backend, which connects to the API provided by datausa.io and visualizes two charts using a GraphQL API with two resolvers.

## Frontend

### There are two frontends apps:

> **datausa_frontend_singlepage**: basic frontend only using HTML, CSS and Javascript, this project follows all guidelines described into README- Angular App Exercise.docx file.

> **datausa_frontend_material**: basic frontend using Angular Material, routing and components. This project follows some guidelines described into README- Angular Material App Exercise.docx file and I created some others in order to play with the latest version of Angular.

## Requirements

- Docker
- Docker Compose
- Angular 18.0.6 Global

## Setup

1. Clone this repository:

```bash
git clone https://github.com/rafaelsinosak/thg-test.git
cd thg-test
```

2. Create a `.env` file at the datausa_backend folder of the project with the following content:

```bash
cd datausa_backend
```

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

Note: You can change the .env file if you want. The sensitive fields should not be here in the .env file because it is a secret.

3. Build and start the Docker containers:

```bash
docker-compose up --build
```

## Accessing GraphQL

The GraphQL API can be accessed at `http://localhost:8000/graphql/`. You can use a tool like Postman, Insomnia, or GraphiQL (available at `http://localhost:8000/graphql/` if DEBUG is enabled) to send queries.

### Query Examples

I created a way to iterate with all the data provided by datausa.io and zircon.datausa.io and show then in graphql. I created the following queries:

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

4. Run the frontend:

#### Return to the root folder

```bash
cd datausa_frontend_singlepage
```

```bash
npm install
```

##### Use the step bellow if you don't have angular-cli installed
```bash
npm i -g @angular/cli
```

```bash
ng serve
```

## Project Structure

- **datausa_backend/**: Contains the backend code in Django.
- **datausa_frontend_singlepage/**: Contains the basic HTML CSS JS frontend code in Angular.
- **datausa_frontend_material/**: Contains the Routing & Material frontend code in Angular.
- **datausa_backend/wait-for-postgres.sh**: Script to wait for PostgreSQL to be available before starting Django.
- **datausa_backend/docker-compose.yml**: Docker Compose configuration.
- **datausa_backend/Dockerfile**: Docker configuration for the backend.

## Beyond guidelines

- **Docker**: The docker launches the Django container after the postgres container is ready.
- **POSTGRES**: The backend saves the data from the API in a PostgreSQL database.
- **.env file**: The backend consumes the .env file.
- **Tests**: There are two tests in the backend. Both tests the GraphQL API and results.
- **Material Frontend**: Since the position uses material, I created the frontend using Angular Material.

## TODO

There are some things that I thought I should do in the future:

- A selector that allow the user to select the date range from both charts.
- A selector that allow the user to select the states from the population chart.
- Some cards to show the highlights results.

## Stop the containers:

```bash
docker-compose down
```
