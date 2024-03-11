import { BookingUpdate, CreateBooking } from "./types";
import BookingModel from "../model/Booking";
import ProductModel from "../../products/model/Product";

export const bookingInsertService = (args: Array<CreateBooking>) => {
  return new Promise(async (resolve, reject) => {
    const extractProductIds: Array<number> = args.map((d: any) => d.product_id);

    console.log("extractProductIds", extractProductIds);
    //check product exist or not
    let productExistsFromDB: any = await ProductModel.findAll({
      where: { id: extractProductIds },
    });
    productExistsFromDB = productExistsFromDB.map((d: any) => d.dataValues);

    const saveProductsToDB = args.filter(
      (item: any) =>
        !productExistsFromDB.data.some(
          (dbItem: any) => dbItem.name === item.name
        )
    );

    // const matchedNames = data
    //   .filter((item: any) =>
    //     productExistsFromDB.data.some(
    //       (dbItem: any) => dbItem.name === item.name
    //     )
    //   )
    //   .map((item: any) => item.name);

    if (productExistsFromDB.length == 0) {
      return resolve({
        isError: false,
        statusCode: 200,
        data: [],
        message: "product is not exist in our grocery",
      });
    }

    // BookingModel.bulkCreate(saveProductsToDB)
    //   .then((data) => {
    //     return resolve({
    //       isError: false,
    //       statusCode: 201,
    //       message:
    //         saveProductsToDB.length == 0
    //           ? "product already exist in our grocery"
    //           : matchedNames.length == 0
    //           ? "product inserted successfully"
    //           : "only this product is not inserted " +
    //             matchedNames +
    //             " remains inserted successfully",
    //       data: data,
    //     });
    //   })
    //   .catch((error) => {
    //     return reject({
    //       isError: true,
    //       statusCode: 400,
    //       message: "something went wrong, while product insertion",
    //       data: [],
    //     });
    //   });
  });
};
