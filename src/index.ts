import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { loadConfig } from "./config";
import { configPath, configSchema, TodosServiceAppConfig } from "./app";
import { ShutdownCoordinator } from "./util/shutdown";
import { TodoRepo } from "./domains/todo/todo.repo";
import { TodoManager } from "./domains/todo/todo.manager";
import { buildPostgres } from "./db";
import { TodoResolver } from "./graphql/todo/todo.resolver";
import { todoTypeDefs } from "./graphql/todo/todo.typedefs";

const run = async () => {
  const config = await loadConfig<TodosServiceAppConfig>(configPath, configSchema);

  const [postgres, shutdownPostgres] = await buildPostgres(config);

  // initialize repositories
  const todoRepo = TodoRepo.build(postgres);

  // initialize managers
  const todoManager = TodoManager.build(todoRepo);

  // initialize GraphQL resolvers
  const todoResolver = TodoResolver.build(todoManager);

  const shutdownCoordinator = ShutdownCoordinator.build();
  shutdownCoordinator.listenShutdownSignals("SIGTERM", "SIGINT");
  shutdownCoordinator.register(async () => {
    await shutdownPostgres();
  });

  const server = new ApolloServer({
    typeDefs: [todoTypeDefs],
    resolvers: {
      Query: {
        ...todoResolver.getQueries(),
      },
      Mutation: {
        ...todoResolver.getMutations(),
      },
    },
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 2106 },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

run().catch((error) => console.error(error));
