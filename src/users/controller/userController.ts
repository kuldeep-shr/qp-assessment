import httpStatusCodes from "http-status-codes";
import { Request, Response } from "express";
import apiResponse from "../../utils/apiResponse";
import {
  insertUserService,
  userLoginService,
  userListService,
} from "../services/UserService";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    await userLoginService({
      email: email,
      password: password,
    }).then((data: any) => {
      if (data.statusCode != 400) {
        return apiResponse.result(res, data.message, data, httpStatusCodes.OK);
      } else {
        return apiResponse.result(
          res,
          data.message,
          data,
          httpStatusCodes.BAD_REQUEST
        );
      }
    });
  } catch (err) {
    return apiResponse.error(res, httpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, address } = req.body;
  try {
    await insertUserService({
      name: name,
      password: password,
      email: email,
      address: address,
    }).then((data: any) => {
      if (data.statusCode != 400) {
        return apiResponse.result(
          res,
          data.message,
          data,
          httpStatusCodes.CREATED
        );
      } else {
        return apiResponse.result(
          res,
          data.message,
          data,
          httpStatusCodes.BAD_REQUEST
        );
      }
    });
  } catch (error: any) {
    return apiResponse.error(res, httpStatusCodes.BAD_REQUEST, error.message);
  }
};

export const userList = (req: Request, res: Response) => {
  let id: number = req.params.id ? Number(req.params.id) : 0;
  console.log("the get Value", id);
  try {
    userListService(id).then((data: any) => {
      if (data.statusCode != 400) {
        return apiResponse.result(
          res,
          data.length == 0 ? "no any user exist" : "user details",
          data,
          httpStatusCodes.OK
        );
      } else {
        return apiResponse.result(
          res,
          data.message,
          data,
          httpStatusCodes.BAD_REQUEST
        );
      }
    });
  } catch (error: any) {
    return apiResponse.error(res, httpStatusCodes.BAD_REQUEST, error.message);
  }
};
