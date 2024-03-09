import Joi from "joi";
import httpStatusCodes from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import apiResponse from "../utils/apiResponse";

const customValidator = (value: any, helpers: any) => {
  if (value === "" || value === 0 || value === undefined) {
    return helpers.error("any.invalid");
  }
  return value;
};

const productInsertSchema = Joi.array().items(
  Joi.object({
    name: Joi.string()
      .min(5)
      .required()
      .error(new Error("please enter the valid product name")),
    quantity: Joi.number()
      .greater(0)
      .required()
      .error(new Error("please enter the valid quantity")),
    price: Joi.number().required().error(new Error("please enter the price")),
    status: Joi.boolean()
      .required()
      .error(new Error("please enter the product status")),
  })
);

export const productInsertSchemaValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const { error } = productInsertSchema.validate(data);
  if (error) {
    apiResponse.error(res, httpStatusCodes.UNPROCESSABLE_ENTITY, error.message);
    return null;
  }
  next();
};

const productUpdateSchema = Joi.array().items(
  Joi.object({
    id: Joi.number().required().error(new Error("please enter the product id")),
    name: Joi.string()
      .custom(customValidator)
      .error(new Error("please enter the valid product name")),
    quantity: Joi.number()
      .greater(0)
      .custom(customValidator)
      .error(new Error("please enter the valid quantity")),
    price: Joi.number()
      .custom(customValidator)
      .error(new Error("please enter the price")),
    status: Joi.boolean().error(new Error("please pass true or false")),
  })
);

export const productUpdateSchemaValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const { error } = productUpdateSchema.validate(data);
  if (error) {
    apiResponse.error(res, httpStatusCodes.UNPROCESSABLE_ENTITY, error.message);
    return null;
  }
  next();
};

const productDeleteSchema = Joi.array()
  .min(1)
  .required()
  .error(new Error("please enter the id to delete the product"));

export const productDeleteSchemaValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const { error } = productDeleteSchema.validate(data);
  if (error) {
    apiResponse.error(res, httpStatusCodes.UNPROCESSABLE_ENTITY, error.message);
    return null;
  }
  next();
};
