"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationSchemaValidation = exports.taskListSchemaValidation = exports.updateTaskSchemaValidation = exports.createTaskSchemaValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
var task_status;
(function (task_status) {
    task_status["open_tasks"] = "open_tasks";
    task_status["inprogress_tasks"] = "inprogress_tasks";
    task_status["completed_tasks"] = "completed_tasks";
})(task_status || (task_status = {}));
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
const createTaskSchema = joi_1.default.array()
    .items(joi_1.default.object()
    .keys({
    title: joi_1.default.string().required(),
    description: joi_1.default.string()
        .required()
        .error(new Error("Please Enter the description")),
    scheduled_at: joi_1.default.date().min("now").optional().allow(""),
})
    .required())
    .min(1)
    .required();
const createTaskSchemaValidation = (req, res, next) => {
    const data = req.body;
    const { error } = createTaskSchema.validate(data.tasks);
    if (error) {
        if (error.details[0].type == "array.includesRequiredUnknowns" ||
            error.details[0].type == "any.required") {
            apiResponse_1.default.error(res, http_status_codes_1.default.UNPROCESSABLE_ENTITY, error.details[0].type == "any.required"
                ? "Please enter the request body"
                : "Please pass atleast single task");
            return null;
        }
        if (error.details[0].type == "date.min") {
            apiResponse_1.default.error(res, http_status_codes_1.default.UNPROCESSABLE_ENTITY, "Past date will not accept");
            return null;
        }
        if (error.details[0].type == "object.unknown") {
            apiResponse_1.default.error(res, http_status_codes_1.default.UNPROCESSABLE_ENTITY, "Please check the api keys");
            return null;
        }
        else {
            apiResponse_1.default.error(res, http_status_codes_1.default.UNPROCESSABLE_ENTITY, error.details[0].message);
            return null;
        }
    }
    next();
};
exports.createTaskSchemaValidation = createTaskSchemaValidation;
const updateTaskSchema = joi_1.default.object({
    id: joi_1.default.number().required(),
    title: joi_1.default.string().allow("").min(10).optional(),
    description: joi_1.default.string().allow("").min(10).optional(),
    status: joi_1.default.string()
        .valid(...Object.values(task_status))
        .optional(),
    scheduled_at: joi_1.default.date().min("now").optional(),
});
const updateTaskSchemaValidation = (req, res, next) => {
    const data = req.body;
    const { error, value } = updateTaskSchema.validate(data);
    if (error) {
        if (error.details[0].type == "date.min") {
            apiResponse_1.default.error(res, http_status_codes_1.default.UNPROCESSABLE_ENTITY, "Past date will not accept");
            return null;
        }
        else if (error.details[0].type == "any.only") {
            apiResponse_1.default.error(res, http_status_codes_1.default.UNPROCESSABLE_ENTITY, "Please Pass these status [open_tasks, inprogress_tasks, completed_tasks]");
            return null;
        }
        else {
            apiResponse_1.default.error(res, http_status_codes_1.default.UNPROCESSABLE_ENTITY, error.details[0].message);
            return null;
        }
    }
    next();
};
exports.updateTaskSchemaValidation = updateTaskSchemaValidation;
const taskListSchema = joi_1.default.object({
    id: joi_1.default.number().allow(0),
    title: joi_1.default.string().allow(""),
    status: joi_1.default.array().items(joi_1.default.string().valid(...Object.values(task_status))),
    scheduled_at: joi_1.default.string().allow(""),
    created_at: joi_1.default.string().allow(""),
    updated_at: joi_1.default.string().allow(""),
    current_page: joi_1.default.number(),
    total_item: joi_1.default.number(),
});
const taskListSchemaValidation = (req, res, next) => {
    const data = req.body;
    const { error, value } = taskListSchema.validate(data);
    if (Object.keys(value).length == 0) {
        apiResponse_1.default.error(res, http_status_codes_1.default.UNPROCESSABLE_ENTITY, "Please enter the request body");
        return null;
    }
    if (error) {
        if (error.details[0].type == "any.only") {
            apiResponse_1.default.error(res, http_status_codes_1.default.UNPROCESSABLE_ENTITY, "Please Pass these status [open_tasks, inprogress_tasks, completed_tasks]");
            return null;
        }
        else {
            apiResponse_1.default.error(res, http_status_codes_1.default.UNPROCESSABLE_ENTITY, error.details[0].message);
            return null;
        }
    }
    next();
};
exports.taskListSchemaValidation = taskListSchemaValidation;
const paginationSchema = joi_1.default.object({
    status: joi_1.default.array()
        .items(joi_1.default.string().valid(...Object.values(task_status)))
        .required()
        .optional(),
    scheduled_at: joi_1.default.string().allow("").required().optional(),
});
const paginationSchemaValidation = (req, res, next) => {
    const data = req.body;
    const { error } = paginationSchema.validate(data);
    if (error) {
        if (error.details[0].type == "any.only") {
            apiResponse_1.default.error(res, http_status_codes_1.default.UNPROCESSABLE_ENTITY, "Please Pass these status [open_tasks, inprogress_tasks, completed_tasks]");
            return null;
        }
        else {
            apiResponse_1.default.error(res, http_status_codes_1.default.UNPROCESSABLE_ENTITY, error.details[0].message);
            return null;
        }
    }
    next();
};
exports.paginationSchemaValidation = paginationSchemaValidation;
//# sourceMappingURL=Task.js.map