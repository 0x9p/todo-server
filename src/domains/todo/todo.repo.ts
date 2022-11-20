import { isUndefined, omitBy } from "lodash";
import { FindOptions, Sequelize } from "sequelize";

import { DraftTodoData, PartialTodoData } from "./todo.model";
import { PostgresTodo } from "./todo.postgres";

export class TodoRepo {
  public static build(sequelize: Sequelize, name = PostgresTodo.name): TodoRepo {
    const isInitialized = !!sequelize.modelManager.getModel(name);

    if (isInitialized) {
      return new TodoRepo(PostgresTodo);
    }

    throw new Error(`"${name}" model is not registered in sequelize`);
  }

  private readonly model: typeof PostgresTodo;

  private constructor(model: typeof PostgresTodo) {
    this.model = model;
  }

  public findAllTodos(options?: FindOptions): Promise<PostgresTodo[]> {
    return this.model.findAll(options);
  }

  public async findTodoById(id: string): Promise<PostgresTodo | null> {
    return await this.model.findByPk(id);
  }

  public async createTodo(data: DraftTodoData): Promise<PostgresTodo> {
    return this.model.create({
      content: data.content,
      completed: data.completed,
    });
  }

  public async patchTodoById(id: string, data: PartialTodoData): Promise<PostgresTodo | null> {
    const record = await this.findTodoById(id);

    if (record) {
      await record.update(omitBy(data, isUndefined));
    }

    return record;
  }

  public async deleteTodoById(id: string): Promise<PostgresTodo | null> {
    const record = await this.findTodoById(id);

    if (record) {
      await this.model.destroy({ where: { id } });
    }

    return record;
  }
}
