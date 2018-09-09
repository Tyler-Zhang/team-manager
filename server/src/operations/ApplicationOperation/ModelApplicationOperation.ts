import { ApplicationOperation } from './ApplicationOperation';
import { EntityManager, getManager } from 'typeorm';

export interface IModelApplicationOperationArgs<T> {
  model: T;
  entityManager?: EntityManager;
}

export class ModelApplicationOperation<T> extends ApplicationOperation {
  protected model: T;
  protected entityManager: EntityManager;
  
  constructor({ model, entityManager = getManager() }: IModelApplicationOperationArgs<T>) {
    super();
    
    this.model = model;
    this.entityManager = entityManager;
  }
}
