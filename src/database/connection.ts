import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

// Initialize Sequelize with SQLite database
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: String(process.env.DB_NAME),
});

export default sequelize;
