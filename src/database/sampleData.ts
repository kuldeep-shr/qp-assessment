import { Sequelize } from "sequelize";
import UserModel from "../users/model/User";
import ProductModel from "../products/model/Product";
import SampleData from "./dummyData.json";
import * as dotenv from "dotenv";
dotenv.config();

// Initialize Sequelize with SQLite database
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: String(process.env.DB_NAME),
});

const sampleDataForUser: any = SampleData;

// Function to insert sample data into the SQLite database
async function insertSampleData() {
  try {
    await UserModel.sync({ force: true });
    await UserModel.bulkCreate(sampleDataForUser.users);

    await ProductModel.sync({ force: true });
    await ProductModel.bulkCreate(sampleDataForUser.products);
    console.log("Sample data inserted successfully");
  } catch (error) {
    console.error("Error inserting sample data:", error);
  } finally {
    await sequelize.close();
  }
}
insertSampleData();
