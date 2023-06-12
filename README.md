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
using localhost or docker service name -- MONGODB_URL=mongodb://{ localhost || docker service name}:27017/LabLabee 
using mongodb cloud -- MONGODB_URL=mongodb+srv://{username}:{password}@{cluster}/LabLabee?retryWrites=true&w=majority

```

1. Run `yarn run dev` and the application will start at the designated port (default 3500 if not explicitly set) for development
2. Run `yarn run start` and the application will start at the designated port (default 3000 if not explicitly set) for production
