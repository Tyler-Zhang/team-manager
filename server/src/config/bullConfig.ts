import * as Arena from 'bull-arena';
import * as Queue from 'bull';
import * as assert from 'assert';

const REDIS_URL = process.env.REDIS_URL;
assert.ok(REDIS_URL, 'ENV variable REDIS_URL required!');

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
  }
}

/**
 * Different queues that we can publish messages to
 */
export const syncResourceQueue = new Queue('syncResourceQueue', defaultQueueOptions);

/**
 * Bull Arena config: this allows us to create a server to display job statuses
 */
export const bullArenaQueueConfig = {
  queues: [{
    name: 'syncResourceQueue',
    hostId: 'api'
  }]
};

export const bullArenaServerConfig = {
  port: 5000
}

export function startBullArenaServer() {
  return Arena(bullArenaQueueConfig, bullArenaServerConfig);
}
