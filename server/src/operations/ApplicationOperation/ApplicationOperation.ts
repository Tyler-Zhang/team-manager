import { ConstructableOperation, getClassFromContainer } from "../../lib/sti-model-operations/Operation";
import { IAsyncOperationJobPayload, asyncOperationPublisher } from "../../publishers/AsyncOperationPublisher";

/**
 * By default, we will make any operation able to be processed as a job
 * asynchronously. We do this by exposing default method that allows operation
 * arguments to be serialized, deserliazed, and run
 */
export abstract class ApplicationOperation extends ConstructableOperation {
  public static async run(args: any, async = false) {
    if(!async) {
      return super.run(args);
    } else {
      const jobData = await this.createJobData(args);
      return asyncOperationPublisher.publish(jobData);
    }
  }

  public static async onProcessAsyncJob(jobData: IAsyncOperationJobPayload<any>) {    
    const operationClass = getClassFromContainer(jobData.operationName, jobData.typeChain);

    if (!operationClass) {
      throw new Error(`Operation could not be constructed from operationName: ${jobData.operationName}, typechain: ${jobData.typeChain}`);
    }

    const args = await (operationClass as any).deserializeArgs(jobData.args);
    return (operationClass as any).run(args);
  }

  protected static async serializeArgs(args: any) {
    return {};
  }

  protected static async deserializeArgs(args: any) {
    return {};
  }

  protected static async createJobData(args: any) {
    const typeChain = this.getTypeChain(args);
    const operationName = this.getOperationName();

    if (!typeChain || !operationName) {
      throw new Error(`Either typechain: ${typeChain} or operationName: ${operationName} missing`);
    }

    const jobData: IAsyncOperationJobPayload = {
      operationName,
      typeChain,
      createAt: Date.now(),
      args: await this.serializeArgs(args)
    };

    return jobData;
  }
}
