import { NextFunction, Request, Response } from "express";

const jwt = require('jsonwebtoken');

// Helpers
import { encript } from "@/helpers/cryptoHelper";
import { getErrorMessage } from "@/helpers/responseHelper";
import sensitiveCongif from "@/config/sensitiveCongif";

// DTO
import { LoginFormDTO, LoginResponseDTO } from "@/dto/AuthDTO";
import { IError } from "@/dto/ErrorsDTO";

// Services
import { getUserToken, saveUserToken } from "@/api/service/authService";

async function retrieveUserToken(loginData: LoginFormDTO): Promise<LoginResponseDTO | null> {
  const { login, password } = loginData;
  try {
    const loginParamsMapped: LoginFormDTO = { login, password: encript(password) };
    const userData: LoginResponseDTO = await getUserToken(loginParamsMapped);
    return userData;
  } catch (err) {
    console.log('Error... retrieveUserToken: ', err);
    return null;
  }
}

export async function authLogin(req: Request, res: Response) {
  const { login, password } = req.body;
  try {
    const userData: LoginResponseDTO | null = await retrieveUserToken({ login, password });

    if (!userData) {
      const error: IError = { code: "ERR002", message: getErrorMessage("ERR002") };
      return res.status(401).send(error);
    }

    if (userData?.token) return res.json(userData.token);

    const token = jwt.sign({ userId: userData?.id }, sensitiveCongif.SECRET_KEY);
    const savedSuccess: boolean = await saveUserToken(token, userData.id);

    if (!savedSuccess) return res.status(500).send({ code: "ERR001", message: getErrorMessage("ERR001") });
    return res.json(token);

  } catch (err) {
    console.log('Error... authLogin: ', err);
    const error: IError = { code: "ERR000", message: getErrorMessage("ERR000") };
    res.status(500).send(error);
  }
}