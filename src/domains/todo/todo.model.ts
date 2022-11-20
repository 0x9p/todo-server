import { PostgresTodo } from "./todo.postgres";

export interface DraftTodoData {
  content: string;
  completed?: boolean;
}

export interface TodoData extends DraftTodoData {
  id: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type PartialTodoData = Partial<DraftTodoData>;

export class Todo {
  public static fromPostgresTodo(data: PostgresTodo): Todo {
    return new Todo(data);
  }

  public readonly id: string;
  public readonly content: string;
  public readonly completed: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  private constructor(data: TodoData) {
    this.id = data.id;
    this.content = data.content;
    this.completed = data.completed;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}