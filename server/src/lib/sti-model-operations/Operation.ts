/**
 * This lib provides decorators for annotating models and their subclasses.
 * It also allows for these models to be built correctly from a plain
 * object depending on a type property
 */
import * as _ from 'lodash';

/**
 * Used for decorating the classes
 */
export const OPERATION_TYPE_CHAIN_PROPERTY = Symbol('model_type');
export const OPERATION_NAME_PROPERTY = Symbol('model_operation');

/**
 * Used for internal lib structures
 */
export const KLASS_PROPERTY = Symbol('class');

/**
 * Interface types
 */
interface IClass<T = any> {
  [OPERATION_TYPE_CHAIN_PROPERTY]?: string[];
  [OPERATION_NAME_PROPERTY]?: string;
  name: string;
  new(...args: any[]): T;
}

export interface ISubclassNode {
  [KLASS_PROPERTY]: IClass;
  [subType: string]: ISubclassNode;
}

/**
 * the key for the map is the name of the model that the model
 * should be called for
 */
export const container: Record<string, Record<string, ISubclassNode>> = {};

/**
 * Decorator for the Operation.
 * @param {String} modelType denotes the subclassed name for the operation
 */
export function Operation(modelType: string) {
  return (klass: any) => {
    // Check if this class inherits from another model
    
    const parentClass: IClass = klass.__proto__;

    const typeChain = parentClass && parentClass.hasOwnProperty(OPERATION_TYPE_CHAIN_PROPERTY) ?
      (parentClass[OPERATION_TYPE_CHAIN_PROPERTY] as string[]).concat(modelType) :
      [modelType];

    const operationName = parentClass && parentClass.hasOwnProperty(OPERATION_NAME_PROPERTY) ?
      (parentClass[OPERATION_NAME_PROPERTY] as string) :
      klass.name;

    klass[OPERATION_TYPE_CHAIN_PROPERTY] = typeChain;
    klass[OPERATION_NAME_PROPERTY] = operationName;

    _.set(container, [operationName, ...typeChain, KLASS_PROPERTY], klass); // Set the model into the container

    return klass;
  }
}

function getDeepestPropertyInMap(obj: any, path: string[]) {
  const deepestFoundValue = null;
  
  for (const p of path) {
    if (!_.has(obj, p)) {
      break;
    }

    obj = obj[p];
  }

  return deepestFoundValue;
}

export abstract class ConstructableOperation {
  public static getAppropriateClass(...args: any[]) {
    const operationName: string = (this as any)[OPERATION_NAME_PROPERTY];
    const operationMap = container[operationName];
    
    const typeChain = this.getTypeChain(...args);
  
    if(!typeChain) {
      return this;
    }

    return getDeepestPropertyInMap(operationMap, typeChain) || this;
  }

  public static getTypeChain(...args: any[]): string[] | null {
    return null;
  }

  public static build(...args: any[]): any {
    const appropriateClass: any = this.getAppropriateClass(...args);

    return new appropriateClass(...args);
  }

  public static run(...args: any[]) {
    return this.build(...args).run();
  }

  constructor(...args: any[]) {
    return;
  }
}
