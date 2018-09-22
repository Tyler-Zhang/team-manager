import { JsonController, Post, HeaderParams } from 'routing-controllers'
import { webhookReceivedPublisher } from '../publishers/WebhookReceivedPublisher';

@JsonController('/google')
export default class GoogleController {
  @Post('/notify')
  public async notify (@HeaderParams() headers: any) {
    /**
     * When we get notified, it means that the user's root folder has
     * changed. Thus we should run a resource sync
     */
    const createdAt = Date.now();
    const externalId = headers['x-goog-channel-id'];
    const channelExpiration = new Date(headers['x-goog-channel-expiration']).getTime();

    await webhookReceivedPublisher.publish({
      createdAt,
      externalId,
      extra: {
        channelExpiration
      }
    });
    
    return true;
  }
}
