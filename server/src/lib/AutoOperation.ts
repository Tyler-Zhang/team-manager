/**
 * This lib tries to implement a similar way of running the appropriate
 * operation for subclasses of a STI model.
 * 
 * There are base operations and superclassed operations. These are
 * added to the container with decorators.
 */

const PROPERTY_NAMESPACE = '__operation_container';
const MODEL_NAME_PROPERTY = Symbol(`${PROPERTY_NAMESPACE}_model_name`);
const OPERATION_NAME_PROPERTY = Symbol(`${PROPERTY_NAMESPACE}_operation_name`);
const IS_BASE_PROPERTY = Symbol(`${PROPERTY_NAMESPACE}_is_base`);

/**
 * Interface types
 */
interface IClass<T = any> {
  [MODEL_NAME_PROPERTY]: string;
  [OPERATION_NAME_PROPERTY]: string;
  [IS_BASE_PROPERTY]: boolean;
  name: string;
  __proto__: IClass<any>;
  new(...args: any[]): T;
}

interface IOperationMap {
  klass: IClass,
  subclasses: Record<string, IOperationMap>
}

function getOperationDescriptorKey(klass: IClass) {
  return `${klass[OPERATION_NAME_PROPERTY]}.${klass[MODEL_NAME_PROPERTY]}`;
}

/**
 * the key for the map is the name of the model that the operation
 * should be called for
 */
export const container: Record<string, IOperationMap> = {};

export function Operation(modelName: string) {
  return (klass: any) => {
    klass[OPERATION_NAME_PROPERTY] = klass.name;
    klass[MODEL_NAME_PROPERTY] = modelName;
    klass[IS_BASE_PROPERTY] = true;

    container[getOperationDescriptorKey(klass)] = {
      klass,
      subclasses: {}
    };

    return klass;
  }
}

export function SubclassOperation(modelName: string) {
  return (klass: any) => {
    const parentClass = klass.__proto__;
    
    klass[OPERATION_NAME_PROPERTY] = parentClass.name;
    klass[MODEL_NAME_PROPERTY] = modelName;
    klass[IS_BASE_PROPERTY] = false;

    const parentClassKey = getOperationDescriptorKey(klass);

    if (!container[parentClassKey]) {
      throw new Error(`${parentClassKey} not found`);
    }

    container[parentClassKey].subclasses[modelName] = {
      klass,
      subclasses: {}
    };

    return klass;
  }
}

export abstract class BaseOperation {
  public static getAppropriateClass(...args: any[]) {
    const baseKey = getOperationDescriptorKey(
      (this as any)[IS_BASE_PROPERTY]? (this as any).__proto__ : this
    );
    
    const IOperationMapItem = container[baseKey];
    
    const modelType = this.getType(...args);

    if (!modelType) {
      return this;
    }

    return (
      IOperationMapItem.subclasses[modelType] && 
      IOperationMapItem.subclasses[modelType].klass
    ) || IOperationMapItem.klass;
  }

  public static getType(...args: any[]): string | null {
    return null;
  }

  public static build(...args: any[]): any {
    const appropriateClass = this.getAppropriateClass(...args);

    return new appropriateClass(...args);
  }

  public static run(...args: any[]) {
    return this.build(...args).run();
  }

  constructor(...args: any[]) {
    return;
  }
}
