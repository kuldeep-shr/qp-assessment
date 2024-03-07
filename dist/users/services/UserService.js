"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUserDetails = exports.userLogin = exports.insertUser = void 0;
const commonMiddlewares_1 = require("../../middleware/commonMiddlewares");
const User_1 = __importDefault(require("../model/User"));
const insertUser = (data) => {
    return new Promise(async (resolve, reject) => {
        // check email exist or not
        const emailExistency = await isEmailExists(data.email);
        if (emailExistency.data) {
            return reject({
                isError: true,
                message: "user already registered",
                statusCode: 400,
                data: [],
            });
        }
        const hasingPassword = await (0, commonMiddlewares_1.hashPassword)(data.password);
        User_1.default.create({
            name: data.name,
            firstname: data.name.split(" ")[0],
            lastname: data.name.split(" ")[1],
            password: hasingPassword,
            email: data.email,
            address: data.address,
        })
            .then((data) => {
            const tokenGeneration = (0, commonMiddlewares_1.generateToken)({
                id: data.id,
                user: {
                    name: data.name,
                    email: data.email,
                },
                secretKey: process.env.SECRET_KEY,
            });
            resolve({
                isError: false,
                message: "user registered successfully",
                statusCode: 201,
                data: [
                    {
                        id: data.id,
                        name: data.name,
                        email: data.email,
                        token: tokenGeneration,
                    },
                ],
            });
        })
            .catch((error) => {
            reject({
                isError: true,
                message: "error while,user registration",
                data: error,
            });
        });
    });
};
exports.insertUser = insertUser;
const userLogin = (data) => {
    return new Promise(async (resolve, reject) => {
        // check email exist or not
        const emailExistency = await isEmailExists(data.email);
        if (!emailExistency.data) {
            return resolve({
                isError: false,
                statusCode: 400,
                message: "user is not registered with us",
                data: [],
            });
        }
        const getDataOfUser = await User_1.default.findOne({
            where: { email: data.email },
        });
        const isPasswordMatchOrNot = await (0, commonMiddlewares_1.verifyPassword)({
            id: getDataOfUser.id,
            email: data.email,
            inputPassword: data.password,
            hashPassword: getDataOfUser.password,
        });
        if (isPasswordMatchOrNot) {
            const getDataOfUser = await User_1.default.findOne({
                where: { email: data.email },
            });
            const tokenGeneration = await (0, commonMiddlewares_1.generateToken)({
                id: getDataOfUser.id,
                user: { name: getDataOfUser.name, email: getDataOfUser.email },
                secretKey: process.env.SECRET_KEY,
            });
            return resolve({
                isError: false,
                statusCode: 200,
                message: "login successfully!!",
                data: [
                    {
                        id: getDataOfUser.id,
                        email: getDataOfUser.email,
                        token: tokenGeneration,
                    },
                ],
            });
        }
        else {
            return resolve({
                isError: false,
                statusCode: 400,
                message: "invalid credentials",
                data: [],
            });
        }
    });
};
exports.userLogin = userLogin;
const isEmailExists = async (email) => {
    return new Promise(async (resolve, reject) => {
        User_1.default.findOne({ where: { email: email } })
            .then((data) => {
            resolve({
                isError: false,
                message: "user already exists",
                data: [null, undefined].includes(data) ? false : true,
            });
        })
            .catch((error) => {
            reject({
                isError: true,
                message: "error while,email existing",
                data: error,
            });
        });
    });
};
const fetchUserDetails = async (id) => {
    return new Promise((resolve, reject) => {
        User_1.default.findByPk(id)
            .then((data) => {
            const userDetails = {
                isError: false,
                statusCode: 400,
                message: "user information according to the primary id",
                data: {
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    is_admin: data.is_admin,
                },
            };
            return resolve(userDetails);
        })
            .catch((error) => {
            return reject({
                isError: true,
                statusCode: 400,
                message: "something went wrong, while fetching the user details",
                data: [],
            });
        });
    });
};
exports.fetchUserDetails = fetchUserDetails;
//# sourceMappingURL=UserService.js.map