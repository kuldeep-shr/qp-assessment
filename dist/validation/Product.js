"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productUpdationSchemaValidation = exports.productInsertionSchemaValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
const productInsertionSchema = joi_1.default.array().items(joi_1.default.object({
    name: joi_1.default.string()
        .min(5)
        .required()
        .error(new Error("please enter the valid product name")),
    quantity: joi_1.default.number()
        .required()
        .error(new Error("please enter the quantity")),
    price: joi_1.default.number().required().error(new Error("please enter the price")),
    status: joi_1.default.boolean()
        .required()
        .error(new Error("please enter the product status")),
}));
const productInsertionSchemaValidation = (req, res, next) => {
    const data = req.body;
    console.log("in validation of products", data);
    const { error } = productInsertionSchema.validate(data);
    if (error) {
        apiResponse_1.default.error(res, http_status_codes_1.default.UNPROCESSABLE_ENTITY, error.message);
        return null;
    }
    next();
};
exports.productInsertionSchemaValidation = productInsertionSchemaValidation;
const productUpdationSchema = joi_1.default.array().items(joi_1.default.object({
    id: joi_1.default.number().required().error(new Error("please enter the product id")),
    name: joi_1.default.string()
        .min(5)
        .required()
        .error(new Error("please enter the valid product name")),
    quantity: joi_1.default.number()
        .required()
        .error(new Error("please enter the quantity")),
    price: joi_1.default.number().required().error(new Error("please enter the price")),
    status: joi_1.default.boolean()
        .required()
        .error(new Error("please enter the product status")),
})
    .max(1)
    .error(new Error("at least one product property is required when id is provided")));
const productUpdationSchemaValidation = (req, res, next) => {
    const data = req.body;
    console.log("in validation of products", data);
    const { error } = productUpdationSchema.validate(data);
    if (error) {
        apiResponse_1.default.error(res, http_status_codes_1.default.UNPROCESSABLE_ENTITY, error.message);
        return null;
    }
    next();
};
exports.productUpdationSchemaValidation = productUpdationSchemaValidation;
//# sourceMappingURL=Product.js.map