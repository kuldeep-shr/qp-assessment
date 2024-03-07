"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSchemaValidation = exports.userRegisterSchemaValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
const userRegisterSchema = joi_1.default.object({
    name: joi_1.default.string().required().error(new Error("please enter the name")),
    email: joi_1.default.string()
        .email()
        .required()
        .error(new Error("please enter the valid email")),
    password: joi_1.default.string()
        .min(5)
        .required()
        .error(new Error("please enter the valid password of minimum 5 words")),
});
const userRegisterSchemaValidation = (req, res, next) => {
    const data = req.body;
    const { error } = userRegisterSchema.validate(data);
    if (error) {
        apiResponse_1.default.error(res, http_status_codes_1.default.UNPROCESSABLE_ENTITY, error.message);
        return null;
    }
    next();
};
exports.userRegisterSchemaValidation = userRegisterSchemaValidation;
const userLoginSchema = joi_1.default.object({
    email: joi_1.default.string()
        .email()
        .required()
        .error(new Error("please enter the valid email")),
    password: joi_1.default.string()
        .required()
        .error(new Error("please enter the valid password of minimum 5 words")),
});
const userLoginSchemaValidation = (req, res, next) => {
    const data = req.body;
    const { error } = userLoginSchema.validate(data);
    if (error) {
        apiResponse_1.default.error(res, http_status_codes_1.default.UNPROCESSABLE_ENTITY, error.message);
        return null;
    }
    next();
};
exports.userLoginSchemaValidation = userLoginSchemaValidation;
//# sourceMappingURL=Login.js.map