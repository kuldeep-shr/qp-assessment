import { Sequelize } from "sequelize";
import UserModel from "../users/model/User";
import ProductModel from "../products/model/Product";
import SampleData from "./dummyData.json";
import { hashPassword } from "../middleware/commonMiddlewares";
import * as dotenv from "dotenv";
dotenv.config();

// Initialize Sequelize with SQLite database
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: String(process.env.DB_NAME),
});

let sampleDataForUser: any = SampleData;
// sampleDataForUser.users = Promise.all(sampleDataForUser.users.map(async (data: any) => {
//   const hashingPassword = await hashPassword(data.password);
//   console.log("hashingPassword.....", data, hashingPassword);
//   return {
//     name: data.name,
//     email: data.email,
//     is_admin: data.is_admin,
//     password: hashingPassword,
//   };
// }));

function modifySampleUserData(obj: any) {
  return new Promise(async (resolve, reject) => {
    let pwd = await hashPassword(obj.password);
    obj.password = pwd;
  });
}

let modifiedArray;

Promise.all(
  sampleDataForUser.users.map((obj: any) => modifySampleUserData(obj))
)
  .then((modifiedArrayResult) => {
    modifiedArray = modifiedArrayResult;
    console.log(modifiedArray);
  })
  .catch((error) => {
    throw new Error("something went wrong, while modifying the array");
  });

console.log("modifiedArray", modifiedArray);
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
