"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const User_1 = __importDefault(require("../users/model/User"));
const Product_1 = __importDefault(require("../products/model/Product"));
const dummyData_json_1 = __importDefault(require("./dummyData.json"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
// Initialize Sequelize with SQLite database
const sequelize = new sequelize_1.Sequelize({
    dialect: "sqlite",
    storage: String(process.env.DB_NAME),
});
const sampleDataForUser = dummyData_json_1.default;
// Function to insert sample data into the SQLite database
async function insertSampleData() {
    try {
        await User_1.default.sync({ force: true });
        await User_1.default.bulkCreate(sampleDataForUser.users);
        await Product_1.default.sync({ force: true });
        await Product_1.default.bulkCreate(sampleDataForUser.products);
        console.log("Sample data inserted successfully");
    }
    catch (error) {
        console.error("Error inserting sample data:", error);
    }
    finally {
        await sequelize.close();
    }
}
insertSampleData();
//# sourceMappingURL=sampleData.js.map