import { ApplicationPublisher } from './ApplicationPublisher';
import { asyncOperationQueue } from '../config/bullConfig';

export interface IAsyncOperationJobPayload<P=any> {
  operationName: string;
  typeChain: string[];
  createAt: number;
  args: P;
}

export class AsyncOperationPublisher extends ApplicationPublisher<IAsyncOperationJobPayload> {
  public publish<P>(job: IAsyncOperationJobPayload<P>) {
    return asyncOperationQueue.add(job);
  }
}

export const asyncOperationPublisher = new AsyncOperationPublisher();
