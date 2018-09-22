import { Create } from './Create';
import { IModelApplicationOperationArgs } from '../../ApplicationOperation';
import { GoogleExternalConnection, GoogleIncomingWebhook } from '../../../models';
import { Operation } from "../../../lib/sti-model-operations/Operation";
import { syncResourcesFromExternalConnectionPublisher } from '../../../publishers';
import { IncomingWebhookOperations } from '../..';

@Operation('GoogleExternalConnection')
export class GoogleExternalConnectionCreate extends Create {
  public static run(args: IModelApplicationOperationArgs<GoogleExternalConnection>): Promise<GoogleExternalConnection> {
    return super.run(args) as any;
  }

  protected model!: GoogleExternalConnection;

  public async run() {
    await super.run();

    await this.createWebhook();

    await syncResourcesFromExternalConnectionPublisher.publish({
      externalConnectionId: this.model.id
    });

    return this.model;
  }

  private async createWebhook() {
    const incomingWebhook = new GoogleIncomingWebhook();
    incomingWebhook.externalConnection = this.model;

    return IncomingWebhookOperations.CreateAndEnable.run({
      model: incomingWebhook,
      entityManager: this.entityManager
    });
  }
}
