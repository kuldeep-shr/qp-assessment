import { BookingUpdate, CreateBooking } from "./types";
import sequelize from "../../database/connection";
import BookingModel from "../model/Booking";
import ProductModel from "../../products/model/Product";
import InventoryModel from "../../inventory/model/Inventory";
import { inventoryUpdateService } from "../../inventory/service/InventoryService";

export const bookingInsertService = (args: Array<CreateBooking>) => {
  return new Promise(async (resolve, reject) => {
    const t = await sequelize.transaction();
    try {
      const extractProductIds: Array<number> = args.map(
        (d: any) => d.product_id
      );
      let itemIsOutOfStockOrNot: any = await ProductModel.findAll({
        where: { id: extractProductIds },
        include: [InventoryModel],
      });
      itemIsOutOfStockOrNot = itemIsOutOfStockOrNot.map(
        (d: any) => d.dataValues
      );
      const unmatchedIds = extractProductIds.filter(
        (id) => !itemIsOutOfStockOrNot.some((item: any) => item.id === id)
      );
      if (itemIsOutOfStockOrNot.length == 0) {
        return resolve({
          isError: false,
          statusCode: 400,
          data: [],
          message: "product is not exist in our inventory",
        });
      }

      if (unmatchedIds.length > 0) {
        return resolve({
          isError: false,
          statusCode: 400,
          data: [],
          message: "product " + unmatchedIds + " is not exist in our inventory",
        });
      }
      BookingModel.bulkCreate(args)
        .then((data) => {
          // update inventory too, booked and remainig
          args.map(async (d: any) => {
            let getInventoryData: any = await InventoryModel.findOne({
              where: { product_id: d.product_id },
            });
            getInventoryData = getInventoryData.toJSON();
            console.log(
              "getInventoryData..... NINJA TECHNIQUES",
              getInventoryData
            );
            await inventoryUpdateService([
              {
                id: getInventoryData.id,
                remaining: getInventoryData.remaining - d.quantity,
                booked: getInventoryData.booked + d.quantity,
              },
            ]);
          });
          return resolve({
            isError: false,
            statusCode: 201,
            message: "booking created successfully",
            data: data,
          });
        })
        .catch((error) => {
          return reject({
            isError: true,
            statusCode: 400,
            message: "something went wrong, while product insertion",
            data: [],
          });
        });
    } catch (error) {
      await t.rollback();
      return reject({
        isError: true,
        statusCode: 400,
        message: "something went wrong, while booking insertion",
        data: [],
      });
    }
  });
};

export const bookingUpdateService = (args: BookingUpdate[]) => {
  return new Promise(async (resolve, reject) => {
    const t = await sequelize.transaction();
    try {
      const extractBookingIds: Array<number> = args.map((d: any) => d.id);
      let getDataOfBookings = await BookingModel.findAll({
        where: { id: extractBookingIds },
      });
      getDataOfBookings = getDataOfBookings.map((d: any) => d.dataValues);
      const unmatchedIds = extractBookingIds.filter(
        (id) => !getDataOfBookings.some((item: any) => item.id === id)
      );
      if (unmatchedIds.length > 0) {
        return resolve({
          isError: false,
          statusCode: 400,
          data: [],
          message: "boking " + unmatchedIds + " is not exist",
        });
      }

      await Promise.all(
        args.map(async (booking: any) => {
          const bookingUpdate = await BookingModel.findByPk(booking.id);
          if (!bookingUpdate) {
            throw new Error(`booking with ID ${booking.id} not found`);
          }

          await bookingUpdate.update(booking);
          if (booking.hasOwnProperty("quantity")) {
            let getInventoryData: any = await InventoryModel.findOne({
              where: { product_id: bookingUpdate.product_id },
            });
            getInventoryData = getInventoryData.toJSON();
            let UpdateInventory: any = [];
            UpdateInventory.push({
              id: getInventoryData.id,
              remaining: booking.quantity,
              booked: 0,
            });
            await inventoryUpdateService(UpdateInventory);
          }
        })
      );
      return resolve({
        isError: false,
        statusCode: 200,
        message: "booking updated successfully",
        data: [],
      });
    } catch (error) {
      return reject({
        isError: true,
        statusCode: 400,
        message: "something went wrong, while booking updating",
        data: [],
      });
    }
  });
};
