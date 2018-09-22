import { Operation } from "../../../lib/sti-model-operations/Operation";
import { GoogleIncomingWebhook, ExternalConnection } from '../../../models';
import { ProcessEvent, IProcessEventOperationArgs } from './ProcessEvent';
import { IWebhookReceivedJobPayload } from "../../../publishers";
import { ExternalConnectionOperations } from "../..";

@Operation('GoogleIncomingWebhook')
export class GoogleIncomingWebhookProcessEvent extends ProcessEvent<GoogleIncomingWebhook, IWebhookReceivedJobPayload> {
  public static run(args: IProcessEventOperationArgs<GoogleIncomingWebhook, IWebhookReceivedJobPayload>)
    : Promise<GoogleIncomingWebhook> {
      return super.run(args) as any;
  }

  public async run() {
    /**
     * Any event from Google drive means that a folder under the root directory
     * was updated and thus we should sync all the resources. But only sync
     * the resources if this event is newer than the last sync
     */
    const externalConnection = await this.resolveExternalConnection();

    if (externalConnection.lastResourceSync.getTime() >= this.event.createdAt) {
      return;
    }

    await ExternalConnectionOperations.SyncResources.run({ model: externalConnection }, true);
  }

  private async resolveExternalConnection() {
    if (this.model.externalConnection) {
      return this.model.externalConnection;
    }

    return (await this.entityManager.findOne(ExternalConnection, this.model.externalConnectionId))!;
  }
}
