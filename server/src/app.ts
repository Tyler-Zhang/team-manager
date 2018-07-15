import { createConnection } from 'typeorm';
import { get } from 'lodash';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { useExpressServer } from 'routing-controllers';
import { databaseConfig, log } from './config';
import { join } from 'path';


export async function launch() {
  /**
   * Connect to database
   */
  await createConnection(databaseConfig);
  log.info(`Connected to database`);

  /**
   * Start express server
   */
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  useExpressServer(app, {
    controllers: [join(__dirname, 'controllers', '*{ts,js}')],
    routePrefix: '/api',
    classTransformer: true
  });

  const port = get(process.env, 'PORT', 80);
  app.listen(port);

  log.info(`Running web app on port ${port}`);
}
