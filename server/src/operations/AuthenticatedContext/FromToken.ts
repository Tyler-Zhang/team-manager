import { verify } from "jsonwebtoken";
import { AuthenticatedContext } from "../../models";
import { secretsConfig } from '../../config';
import { AbstractOperation } from "../AbstractOperation";

export interface IFromToken {
  jwtToken: string
}

export class FromToken extends AbstractOperation{
  public static run(args: IFromToken): Promise<AuthenticatedContext> {
    return super.call(args);
  }

  private jwtToken: string;

  constructor({ jwtToken }: IFromToken) {
    super();
    this.jwtToken = jwtToken;
  }

  public async run() {
    const jwtPayload = verify(this.jwtToken, secretsConfig.privateKey) as any;

    const authContext = new AuthenticatedContext({
      system: jwtPayload.isSystem
    });

    return authContext;
  }
}
