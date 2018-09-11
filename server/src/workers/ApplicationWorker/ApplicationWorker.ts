import { Queue, Job } from 'bull';
import { log } from '../../config';

export class ApplicationWorker<J=any> {
  private queue: Queue;
  
  constructor(queue: Queue) {
    this.queue = queue;
  } 

  public async start() {
    await this.setup();
    this.queue.process(this.concurrency, (job: Job<J>) => this.processWrapper(job));
  }

  protected async setup() {
    return;
  }

  protected async process(job: Job<J>) {
    throw new Error('ApplicationWorker#process should be overrided');
  }

  protected get workerName() {
    return this.constructor.name;
  }

  protected get concurrency() {
    return 1;
  }

  private async processWrapper(job: Job<J>) {
    const startTime = Date.now();
    log.info(`${this.workerName} started processing a job`);

    await this.process(job);

    log.info(`${this.workerName} finished [${Date.now() - startTime}ms]`);
  }
}
