import Joi from "joi";
import httpStatusCodes from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import apiResponse from "../utils/apiResponse";

const userRegisterSchema = Joi.object({
  name: Joi.string().required().error(new Error("please enter the name")),
  email: Joi.string()
    .email()
    .required()
    .error(new Error("please enter the valid email")),
  password: Joi.string()
    .min(5)
    .required()
    .error(new Error("please enter the valid password of minimum 5 words")),
});

export const userRegisterSchemaValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const { error } = userRegisterSchema.validate(data);
  if (error) {
    apiResponse.error(res, httpStatusCodes.UNPROCESSABLE_ENTITY, error.message);
    return null;
  }
  next();
};

const userLoginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .error(new Error("please enter the valid email")),
  password: Joi.string()
    .required()
    .error(new Error("please enter the valid password of minimum 5 words")),
});

export const userLoginSchemaValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const { error } = userLoginSchema.validate(data);
  if (error) {
    apiResponse.error(res, httpStatusCodes.UNPROCESSABLE_ENTITY, error.message);
    return null;
  }
  next();
};
