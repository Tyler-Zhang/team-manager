import { verify } from "jsonwebtoken";
import { AuthenticatedContext } from "../../models";
import { secretsConfig } from '../../config';

export interface IFromToken {
  jwtToken: string
}

export class FromToken {
  private jwtToken: string;

  constructor({ jwtToken }: IFromToken) {
    this.jwtToken = jwtToken;
  }

  public run() {
    const jwtPayload = verify(this.jwtToken, secretsConfig.privateKey) as any;

    const authContext = new AuthenticatedContext({
      system: jwtPayload.isSystem
    });

    return authContext;
  }
}
