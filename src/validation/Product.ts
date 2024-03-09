import Joi from "joi";
import httpStatusCodes from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import apiResponse from "../utils/apiResponse";

const productInsertionSchema = Joi.array().items(
  Joi.object({
    name: Joi.string()
      .min(5)
      .required()
      .error(new Error("please enter the valid product name")),
    quantity: Joi.number()
      .required()
      .error(new Error("please enter the quantity")),
    price: Joi.number().required().error(new Error("please enter the price")),
    status: Joi.boolean()
      .required()
      .error(new Error("please enter the product status")),
  })
);

export const productInsertionSchemaValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const { error } = productInsertionSchema.validate(data);
  if (error) {
    apiResponse.error(res, httpStatusCodes.UNPROCESSABLE_ENTITY, error.message);
    return null;
  }
  next();
};

const productUpdationSchema = Joi.array().items(
  Joi.object({
    id: Joi.number().required().error(new Error("Please enter the product id")),
    name: Joi.string()
      .min(5)
      .when("id", { is: Joi.exist(), then: Joi.required() })
      .error(new Error("Please enter the valid product name")),
    quantity: Joi.number()
      .when("id", { is: Joi.exist(), then: Joi.required() })
      .error(new Error("Please enter the quantity")),
    price: Joi.number()
      .when("id", { is: Joi.exist(), then: Joi.required() })
      .error(new Error("Please enter the price")),
    status: Joi.boolean()
      .when("id", { is: Joi.exist(), then: Joi.required() })
      .error(new Error("Please enter the product status")),
  }).or("name", "quantity", "price", "status")
);

export const productUpdationSchemaValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const { error } = productUpdationSchema.validate(data);
  if (error) {
    apiResponse.error(res, httpStatusCodes.UNPROCESSABLE_ENTITY, error.message);
    return null;
  }
  next();
};
