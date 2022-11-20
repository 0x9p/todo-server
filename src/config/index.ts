import convict, { Schema } from "convict";

import { Environment, environments } from "./environment";

export type ConfigSchema<T> = Schema<T>;

export interface DefaultConfig {
  environment: Environment;
}

const defaultConfigSchema: ConfigSchema<DefaultConfig> = {
  environment: {
    format: environments,
    default: Environment.DEVELOPMENT,
    env: "NODE_ENV",
  },
};

function combineWithDefaultSchema<T>(configSchema: ConfigSchema<T>): ConfigSchema<T & DefaultConfig> {
  return { ...defaultConfigSchema, ...configSchema } as ConfigSchema<T & DefaultConfig>;
}

export async function loadConfig<T>(configPath: string, configSchema: ConfigSchema<T>): Promise<T & DefaultConfig> {
  const combinedSchema = combineWithDefaultSchema(configSchema);
  const config = convict<T & DefaultConfig>(combinedSchema);
  const environment = config.get("environment");

  // load config file.
  config.loadFile([`${configPath}/${environment}.json`]);

  // enforce strict validation
  config.validate({ allowed: "strict" });

  return config.get();
}
