export enum Environment {
  DEVELOPMENT = "development",
  TEST = "test",
  INTEGRATION = "integration",
  STAGING = "staging",
  PRODUCTION = "production",
}

export const environments: string[] = [
  Environment.DEVELOPMENT,
  Environment.TEST,
  Environment.INTEGRATION,
  Environment.STAGING,
  Environment.PRODUCTION,
];
