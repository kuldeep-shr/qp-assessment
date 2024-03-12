import apiResponse from "../../utils/apiResponse";
import httpStatusCodes from "http-status-codes";
import { Request, Response } from "express";
import { CreateBooking, BookingUpdate } from "../service/types";
import { userListService } from "../../users/services/UserService";
import { checkInventoryService } from "../../inventory/service/InventoryService";
import {
  bookingInsertService,
  bookingUpdateService,
} from "../service/BookingService";

export const bookingInsert = async (req: Request, res: Response) => {
  let apiPayload: any = req.body;
  const getDataOfUser: any = await userListService(req.body.user.id);
  if (!getDataOfUser[0].is_admin) {
    return apiResponse.result(
      res,
      "only admin can add the bookings",
      [],
      httpStatusCodes.BAD_REQUEST
    );
  }

  apiPayload = apiPayload
    .filter((d: any) => !d.user)
    .map((d: any) => {
      return {
        product_id: d.product_id,
        quantity: d.quantity,
        price: d.price,
        user_id: req.body.user.id,
      };
    });
  const isInventoryGreaterProductQty: any = await checkInventoryService({
    productIdsArr: apiPayload.map((d: any) => d.product_id),
    payload: apiPayload,
  });

  if (
    isInventoryGreaterProductQty.data.length > 0 &&
    isInventoryGreaterProductQty.statusCode == 400
  ) {
    apiResponse.result(
      res,
      isInventoryGreaterProductQty.message,
      isInventoryGreaterProductQty.data,
      httpStatusCodes.BAD_REQUEST
    );
    return null;
  }
  await bookingInsertService(apiPayload)
    .then((data: any) => {
      if (data.statusCode != 400) {
        return apiResponse.result(
          res,
          data.message,
          data.data,
          httpStatusCodes.OK
        );
      } else {
        return apiResponse.result(
          res,
          data.message,
          data.data,
          httpStatusCodes.BAD_REQUEST
        );
      }
    })
    .catch((error) => {
      return apiResponse.error(res, httpStatusCodes.INTERNAL_SERVER_ERROR);
    });
};

export const bookingUpdate = async (req: Request, res: Response) => {
  let apiPayload: BookingUpdate[] = req.body;
  const getDataOfUser: any = await userListService(req.body.user.id);
  if (!getDataOfUser[0].is_admin) {
    return apiResponse.result(
      res,
      "only admin can update the bookings",
      [],
      httpStatusCodes.BAD_REQUEST
    );
  }
  await bookingUpdateService(apiPayload)
    .then((data: any) => {
      if (data.statusCode != 400) {
        return apiResponse.result(
          res,
          data.message,
          data.data,
          httpStatusCodes.OK
        );
      } else {
        return apiResponse.result(
          res,
          data.message,
          data.data,
          httpStatusCodes.BAD_REQUEST
        );
      }
    })
    .catch((error) => {
      return apiResponse.error(res, httpStatusCodes.INTERNAL_SERVER_ERROR);
    });
};
