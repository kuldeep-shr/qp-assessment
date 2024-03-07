import { User, LoginRequest, findUser, resolveTypes } from "./types";
import {
  hashPassword,
  generateToken,
  verifyPassword,
} from "../../middleware/commonMiddlewares";
import UserModel from "../model/User";
import { and } from "sequelize";

export const insertUser = (data: User) => {
  return new Promise(async (resolve, reject) => {
    // check email exist or not
    const emailExistency: any = await isEmailExists(data.email);
    if (emailExistency.data) {
      return reject({
        isError: true,
        message: "user already registered",
        statusCode: 400,
        data: [],
      });
    }
    const hasingPassword = await hashPassword(data.password);
    UserModel.create({
      name: data.name,
      firstname: data.name.split(" ")[0],
      lastname: data.name.split(" ")[1],
      password: hasingPassword,
      email: data.email,
      address: data.address,
    })
      .then((data) => {
        const tokenGeneration = generateToken({
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

export const userLogin = (data: LoginRequest) => {
  return new Promise(async (resolve, reject) => {
    // check email exist or not
    const emailExistency: any = await isEmailExists(data.email);
    if (!emailExistency.data) {
      return resolve({
        isError: false,
        statusCode: 400,
        message: "user is not registered with us",
        data: [],
      });
    }
    const getDataOfUser: any = await UserModel.findOne({
      where: { email: data.email },
    });
    const isPasswordMatchOrNot = await verifyPassword({
      id: getDataOfUser.id,
      email: data.email,
      inputPassword: data.password,
      hashPassword: getDataOfUser.password,
    });
    if (isPasswordMatchOrNot) {
      const getDataOfUser: any = await UserModel.findOne({
        where: { email: data.email },
      });

      const tokenGeneration = await generateToken({
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
    } else {
      return resolve({
        isError: false,
        statusCode: 400,
        message: "invalid credentials",
        data: [],
      });
    }
  });
};

const isEmailExists = async (email: string) => {
  return new Promise(async (resolve, reject) => {
    UserModel.findOne({ where: { email: email } })
      .then((data: any) => {
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

export const fetchUserDetails = async (id: number): Promise<resolveTypes[]> => {
  return new Promise<resolveTypes[]>((resolve, reject) => {
    UserModel.findByPk(id)
      .then((data: any) => {
        const userDetails: any = {
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
