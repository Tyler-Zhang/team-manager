import { createConnection } from 'typeorm';
import { get } from 'lodash';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { useExpressServer, useContainer } from 'routing-controllers';
import { databaseConfig, log } from './config';
import { join } from 'path';
import { Container } from 'typedi';
import { container } from './lib/sti-model-operations';
import { ExternalConnection } from './models';


export async function launch() {
  /**
   * Connect to database
   */
  await createConnection(databaseConfig);
  log.info(`Connected to database`);

  /**
   * Create express server
   */
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());

  /**
   * Setup container so we can use dependency injection in
   * routing-controllers
   */
  useContainer(Container);

  /**
   * Setup routing-controllers
   */
  useExpressServer(app, {
    controllers: [join(__dirname, 'controllers', '*{ts,js}')],
    routePrefix: '/api',
    classTransformer: true
  });

  /**
   * Start the server
   */
  const port = get(process.env, 'PORT', 80);
  app.listen(port);
  log.info(`Running web app on port ${port}`);
}
