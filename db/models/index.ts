import { DataTypes, Sequelize } from "sequelize";

import { PostFactory } from "./post";
import { UserFactory } from "./user";

interface DbInterface {
  sequelize: Sequelize;
  Sequelize: any;
  User: any;
  Post: any;
}

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  // https://github.com/vercel/ncc/issues/345#issuecomment-487404520
  dialect: "postgres",
  dialectModule: require("pg"),
});

const db: DbInterface = {
  sequelize,
  Sequelize,
  Post: PostFactory(sequelize, DataTypes),
  User: UserFactory(sequelize, DataTypes),
};

Object.keys(db).forEach((modelName) => {
  // @ts-ignore: TS7053
  if (db[modelName].associate) db[modelName].associate(db);
});

export default db;
