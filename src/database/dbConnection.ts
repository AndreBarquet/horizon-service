const mysql = require('mysql2/promise');
import dbConfig from '@/config/db';

export async function openDbConnection() {
  const dbConnection = await mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    port: dbConfig.port,
  });

  return dbConnection;
}
