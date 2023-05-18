import { openDbConnection } from '@/database/dbConnection';

export async function executeQuery(sql: string, params?: any[]) {
  const connection = await openDbConnection();
  const [rows] = await connection.execute(sql, params);
  return rows;
}