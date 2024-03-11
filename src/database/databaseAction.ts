import { Sequelize } from "sequelize";
import UserModel from "../users/model/User";
import ProductModel from "../products/model/Product";
import * as dotenv from "dotenv";
dotenv.config();

// Initialize Sequelize with SQLite database
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: String(process.env.DB_NAME),
});

const truncateProductTable = async () => {
  try {
    await ProductModel.truncate();
    console.log("successfully truncating of product table:");
  } catch (error) {
    console.error("Error truncating of product table:", error);
  } finally {
    await sequelize.close();
  }
};

export { truncateProductTable };
