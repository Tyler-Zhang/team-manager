export interface IOperationInstance<ConstructorArgs, Return> {
  run(): Return;
  [key: string]: any;
}

export interface IOperation<ConstructorArgs, Return> {
  new(args: ConstructorArgs): IOperationInstance<ConstructorArgs, Return>

  typeMap(): {
    [type: string]: IOperation<ConstructorArgs, Return>
  };

  getType(args: ConstructorArgs): string;

  build(args: ConstructorArgs): IOperationInstance<ConstructorArgs, Return>
}

export class AbstractOperation {
  public static run<C extends IOperation<any,any>>(this: C, args: any): any {
    return this.build(args).run();
  }

  public static build<C extends IOperation<any,any>>(this: C, args: any): any {
    const type = this.getType(args);

    const childType = this.typeMap()[type];

    if (childType) {
      return new childType(args).run();
    }
    return new this(args);
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
