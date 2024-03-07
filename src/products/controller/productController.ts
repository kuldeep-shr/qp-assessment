import apiResponse from "../../utils/apiResponse";
import httpStatusCodes from "http-status-codes";
import { Request, Response } from "express";
import { productsInsertion, updateProducts } from "../service/ProductService";
import { fetchUserDetails } from "../../users/services/UserService";

export const productInsertion = async (req: Request, res: Response) => {
  const getDataOfUser: any = await fetchUserDetails(req.body.user.id);
  if (!getDataOfUser.data.is_admin) {
    return apiResponse.result(
      res,
      "only admin can add products",
      [],
      httpStatusCodes.BAD_REQUEST
    );
  }
  await productsInsertion(req.body)
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

export const updatingProducts = async (req: Request, res: Response) => {
  const getDataOfUser: any = await fetchUserDetails(req.body.user.id);
  if (!getDataOfUser.data.is_admin) {
    return apiResponse.result(
      res,
      "only admin can add products",
      [],
      httpStatusCodes.BAD_REQUEST
    );
  }
  await updateProducts(req.body)
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
