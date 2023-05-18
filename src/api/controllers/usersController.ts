import { Request, Response } from 'express';

// helpers
import { encript } from '@/helpers/cryptoHelper';
import errorsList from '@/errors/errorsList';

// services
import { fetchAllUsersShort, insertNewUser } from '@/api/service/userService';

// DTO
import { UserDTO, UserFormDTO } from '@/dto/UserDTO';
import { IError } from '@/dto/ErrorsDTO';
import { getErrorMessage } from '@/helpers/responseHelper';

export async function insertUser(req: Request, res: Response) {
  const data: UserFormDTO = { ...req.body, password: encript(req.body.password) };

  try {
    const result = insertNewUser(data);
    res.status(200).send(result);

  } catch (err: any) {
    console.error('Error... insertUser:', err.message);
    const error: IError = { message: getErrorMessage("ERR001"), code: "ERR001" };
    res.status(500).send(error);
  }
}

export async function getUsersShort(req: Request, res: Response) {
  try {
    const usersList: UserDTO[] = await fetchAllUsersShort();
    res.json(usersList);

  } catch (err: any) {
    console.error('Error... getUsersShort: ', err.message);
    const error: IError = { message: getErrorMessage("ERR001"), code: "ERR001" };
    res.status(500).send(error);
  }
}