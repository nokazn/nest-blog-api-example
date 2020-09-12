import * as dotenv from 'dotenv';
import { IDatabaseConfig } from './interfaces/dbConfig.interface';

dotenv.config();

const {
  DB_USER_NAME,
  DB_PASSWORD,
  DB_NAME_DEVELOPMENT,
  DB_NAME_PRODUCTION,
  DB_NAME_TEST,
  DB_HOST,
  DB_PORT,
} = process.env;

if (
  DB_USER_NAME == null ||
  DB_PASSWORD == null ||
  DB_NAME_DEVELOPMENT == null ||
  DB_NAME_PRODUCTION == null ||
  DB_NAME_TEST == null ||
  DB_HOST == null ||
  DB_PORT == null
) {
  const message = '環境変数が設定されていません。';
  console.error(message, process.env);
  throw new Error(message);
}

export const databaseConfig: IDatabaseConfig = {
  development: {
    username: DB_USER_NAME,
    password: DB_PASSWORD,
    database: DB_NAME_DEVELOPMENT,
    host: DB_HOST,
    port: parseInt(DB_PORT, 10),
    dialect: 'postgres',
  },
  test: {
    username: DB_USER_NAME,
    password: DB_PASSWORD,
    database: DB_NAME_TEST,
    host: DB_HOST,
    port: parseInt(DB_PORT, 10),
    dialect: 'postgres',
  },
  production: {
    username: DB_USER_NAME,
    password: DB_PASSWORD,
    database: DB_NAME_PRODUCTION,
    host: DB_HOST,
    port: parseInt(DB_PORT, 10),
    dialect: 'postgres',
  },
};
