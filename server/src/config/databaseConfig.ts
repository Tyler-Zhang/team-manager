import { ConnectionOptions } from "typeorm";
import { get } from 'lodash';
import * as path from 'path';
import isStringTruthy from '../lib/isStringTruthy';

export const databaseConfig: ConnectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: isStringTruthy(get(process.env, 'DATABASE_SYNC', 'false')),
  logging: isStringTruthy(get(process.env, 'DATABASE_LOGGING', 'false')),
  entities: [
    path.join(__dirname, '..', 'models', '*.{ts,js}')
  ],
  migrations: [
    path.join(__dirname, '..', 'migrations', '*.{ts,js}')
  ]
}
