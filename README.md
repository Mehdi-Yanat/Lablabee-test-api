# Lablabee API

API that let users create, read, update and delete labs

## Installation

### Prerequisites

To deploy Lablabee API, you need the following services:

1. Mongodb - You can get free hosting at https://cloud.mongodb.com
2. Node.js (>=v16) - You can install it at https://nodejs.org/en/download/
3. Yarn - You can install it at https://classic.yarnpkg.com/en/docs/install#debian-stable

### Steps

1. Install dependencies with `yarn install`
2. Create a `.env` file at the root of the project with the following properties:

```
APP_PORT_PROD={port}
APP_PORT_DEV={port}
// using localhost or docker service name
MONGODB_URL=mongodb://{ localhost || docker service name}:27017/LabLabee 
// using mongodb cloud
MONGODB_URL=mongodb+srv://{username}:{password}@{cluster}/LabLabee?retryWrites=true&w=majority 
```

1. Run `yarn run dev` and the application will start at the designated port (default 3500 if not explicitly set) for `development`
2. Run `yarn run start` and the application will start at the designated port (default 3000 if not explicitly set) for `production`

### Swagger UI

1. Go to `localhost:{PORT}/api-docs/`
2. There will be UI page with API'S
3. Test it out

### Run unit test

1. Run `yarn run test` to run tests and produce a detailed report using the verbose reporter.

### Docker-Compose

1. Refer to `docker-compose.yml` in the project root to proceed
2. Run `docker-compose up {service name}` Create and start containers for all services defined in the docker-compose.yml file. If the containers don't exist, it builds them first.
3. Run `docker-compose down` Stop and remove containers, networks, and volumes defined in the docker-compose.yml file.
4. Run `docker-compose start {service name}` Start existing containers defined in the docker-compose.yml file. 
5. Run `docker-compose stop {service name} ` Stop running containers defined in the docker-compose.yml file. 
6. Run `docker-compose restart {service name} ` Restart containers. It stops and starts containers defined in the docker-compose.yml file.
