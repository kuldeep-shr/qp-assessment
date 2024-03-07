import { ProductAdd, ProductUpdate } from "./types";
import ProductModel from "../model/Product";

export const productsInsertion = (data: any) => {
  return new Promise(async (resolve, reject) => {
    const extractNames = data
      .filter((obj: any) => typeof obj.name === "string")
      .map((obj: any) => obj.name);
    const productExists: any = await findProductByName(extractNames);

    const getExistingName = productExists.data.map((d: any) => d.name);
    if (productExists.data.length > 0) {
      return resolve({
        isError: false,
        statusCode: 400,
        message:
          "products " + getExistingName + " already exist in our grocery",
        data: [],
      });
    }
    ProductModel.bulkCreate(data)
      .then((data) => {
        return resolve({
          isError: false,
          statusCode: 201,
          message: "product inserted successfully",
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

export const updateProducts = (updates: ProductUpdate[]) => {
  return new Promise(async (resolve, reject) => {
    try {
      const extractIds = updates.map((d: any) => d.id);
      const productExists: any = await findProductById(extractIds);
      const unmatchedIds = extractIds.filter(
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

      await Promise.all(
        updates.map(async (update) => {
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
