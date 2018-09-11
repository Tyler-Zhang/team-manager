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
