# Storefront Backend Project

### Setting up the environment

Add a .env file in the root directory and set the missing *** environment variables
```
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_DB=storedb
POSTGRES_TEST_DB=storedb_test
POSTGRES_USER=***
POSTGRES_PASSWORD=***
BCRYPT_PASSWORD=***
SALT_ROUNDS=10
TOKEN_SECRET=***
ENV=dev
```
### Setting up, starting and testing the app

`npm install` to install the required packages
`npm run build` to build the app
`npm run start` to start the app
`npm run test` to run all the tests

### Database Schema
```
- Products (
  id    SERIAL PRIMARY KEY,
  name  VARCHAR(250) NOT NULL,
  price INTEGER      NOT NULL
);

-  Users (
  id              SERIAL PRIMARY KEY,
  username        VARCHAR(250) NOT NULL,
  firstname       VARCHAR(250) NOT NULL,
  lastname        VARCHAR(250) NOT NULL,
  password_digest VARCHAR(250) NOT NULL
);

- Orders (
  id      SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users (id),
  status  BOOLEAN NOT NULL
);

- Order Products (
  order_id   INTEGER NOT NULL REFERENCES orders (id),
  product_id INTEGER NOT NULL REFERENCES products (id),
  quantity   INTEGER NOT NULL
);
```

### Database Creation
```
CREATE DATABASE storedb;
CREATE DATABASE storedb_test;
```