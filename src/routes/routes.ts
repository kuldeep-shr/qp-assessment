import express from "express";
const router = express.Router();

import { verifyToken } from "../middleware/commonMiddlewares";
import {
  createUser,
  loginUser,
  userList,
} from "../users/controller/userController";
import {
  productInsert,
  updateProduct,
  deleteProduct,
} from "../products/controller/productController";

import {
  registerSchemaValidation,
  loginSchemaValidation,
} from "../validation/User";
import {
  productInsertSchemaValidation,
  productUpdateSchemaValidation,
  productDeleteSchemaValidation,
} from "../validation/Product";

router.post("/signup", registerSchemaValidation, createUser);
router.post("/signin", loginSchemaValidation, loginUser);
router.get("/users", verifyToken, userList);
router.get("/users/:id", verifyToken, userList);

router.post(
  "/add-product",
  productInsertSchemaValidation,
  verifyToken,
  productInsert
);
router.post(
  "/update-product",
  productUpdateSchemaValidation,
  verifyToken,
  updateProduct
);
router.post(
  "/delete-product",
  productDeleteSchemaValidation,
  verifyToken,
  deleteProduct
);

export const allRoutes = router;
