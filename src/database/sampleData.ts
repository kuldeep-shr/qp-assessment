import { Sequelize } from "sequelize";
import UserModel from "../users/model/User";
import ProductModel from "../products/model/Product";
import InventoryModel from "../inventory/model/Inventory";
import BookingModel from "../booking/model/Booking";
import SampleData from "./dummyData.json";
import { hashPassword } from "../middleware/commonMiddlewares";
import * as dotenv from "dotenv";
dotenv.config();

// Initialize Sequelize with SQLite database
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: String(process.env.DB_NAME),
});

function modifySampleUserData(obj: any) {
  return new Promise(async (resolve, reject) => {
    let pwd = await hashPassword(obj.password);
    obj.password = pwd;
  });
}

let modifiedArray;
let sampleDataForInventory: any[] = [];
Promise.all(SampleData.users.map((obj: any) => modifySampleUserData(obj)))
  .then((modifiedArrayResult) => {
    modifiedArray = modifiedArrayResult;
  })
  .catch((error) => {
    throw new Error("something went wrong, while modifying the array");
  });

// Function to insert sample data into the SQLite database
async function insertSampleData() {
  try {
    await UserModel.sync({ force: true });
    await UserModel.bulkCreate(SampleData.users);

    await ProductModel.sync({ force: true });
    await ProductModel.bulkCreate(SampleData.products);

    const getProductData = await ProductModel.findAll();
    if (getProductData) {
      getProductData.map((d: any) => {
        return sampleDataForInventory.push({
          product_id: d.dataValues.id,
          remaining: d.dataValues.quantity,
          booked: 0,
        });
      });
      await InventoryModel.sync({ force: true });
      await InventoryModel.bulkCreate(sampleDataForInventory);
      await BookingModel.sync({ force: true });
    }

    console.log("Sample data inserted successfully");
  } catch (error) {
    console.error("Error inserting sample data:", error);
  } finally {
    await sequelize.close();
  }
}
insertSampleData();
