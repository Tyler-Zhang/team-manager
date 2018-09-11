import { Create } from './Create';
import { IModelApplicationOperationArgs } from '../../ApplicationOperation';
import { GoogleExternalConnection } from '../../../models';
import { Operation } from "../../../lib/sti-model-operations/Operation";

@Operation('GoogleExternalConnection')
export class GoogleExternalConnectionCreate extends Create {
  public static run(args: IModelApplicationOperationArgs<GoogleExternalConnection>): Promise<GoogleExternalConnection> {
    return super.run(args) as any;
  }

  protected model!: GoogleExternalConnection;

  public async run() {
    await super.run();

    return this.model;
  }
}
