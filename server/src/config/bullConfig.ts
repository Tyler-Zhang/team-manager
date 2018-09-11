import * as Queue from 'bull';
import * as assert from 'assert';

const REDIS_URL = process.env.REDIS_URL;

assert.ok(REDIS_URL, 'ENV variable REDIS_URL required!');

/**
 * Different queues that we can publish messages to
 */
export const syncResourceQueue = new Queue('syncResourceQueue');
