import apiResponse from "../../utils/apiResponse";
import httpStatusCodes from "http-status-codes";
import { Request, Response } from "express";
import {
  inventoryInsertService,
  inventoryUpdateService,
  inventoryDeleteService,
} from "../service/InventoryService";
import { userListService } from "../../users/services/UserService";

export const inventoryInsert = async (req: Request, res: Response) => {
  const apiPayload: any[] = req.body;
  const getDataOfUser: any = await userListService(req.body.user.id);
  if (!getDataOfUser[0].is_admin) {
    return apiResponse.result(
      res,
      "only admin can add the inventory items",
      [],
      httpStatusCodes.BAD_REQUEST
    );
  }
  await inventoryInsertService(apiPayload)
    .then((data: any) => {
      if (data.statusCode != 400) {
        return apiResponse.result(
          res,
          data.message,
          data.data,
          httpStatusCodes.CREATED
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
export const inventoryUpdate = async (req: Request, res: Response) => {
  const apiPayload: any[] = req.body;
  const getDataOfUser: any = await userListService(req.body.user.id);
  if (!getDataOfUser[0].is_admin) {
    return apiResponse.result(
      res,
      "only admin can update the inventory items",
      [],
      httpStatusCodes.BAD_REQUEST
    );
  }
  await inventoryUpdateService(apiPayload)
    .then((data: any) => {
      if (data.statusCode != 400) {
        return apiResponse.result(
          res,
          data.message,
          data.data,
          httpStatusCodes.CREATED
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
export const inventoryDelete = async (req: Request, res: Response) => {
  const apiPayload: Array<number> = req.body;
  const getDataOfUser: any = await userListService(req.body.user.id);
  if (!getDataOfUser[0].is_admin) {
    return apiResponse.result(
      res,
      "only admin can delete the inventory items",
      [],
      httpStatusCodes.BAD_REQUEST
    );
  }
  await inventoryDeleteService(apiPayload)
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
