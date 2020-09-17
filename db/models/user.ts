import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface UserAttributes {
  id: number;
  email: string;
  name: string;
  imgUrl: string;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id"> {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  public id!: number;
  public email!: string;
  public name!: string;
  public imgUrl!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: Array<Model>) {}
}

export const UserFactory = (sequelize: Sequelize, DataTypes: any) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );

  return User;
};
