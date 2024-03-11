import express from "express";
const router = express.Router();

//authentication
import { verifyToken } from "../middleware/commonMiddlewares";

//validations
import {
  registerSchemaValidation,
  loginSchemaValidation,
} from "../validation/User";
import {
  productInsertSchemaValidation,
  productUpdateSchemaValidation,
  productDeleteSchemaValidation,
} from "../validation/Product";

import { bookingInsertSchemaValidation } from "../validation/Booking";
import {
  inventoryInsertSchemaValidation,
  inventoryUpdateSchemaValidation,
  inventoryDeleteSchemaValidation,
} from "../validation/Inventory";

//controllers
import {
  createUser,
  loginUser,
  userList,
} from "../users/controller/userController";
import {
  productInsert,
  updateProduct,
  deleteProduct,
  productList,
} from "../products/controller/productController";

import { bookingInsert } from "../booking/controller/bookingController";
import {
  inventoryInsert,
  inventoryUpdate,
  inventoryDelete,
} from "../inventory/controller/inventoryController";

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

router.get("/products", verifyToken, productList);
router.get("/products/:productId", verifyToken, productList);

router.post(
  "/create-booking",
  bookingInsertSchemaValidation,
  verifyToken,
  bookingInsert
);

router.post(
  "/create-inventory",
  inventoryInsertSchemaValidation,
  verifyToken,
  inventoryInsert
);
router.post(
  "/update-inventory",
  inventoryUpdateSchemaValidation,
  verifyToken,
  inventoryUpdate
);

router.post(
  "/delete-inventory",
  inventoryDeleteSchemaValidation,
  verifyToken,
  inventoryDelete
);

export const allRoutes = router;
