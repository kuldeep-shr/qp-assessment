"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../database/connection"));
const moment_1 = __importDefault(require("moment"));
class User extends sequelize_1.Model {
}
User.init({
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
    email: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
        unique: true,
        defaultValue: null,
    },
    password: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
    },
    is_admin: {
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
    modelName: "User",
    tableName: "users",
});
exports.default = User;
//# sourceMappingURL=User.js.map