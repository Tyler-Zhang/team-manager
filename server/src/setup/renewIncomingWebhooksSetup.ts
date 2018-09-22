/**
 * There should be a repeated job in the renewIncomingWebhooksQueue
 * that checks for webhooks that are about to expire every hour and
 * renews them. This function should create that inital job if
 * it is not already there
 */
import { renewIncomingWebhooksPublisher } from '../publishers';
import * as cron from 'node-cron';
import { log } from '../config';

export function renewIncomingWebhooksSetup() {
  cron.schedule('25 * * * *', () => {
    renewIncomingWebhooksPublisher.publish({})
      .catch(e => log.error(e));
  }).start();
}
