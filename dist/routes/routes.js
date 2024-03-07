"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allRoutes = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const commonMiddlewares_1 = require("../middleware/commonMiddlewares");
const userController_1 = require("../users/controller/userController");
const productController_1 = require("../products/controller/productController");
const Login_1 = require("../validation/Login");
const Product_1 = require("../validation/Product");
router.post("/signup", Login_1.userRegisterSchemaValidation, userController_1.createUser);
router.post("/signin", Login_1.userLoginSchemaValidation, userController_1.loginUser);
router.post("/add-product", Product_1.productInsertionSchemaValidation, commonMiddlewares_1.verifyToken, productController_1.productInsertion);
router.post("/update-product", Product_1.productUpdationSchemaValidation, commonMiddlewares_1.verifyToken, productController_1.updatingProducts);
exports.allRoutes = router;
//# sourceMappingURL=routes.js.map