import { JsonController, Post, BodyParam } from 'routing-controllers'

@JsonController('/slack')
export default class SlackController {
  @Post('/notify')
  public async notify (@BodyParam('challenge') challenge: string) {
    return challenge;
  }
}
