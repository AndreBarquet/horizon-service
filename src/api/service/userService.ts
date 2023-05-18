import { getOffset, emptyOrList, emptyOrValue } from '@/helpers/responseHelper';
import mainConfig from '@/config/mainConfig';
import { executeQuery } from '@/helpers/dbHelper';

// Interfaces
import { UserFormDTO } from '@/dto/UserDTO';

export async function fetchAllUsersShort() {
  const queryString = 'SELECT id, name, email, age, password FROM users';
  const result = await executeQuery(queryString);
  const data = emptyOrList(result);
  return data;
}

export async function fetchPaginatedUsers(page: number = 1) {
  const offset = getOffset(page, mainConfig.totalItemsPerPage);

  const queryString: string = `SELECT * FROM users LIMIT ${offset},${mainConfig.totalItemsPerPage}`
  const result = await executeQuery(queryString);
  const data = emptyOrList(result);
  const meta = { page };
  return { data, meta }
}

export async function insertNewUser(userData: UserFormDTO) {
  const queryString: string = `INSERT INTO users (email, age, name, password) VALUES (?, ?, ?, ?)`;

  try {
    const values = [userData.email, userData.age, userData.name, userData.password];
    const result = await executeQuery(queryString, values);
    return Boolean(result.affectedRows);
  } catch (error) {
    console.log("Error....: ", error)
    return false;
  }
}