import { ConfigSchema } from "./config";
import { PostgresConfig } from "./db";

export const configPath = `${__dirname}/../config`;

export interface TodosServiceAppConfig {
  postgres: PostgresConfig;
}

export const configSchema: ConfigSchema<TodosServiceAppConfig> = {
  postgres: {
    host: {
      format: String,
      default: "localhost",
    },
    database: {
      format: String,
      default: "YOUR_DATABASE_NAME",
    },
    username: {
      format: String,
      default: "YOUR_DATABASE_USERNAME",
    },
    password: {
      format: String,
      default: "YOUR_DATABASE_PASSWORD",
    },
  },
};
