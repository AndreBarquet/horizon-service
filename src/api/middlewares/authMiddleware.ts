import { NextFunction, Request, Response } from "express";
const jwt = require('jsonwebtoken');

// helpers
import { getErrorMessage } from "@/helpers/responseHelper";

// Interfaces
import { IError } from "@/dto/ErrorsDTO";
import sensitiveCongif from "@/config/sensitiveCongif";

export async function validateToken(req: Request, res: Response, next: NextFunction) {
  const [, token] = req.headers.authorization?.split(' ') || [' ', ' '];
  const error: IError = { code: "ERR000", message: getErrorMessage("ERR000") };

  if (!token) return res.status(401).send(error);

  try {
    const payload = jwt.verify(token, sensitiveCongif.SECRET_KEY);
    const userIdFromToken = typeof payload !== 'string' && payload.userId;
    if (!userIdFromToken) return res.status(401).send(error);
    return next();

  } catch (err) {
    console.log("Error... validateToken: ", err);
    return res.status(401).send(error);
  }
}