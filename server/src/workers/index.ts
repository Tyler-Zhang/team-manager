import { syncResourceQueue } from '../config/bullConfig';
import { SyncResourcesQueueWorker } from './SyncResourcesQueueWorker';
import { log } from '../config';

export async function startAllWorkers() {
  log.info('Starting workers');

  const startWorkerPromises = await Promise.all([
    new SyncResourcesQueueWorker(syncResourceQueue).start()
  ]);

  log.info(`Started ${startWorkerPromises.length} workers successfully`);
}

if (require.main === module) {
  startAllWorkers();
}
