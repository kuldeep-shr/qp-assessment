import { DataTypes, Model } from "sequelize";
import sequelize from "../../database/connection";
import moment from "moment";

class Product extends Model {
  public id!: number;
  public name!: string;
  public quantity!: string;
}

Product.init(
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
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    status: {
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
    modelName: "Product",
    tableName: "products",
  }
);

export default Product;
