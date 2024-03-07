"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.loginUser = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const apiResponse_1 = __importDefault(require("../../utils/apiResponse"));
const UserService_1 = require("../services/UserService");
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        await (0, UserService_1.userLogin)({
            email: email,
            password: password,
        }).then((data) => {
            if (data.statusCode != 400) {
                return apiResponse_1.default.result(res, data.message, data, http_status_codes_1.default.OK);
            }
            else {
                return apiResponse_1.default.result(res, data.message, data, http_status_codes_1.default.BAD_REQUEST);
            }
        });
    }
    catch (err) {
        return apiResponse_1.default.error(res, http_status_codes_1.default.INTERNAL_SERVER_ERROR);
    }
};
exports.loginUser = loginUser;
const createUser = async (req, res) => {
    const { name, email, password, address } = req.body;
    console.log("name", name, "email", email, "password", password);
    try {
        await (0, UserService_1.insertUser)({
            name: name,
            password: password,
            email: email,
            address: address,
        }).then((data) => {
            if (data.statusCode != 400) {
                return apiResponse_1.default.result(res, data.message, data, http_status_codes_1.default.CREATED);
            }
            else {
                return apiResponse_1.default.result(res, data.message, data, http_status_codes_1.default.BAD_REQUEST);
            }
        });
    }
    catch (error) {
        console.log("er", error);
        return apiResponse_1.default.error(res, http_status_codes_1.default.BAD_REQUEST, error.message);
    }
};
exports.createUser = createUser;
//# sourceMappingURL=userController.js.map