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

4. Run the delivarable frontend:

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

5. Run the Routing+Material frontend:

#### Return to the root folder

```bash
cd datausa_frontend_material
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
- <s>**datausa_backend/wait-for-postgres.sh**: Script to wait for PostgreSQL to be available before starting Django.</s> This file was removed in the project.
- **datausa_backend/docker-compose.yml**: Docker Compose configuration.
- **datausa_backend/Dockerfile**: Docker configuration for the backend.

## Beyond guidelines

- **Docker**: The docker launches the Django container after the postgres container is ready.
- <s>**POSTGRES**: The backend saves the data from the API in a PostgreSQL database.</s> The database was removed in the project.
- **.env file**: The backend consumes the .env file.
- **Tests**: There are two tests in the backend. Both tests the GraphQL API and results.
- **Material Frontend**: Since the position uses material, I created the frontend using Angular Material.
- **Charts**: The charts are rendered dynamically with the data provided by the API. If more states or more years are added, the charts will be updated. I also created a minPopulation and maxPopulation variables to render the Y axis in the population chart differently for each population range. It allows to implement the selector in TODO subsection below.

## TODO

There are some things that I thought I should do in the future:

- Return PostgreSQL database
- A selector that allow the user to select the date range from both charts.
- A selector that allow the user to select the states from the population chart.
- Some cards to show the highlights results.

## Stop the containers:

```bash
docker-compose down
```

# Screenshots

#### GraphQL Population

![GraphQL Population](https://raw.githubusercontent.com/rafaelsinosak/thg-test/main/screenshots/GraphQL%20Population.png)

#### GraphQL Vehicles

![GraphQL Vehicles](https://raw.githubusercontent.com/rafaelsinosak/thg-test/main/screenshots/GraphQL%20Vehicle.png)

#### Singlepage Frontend FullScreen

![Singlepage Frontend FullScreen](https://raw.githubusercontent.com/rafaelsinosak/thg-test/main/screenshots/datausa_frontend_singlepage%20Full%20Screen.png)

#### SinglePage Frontend Mobile Devices with Console

![SinglePage Frontend Mobile Devices with Console](https://raw.githubusercontent.com/rafaelsinosak/thg-test/main/screenshots/datausa_frontend_singlepage%20Mobile.png)

#### Material Router Frontend FullScreen

![Material Router Frontend FullScreen](https://raw.githubusercontent.com/rafaelsinosak/thg-test/main/screenshots/datausa_frontend_material%20Full%20Screen.png)

#### Material Router Frontend FullScreen Sidebar

![Material Router Frontend FullScreen Sidebar](https://raw.githubusercontent.com/rafaelsinosak/thg-test/main/screenshots/datausa_frontend_material%20Full%20Screen%20Sidebar.png)

#### Material Router Frontend Mobile Devices with Console

![Material Router Frontend Mobile Devices with Console](https://raw.githubusercontent.com/rafaelsinosak/thg-test/main/screenshots/datausa_frontend_material%20Mobile.png)
