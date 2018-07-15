import { AuthenticatedContext } from "../../models";
import { sign } from "jsonwebtoken";
import { secretsConfig } from '../../config';

export interface IIntoToken {
  authContext: AuthenticatedContext
}

export class IntoToken {
  private authContext: AuthenticatedContext;

  constructor({ authContext }: IIntoToken) {
    this.authContext = authContext
  }

  public run() {
    const jwtPayload = {
      isSystem: this.authContext.isSystem
    };

    return sign(jwtPayload, secretsConfig.privateKey);
  }
}
