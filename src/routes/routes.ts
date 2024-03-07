import express from "express";
const router = express.Router();

import { verifyToken } from "../middleware/commonMiddlewares";
import { createUser, loginUser } from "../users/controller/userController";
import {
  productInsertion,
  updatingProducts,
} from "../products/controller/productController";

import {
  userRegisterSchemaValidation,
  userLoginSchemaValidation,
} from "../validation/Login";
import {
  productInsertionSchemaValidation,
  productUpdationSchemaValidation,
} from "../validation/Product";

router.post("/signup", userRegisterSchemaValidation, createUser);
router.post("/signin", userLoginSchemaValidation, loginUser);
router.post(
  "/add-product",
  productInsertionSchemaValidation,
  verifyToken,
  productInsertion
);
router.post(
  "/update-product",
  productUpdationSchemaValidation,
  verifyToken,
  updatingProducts
);

export const allRoutes = router;
