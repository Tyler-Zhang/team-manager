export interface IOperation<ConstructorArgs, Return> {
  new(args: ConstructorArgs): {
    run(): Return;
    [key: string]: any;
  };

  typeMap(): {
    [type: string]: IOperation<ConstructorArgs, Return>
  };

  getType(args: ConstructorArgs): string;
}

export class AbstractOperation {
  public static run<C extends IOperation<any,any>>(this: C, args: any): any {
    const type = this.getType(args);

    const childType = this.typeMap()[type];

    if (childType) {
      return new childType(args).run();
    }
    return new this(args).run();
  }

  public static typeMap () {
    return {};
  }

  public static getType<Args>(args: Args): string {
    return '';
  }

  constructor(...arg: any[]) {
    return;
  }

  public run (): any {
    throw new Error('This should be implemented');
  }
}
