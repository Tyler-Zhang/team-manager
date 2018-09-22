import { 
  syncResourceToMemberQueue,
  webhookReceivedQueue,
  asyncOperationQueue,
  renewIncomingWebhooksQueue
} from '../config/bullConfig';
import { SyncResourceToMemberWorker } from './SyncResourceToMemberWorker';
import { log, databaseConfig } from '../config';
import { createConnection } from 'typeorm';
import { WebhookReceivedWorker } from './WebhookReceivedWorker';
import { AsyncOperationWorker } from './AsyncOperationWorker';
import { RenewIncomingWebhooksWorker } from './RenewIncomingWebhooksWorker';

export async function startAllWorkers() {
  log.info('Connecting to database');
  await createConnection(databaseConfig);
  
  log.info('Starting workers');

  const startWorkerPromises = await Promise.all([
    new SyncResourceToMemberWorker(syncResourceToMemberQueue).start(),
    new WebhookReceivedWorker(webhookReceivedQueue).start(),
    new AsyncOperationWorker(asyncOperationQueue).start(),
    new RenewIncomingWebhooksWorker(renewIncomingWebhooksQueue).start()
  ]);

  log.info(`Started ${startWorkerPromises.length} workers successfully`);
}

if (require.main === module) {
  startAllWorkers();
}
