import { FindOptions } from "sequelize/types";

import { TodoManager } from "../../domains/todo/todo.manager";
import { DraftTodoData, Todo } from "../../domains/todo/todo.model";

type TodoFilter = {
  completed?: boolean;
};

type TodoOrder = {
  field: string;
  mode: 'ASC' | 'DESC';
};

type GetTodosArgs = {
  filter?: TodoFilter;
  order?: TodoOrder;
};

type CreateTodoArgs = {
  draftTodo: DraftTodoData;
};

type DeleteTodoArgs = {
  id: string;
};

type ChangeTodoStatusArgs = {
  id: string;
  status: boolean;
};

export class TodoResolver {

  public static build(repo: TodoManager): TodoResolver {
    return new TodoResolver(repo);
  }

  private readonly todoManager: TodoManager;

  private constructor(todoManager: TodoManager) {
    this.todoManager = todoManager;
  }

  private getTodos(parent: any, args: GetTodosArgs): Promise<Todo[]> {
    const options: FindOptions = {
      ...args.filter && { where: args.filter },
      ...args.order && { order: [[args.order.field, args.order.mode]] },
    };

    return this.todoManager.findAllTodos(options);
  }

  private createTodo(parent: any, args: CreateTodoArgs): Promise<Todo> {
    return this.todoManager.createTodo(args.draftTodo);
  }

  private async deleteTodo(parent: any, args: DeleteTodoArgs): Promise<Todo | null> {
    return this.todoManager.deleteTodoById(args.id);
  }

  private changeTodoStatus(parent: any, args: ChangeTodoStatusArgs): Promise<Todo | null> {
    return this.todoManager.patchTodoById(args.id, { completed: args.status });
  }

  public getQueries() {
    return {
      todos: this.getTodos.bind(this),
    };
  }

  public getMutations() {
    return {
      createTodo: this.createTodo.bind(this),
      deleteTodo: this.deleteTodo.bind(this),
      changeTodoStatus: this.changeTodoStatus.bind(this),
    };
  }
}
