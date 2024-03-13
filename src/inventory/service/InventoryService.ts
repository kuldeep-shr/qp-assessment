import InventoryModel from "../model/Inventory";
import ProductModel from "../../products/model/Product";
import {
  CreateInventory,
  UpdateInventory,
  CheckInventory,
  InventoryItem,
  CheckInventoryArgs,
  CheckInventoryReturn,
} from "./types";

export const inventoryInsertService = (args: Array<CreateInventory>) => {
  return new Promise(async (resolve, reject) => {
    const extractProductIds = args.map((d: any) => d.product_id);

    // inventory only might add, if that product is exists

    let inventoryExistFromDB = await InventoryModel.findAll({
      where: { product_id: extractProductIds },
    });
    inventoryExistFromDB = inventoryExistFromDB.map((d: any) => d.dataValues);
    let productExistsFromDB = await ProductModel.findAll({
      where: { id: extractProductIds },
    });
    productExistsFromDB = productExistsFromDB.map((d: any) => d.dataValues);

    if (productExistsFromDB.length == 0) {
      // product not exists
      return resolve({
        isError: false,
        statusCode: 400,
        data: [],
        message: "product not exist for this inventory",
      });
    } else {
      // else its exist and now check in inventory
      if (inventoryExistFromDB.length == 0) {
        // insertion

        const saveProductsToDB: Array<CreateInventory> = args.filter(
          (item: any) =>
            productExistsFromDB.some(
              (dbItem: any) => dbItem.id === item.product_id
            )
        );
        const unMatchedProductIds: Array<number> = args
          .filter(
            (item: any) =>
              !productExistsFromDB.some(
                (dbItem: any) => dbItem.id === item.product_id
              )
          )
          .map((item: any) => item.product_id);

        InventoryModel.bulkCreate(saveProductsToDB)
          .then((data) => {
            return resolve({
              isError: false,
              statusCode: 201,
              message: "inventory inserted successfully",
              data: data,
            });
          })
          .catch((error) => {
            return reject({
              isError: true,
              statusCode: 400,
              message: "something went wrong, while inventory insertion",
              data: [],
            });
          });
      } else {
        //updation
        return resolve({
          isError: false,
          statusCode: 400,
          data: [],
          message: "product already exist for this inventory",
        });
      }
    }
  });
};

export const inventoryUpdateService = (args: UpdateInventory[]) => {
  return new Promise(async (resolve, reject) => {
    try {
      const extractInventoryIds = args.map((d: any) => d.id);
      let inventoryExistFromDB = await InventoryModel.findAll({
        where: { id: extractInventoryIds },
      });
      inventoryExistFromDB = inventoryExistFromDB.map((d: any) => d.dataValues);
      const unMatchedInventoryId = extractInventoryIds.filter(
        (id) => !inventoryExistFromDB.some((item: any) => item.id === id)
      );
      if (unMatchedInventoryId.length != 0) {
        return resolve({
          isError: false,
          statusCode: 400,
          message: "inventory " + unMatchedInventoryId + " not exist",
          data: [],
        });
      }

      await Promise.all(
        args.map(async (arg: any) => {
          let inventory: any | null = await InventoryModel.findByPk(arg.id);
          await inventory.update(arg);
        })
      );
      return resolve({
        isError: false,
        statusCode: 200,
        message: "inventory updated successfully",
        data: [],
      });
    } catch (error) {
      return reject({
        isError: true,
        statusCode: 400,
        message: "something went wrong, while inventory updation",
        data: [],
      });
    }
  });
};

export const inventoryDeleteService = (args: Array<number>) => {
  return new Promise(async (resolve, reject) => {
    let isInventoryExists: any[] = await InventoryModel.findAll({
      where: { id: args },
    });
    isInventoryExists = isInventoryExists.map((d: any) => d.dataValues);
    const unMatchedInventoryId = args.filter(
      (id) => !isInventoryExists.some((item: any) => item.id === id)
    );

    if (unMatchedInventoryId.length != 0) {
      return resolve({
        isError: false,
        statusCode: 400,
        data: [],
        message: "inventory of " + unMatchedInventoryId + " is not exist",
      });
    }
    await InventoryModel.destroy({
      where: { id: args },
    })
      .then((data: any) => {
        return resolve({
          isError: false,
          statusCode: 200,
          data: [],
          message: "inventories deleted successfully",
        });
      })
      .catch((error) => {
        return reject({
          isError: false,
          statusCode: 400,
          data: [],
          message: "something went wrong, while inventories deleting",
        });
      });
  });
};

export const checkInventoryService = async (
  args: CheckInventoryArgs
): Promise<CheckInventoryReturn> => {
  const result: CheckInventory[] = [];

  let inventoryProductRelationDB: any = await ProductModel.findAll({
    attributes: ["id", "name", ["quantity", "productQty"]],
    where: { id: args.productIdsArr },
    include: [
      {
        model: InventoryModel,
        attributes: { exclude: ["id", "product_id", "createdAt", "updatedAt"] },
      },
    ],
  });
  let inventoryData = inventoryProductRelationDB.map((d: any) => {
    return {
      product_id: d.dataValues.id,
      name: d.dataValues.name,
      productQty: d.dataValues.productQty,
      inventory: d.Inventory.dataValues,
    };
  });
  args.payload.forEach((request: any) => {
    const product: InventoryItem | undefined | any = inventoryData.find(
      (item: any) => item.product_id === request.product_id
    );
    if (
      product.productQty == product.inventory.booked ||
      request.quantity > product.inventory.remaining
    ) {
      return result.push({
        product_id: product.product_id,
        name: product.name,
        quantity: "product is, out of stock",
      });
    }
  });

  if (result.length == 0) {
    return {
      isError: false,
      statusCode: 200,
      data: [],
      message: "",
    };
  } else {
    return {
      isError: true,
      statusCode: 400,
      data: result,
      message: "inventory errors, please read it given below",
    };
  }
};
