import { JsonController, Post, BodyParam } from 'routing-controllers'

@JsonController('/slack')
export default class SlackController {
  @Post('/notify')
  public async notify (@BodyParam('challenge') challenge?: string) {
    /**
     * This is used during initial slack setup to setup and verify
     * the endpoint
     */
    if (challenge) {
      return challenge;
    }
  }
}
