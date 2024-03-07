"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../database/connection"));
const moment_1 = __importDefault(require("moment"));
class Product extends sequelize_1.Model {
}
Product.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        defaultValue: 0,
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.TIME,
        defaultValue: (0, moment_1.default)().format("YYYY-MM-DD HH:mm:ss"),
        allowNull: false,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.TIME,
        defaultValue: (0, moment_1.default)().format("YYYY-MM-DD HH:mm:ss"),
        allowNull: false,
    },
}, {
    createdAt: true,
    updatedAt: true,
    sequelize: connection_1.default,
    modelName: "Product",
    tableName: "products",
});
exports.default = Product;
//# sourceMappingURL=Product.js.map