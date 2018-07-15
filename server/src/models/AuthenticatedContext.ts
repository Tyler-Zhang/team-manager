export interface IAuthenticatedContextConstructorProps {
  system?: boolean
}

export class AuthenticatedContext {
  private system: boolean;

  constructor(options: IAuthenticatedContextConstructorProps = {}) {
    this.system = options.system || false;
  }

  public get isSystem() {
    return this.system;
  }
}
