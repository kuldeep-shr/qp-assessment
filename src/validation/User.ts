import Joi from "joi";
import httpStatusCodes from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import apiResponse from "../utils/apiResponse";

const registerSchema = Joi.object({
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

export const registerSchemaValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const { error } = registerSchema.validate(data);
  if (error) {
    apiResponse.error(res, httpStatusCodes.UNPROCESSABLE_ENTITY, error.message);
    return null;
  }
  next();
};

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .error(new Error("please enter the valid email")),
  password: Joi.string()
    .required()
    .error(new Error("please enter the valid password of minimum 5 words")),
});

export const loginSchemaValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const { error } = loginSchema.validate(data);
  if (error) {
    apiResponse.error(res, httpStatusCodes.UNPROCESSABLE_ENTITY, error.message);
    return null;
  }
  next();
};
