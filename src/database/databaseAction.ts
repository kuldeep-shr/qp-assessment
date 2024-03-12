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

// Function to insert sample data into the SQLite database
async function truncateProductSampleData() {
  try {
    ProductModel.truncate();
    console.log("Product Sample data Truncate successfully");
  } catch (error) {
    console.error("Error inserting sample data:", error);
  } finally {
    await sequelize.close();
  }
}

async function truncateUserSampleData() {
  try {
    UserModel.truncate();
    console.log("User Sample data Truncate successfully");
  } catch (error) {
    console.error("Error inserting sample data:", error);
  } finally {
    await sequelize.close();
  }
}

truncateUserSampleData();
truncateProductSampleData();
