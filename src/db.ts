import { Sequelize } from "sequelize-typescript";

import { TodosServiceAppConfig } from "./app";
import { PostgresTodo } from "./domains/todo/todo.postgres";

export interface PostgresConfig {
  host: string;
  database: string;
  username: string;
  password: string;
}

export type ShutdownFn = () => Promise<void>;

export async function buildPostgres(config: TodosServiceAppConfig): Promise<[Sequelize, ShutdownFn]> {
  // initialize Postgres database
  const postgres = new Sequelize({
    dialect: "postgres",
    host: config.postgres.host,
    database: config.postgres.database,
    username: config.postgres.username,
    password: config.postgres.password,
    models: [PostgresTodo],
  });

  return [postgres, async () => postgres.close()];
}
