import Joi from "joi";
import httpStatusCodes from "http-status-codes";
import { Request, Response, NextFunction } from "express";
enum task_status {
  open_tasks = "open_tasks",
  inprogress_tasks = "inprogress_tasks",
  completed_tasks = "completed_tasks",
}
import apiResponse from "../utils/apiResponse";

const createTaskSchema = Joi.array()
  .items(
    Joi.object()
      .keys({
        title: Joi.string().required(),
        description: Joi.string()
          .required()
          .error(new Error("Please Enter the description")),
        scheduled_at: Joi.date().min("now").optional().allow(""),
      })
      .required()
  )
  .min(1)
  .required();
export const createTaskSchemaValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const { error } = createTaskSchema.validate(data.tasks);
  if (error) {
    if (
      error.details[0].type == "array.includesRequiredUnknowns" ||
      error.details[0].type == "any.required"
    ) {
      apiResponse.error(
        res,
        httpStatusCodes.UNPROCESSABLE_ENTITY,
        error.details[0].type == "any.required"
          ? "Please enter the request body"
          : "Please pass atleast single task"
      );
      return null;
    }
    if (error.details[0].type == "date.min") {
      apiResponse.error(
        res,
        httpStatusCodes.UNPROCESSABLE_ENTITY,
        "Past date will not accept"
      );

      return null;
    }
    if (error.details[0].type == "object.unknown") {
      apiResponse.error(
        res,
        httpStatusCodes.UNPROCESSABLE_ENTITY,
        "Please check the api keys"
      );
      return null;
    } else {
      apiResponse.error(
        res,
        httpStatusCodes.UNPROCESSABLE_ENTITY,
        error.details[0].message
      );
      return null;
    }
  }
  next();
};

const updateTaskSchema = Joi.object({
  id: Joi.number().required(),
  title: Joi.string().allow("").min(10).optional(),
  description: Joi.string().allow("").min(10).optional(),
  status: Joi.string()
    .valid(...Object.values(task_status))
    .optional(),
  scheduled_at: Joi.date().min("now").optional(),
});

export const updateTaskSchemaValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const { error, value } = updateTaskSchema.validate(data);
  if (error) {
    if (error.details[0].type == "date.min") {
      apiResponse.error(
        res,
        httpStatusCodes.UNPROCESSABLE_ENTITY,
        "Past date will not accept"
      );
      return null;
    } else if (error.details[0].type == "any.only") {
      apiResponse.error(
        res,
        httpStatusCodes.UNPROCESSABLE_ENTITY,
        "Please Pass these status [open_tasks, inprogress_tasks, completed_tasks]"
      );
      return null;
    } else {
      apiResponse.error(
        res,
        httpStatusCodes.UNPROCESSABLE_ENTITY,
        error.details[0].message
      );
      return null;
    }
  }
  next();
};

const taskListSchema = Joi.object({
  id: Joi.number().allow(0),
  title: Joi.string().allow(""),
  status: Joi.array().items(Joi.string().valid(...Object.values(task_status))),
  scheduled_at: Joi.string().allow(""),
  created_at: Joi.string().allow(""),
  updated_at: Joi.string().allow(""),
  current_page: Joi.number(),
  total_item: Joi.number(),
});
export const taskListSchemaValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const { error, value } = taskListSchema.validate(data);
  if (Object.keys(value).length == 0) {
    apiResponse.error(
      res,
      httpStatusCodes.UNPROCESSABLE_ENTITY,
      "Please enter the request body"
    );
    return null;
  }

  if (error) {
    if (error.details[0].type == "any.only") {
      apiResponse.error(
        res,
        httpStatusCodes.UNPROCESSABLE_ENTITY,
        "Please Pass these status [open_tasks, inprogress_tasks, completed_tasks]"
      );
      return null;
    } else {
      apiResponse.error(
        res,
        httpStatusCodes.UNPROCESSABLE_ENTITY,
        error.details[0].message
      );
      return null;
    }
  }
  next();
};

const paginationSchema = Joi.object({
  status: Joi.array()
    .items(Joi.string().valid(...Object.values(task_status)))
    .required()
    .optional(),
  scheduled_at: Joi.string().allow("").required().optional(),
});
export const paginationSchemaValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const { error } = paginationSchema.validate(data);
  if (error) {
    if (error.details[0].type == "any.only") {
      apiResponse.error(
        res,
        httpStatusCodes.UNPROCESSABLE_ENTITY,
        "Please Pass these status [open_tasks, inprogress_tasks, completed_tasks]"
      );
      return null;
    } else {
      apiResponse.error(
        res,
        httpStatusCodes.UNPROCESSABLE_ENTITY,
        error.details[0].message
      );
      return null;
    }
  }
  next();
};
