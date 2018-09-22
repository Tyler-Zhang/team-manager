import { ModelApplicationOperation, IModelApplicationOperationArgs } from '../../ApplicationOperation';
import { Operation } from "../../../lib/sti-model-operations/Operation";
import { IncomingWebhook } from '../../../models';

export interface IProcessEventOperationArgs<T extends IncomingWebhook, E> extends IModelApplicationOperationArgs<T> {
  event: E
}

@Operation('IncomingWebhook')
export abstract class ProcessEvent<T extends IncomingWebhook, E=any> extends ModelApplicationOperation<T> {
  public static run(args: IProcessEventOperationArgs<IncomingWebhook, any>): Promise<IncomingWebhook> {
    return super.run(args);
  }

  protected event: E;

  constructor(args: IProcessEventOperationArgs<T, E>) {
    super(args);
    this.event = args.event;
  }
}
