import { Sequelize } from "sequelize";

interface DbInterface {
  sequelize: Sequelize;
  Sequelize: any;
}

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  // https://github.com/vercel/ncc/issues/345#issuecomment-487404520
  dialect: "postgres",
  dialectModule: require("pg"),
});

const db: DbInterface = {
  sequelize,
  Sequelize,
};

export default db;
