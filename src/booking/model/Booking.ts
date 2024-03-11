import { DataTypes, Model } from "sequelize";
import sequelize from "../../database/connection";
import moment from "moment";

class Booking extends Model {
  public id!: number;
  public user_id!: number;
  public product_id!: number;
  public quantity!: number;
}

/*
    booking
    - id
    - user id
    - product id
    - quantity
    - creation date
    - updation date

*/

Booking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    product_id: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    quantity: {
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
    modelName: "Booking",
    tableName: "bookings",
  }
);

export default Booking;
