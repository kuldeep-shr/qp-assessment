import apiResponse from "../../utils/apiResponse";
import httpStatusCodes from "http-status-codes";
import { Request, Response } from "express";
import {
  productInsertService,
  updateProductService,
  deleteProductService,
  productListService,
} from "../service/ProductService";
import { userListService } from "../../users/services/UserService";

export const productInsert = async (req: Request, res: Response) => {
  let apiPayload = req.body.filter((d: any) => !d.user);
  const getDataOfUser: any = await userListService(req.body.user.id);
  if (!getDataOfUser[0].is_admin) {
    return apiResponse.result(
      res,
      "only admin can add products",
      [],
      httpStatusCodes.BAD_REQUEST
    );
  }
  await productInsertService(apiPayload)
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
  const getDataOfUser: any = await userListService(req.body.user.id);
  if (!getDataOfUser[0].is_admin) {
    return apiResponse.result(
      res,
      "only admin can update the products",
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
  const getDataOfUser: any = await userListService(req.body.user.id);
  if (!getDataOfUser[0].is_admin) {
    return apiResponse.result(
      res,
      "only admin can delete the products",
      [],
      httpStatusCodes.BAD_REQUEST
    );
  }

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

export const productList = async (req: Request, res: Response) => {
  const productId: number = req.params.productId
    ? Number(req.params.productId)
    : 0;
  const getDataOfUser: any = await userListService(req.body.user.id);
  await productListService({
    is_admin: getDataOfUser[0].is_admin,
    id: productId,
  })
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
