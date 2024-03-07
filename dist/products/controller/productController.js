"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatingProducts = exports.productInsertion = void 0;
const apiResponse_1 = __importDefault(require("../../utils/apiResponse"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const ProductService_1 = require("../service/ProductService");
const UserService_1 = require("../../users/services/UserService");
const productInsertion = async (req, res) => {
    const getDataOfUser = await (0, UserService_1.fetchUserDetails)(req.body.user.id);
    if (!getDataOfUser.data.is_admin) {
        return apiResponse_1.default.result(res, "only admin can add products", [], http_status_codes_1.default.BAD_REQUEST);
    }
    await (0, ProductService_1.productsInsertion)(req.body)
        .then((data) => {
        if (data.statusCode != 400) {
            return apiResponse_1.default.result(res, data.message, data.data, http_status_codes_1.default.OK);
        }
        else {
            return apiResponse_1.default.result(res, data.message, data.data, http_status_codes_1.default.BAD_REQUEST);
        }
    })
        .catch((error) => {
        return apiResponse_1.default.error(res, http_status_codes_1.default.INTERNAL_SERVER_ERROR);
    });
};
exports.productInsertion = productInsertion;
const updatingProducts = async (req, res) => {
    const getDataOfUser = await (0, UserService_1.fetchUserDetails)(req.body.user.id);
    if (!getDataOfUser.data.is_admin) {
        return apiResponse_1.default.result(res, "only admin can add products", [], http_status_codes_1.default.BAD_REQUEST);
    }
    await (0, ProductService_1.updateProducts)(req.body)
        .then((data) => {
        if (data.statusCode != 400) {
            return apiResponse_1.default.result(res, data.message, data.data, http_status_codes_1.default.OK);
        }
        else {
            return apiResponse_1.default.result(res, data.message, data.data, http_status_codes_1.default.BAD_REQUEST);
        }
    })
        .catch((error) => {
        return apiResponse_1.default.error(res, http_status_codes_1.default.INTERNAL_SERVER_ERROR);
    });
};
exports.updatingProducts = updatingProducts;
//# sourceMappingURL=productController.js.map