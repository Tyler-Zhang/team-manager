import { ApplicationOperation } from './ApplicationOperation';
import { EntityManager, getManager } from 'typeorm';
import { MODEL_TYPE_CHAIN_PROPERTY } from '../../lib/sti-model-operations';

export interface IModelApplicationOperationArgs<T> {
  model: T;
  entityManager?: EntityManager;
}

export class ModelApplicationOperation<T> extends ApplicationOperation {
  public static getTypeChain({ model }: IModelApplicationOperationArgs<any>) {
    return model.constructor[MODEL_TYPE_CHAIN_PROPERTY];
  }
  
  protected model: T;
  protected entityManager: EntityManager;
  
  constructor({ model, entityManager = getManager() }: IModelApplicationOperationArgs<T>) {
    super();
    
    this.model = model;
    this.entityManager = entityManager;
  }
}
