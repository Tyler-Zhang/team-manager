import { Queue, Job } from 'bull';
import buyan from 'bunyan';
import { log as baseLog } from '../../config';

export class ApplicationWorker<J=any> {
  protected log: buyan;
  private queue: Queue;
  
  constructor(queue: Queue, log = baseLog) {
    this.queue = queue;
    this.log = log.child({ worker: this.workerName });
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
    this.log.info(`Started processing a job`);

    try {
      await this.process(job);
    } catch (e) {
      /**
       * Log the error, and rethrow so that the job does not
       * register as a success
       */
      this.log.error(e);
      this.log.info(`Finished with error [${Date.now() - startTime}ms]`);
      throw e;
    }

    this.log.info(`Finished [${Date.now() - startTime}ms]`);
  }
}
