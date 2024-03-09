import apiResponse from "../../utils/apiResponse";
import httpStatusCodes from "http-status-codes";
import { Request, Response } from "express";
import {
  productInsertService,
  updateProductService,
  deleteProductService,
} from "../service/ProductService";
import { fetchUserDetailService } from "../../users/services/UserService";

export const productInsert = async (req: Request, res: Response) => {
  const getDataOfUser: any = await fetchUserDetailService(req.body.user.id);
  if (!getDataOfUser.data[0].is_admin) {
    return apiResponse.result(
      res,
      "only admin can add products",
      [],
      httpStatusCodes.BAD_REQUEST
    );
  }
  await productInsertService(req.body)
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

export const updateProduct = async (req: Request, res: Response) => {
  const getDataOfUser: any = await fetchUserDetailService(req.body.user.id);
  if (!getDataOfUser.data[0].is_admin) {
    return apiResponse.result(
      res,
      "only admin can add products",
      [],
      httpStatusCodes.BAD_REQUEST
    );
  }
  await updateProductService(req.body)
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

export const deleteProduct = async (req: Request, res: Response) => {
  const productIds = req.body;
  await deleteProductService(productIds)
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
