/**
 * This lib provides decorators for annotating models and their subclasses.
 * It also allows for these models to be built correctly from a plain
 * object depending on a type property
 */
import * as _ from 'lodash';
import { plainToClass } from 'class-transformer';

/**
 * Used for decorating the classes
 */
export const SUBCLASS_DELIMITER = '>';
export const MODEL_TYPE_CHAIN_PROPERTY = Symbol('model_type');

/**
 * Used for internal lib structures
 */
export const KLASS_PROPERTY = Symbol('class');

/**
 * Interface types
 */
interface IClass<T = any> {
  [MODEL_TYPE_CHAIN_PROPERTY]?: string[];
  name: string;
  __proto__: IClass<any>;
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
export const container: Record<string, ISubclassNode> = {};

/**
 * Decorator for the Model.
 * @param {String} modelType denotes the subclassed name for the model
 * 
 * For exmaple, if we had a Person class, and a Student class that
 * extended the Person class, we would set modelType to "Student".
 * 
 * But the typeField property of the plainObject that we would want to
 * transform would be `Person${SUBCLASS_DELIMITER}Stduent`
 */
export function Model(modelType: string) {
  return (klass: any) => {
    // Check if this class inherits from another model
    
    const parentClass: IClass = klass.__proto__;

    const typeChain = parentClass && parentClass.hasOwnProperty(MODEL_TYPE_CHAIN_PROPERTY) ?
      (parentClass[MODEL_TYPE_CHAIN_PROPERTY] as string[]).concat(modelType) :
      [modelType];

    klass[MODEL_TYPE_CHAIN_PROPERTY] = typeChain;

    _.set(container, [...typeChain, KLASS_PROPERTY], klass); // Set the model into the container

    return klass;
  }
}

export function generateTypeField(typeChain: string[]) {
  return typeChain.join(SUBCLASS_DELIMITER);
}

export function parseTypeField(type: string) {
  return type.split(SUBCLASS_DELIMITER);
}

export class ConstructableModel {
  public static getAppropriateClass(plainObject: any) {
    const type = this.getType(plainObject);

    if (!type) {
      return this;
    }

    return _.get(container, [...parseTypeField(type), KLASS_PROPERTY]) || this;
  }

  public static getType(plainObject: any): string | null {
    return null;
  }

  public static build<T extends { getAppropriateClass(obj: any): any }>(this: T, plainObject: any): T {
    const appropriateClass = this.getAppropriateClass(plainObject);
    return plainToClass(appropriateClass, plainObject) as any as T;
  }
}
