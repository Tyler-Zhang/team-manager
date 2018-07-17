import { AuthenticatedContext } from "../../models";
import { sign } from "jsonwebtoken";
import { secretsConfig } from '../../config';
import { AbstractOperation } from "../AbstractOperation";

export interface IIntoToken {
  authContext: AuthenticatedContext
}

export class IntoToken extends AbstractOperation{
  public static run(args: IIntoToken): string {
    return super.run(args);
  }

  private authContext: AuthenticatedContext;

  constructor({ authContext }: IIntoToken) {
    super();
    this.authContext = authContext
  }

  public run() {
    const jwtPayload = {
      isSystem: this.authContext.isSystem
    };

    return sign(jwtPayload, secretsConfig.privateKey);
  }
}
