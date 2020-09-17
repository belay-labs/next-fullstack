import { DataTypes, Model, Optional, Sequelize } from "sequelize";

import { restoreSequelizeAttributesOnClass } from "./helpers";

export interface PostAttributes {
  id: number;
  text: string;
  createdById: number;
}

export interface PostCreationAttributes
  extends Optional<PostAttributes, "id"> {}

export class Post
  extends Model<PostAttributes, PostCreationAttributes>
  implements PostAttributes {
  public id!: number;
  public text!: string;
  public createdById!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  constructor(...args: any[]) {
    super(...args);
    restoreSequelizeAttributesOnClass(new.target, this);
  }

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    Post.belongsTo(models.User, {
      as: "createdBy",
      foreignKey: "createdById",
    });
  }
}

export const PostFactory = (sequelize: Sequelize, DataTypes: any) => {
  Post.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      createdById: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Post",
      tableName: "posts",
    }
  );

  return Post;
};
