interface IDbConfig {
  host: string,
  user: string,
  password: string,
  database: string,
  port: number
}

const dbConfig: IDbConfig = {
  host: "127.0.0.1",
  user: "andre",
  password: "albm1707",
  database: "horizon_db",
  port: 3306
}

export default dbConfig;