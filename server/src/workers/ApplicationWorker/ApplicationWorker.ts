import { Queue } from 'bull';

export class ApplicationWorker<J=any> {
  private queue: Queue;
  
  constructor(queue: Queue) {
    this.queue = queue;
  } 

  public async start() {
    await this.setup();
    this.queue.process(this.processorName, this.concurrency, this.process.bind(this));
  }

  protected async setup() {
    return;
  }

  protected async process(job: J) {
    throw new Error('ApplicationWorker#process should be overrided');
  }

  protected get processorName() {
    return this.constructor.name;
  }

  protected get concurrency() {
    return 1;
  }
}
