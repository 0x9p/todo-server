## Setup environment

1. Install Node.js via [NVM](https://github.com/nvm-sh/nvm#installing-and-updating)
2. Install Dependencies `npm install`

## How to?

1. Run Postgres database

    ```shell
    npm run docker:db:up

    # if you need to shut down
    npm run docker:down
    ```
   
2. Run Postgres database migrations

   ```shell
   npm run db:migrate
   ```

3. Run Service

    ```shell
    npm start
    ```

## How to lint and tests

```shell
npm run lint
```

```shell
npm run test
```
