"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProducts = exports.productsInsertion = void 0;
const Product_1 = __importDefault(require("../model/Product"));
const productsInsertion = (data) => {
    return new Promise(async (resolve, reject) => {
        const extractNames = data
            .filter((obj) => typeof obj.name === "string")
            .map((obj) => obj.name);
        const productExists = await findProductByName(extractNames);
        const getExistingName = productExists.data.map((d) => d.name);
        if (productExists.data.length > 0) {
            return resolve({
                isError: false,
                statusCode: 400,
                message: "products " + getExistingName + " already exist in our grocery",
                data: [],
            });
        }
        Product_1.default.bulkCreate(data)
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
exports.productsInsertion = productsInsertion;
const updateProducts = (updates) => {
    return new Promise(async (resolve, reject) => {
        try {
            const extractIds = updates.map((d) => d.id);
            const productExists = await findProductById(extractIds);
            const unmatchedIds = extractIds.filter((id) => !productExists.data.some((item) => item.id === id));
            if (unmatchedIds.length > 0) {
                return resolve({
                    isError: false,
                    statusCode: 400,
                    message: "product ids " + unmatchedIds + " is not exists in our grocery",
                    data: [],
                });
            }
            await Promise.all(updates.map(async (update) => {
                const product = await Product_1.default.findByPk(update.id);
                if (!product) {
                    throw new Error(`Product with ID ${update.id} not found`);
                }
                await product.update(update);
            }));
            return resolve({
                isError: false,
                statusCode: 200,
                message: "product updated successfully",
                data: [],
            });
        }
        catch (error) {
            reject({
                isError: false,
                statusCode: 400,
                message: "something went wrong, while product updating",
                data: [],
            });
        }
    });
};
exports.updateProducts = updateProducts;
const findProductByName = (name) => {
    return new Promise((resolve, reject) => {
        Product_1.default.findAll({
            where: { name: name },
        })
            .then((data) => {
            return resolve({
                isError: false,
                message: "product find successfully",
                data: data.map((d) => {
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
const findProductById = (id) => {
    return new Promise((resolve, reject) => {
        Product_1.default.findAll({
            where: { id: id },
        })
            .then((data) => {
            return resolve({
                isError: false,
                message: "product find successfully",
                data: data.map((d) => {
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
//# sourceMappingURL=ProductService.js.map