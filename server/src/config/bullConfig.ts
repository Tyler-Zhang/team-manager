import * as Arena from 'bull-arena';
import * as Queue from 'bull';
import * as assert from 'assert';

const REDIS_HOST = process.env.REDIS_HOST;
assert.ok(REDIS_HOST, 'ENV variable REDIS_URL required!');

/**
 * Default options
 */
const defaultQueueOptions: Queue.QueueOptions = {
  defaultJobOptions: {
    attempts: 20,
    backoff: {
      type: 'exponential',
      delay: 5000
    },
  },
  redis: {
    host: REDIS_HOST
  }
}

/**
 * Different queues that we can publish messages to
 */
export const syncResourceToMemberQueue = new Queue('syncResourceToMemberQueue', defaultQueueOptions);
export const webhookReceivedQueue = new Queue('webhookReceivedQueue', defaultQueueOptions);
export const asyncOperationQueue = new Queue('asyncOperationQueue', defaultQueueOptions);
export const renewIncomingWebhooksQueue = new Queue('renewIncomingWebhooksQueue', defaultQueueOptions);

/**
 * Bull Arena config: this allows us to create a server to display job statuses
 */
export const queues = [
  'syncResourceToMemberQueue',
  'webhookReceivedQueue',
  'asyncOperationQueue',
  'renewIncomingWebhooksQueue'
].map(name => ({
  name,
  hostId: 'api'
}));

const bullArenaQueueConfig = {
  queues
};

export const bullArenaServerConfig = {
  port: 5000
}

export function startBullArenaServer() {
  return Arena(bullArenaQueueConfig, bullArenaServerConfig);
}
