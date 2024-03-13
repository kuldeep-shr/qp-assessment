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

const bookingInsertSchema = Joi.array().items(
  Joi.object({
    product_id: Joi.number()
      .required()
      .error(new Error("please enter the valid product id")),
    quantity: Joi.number()
      .greater(-1)
      .error(new Error("please enter the valid quantity")),
    price: Joi.number().greater(0).error(new Error("please enter the price")),
  })
);

export const bookingInsertSchemaValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const { error } = bookingInsertSchema.validate(data);
  if (error) {
    apiResponse.error(res, httpStatusCodes.UNPROCESSABLE_ENTITY, error.message);
    return null;
  }
  next();
};
