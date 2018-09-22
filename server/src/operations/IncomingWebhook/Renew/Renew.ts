import { ModelApplicationOperation, IModelApplicationOperationArgs } from '../../ApplicationOperation';
import { Operation } from "../../../lib/sti-model-operations/Operation";
import { IncomingWebhook } from '../../../models';

@Operation('IncomingWebhook')
export abstract class Renew<T extends IncomingWebhook> extends ModelApplicationOperation<T> {
  public static run(args: IModelApplicationOperationArgs<IncomingWebhook>): Promise<IncomingWebhook> {
    return super.run(args);
  }
}
