import { DataTypes, Model } from "sequelize";
import sequelize from "../../database/connection";
import moment from "moment";

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true,
      unique: true,
      defaultValue: null,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.TIME,
      defaultValue: moment().format("YYYY-MM-DD HH:mm:ss"),
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.TIME,
      defaultValue: moment().format("YYYY-MM-DD HH:mm:ss"),
      allowNull: false,
    },
  },
  {
    createdAt: true,
    updatedAt: true,
    sequelize,
    modelName: "User",
    tableName: "users",
  }
);

export default User;
