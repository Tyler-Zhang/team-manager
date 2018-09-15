import { 
  syncResourceFromExternalConnectionQueue,
  syncResourceToMemberQueue
} from '../config/bullConfig';
import { SyncResourcesFromExternalConnectionWorker } from './SyncResourcesFromExternalConnectionWorker';
import { SyncResourceToMemberWorker } from './SyncResourceToMemberWorker';
import { log } from '../config';

export async function startAllWorkers() {
  log.info('Starting workers');

  const startWorkerPromises = await Promise.all([
    new SyncResourcesFromExternalConnectionWorker(syncResourceFromExternalConnectionQueue).start(),
    new SyncResourceToMemberWorker(syncResourceToMemberQueue).start()
  ]);

  log.info(`Started ${startWorkerPromises.length} workers successfully`);
}

if (require.main === module) {
  startAllWorkers();
}
