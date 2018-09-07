import { ICreateOperationArgs } from '../Abstract';
import { ExternalConnection } from '../../models';
import { getManager, EntityManager } from 'typeorm';
import { AbstractOperation } from '../AbstractOperation';

export class Create extends AbstractOperation {
  public static run(args: ICreateOperationArgs<ExternalConnection>): Promise<ExternalConnection> {
    return super.run(args);
  }

  public model: ExternalConnection;
  public entityManager: EntityManager;

  constructor({ model, entityManager = getManager() }: ICreateOperationArgs<ExternalConnection>) {
    super();
    this.model = model;
    this.entityManager = entityManager;
  }

  public async run() {
    return this.entityManager.save(this.model);
  }
}
