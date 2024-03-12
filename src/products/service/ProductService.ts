import { ProductAdd, ProductUpdate, ProductList } from "./types";
import ProductModel from "../model/Product";
import InventoryModel from "../../inventory/model/Inventory";
import {
  inventoryInsertService,
  inventoryUpdateService,
} from "../../inventory/service/InventoryService";

export const productInsertService = (data: any) => {
  return new Promise(async (resolve, reject) => {
    const extractProductNames = data
      .filter((obj: any) => typeof obj.name === "string")
      .map((obj: any) => obj.name);

    // gathering the data from database for existing ones
    const productExistsFromDB: any = await findProductByName(
      extractProductNames
    );
    const saveProductsToDB = data.filter(
      (item: any) =>
        !productExistsFromDB.data.some(
          (dbItem: any) => dbItem.name === item.name
        )
    );

    const matchedNames = data
      .filter((item: any) =>
        productExistsFromDB.data.some(
          (dbItem: any) => dbItem.name === item.name
        )
      )
      .map((item: any) => item.name);
    ProductModel.bulkCreate(saveProductsToDB)
      .then(async (data) => {
        console.log("Product Insert Data", data);
        let UpdateInventory: any = [];
        let parsedData = data.map((d: any) => d.dataValues);
        parsedData.map((d: any) => {
          UpdateInventory.push({
            product_id: d.id,
            remaining: d.quantity,
            booked: 0,
          });
          return UpdateInventory;
        });
        console.log("UpdateInventory", UpdateInventory);
        await inventoryInsertService(UpdateInventory);
        return resolve({
          isError: false,
          statusCode: 201,
          message:
            saveProductsToDB.length == 0
              ? "product already exist in our grocery"
              : matchedNames.length == 0
              ? "product inserted successfully"
              : "only this product is not inserted " +
                matchedNames +
                " remains inserted successfully",
          data: data,
        });
      })
      .catch((error) => {
        return reject({
          isError: true,
          statusCode: 400,
          message: "something went wrong, while product insertion",
          data: [],
        });
      });
  });
};

export const updateProductService = (updates: ProductUpdate[]) => {
  return new Promise(async (resolve, reject) => {
    try {
      const extractIds = updates.map((d: any) => d.id);
      const productExists: any = await findProductById(extractIds);
      const unmatchedIds = extractIds.filter(
        (id) => !productExists.data.some((item: any) => item.id === id)
      );
      if (unmatchedIds.length > 0) {
        resolve({
          isError: false,
          statusCode: 400,
          message:
            "product ids " + unmatchedIds + " is not exists in our grocery",
          data: [],
        });
        return null;
      }

      await Promise.all(
        updates.map(async (update: any) => {
          if (update.hasOwnProperty("quantity")) {
            let getInventoryData: any = await InventoryModel.findOne({
              where: { product_id: update.id },
            });
            getInventoryData = getInventoryData.toJSON();
            let UpdateInventory: any = [];
            UpdateInventory.push({
              id: getInventoryData.id,
              remaining: update.quantity,
              booked: 0,
            });
            await inventoryUpdateService(UpdateInventory);
          }
          const product = await ProductModel.findByPk(update.id);
          if (!product) {
            throw new Error(`Product with ID ${update.id} not found`);
          }

          await product.update(update);
        })
      );
      return resolve({
        isError: false,
        statusCode: 200,
        message: "product updated successfully",
        data: [],
      });
    } catch (error) {
      reject({
        isError: false,
        statusCode: 400,
        message: "something went wrong, while product updating",
        data: [],
      });
    }
  });
};

const findProductByName = (name: string[]) => {
  return new Promise((resolve, reject) => {
    ProductModel.findAll({
      where: { name: name },
    })
      .then((data: any) => {
        return resolve({
          isError: false,
          message: "product find successfully",
          data: data.map((d: any) => {
            return {
              id: d.id,
              name: d.name,
              quantity: d.quantity,
              price: d.price,
            };
          }),
        });
      })
      .catch((error) => {
        return reject({
          isError: true,
          message: "something went wrong, while product searching",
          data: [],
        });
      });
  });
};

const findProductById = (id: number[]) => {
  return new Promise((resolve, reject) => {
    ProductModel.findAll({
      where: { id: id },
    })
      .then((data: any) => {
        return resolve({
          isError: false,
          message: "product find successfully",
          data: data.map((d: any) => {
            return {
              id: d.id,
              name: d.name,
              quantity: d.quantity,
              price: d.price,
            };
          }),
        });
      })
      .catch((error) => {
        return reject({
          isError: true,
          message: "something went wrong, while product searching",
          data: [],
        });
      });
  });
};

export const deleteProductService = (id: number[]) => {
  return new Promise(async (resolve, reject) => {
    // find product first
    // delete it
    const productExists: any = await findProductById(id);
    const unmatchedIds = id.filter(
      (id) => !productExists.data.some((item: any) => item.id === id)
    );
    if (unmatchedIds.length > 0) {
      return resolve({
        isError: false,
        statusCode: 400,
        message:
          "product ids " + unmatchedIds + " is not exists in our grocery",
        data: [],
      });
    }

    ProductModel.destroy({
      where: { id: id },
    })
      .then((data: any) => {
        return resolve({
          isError: false,
          message: "product deleted successfully",
          data: [],
        });
      })
      .catch((error) => {
        return reject({
          isError: true,
          message: "something went wrong, while product deleting",
          data: [],
        });
      });
  });
};

export const productListService = (args: ProductList) => {
  return new Promise(async (resolve, reject) => {
    // show only active products and according to the admin and user
    if (args.id == 0) {
      ProductModel.findAll({ where: { status: true } })
        .then((data: any) => {
          const productDetails: any =
            data && args.is_admin
              ? data.map((d: any) => {
                  const { ...rest } = d.dataValues;
                  return rest;
                })
              : [];
          return resolve({ statusCode: 200, data: productDetails });
        })
        .catch((error) => {
          return reject({
            isError: true,
            statusCode: 400,
            message: "something went wrong, while fetching the product details",
            data: [],
          });
        });
    } else {
      ProductModel.findOne({ where: { id: args.id, status: true } })
        .then((data: any) => {
          const productDetails: any =
            data && args.is_admin
              ? [data].map((d: any) => {
                  const { ...rest } = d.dataValues;
                  return rest;
                })
              : [];
          return resolve({ statusCode: 200, data: productDetails });
        })
        .catch((error) => {
          console.log("err", error);
          return reject({
            isError: true,
            statusCode: 400,
            message: "something went wrong, while fetching the product details",
            data: [],
          });
        });
    }
  });
};
