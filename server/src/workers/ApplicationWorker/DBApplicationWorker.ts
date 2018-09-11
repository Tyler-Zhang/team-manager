/**
 * An application worker that requires a DB connection
 */
import { ApplicationWorker } from './ApplicationWorker';
import { databaseConfig } from '../../config';
import { createConnection } from 'typeorm';

export class DBApplicationWorker<J> extends ApplicationWorker<J> {
  protected async setup() {
    await super.setup();

    await createConnection(databaseConfig);
  }
}
