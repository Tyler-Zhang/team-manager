import { Create } from './Create';
import { IModelApplicationOperationArgs } from '../../ApplicationOperation';
import { GoogleExternalConnection } from '../../../models';
import { Operation } from "../../../lib/sti-model-operations/Operation";
import { Inject } from 'typedi';
import { SyncResourcesPublisher } from '../../../publishers';

@Operation('GoogleExternalConnection')
export class GoogleExternalConnectionCreate extends Create {
  public static run(args: IModelApplicationOperationArgs<GoogleExternalConnection>): Promise<GoogleExternalConnection> {
    return super.run(args) as any;
  }

  @Inject()
  protected syncResourcesPublisher!: SyncResourcesPublisher;

  protected model!: GoogleExternalConnection;

  public async run() {
    await super.run();

    await this.syncResourcesPublisher.publish({
      externalConnectionId: this.model.id
    });

    return this.model;
  }
}
