import { ApplicationWorker } from './ApplicationWorker';
import { IAsyncOperationJobPayload } from '../publishers';
import { Job } from 'bull';
import { ApplicationOperation } from '../operations/ApplicationOperation';

export class AsyncOperationWorker extends ApplicationWorker<IAsyncOperationJobPayload> {
  protected async process(job: Job<IAsyncOperationJobPayload>) {
    await ApplicationOperation.onProcessAsyncJob(job.data);
  }
}
