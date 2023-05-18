import { emptyOrValue } from '@/helpers/responseHelper';
import { executeQuery } from '@/helpers/dbHelper';

// Interfaces
import { LoginFormDTO } from '@/dto/AuthDTO';

export async function getUserToken(userLogin: LoginFormDTO) {
  const queryString: string = `SELECT token, id FROM users WHERE email = '${userLogin.login}' AND password = '${userLogin.password}'`;
  const result = await executeQuery(queryString);
  return emptyOrValue(result);
}

export async function saveUserToken(userToken: string, userId: number) {
  const queryString: string = `UPDATE users SET token = '${userToken}' WHERE (id = '${userId}');`;
  const result = await executeQuery(queryString);
  return Boolean(result.affectedRows);
}
