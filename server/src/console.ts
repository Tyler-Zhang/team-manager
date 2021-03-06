import * as repl from 'repl';
import * as models from './models';
import * as operations from './operations';
import * as config from './config';
import * as publishers from './publishers';
import { createConnection } from 'typeorm';

async function startRepl() {
  await createConnection(config.databaseConfig);

  const replServer = repl.start();

  Object.assign(
    replServer.context,
    {
      models,
      operations,
      config,
      publishers
    }
  );
}

if (require.main === module) {
  startRepl();
}
