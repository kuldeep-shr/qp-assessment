import apiResponse from "../../utils/apiResponse";
import httpStatusCodes from "http-status-codes";
import { Request, Response } from "express";
import { CreateBooking } from "../service/types";
import { bookingInsertService } from "../service/BookingService";

export const bookingInsert = async (req: Request, res: Response) => {
  const apiPayload: Array<CreateBooking> = req.body;
  await bookingInsertService(apiPayload);
};
