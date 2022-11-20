export const todoTypeDefs = `#graphql
  input DraftTodo {
    content: String!
  }
  
  input TodoFilter {
    completed: Boolean!
  }
  
  input TodoOrder {
    field: String!
    mode: String!
  }

  type Todo {
    id: String!
    content: String!
    completed: Boolean!
  }

  type Query {
    todos(filter: TodoFilter, order: TodoOrder): [Todo]
  }

  type Mutation {
    createTodo(draftTodo: DraftTodo!): Todo!
    deleteTodo(id: String!): Todo
    changeTodoStatus(id: String!, status: Boolean!): Todo
  }
`;
