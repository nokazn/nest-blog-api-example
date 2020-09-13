import * as dotenv from 'dotenv';
import { IDatabaseConfig } from './interfaces/dbConfig.interface';

dotenv.config();

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB_DEVELOPMENT,
  POSTGRES_DB_PRODUCTION,
  POSTGRES_DB_TEST,
  POSTGRES_HOST,
  POSTGRES_PORT,
} = process.env;

if (
  POSTGRES_USER == null ||
  POSTGRES_PASSWORD == null ||
  POSTGRES_DB_DEVELOPMENT == null ||
  POSTGRES_DB_PRODUCTION == null ||
  POSTGRES_DB_TEST == null ||
  POSTGRES_HOST == null ||
  POSTGRES_PORT == null
) {
  const message = '環境変数が設定されていません。';
  console.error(message, process.env);
  throw new Error(message);
}

export const databaseConfig: IDatabaseConfig = {
  development: {
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB_DEVELOPMENT,
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT, 10),
    dialect: 'postgres',
  },
  test: {
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB_TEST,
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT, 10),
    dialect: 'postgres',
  },
  production: {
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB_PRODUCTION,
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT, 10),
    dialect: 'postgres',
  },
};
