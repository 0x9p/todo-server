import { FindOptions } from "sequelize/types";

import { TodoRepo } from "./todo.repo";
import { DraftTodoData, Todo } from "./todo.model";

export class TodoManager {
  public static build(repo: TodoRepo): TodoManager {
    return new TodoManager(repo);
  }

  private readonly repo: TodoRepo;

  private constructor(repo: TodoRepo) {
    this.repo = repo;
  }

  public async findAllTodos(options?: FindOptions): Promise<Todo[]> {
    const records = await this.repo.findAllTodos(options);

    return records.map(Todo.fromPostgresTodo);
  }

  public async createTodo(data: DraftTodoData): Promise<Todo> {
    const record = await this.repo.createTodo(data);

    return Todo.fromPostgresTodo(record);
  }

  public async patchTodoById(id: string, data: Partial<DraftTodoData>): Promise<Todo | null> {
    const record = await this.repo.patchTodoById(id, data);

    if (record) {
      return Todo.fromPostgresTodo(record);
    }

    return null;
  }

  public async deleteTodoById(id: string): Promise<Todo | null> {
    const record = await this.repo.deleteTodoById(id);

    if (record) {
      return Todo.fromPostgresTodo(record);
    }

    return null;
  }
}
