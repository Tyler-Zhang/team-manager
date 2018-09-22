import { ApplicationOperation } from './ApplicationOperation';
import { EntityManager, getManager } from 'typeorm';
import { MODEL_TYPE_CHAIN_PROPERTY } from '../../lib/sti-model-operations';
import { ApplicationEntity } from '../../models/ApplicationEntity';
import { IAsyncOperationJobPayload } from '../../publishers/AsyncOperationPublisher';

export interface IModelApplicationOperationArgs<T extends ApplicationEntity> {
  model: T;
  entityManager?: EntityManager;
}

type Args<T extends ApplicationEntity=ApplicationEntity> = IModelApplicationOperationArgs<T>;

export class ModelApplicationOperation<T extends ApplicationEntity> extends ApplicationOperation {
  public static getTypeChain({ model }: Args<ApplicationEntity>) {
    return model.constructor[MODEL_TYPE_CHAIN_PROPERTY];
  }

  protected static async serializeArgs(args: Args){
    return {
      ...await super.serializeArgs(args),
      modelName: args.model.constructor.name,
      modelId: (args.model as any).id
    }
  }

  protected static async deserializeArgs(serializedArgs: any) {
    return {
      ...await super.deserializeArgs(serializedArgs),
      model: await getManager().findOneOrFail(serializedArgs.modelName, serializedArgs.modelId)
    };
  }
  
  protected model: T;
  protected entityManager: EntityManager;

  
  constructor({ model, entityManager = getManager() }: Args<T>) {
    super();
    
    this.model = model;
    this.entityManager = entityManager;
  }
}
