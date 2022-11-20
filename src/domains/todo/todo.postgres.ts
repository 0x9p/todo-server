import { Table, Model, Column, PrimaryKey, CreatedAt, UpdatedAt, DataType } from "sequelize-typescript";

export const tableName = "todo";

@Table({ tableName })
export class PostgresTodo extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  public id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public content!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  public completed!: boolean;

  @CreatedAt
  public createdAt!: Date;

  @UpdatedAt
  public updatedAt!: Date;
}
