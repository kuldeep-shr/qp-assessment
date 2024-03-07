import httpStatusCodes from "http-status-codes";
import { Request, Response } from "express";
import apiResponse from "../../utils/apiResponse";
import { insertUser, userLogin } from "../services/UserService";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    await userLogin({
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
  console.log("name", name, "email", email, "password", password);
  try {
    await insertUser({
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
    console.log("er", error);
    return apiResponse.error(res, httpStatusCodes.BAD_REQUEST, error.message);
  }
};
