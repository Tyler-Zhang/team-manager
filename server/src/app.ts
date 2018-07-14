import { createConnection } from 'typeorm';
import { databaseConfig, log } from './config';


export async function launch() {
  /**
   * Connect to database
   */
  await createConnection(databaseConfig);

  log.info(`Connected to database`);
}
