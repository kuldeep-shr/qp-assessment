import { DataTypes, Model } from "sequelize";
import sequelize from "../../database/connection";
import moment from "moment";
import ProductModel from "../../products/model/Product";

class Inventory extends Model {
  public id!: number;
  public product_id!: number;
  public remaining!: number;
  public booked!: number;
}

Inventory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    remaining: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    booked: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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
    modelName: "Inventory",
    tableName: "inventorys",
  }
);

export default Inventory;
